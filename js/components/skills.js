/**
 * Skills Component
 *
 * Renders 6 domain-grouped technology categories as a grid of labeled groups.
 * Each technology chip is clickable and opens a compact popover showing related projects.
 */

import { domains } from '../data/skills.js';

let activePopover = null;
let activeChip = null;

/**
 * Initialize the skills component.
 */
export async function initSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    try {
        const response = await fetch('sections/skills.html');
        if (!response.ok) throw new Error('Failed to load skills template');
        const templateHtml = await response.text();
        container.innerHTML = templateHtml;

        renderDomainGrid(container);
        bindEvents(container);
    } catch (error) {
        console.error('Skills initialization failed:', error);
        container.innerHTML = '<section class="section"><div class="container"><p>Skills section unavailable.</p></div></section>';
    }
}

/**
 * Render the 6 domain groups into the grid.
 */
function renderDomainGrid(container) {
    const grid = container.querySelector('.skills__grid');
    if (!grid) return;

    grid.innerHTML = domains.map(domain => `
        <div class="skills__domain" data-domain="${domain.id}">
            <div class="skills__domain-header">
                <span class="skills__domain-icon">${domain.icon}</span>
                <h3 class="skills__domain-title">${domain.title}</h3>
            </div>
            <div class="skills__chips">
                ${domain.technologies.map(tech => `
                    <button class="skills__chip" data-tech="${tech.name}" data-domain="${domain.id}">
                        <span class="skills__chip-name">${tech.name}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `).join('');
}

/**
 * Find a technology object across all domains by name.
 */
function findTech(techName) {
    for (const domain of domains) {
        const tech = domain.technologies.find(t => t.name === techName);
        if (tech) return tech;
    }
    return null;
}

/**
 * Show a compact popover near the clicked chip.
 */
function showPopover(techName, chipEl) {
    const tech = findTech(techName);
    if (!tech) return;

    // If already open for this chip, close it
    if (activePopover && activeChip === chipEl) {
        closePopover();
        return;
    }

    closePopover();

    // Build popover content
    const hasProjects = tech.projects.length > 0;
    const hasText = !!tech.popoverText;
    let projectsHtml;
    if (hasProjects) {
        projectsHtml = tech.projects.map(p => `
            <a href="#project-${p.id}" class="skills__popover-project" data-project="${p.id}">
                <span class="skills__popover-project-name">${p.name}</span>
                <span class="skills__popover-project-desc">${p.line}</span>
            </a>
        `).join('');
    } else if (hasText) {
        projectsHtml = `<p class="skills__popover-text">${tech.popoverText}</p>`;
    } else {
        projectsHtml = '<p class="skills__popover-empty">No projects linked yet</p>';
    }

    // Create popover element
    const popover = document.createElement('div');
    popover.className = 'skills__popover';
    popover.innerHTML = `
        <h4 class="skills__popover-title">${tech.name}</h4>
        <div class="skills__popover-projects">${projectsHtml}</div>
    `;

    document.body.appendChild(popover);

    // Position the popover near the chip
    positionPopover(popover, chipEl);

    // Bind project link clicks
    popover.querySelectorAll('.skills__popover-project').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closePopover();
            const projectId = link.dataset.project;
            const target = document.getElementById(`project-${projectId}`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Remove any previous highlight, then add it
                document.querySelectorAll('.project-card--highlight').forEach(c => c.classList.remove('project-card--highlight'));
                target.classList.add('project-card--highlight');
                // Remove highlight after animation completes
                setTimeout(() => target.classList.remove('project-card--highlight'), 2000);
            }
        });
    });

    // Mark active state
    activePopover = popover;
    activeChip = chipEl;
    chipEl.classList.add('skills__chip--active');

    // Animate in
    requestAnimationFrame(() => popover.classList.add('skills__popover--visible'));
}

/**
 * Position the popover relative to the chip, keeping it within the viewport.
 */
function positionPopover(popover, chipEl) {
    const rect = chipEl.getBoundingClientRect();
    const popWidth = 260;
    const gap = 8;

    // Default: centered above the chip
    let left = rect.left + rect.width / 2 - popWidth / 2;
    let top = rect.top - gap;

    // Clamp horizontal: stay within viewport
    const minLeft = 8;
    const maxLeft = window.innerWidth - popWidth - 8;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    // Check if there's room above; if not, place below
    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
    popover.style.width = `${popWidth}px`;

    // Measure actual height after rendering
    const popRect = popover.getBoundingClientRect();
    if (popRect.top < 8) {
        // Not enough room above — place below the chip
        popover.style.top = `${rect.bottom + gap}px`;
    }
}

/**
 * Close the popover.
 */
function closePopover() {
    if (activePopover) {
        activePopover.remove();
        activePopover = null;
    }
    if (activeChip) {
        activeChip.classList.remove('skills__chip--active');
        activeChip = null;
    }
}

/**
 * Bind click events for chips and document-level close handlers.
 */
function bindEvents(container) {
    // Chip clicks
    container.addEventListener('click', (e) => {
        const chip = e.target.closest('.skills__chip');
        if (chip) {
            e.stopPropagation();
            showPopover(chip.dataset.tech, chip);
            return;
        }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
        if (activePopover && !activePopover.contains(e.target) && !e.target.closest('.skills__chip')) {
            closePopover();
        }
    });

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopover();
    });

    // Reposition on scroll/resize
    let repositionRaf = null;
    const reposition = () => {
        if (activePopover && activeChip) {
            if (repositionRaf) cancelAnimationFrame(repositionRaf);
            repositionRaf = requestAnimationFrame(() => {
                positionPopover(activePopover, activeChip);
            });
        }
    };
    window.addEventListener('scroll', reposition, { passive: true });
    window.addEventListener('resize', reposition, { passive: true });
}
