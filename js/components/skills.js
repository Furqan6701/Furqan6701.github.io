/**
 * Skills Component — Radial Hub-and-Spoke Diagram
 *
 * All 6 categories and their skills are always visible.
 * Each category's arc spread scales with its skill count.
 * Skill chip clicks open a compact popover showing related projects.
 */

import { domains } from '../data/skills.js';

let activePopover = null;
let activeChip = null;
const expandedCategories = new Set();

/* ── Accent colors per domain (matches CSS) ── */
const DOMAIN_COLORS = {
    'gis-remote-sensing': '#10a5b5',
    'photogrammetry': '#8b5cf6',
    'programming': '#f59e0b',
    'computer-vision': '#ef4444',
    'web-backend': '#3b82f6',
    'other-skills': '#6b7280',
};

/* ── Diagram geometry (fixed) ── */
const DIAGRAM = {
    width: 780,
    height: 640,
    cx: 390,
    cy: 320,
    catRadius: 150,
    skillRadius: 280,
};

/** Half-spread angle (degrees) per category, scaling with skill count. */
function calcSpread(skillCount) {
    return Math.max(18, skillCount * 10);
}

/* ══════════════════════════════════════════════
   Initialization
   ══════════════════════════════════════════════ */

export async function initSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    try {
        const response = await fetch('sections/skills.html');
        if (!response.ok) throw new Error('Failed to load skills template');
        const templateHtml = await response.text();
        container.innerHTML = templateHtml;

        renderDiagram(container);
        bindEvents(container);
    } catch (error) {
        console.error('Skills initialization failed:', error);
        container.innerHTML = '<section class="section"><div class="container"><p>Skills section unavailable.</p></div></section>';
    }
}

/* ══════════════════════════════════════════════
   Diagram Rendering
   ══════════════════════════════════════════════ */

/* Explicit angle assignments (degrees) — overrides array-order positioning */
const CATEGORY_ANGLES = {
    'gis-remote-sensing': -90,   // top
    'programming':        -30,   // top-right
    'web-backend':         30,   // bottom-right
    'other-skills':        90,   // bottom
    'computer-vision':    150,   // bottom-left
    'photogrammetry':     210,   // top-left
};

function renderDiagram(container) {
    const diagram = container.querySelector('#skills-diagram');
    if (!diagram) return;

    const { width, height, cx, cy, catRadius, skillRadius } = DIAGRAM;

    let svgLines = '';
    let catNodesHtml = '';
    let skillNodesHtml = '';

    domains.forEach((domain) => {
        const catAngle = (CATEGORY_ANGLES[domain.id] ?? -90) * Math.PI / 180;
        const catX = cx + catRadius * Math.cos(catAngle);
        const catY = cy + catRadius * Math.sin(catAngle);
        const color = DOMAIN_COLORS[domain.id] || '#6b7280';

        const catXPct = (catX / width) * 100;
        const catYPct = (catY / height) * 100;

        // Line from globe edge to category node
        const GLOBE_R = 75; // half of 150px center container
        const lineStartX = cx + GLOBE_R * Math.cos(catAngle);
        const lineStartY = cy + GLOBE_R * Math.sin(catAngle);
        svgLines += `<line class="skills__line skills__line--center"
            x1="${lineStartX.toFixed(1)}" y1="${lineStartY.toFixed(1)}" x2="${catX}" y2="${catY}"
            stroke="${color}" />`;

        // Category node
        catNodesHtml += `
            <div class="skills__cat" data-domain="${domain.id}"
                 style="left:${catXPct}%; top:${catYPct}%;">
                <span class="skills__cat-icon">${domain.icon}</span>
                <span class="skills__cat-label">${domain.title}</span>
            </div>
            <div class="skills__dropdown" data-domain="${domain.id}"
                 style="left:${catXPct}%; top:calc(${catYPct}% + 30px);">
                ${domain.technologies.map(tech => `
                    <button class="skills__chip" data-tech="${tech.name}" data-domain="${domain.id}">
                        <span class="skills__chip-name">${tech.name}</span>
                    </button>
                `).join('')}
            </div>`;

        // Skill nodes + branch lines
        const techs = domain.technologies;
        const spreadHalf = calcSpread(techs.length);
        const techStep = techs.length > 1 ? (spreadHalf * 2) / (techs.length - 1) : 0;

        techs.forEach((tech, j) => {
            const offset = techs.length > 1 ? -spreadHalf + j * techStep : 0;
            const skillAngle = catAngle + (offset * Math.PI) / 180;
            const skillX = cx + skillRadius * Math.cos(skillAngle);
            const skillY = cy + skillRadius * Math.sin(skillAngle);
            const skillXPct = (skillX / width) * 100;
            const skillYPct = (skillY / height) * 100;

            // Branch line
            svgLines += `<line class="skills__branch-line" data-domain="${domain.id}"
                x1="${catX}" y1="${catY}" x2="${skillX}" y2="${skillY}"
                stroke="${color}" />`;

            // Skill node (hidden by default, shown on category click)
            skillNodesHtml += `
                <div class="skills__node" data-domain="${domain.id}" style="left:${skillXPct}%; top:${skillYPct}%;">
                    <button class="skills__chip" data-tech="${tech.name}" data-domain="${domain.id}">
                        <span class="skills__chip-name">${tech.name}</span>
                    </button>
                </div>`;
        });
    });

    diagram.innerHTML = `
        <svg class="skills__lines" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
            ${svgLines}
        </svg>
        <div class="skills__center" style="left:${(cx / width) * 100}%; top:${(cy / height) * 100}%;" aria-label="Geospatial Development">
            <svg class="skills__globe" id="skills-globe" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="sphere-grad" cx="40%" cy="35%" r="55%">
                        <stop offset="0%" stop-color="rgba(16,165,181,0.10)" />
                        <stop offset="100%" stop-color="rgba(10,126,140,0.03)" />
                    </radialGradient>
                </defs>
                <circle cx="60" cy="60" r="52" fill="url(#sphere-grad)" />
                <g id="skills-globe-dots"></g>
            </svg>
        </div>
        ${catNodesHtml}
        ${skillNodesHtml}
    `;

    initGlobe();
}

/* ══════════════════════════════════════════════
   Dot-Grid Globe Animation
   ══════════════════════════════════════════════ */

function initGlobe() {
    const svg = document.getElementById('skills-globe');
    const container = document.getElementById('skills-globe-dots');
    if (!svg || !container) return;

    const CX = 60, CY = 60, R = 54;
    const NS = 'http://www.w3.org/2000/svg';

    // Generate evenly-spaced dot grid on sphere surface
    const dots = [];
    const LAT_COUNT = 11;  // latitude rings (evenly spaced)
    const LON_COUNT = 20;  // longitudes per ring (fixed — clean columns)

    for (let i = 0; i <= LAT_COUNT; i++) {
        const lat = (i / LAT_COUNT) * Math.PI - Math.PI / 2; // -90° to +90°
        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);
        const y3d = sinLat;

        for (let j = 0; j < LON_COUNT; j++) {
            const lon = (j / LON_COUNT) * 2 * Math.PI;
            const x3d = cosLat * Math.cos(lon);
            const z3d = cosLat * Math.sin(lon);

            const el = document.createElementNS(NS, 'circle');
            el.setAttribute('r', '1.2');
            el.setAttribute('fill', '#10a5b5');
            container.appendChild(el);

            dots.push({ el, x3d, y3d, z3d });
        }
    }

    const startTime = performance.now();
    const DURATION = 18000; // 18s full rotation
    let paused = false;
    let pausedAt = 0;
    let totalPaused = 0;

    function animate(now) {
        if (!paused) {
            const elapsed = now - startTime - totalPaused;
            const angle = (elapsed / DURATION) * 2 * Math.PI;
            const cosA = Math.cos(angle);
            const sinA = Math.sin(angle);

            for (const dot of dots) {
                const rx = dot.x3d * cosA - dot.z3d * sinA;
                const rz = dot.x3d * sinA + dot.z3d * cosA;
                const sx = CX + R * rx;
                const sy = CY + R * dot.y3d;
                const depthFade = Math.max(0, Math.min(1, (rz + 0.3) / 1.3));

                dot.el.setAttribute('cx', sx.toFixed(1));
                dot.el.setAttribute('cy', sy.toFixed(1));
                dot.el.setAttribute('opacity', (depthFade * 0.75).toFixed(2));
                dot.el.setAttribute('r', (0.7 + depthFade * 0.9).toFixed(2));
            }
        }
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // Pause rotation on hover
    svg.addEventListener('mouseenter', () => {
        paused = true;
        pausedAt = performance.now();
    });
    svg.addEventListener('mouseleave', () => {
        totalPaused += performance.now() - pausedAt;
        paused = false;
    });
}

/* ══════════════════════════════════════════════
   Popover Logic
   ══════════════════════════════════════════════ */

function findTech(techName) {
    for (const domain of domains) {
        const tech = domain.technologies.find(t => t.name === techName);
        if (tech) return tech;
    }
    return null;
}

function showPopover(techName, chipEl) {
    const tech = findTech(techName);
    if (!tech) return;

    if (activePopover && activeChip === chipEl) {
        closePopover();
        return;
    }

    closePopover();

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

    const popover = document.createElement('div');
    popover.className = 'skills__popover';
    popover.innerHTML = `
        <h4 class="skills__popover-title">${tech.name}</h4>
        <div class="skills__popover-projects">${projectsHtml}</div>
    `;

    document.body.appendChild(popover);
    positionPopover(popover, chipEl);

    popover.querySelectorAll('.skills__popover-project').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            closePopover();
            const projectId = link.dataset.project;
            const target = document.getElementById(`project-${projectId}`);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.querySelectorAll('.project-card--highlight').forEach(c => c.classList.remove('project-card--highlight'));
                target.classList.add('project-card--highlight');
                setTimeout(() => target.classList.remove('project-card--highlight'), 2000);
            }
        });
    });

    activePopover = popover;
    activeChip = chipEl;
    chipEl.classList.add('skills__chip--active');
    requestAnimationFrame(() => popover.classList.add('skills__popover--visible'));
}

function positionPopover(popover, chipEl) {
    const rect = chipEl.getBoundingClientRect();
    const popWidth = 260;
    const gap = 8;

    let left = rect.left + rect.width / 2 - popWidth / 2;
    let top = rect.top - gap;

    const minLeft = 8;
    const maxLeft = window.innerWidth - popWidth - 8;
    if (left < minLeft) left = minLeft;
    if (left > maxLeft) left = maxLeft;

    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
    popover.style.width = `${popWidth}px`;

    const popRect = popover.getBoundingClientRect();
    if (popRect.top < 8) {
        popover.style.top = `${rect.bottom + gap}px`;
    }
}

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

/* ══════════════════════════════════════════════
   Event Binding
   ══════════════════════════════════════════════ */

function toggleCategory(domainId) {
    const wasExpanded = expandedCategories.has(domainId);
    if (wasExpanded) {
        expandedCategories.delete(domainId);
    } else {
        expandedCategories.add(domainId);
    }
    const isExpanded = expandedCategories.has(domainId);
    const diagram = document.getElementById('skills-diagram');
    if (!diagram) return;

    // Toggle category active state
    const catEl = diagram.querySelector(`.skills__cat[data-domain="${domainId}"]`);
    if (catEl) catEl.classList.toggle('skills__cat--active', isExpanded);

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        // Mobile: toggle dropdown panel instead of radial fan-out
        const dropdown = diagram.querySelector(`.skills__dropdown[data-domain="${domainId}"]`);
        if (dropdown) dropdown.classList.toggle('skills__dropdown--open', isExpanded);
    } else {
        // Desktop: staggered radial fan-out (unchanged)
        const nodes = diagram.querySelectorAll(`.skills__node[data-domain="${domainId}"]`);
        const lines = diagram.querySelectorAll(`.skills__branch-line[data-domain="${domainId}"]`);

        if (isExpanded) {
            nodes.forEach((el, i) => {
                el.style.transitionDelay = `${i * 40}ms`;
                el.classList.add('skills__node--visible');
            });
            lines.forEach((el, i) => {
                el.style.transitionDelay = `${i * 40}ms`;
                el.classList.add('skills__branch-line--visible');
            });
        } else {
            nodes.forEach(el => {
                el.style.transitionDelay = '';
                el.classList.remove('skills__node--visible');
            });
            lines.forEach(el => {
                el.style.transitionDelay = '';
                el.classList.remove('skills__branch-line--visible');
            });
        }
    }
}

function closeAllDropdowns(diagram) {
    diagram.querySelectorAll('.skills__dropdown--open').forEach(dd => {
        dd.classList.remove('skills__dropdown--open');
    });
    expandedCategories.clear();
    diagram.querySelectorAll('.skills__cat--active').forEach(cat => {
        cat.classList.remove('skills__cat--active');
    });
}

function bindEvents(container) {
    const diagram = container.querySelector('#skills-diagram');
    if (diagram) {
        diagram.addEventListener('click', (e) => {
            // Category click — toggle expansion
            const cat = e.target.closest('.skills__cat');
            if (cat) {
                e.stopPropagation();
                toggleCategory(cat.dataset.domain);
                return;
            }

            // Skill chip click — open popover
            const chip = e.target.closest('.skills__chip');
            if (chip) {
                e.stopPropagation();
                showPopover(chip.dataset.tech, chip);
                return;
            }

            // Mobile: tapping on globe/background closes all open dropdowns
            // Only fire if tap is NOT on a category node or an open dropdown
            if (window.innerWidth <= 768) {
                if (!e.target.closest('.skills__cat') && !e.target.closest('.skills__dropdown')) {
                    closeAllDropdowns(diagram);
                }
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (activePopover && !activePopover.contains(e.target) && !e.target.closest('.skills__chip')) {
            closePopover();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePopover();
    });

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
