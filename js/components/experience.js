/**
 * Experience Component
 *
 * Renders the combined education + experience timeline.
 * Cards are collapsed by default; clicking pops out a centered overlay.
 * Entries alternate above/below the horizontal line.
 * Falls back to inline expand on mobile.
 */

import { journey } from '../data/experience.js';
import { injectPopout, openPopout, closePopout, initPopoutKeyboard, isPopoutOpen } from '../utils/popout.js';

/** Logo images for card icon areas */
const LOGOS = {
    education: '<img src="assets/images/logos/nust_logo.png" alt="NUST" />',
    work: '<img src="assets/images/logos/tmv_logo.jpg" alt="The Map Ventures" />',
};

/** Marker icons for timeline nodes */
const MARKERS = {
    education: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>`,
    work: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`,
};

/* ──────────────────────────────────────────────
   Rendering
   ────────────────────────────────────────────── */

/**
 * Build the HTML for a single timeline entry's expandable details.
 */
function buildEntryDetails(entry) {
    const parts = [];

    if (entry.description) {
        parts.push(`<p class="popout-experience__desc">${entry.description}</p>`);
    }

    if (entry.gpa) {
        parts.push(`<p class="popout-experience__gpa">CGPA: ${entry.gpa}</p>`);
    }

    if (entry.courses && entry.courses.length) {
        parts.push(`<div class="popout-experience__courses"><span class="popout-experience__courses-label">Relevant Coursework</span><div class="popout-experience__tags">${entry.courses.map(c => `<span class="tag">${c}</span>`).join('')}</div></div>`);
    }

    if (entry.upcomingCoursework && entry.upcomingCoursework.length) {
        parts.push(
            `<div class="popout-experience__courses popout-experience__courses--upcoming">` +
            `<span class="popout-experience__courses-label">Coursework Completing by June 6, 2027</span>` +
            `<div class="popout-experience__tags">${entry.upcomingCoursework.map(c => `<span class="tag tag--upcoming">${c}</span>`).join('')}</div></div>`
        );
    }

    if (entry.highlights && entry.highlights.length) {
        parts.push(`<ul class="popout-experience__bullets">${entry.highlights.map(b => `<li>${b}</li>`).join('')}</ul>`);
    }

    if (entry.technologies && entry.technologies.length) {
        parts.push(`<div class="popout-experience__tags">${entry.technologies.map(t => `<span class="tag">${t}</span>`).join('')}</div>`);
    }
    return parts.join('');
}

/**
 * Render the full timeline into the container.
 */
function renderTimeline(container) {
    const timeline = container.querySelector('.timeline');
    if (!timeline) return;

    // Render items
    journey.forEach((entry, i) => {
        const item = document.createElement('div');
        item.className = 'timeline__item';
        item.style.setProperty('--i', i);

        const isEdu = entry.type === 'education';
        const isAbove = i % 2 === 0;
        if (isAbove) item.classList.add('timeline__item--above');

        const markerSvg = isEdu ? MARKERS.education : MARKERS.work;
        const logoHtml = isEdu ? LOGOS.education : LOGOS.work;
        const orgName = isEdu ? entry.institution : entry.company;
        const badge = isEdu ? 'EDUCATION' : 'EXPERIENCE';

        item.innerHTML = `
            <div class="timeline__marker">${markerSvg}</div>
            <div class="timeline__card" data-entry-id="${entry.id}" tabindex="0" role="button" aria-expanded="false">
                <div class="timeline__card-top">
                    <div class="timeline__icon">${logoHtml}</div>
                    <div class="timeline__card-info">
                        <span class="timeline__org">${orgName}</span>
                        <span class="timeline__badge">${badge}</span>
                    </div>
                </div>
                <div class="timeline__card-divider"></div>
                <h3 class="timeline__role">${entry.role}</h3>
                <span class="timeline__card-date">${entry.startDate} — ${entry.endDate}</span>
                <span class="timeline__expand-icon" aria-hidden="true">▸</span>
                <div class="timeline__details">
                    ${buildEntryDetails(entry)}
                </div>
            </div>
        `;

        timeline.appendChild(item);
    });

    // Position the horizontal line
    positionLine(timeline);
}

/**
 * Position the horizontal connector line using actual marker positions.
 */
function positionLine(timeline) {
    if (window.innerWidth <= 768) return;

    const markers = timeline.querySelectorAll('.timeline__marker');
    if (markers.length < 2) return;

    const timelineRect = timeline.getBoundingClientRect();
    const firstMarker = markers[0].getBoundingClientRect();
    const lastMarker = markers[markers.length - 1].getBoundingClientRect();

    const lineLeft = firstMarker.left + firstMarker.width / 2 - timelineRect.left;
    const lineRight = lastMarker.left + lastMarker.width / 2 - timelineRect.left;

    timeline.style.setProperty('--line-left', `${lineLeft}px`);
    timeline.style.setProperty('--line-width', `${lineRight - lineLeft}px`);
}

/* ──────────────────────────────────────────────
   Pop-out content builder (experience-specific)
   ────────────────────────────────────────────── */

function buildExperiencePopout(entry) {
    const isEdu = entry.type === 'education';
    const orgName = isEdu ? entry.institution : entry.company;
    const badge = isEdu ? 'EDUCATION' : 'EXPERIENCE';
    const logoHtml = isEdu ? LOGOS.education : LOGOS.work;

    return `
        <div class="popout-experience">
            <div class="popout-experience__header">
                <div class="popout-experience__icon" aria-hidden="true">${logoHtml}</div>
                <div>
                    <span class="popout-experience__org">${orgName}</span>
                    <span class="timeline__badge">${badge}</span>
                </div>
            </div>
            <div class="popout-experience__divider"></div>
            <h3 class="popout-experience__role">${entry.role}</h3>
            <span class="popout-experience__date">${entry.startDate} — ${entry.endDate}</span>
            <div class="popout-experience__divider"></div>
            <div class="popout-experience__content">${buildEntryDetails(entry)}</div>
        </div>
    `;
}

/* ──────────────────────────────────────────────
   Event wiring
   ────────────────────────────────────────────── */

function setupCardInteractions(container) {
    const timeline = container.querySelector('.timeline');
    if (!timeline) return;

    timeline.addEventListener('click', (e) => {
        const card = e.target.closest('.timeline__card');
        if (!card) return;

        // Close any other open popout first
        if (isPopoutOpen()) {
            closePopout(true);
        }

        // Mobile: inline expand
        if (window.innerWidth <= 768) {
            const item = card.closest('.timeline__item');
            if (!item) return;
            timeline.querySelectorAll('.timeline__item--expanded').forEach(el => {
                if (el !== item) el.classList.remove('timeline__item--expanded');
            });
            item.classList.toggle('timeline__item--expanded');
            card.setAttribute('aria-expanded', String(item.classList.contains('timeline__item--expanded')));
            return;
        }

        // Desktop: open popout
        const entryId = card.dataset.entryId;
        const entry = journey.find(e => e.id === entryId);
        if (!entry) return;

        card.classList.add('timeline__card--active');
        openPopout(container, buildExperiencePopout(entry), {
            popoutClass: '.popout',
            onClose: () => card.classList.remove('timeline__card--active'),
        });
    });

    timeline.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const card = e.target.closest('.timeline__card');
            if (!card) return;
            e.preventDefault();
            card.click();
        }
    });
}

/* ──────────────────────────────────────────────
   Initialization
   ────────────────────────────────────────────── */

export async function initExperience() {
    const container = document.getElementById('experience-container');
    if (!container) return;

    try {
        const response = await fetch('sections/experience.html');
        if (!response.ok) throw new Error('Failed to load experience template');
        const templateHtml = await response.text();
        container.innerHTML = templateHtml;

        renderTimeline(container);
        injectPopout(container, { label: 'Experience details' });
        initPopoutKeyboard();
        setupCardInteractions(container);

        // Reposition line on resize
        let resizeRaf = null;
        window.addEventListener('resize', () => {
            if (resizeRaf) cancelAnimationFrame(resizeRaf);
            resizeRaf = requestAnimationFrame(() => {
                const timeline = container.querySelector('.timeline');
                if (timeline) positionLine(timeline);
            });
        });
    } catch (error) {
        console.error('Experience initialization failed:', error);
        container.innerHTML = '<section class="section"><div class="container"><p>Experience section unavailable.</p></div></section>';
    }
}
