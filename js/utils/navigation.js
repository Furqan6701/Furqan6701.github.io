/**
 * Navigation Utilities
 *
 * Smooth scrolling, active link highlighting, and scroll spy functionality.
 * Activated after the navbar and all sections are rendered.
 */

/**
 * Initialize navigation utilities.
 * Call after all section components have been injected.
 */
export function initNavigation() {
    setupSmoothScroll();
    setupScrollSpy();
}

/**
 * Smooth scroll to anchor links (e.g., #skills, #projects).
 */
function setupSmoothScroll() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const targetId = link.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });

        // Update URL without scrolling
        history.pushState(null, '', targetId);
    });
}

/**
 * Highlight the active nav link based on scroll position.
 * Uses IntersectionObserver for performance.
 */
function setupScrollSpy() {
    const navLinks = document.querySelectorAll('.navbar__link[href^="#"]');
    if (navLinks.length === 0) return;

    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href').slice(1);
        return {
            id,
            element: document.getElementById(id + '-container'),
            link,
        };
    }).filter(s => s.element);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id.replace('-container', '');
                    navLinks.forEach(link => {
                        link.classList.toggle(
                            'active',
                            link.getAttribute('href') === `#${id}`
                        );
                    });
                }
            });
        },
        {
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0,
        }
    );

    sections.forEach(s => observer.observe(s.element));
}
