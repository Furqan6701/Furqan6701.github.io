/**
 * Projects Component
 *
 * Renders the projects section by fetching the HTML template and
 * populating it with data from js/data/projects.js.
 * Supports category filtering.
 */

import { projects, projectCategories } from '../data/projects.js';
import { injectPopout, openPopout, closePopout, initPopoutKeyboard } from '../utils/popout.js';

let currentFilter = 'all';

/**
 * Initialize the projects component.
 */
export async function initProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    try {
        const response = await fetch('sections/projects.html');
        if (!response.ok) throw new Error('Failed to load projects template');
        const templateHtml = await response.text();
        container.innerHTML = templateHtml;

        renderFilters(container);
        renderProjects(container);
        setupCardClicks(container);
        injectPopout(container, { label: 'Project details' });
        initPopoutKeyboard();
    } catch (error) {
        console.error('Projects initialization failed:', error);
        container.innerHTML = '<section class="section"><div class="container"><p>Projects section unavailable.</p></div></section>';
    }
}

/**
 * Render filter buttons into the filter bar.
 */
function renderFilters(container) {
    const filtersContainer = container.querySelector('.projects__filters');
    if (!filtersContainer) return;

    filtersContainer.innerHTML = projectCategories.map(cat => `
        <button class="filter-btn ${cat.slug === currentFilter ? 'active' : ''}"
                data-filter="${cat.slug}"
                aria-pressed="${cat.slug === currentFilter}">
            ${cat.label}
        </button>
    `).join('');

    // Attach click handlers
    filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            filtersContainer.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            renderProjects(container);
        });
    });
}

/**
 * Render project cards, filtered by current category.
 */
function renderProjects(container) {
    const grid = container.querySelector('.projects__grid');
    if (!grid) return;

    const filtered = currentFilter === 'all'
        ? projects
        : projects.filter(p => p.categorySlug === currentFilter);

    grid.innerHTML = filtered.map(project => renderProjectCard(project)).join('');
}

/**
 * Render a single project card.
 * The entire card is clickable, opening the primary external destination.
 * Individual link buttons are shown only for non-empty URLs.
 * @param {Object} project - Project data object
 * @returns {string} HTML string
 */
function renderProjectCard(project) {
    const isMultiPart = project.type === 'multi-part';
    const expandableClass = isMultiPart ? 'project-card--expandable' : '';
    const expandIcon = isMultiPart
        ? '<span class="project-card__expand-icon" aria-hidden="true">▾</span>'
        : '';
    const expandableDataAttr = isMultiPart
        ? 'data-expandable="true"'
        : '';

    const subEntriesHtml = isMultiPart && project.subEntries
        ? `<div class="project-card__sub-entries">
                <p class="project-card__sub-entries-title">Includes:</p>
                <ul class="project-card__sub-list">
                    ${project.subEntries.map(entry => `<li>${entry}</li>`).join('')}
                </ul>
           </div>`
        : '';

    return `
        <article id="project-${project.id}"
                 class="project-card ${expandableClass}"
                 data-category="${project.categorySlug}"
                 data-project-id="${project.id}"
                 ${expandableDataAttr}
                 tabindex="0"
                 aria-label="${project.title} — ${isMultiPart ? 'expand details' : 'view details'}">
            <div class="project-card__image">
                <img src="${project.thumbnail}"
                     alt="${project.title} — project screenshot or map"
                     loading="lazy"
                     width="640"
                     height="400">
            </div>
            <div class="project-card__body">
                ${!isMultiPart ? '<span class="project-card__expand-indicator" aria-hidden="true">↗</span>' : ''}
                <span class="project-card__category">${project.category}</span>
                <h3 class="project-card__title">${project.title} ${expandIcon}</h3>
                <div class="card__tags">
                    ${project.technologies.map(tech =>
                        `<span class="tag tag--${project.categorySlug}">${tech}</span>`
                    ).join('')}
                </div>
                ${subEntriesHtml}
            </div>
        </article>
    `;
}

/**
 * Build the HTML content for a project popout.
 * @param {Object} project - Project data object
 * @returns {string} HTML string for the popout body
 */
function buildProjectPopout(project) {
    const { links } = project;

    const linkButtons = [
        links.github
            ? `<a href="${links.github}" class="btn btn--ghost btn--sm" target="_blank" rel="noopener noreferrer">GitHub</a>`
            : '',
        links.upwork
            ? `<a href="${links.upwork}" class="btn btn--outline btn--sm" target="_blank" rel="noopener noreferrer">Upwork</a>`
            : '',
        links.youtube
            ? `<a href="${links.youtube}" class="btn btn--secondary btn--sm" target="_blank" rel="noopener noreferrer">YouTube</a>`
            : '',
    ].filter(Boolean).join('');

    const linksHtml = linkButtons
        ? `<div class="popout-project__links">${linkButtons}</div>`
        : '';

    const subEntriesHtml = project.subEntries
        ? `<div class="popout-project__sub-entries">
                <p class="popout-project__sub-title">Includes:</p>
                <ul class="popout-project__sub-list">
                    ${project.subEntries.map(entry => `<li>${entry}</li>`).join('')}
                </ul>
           </div>`
        : '';

    return `
        <div class="popout-project">
            <div class="popout-project__image">
                <img src="${project.thumbnail}"
                     alt="${project.title}"
                     width="640" height="400">
            </div>
            ${project.legend && project.legend.length ? `
                <div class="popout-project__legend">
                    <p class="popout-project__legend-title">Legend</p>
                    <div class="popout-project__legend-items">
                        ${project.legend.map(item => `
                            <div class="popout-project__legend-item">
                                <span class="popout-project__legend-swatch" style="background-color: ${item.color};${item.color === '#FFFFFF' ? ' border: 1px solid var(--color-border);' : ''}"></span>
                                <span class="popout-project__legend-label">${item.label}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            <div class="popout-project__header">
                <span class="popout-project__category">${project.category}</span>
            </div>
            <h3 class="popout-project__title">${project.title}</h3>
            <p class="popout-project__description">${project.description}</p>
            ${project.bullets && project.bullets.length ? `
                <ul class="popout-project__bullets">
                    ${project.bullets.map(b => `<li>${b}</li>`).join('')}
                </ul>
            ` : ''}
            <div class="popout-project__tags">
                ${project.technologies.map(tech =>
                    `<span class="tag tag--${project.categorySlug}">${tech}</span>`
                ).join('')}
            </div>
            ${linksHtml}
            ${subEntriesHtml}
        </div>
    `;
}

/**
 * Set up click handler on the project grid for card-level navigation.
 * Clicking anywhere on a card with a primary URL opens that URL.
 * Clicks on nested link buttons are not intercepted.
 */
function setupCardClicks(container) {
    const grid = container.querySelector('.projects__grid');
    if (!grid) return;

    grid.addEventListener('click', (e) => {
        // Don't intercept clicks on nested <a> elements
        if (e.target.closest('a')) return;

        const card = e.target.closest('.project-card');
        if (!card) return;

        // Multi-part cards: toggle expanded state (inline expand)
        if (card.dataset.expandable) {
            e.preventDefault();
            card.classList.toggle('project-card--expanded');
            const icon = card.querySelector('.project-card__expand-icon');
            if (icon) {
                icon.textContent = card.classList.contains('project-card--expanded') ? '▴' : '▾';
            }
            return;
        }

        // All other cards: open popout with project details
        const projectId = card.dataset.projectId;
        const project = projects.find(p => p.id === projectId);
        if (!project) return;

        e.preventDefault();
        openPopout(container, buildProjectPopout(project));
    });

    // Keyboard accessibility: Enter/Space on focused card
    grid.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;

        const card = e.target.closest('.project-card');
        if (!card) return;

        e.preventDefault();
        card.click();
    });
}
