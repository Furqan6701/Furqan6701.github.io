/**
 * Hero Component
 *
 * Renders the hero/intro section by injecting the HTML template
 * from sections/hero.html into the #hero-container element.
 * Includes interactive cursor-tracking effects for desktop.
 */

/** Initialize the hero component. */
export async function initHero() {
    const container = document.getElementById('hero-container');
    if (!container) return;

    try {
        const response = await fetch('sections/hero.html');
        if (!response.ok) throw new Error('Failed to load hero template');
        const html = await response.text();
        container.innerHTML = html;

        // Desktop-only interactive effects
        if (window.innerWidth > 768) {
            initLetterGlow();
        }
    } catch (error) {
        console.error('Hero initialization failed:', error);
        container.innerHTML = '<section class="hero"><div class="container"><p>Loading…</p></div></section>';
    }
}

/* ══════════════════════════════════════════════
   Letter-by-Letter Glow on Name Heading
   ══════════════════════════════════════════════ */

function initLetterGlow() {
    const heading = document.querySelector('.hero__name');
    if (!heading) return;

    const text = heading.textContent;
    heading.innerHTML = '';
    heading.setAttribute('aria-label', text);

    // Split into individual character spans, preserve spaces as &nbsp;
    for (const char of text) {
        const span = document.createElement('span');
        span.className = 'hero__letter';
        span.textContent = char === ' ' ? '\u00A0' : char;
        heading.appendChild(span);
    }

    const letters = heading.querySelectorAll('.hero__letter');
    const GLOW_RADIUS = 80; // px — how far from cursor a letter starts glowing

    heading.addEventListener('mousemove', (e) => {
        for (const letter of letters) {
            const rect = letter.getBoundingClientRect();
            const lx = rect.left + rect.width / 2;
            const ly = rect.top + rect.height / 2;
            const dist = Math.hypot(e.clientX - lx, e.clientY - ly);

            if (dist < GLOW_RADIUS) {
                // Intensity falls off linearly with distance
                const intensity = 1 - dist / GLOW_RADIUS;
                letter.classList.add('hero__letter--glow');
                letter.style.opacity = 0.6 + intensity * 0.4;
                letter.style.textShadow = `0 0 ${8 + intensity * 16}px rgba(10,126,140,${0.3 + intensity * 0.5}), 0 0 ${4 + intensity * 8}px rgba(16,165,181,${0.2 + intensity * 0.4})`;
            } else {
                letter.classList.remove('hero__letter--glow');
                letter.style.opacity = '';
                letter.style.textShadow = '';
            }
        }
    });

    heading.addEventListener('mouseleave', () => {
        for (const letter of letters) {
            letter.classList.remove('hero__letter--glow');
            letter.style.opacity = '';
            letter.style.textShadow = '';
        }
    });
}


