/**
 * About Component
 *
 * Renders the about section by injecting the HTML template
 * from sections/about.html into the #about-container element.
 */

/**
 * Initialize the about component.
 */
export async function initAbout() {
    const container = document.getElementById('about-container');
    if (!container) return;

    try {
        const response = await fetch('sections/about.html');
        if (!response.ok) throw new Error('Failed to load about template');
        const html = await response.text();
        container.innerHTML = html;
    } catch (error) {
        console.error('About initialization failed:', error);
        container.innerHTML = '<section class="section"><div class="container"><p>About section unavailable.</p></div></section>';
    }
}
