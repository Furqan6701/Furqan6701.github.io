/**
 * Navbar Component
 *
 * Renders the navigation bar by injecting the HTML template from
 * sections/navbar.html into the #navbar-container element.
 * Handles scroll-based background change and mobile menu toggle.
 */

/**
 * Initialize the navbar component.
 * Fetches template, injects it, and sets up event listeners.
 */
export async function initNavbar() {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    try {
        const response = await fetch('sections/navbar.html');
        if (!response.ok) throw new Error('Failed to load navbar template');
        const html = await response.text();
        container.innerHTML = html;

        setupScrollBehavior();
        setupMobileToggle();
        setupActiveLink();
    } catch (error) {
        console.error('Navbar initialization failed:', error);
        container.innerHTML = '<nav class="navbar"><div class="container">Navigation</div></nav>';
    }
}

/**
 * Add background change on scroll.
 */
function setupScrollBehavior() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/**
 * Toggle mobile menu open/close.
 */
function setupMobileToggle() {
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        toggle.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is clicked
    menu.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * Highlight the active nav link based on scroll position.
 */
function setupActiveLink() {
    // Implemented during navigation utility setup (utils/navigation.js)
}
