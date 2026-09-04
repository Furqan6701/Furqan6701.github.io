/**
 * Certifications Component
 *
 * Renders the certifications section by injecting the HTML template
 * from sections/certifications.html into the #certifications-container element.
 */

/**
 * Initialize the certifications component.
 */
export async function initCertifications() {
    const container = document.getElementById('certifications-container');
    if (!container) return;

    try {
        const response = await fetch('sections/certifications.html');
        if (!response.ok) throw new Error('Failed to load certifications template');
        const html = await response.text();
        container.innerHTML = html;
    } catch (error) {
        console.error('Certifications initialization failed:', error);
        container.innerHTML = '<section class="section"><div class="container"><p>Certifications section unavailable.</p></div></section>';
    }
}