/**
 * Education Component
 *
 * Renders the education section by fetching the HTML template and
 * populating it with data from js/data/education.js.
 */

import { education } from '../data/education.js';

/**
 * Initialize the education component.
 */
export async function initEducation() {
    const container = document.getElementById('education-container');
    if (!container) return;

    try {
        const response = await fetch('sections/education.html');
        if (!response.ok) throw new Error('Failed to load education template');
        const templateHtml = await response.text();
        container.innerHTML = templateHtml;

        renderEducationCards(container);
    } catch (error) {
        console.error('Education initialization failed:', error);
        container.innerHTML = '<section class="section"><div class="container"><p>Education section unavailable.</p></div></section>';
    }
}

/**
 * Render education entries into the grid.
 */
function renderEducationCards(container) {
    const grid = container.querySelector('.education__grid');
    if (!grid) return;

    if (education.length === 0) {
        grid.innerHTML = '<p class="text-muted">Education details coming soon.</p>';
        return;
    }

    grid.innerHTML = education.map(edu => `
        <div class="education-card">
            <div class="education-card__icon">
                <!-- Placeholder icon — replace with institution logo -->
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
            </div>
            <div class="education-card__details">
                <h3 class="education-card__degree">${edu.degree}</h3>
                <p class="education-card__institution">${edu.institution}</p>
                <p class="education-card__period">${edu.startDate} — ${edu.endDate}</p>
                ${edu.gpa ? `<p class="education-card__gpa">CGPA: ${edu.gpa}</p>` : ''}
                ${edu.description ? `<p class="education-card__description">${edu.description}</p>` : ''}
                ${edu.courses.length > 0 ? `
                    <div class="education-card__courses">
                        <p class="education-card__courses-title">Key Courses</p>
                        <div class="card__tags">
                            ${edu.courses.map(course =>
                                `<span class="tag">${course}</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}
