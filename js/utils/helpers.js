/**
 * Helper Utilities
 *
 * Small, reusable utility functions used across the project.
 */

/**
 * Debounce a function call.
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(fn, delay = 200) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
 * Throttle a function call.
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Minimum interval in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(fn, limit = 100) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            fn.apply(this, args);
            inThrottle = true;
            setTimeout(() => { inThrottle = false; }, limit);
        }
    };
}

/**
 * Safely query a DOM element.
 * @param {string} selector - CSS selector
 * @param {Element} [parent=document] - Parent element
 * @returns {Element|null}
 */
export function $(selector, parent = document) {
    return parent.querySelector(selector);
}

/**
 * Safely query all matching DOM elements.
 * @param {string} selector - CSS selector
 * @param {Element} [parent=document] - Parent element
 * @returns {Element[]}
 */
export function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}

/**
 * Create an HTML element from a template string.
 * @param {string} html - HTML string
 * @returns {Element}
 */
export function createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
}

/**
 * Format a date range string.
 * @param {string} start - Start date string
 * @param {string} end - End date string (or 'Present')
 * @returns {string}
 */
export function formatDateRange(start, end) {
    return `${start} — ${end}`;
}
