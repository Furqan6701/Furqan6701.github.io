/**
 * Research Interests Component
 *
 * Renders the research interests section by injecting the HTML template
 * from sections/research.html into the #research-container element.
 */

/**
 * Initialize the research component.
 */
export async function initResearch() {
    const container = document.getElementById('research-container');
    if (!container) return;

    try {
        const response = await fetch('sections/research.html');
        if (!response.ok) throw new Error('Failed to load research template');
        const html = await response.text();
        container.innerHTML = html;
    } catch (error) {
        console.error('Research initialization failed:', error);
        container.innerHTML = '<section class="section"><div class="container"><p>Research section unavailable.</p></div></section>';
    }
}
