/**
 * Contact Component
 *
 * Renders the contact section by injecting the HTML template
 * from sections/contact.html into the #contact-container element.
 */

/**
 * Initialize the contact component.
 */
export async function initContact() {
    const container = document.getElementById('contact-container');
    if (!container) return;

    try {
        const response = await fetch('sections/contact.html');
        if (!response.ok) throw new Error('Failed to load contact template');
        const html = await response.text();
        container.innerHTML = html;
    } catch (error) {
        console.error('Contact initialization failed:', error);
        container.innerHTML = '<section class="section"><div class="container"><p>Contact section unavailable.</p></div></section>';
    }
}
