/**
 * Hero Component
 *
 * Renders the hero/intro section by injecting the HTML template
 * from sections/hero.html into the #hero-container element.
 */

/**
 * Initialize the hero component.
 */
export async function initHero() {
    const container = document.getElementById('hero-container');
    if (!container) return;

    try {
        const response = await fetch('sections/hero.html');
        if (!response.ok) throw new Error('Failed to load hero template');
        const html = await response.text();
        container.innerHTML = html;
    } catch (error) {
        console.error('Hero initialization failed:', error);
        container.innerHTML = '<section class="hero"><div class="container"><p>Loading…</p></div></section>';
    }
}
