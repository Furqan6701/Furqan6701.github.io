/**
 * Main Entry Point
 *
 * Orchestrates the initialization of all components and utilities.
 * This is the only script loaded directly from index.html (as type="module").
 *
 * Initialization order:
 * 1. Inject animation styles (must come before components render)
 * 2. Initialize components (each fetches its own HTML template)
 * 3. Initialize navigation (requires rendered sections)
 * 4. Initialize animations (requires rendered DOM elements)
 */

import { initNavbar } from './components/navbar.js';
import { initHero } from './components/hero.js';
import { initSkills } from './components/skills.js';
import { initProjects } from './components/projects.js';
import { initExperience } from './components/experience.js';
import { initResearch } from './components/research.js';
import { initContact } from './components/contact.js';
import { initFooter } from './components/footer.js';

import { initNavigation } from './utils/navigation.js';
import { initAnimations, injectAnimationStyles } from './utils/animations.js';

/**
 * Initialize all components and utilities.
 * Components load in parallel; navigation and animations
 * run after the DOM is populated.
 */
async function init() {
    // 1. Inject animation styles early
    injectAnimationStyles();

    // 2. Initialize all section components in parallel.
    //    Promise.allSettled ensures one failed component does not
    //    prevent other components or post-render utilities from loading.
    const results = await Promise.allSettled([
        initNavbar(),
        initHero(),
        initSkills(),
        initProjects(),
        initExperience(),
        initResearch(),
        initContact(),
        initFooter(),
    ]);

    // Log any components that failed to initialize
    const componentNames = [
        'Navbar', 'Hero', 'Skills', 'Projects',
        'Experience', 'Research', 'Contact', 'Footer',
    ];
    results.forEach((result, i) => {
        if (result.status === 'rejected') {
            console.error(
                `Failed to load ${componentNames[i]} section:`,
                result.reason
            );
        }
    });

    // 3. Post-render: set up navigation and animations
    //    These depend on the DOM being fully populated.
    initNavigation();
    initAnimations();
}

// Boot when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
