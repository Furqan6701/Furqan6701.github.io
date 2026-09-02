/**
 * Footer Component
 *
 * Renders the site footer by injecting the HTML template
 * from sections/footer.html into the #footer-container element.
 */

/**
 * Initialize the footer component.
 */
export async function initFooter() {
    const container = document.getElementById('footer-container');
    if (!container) return;

    try {
        const response = await fetch('sections/footer.html');
        if (!response.ok) throw new Error('Failed to load footer template');
        const html = await response.text();
        container.innerHTML = html;

        setFooterYear(container);
        setupBackToTop(container);
    } catch (error) {
        console.error('Footer initialization failed:', error);
        container.innerHTML = '<footer class="footer"><div class="container"><p>© M. Furqan Shahid</p></div></footer>';
    }
}

/**
 * Smooth scroll to top when back-to-top button is clicked.
 */
function setFooterYear(container) {
    const yearEl = container.querySelector('#footer-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

function setupBackToTop(container) {
    const btn = container.querySelector('.footer__back-to-top');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
