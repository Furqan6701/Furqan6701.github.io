/**
 * Popout Utility
 *
 * Generic, reusable popout/modal system extracted from the Experience
 * section's pop-out pattern. Accepts any HTML content string.
 *
 * Usage:
 *   import { injectPopout, openPopout, closePopout } from '../utils/popout.js';
 *   injectPopout(containerEl);                          // call once
 *   openPopout(containerEl, htmlString, { onOpen, onClose });  // show content
 *   closePopout();                                      // dismiss
 */

let activePopout = null;

/**
 * Inject the popout shell (backdrop + dialog + close button) into a container.
 * Call this once per section that needs a popout.
 *
 * @param {HTMLElement} container - The parent element to append the shell to
 * @param {Object}      [opts]   - Optional configuration
 * @param {string}      [opts.shellClass]  - Custom class for the shell (default: 'popout-shell')
 * @param {string}      [opts.popoutClass] - Custom class for the dialog (default: 'popout')
 * @param {string}      [opts.label]       - aria-label for the dialog
 */
export function injectPopout(container, opts = {}) {
    const shellClass = opts.shellClass || 'popout-shell';
    const popoutClass = opts.popoutClass || 'popout';
    const label = opts.label || 'Expanded details';

    const shell = document.createElement('div');
    shell.className = shellClass;
    shell.innerHTML = `
        <div class="popout-backdrop" aria-hidden="true"></div>
        <div class="${popoutClass}" role="dialog" aria-modal="true" aria-label="${label}" tabindex="-1">
            <button class="popout-close" aria-label="Close">&times;</button>
            <div class="popout-body"></div>
        </div>
    `;
    container.appendChild(shell);

    shell.querySelector('.popout-backdrop').addEventListener('click', () => closePopout());
    shell.querySelector('.popout-close').addEventListener('click', () => closePopout());
}

/**
 * Open the popout with the given HTML content.
 *
 * @param {HTMLElement} container  - The container that holds the popout shell
 * @param {string}      html       - HTML content to inject into the popout body
 * @param {Object}      [opts]     - Optional callbacks
 * @param {Function}    [opts.onOpen]  - Called after popout is visible
 * @param {Function}    [opts.onClose] - Called after popout is closed
 * @param {string}      [opts.popoutClass] - Selector for the popout element (default: '.popout')
 */
export function openPopout(container, html, opts = {}) {
    if (activePopout) closePopout(true);

    const popoutSelector = opts.popoutClass || '.popout';
    const shell = container.querySelector('.popout-shell');
    if (!shell) return;

    const backdrop = shell.querySelector('.popout-backdrop');
    const popout = shell.querySelector(popoutSelector);
    const body = shell.querySelector('.popout-body');
    if (!backdrop || !popout || !body) return;

    body.innerHTML = html;

    // Animate in
    backdrop.classList.add('visible');
    popout.style.transition = 'none';
    popout.style.transform = 'translate(-50%, -50%) scale(0.92)';
    popout.style.opacity = '0';
    popout.classList.add('visible');

    // Force reflow
    popout.offsetHeight;

    popout.style.transition = 'transform 0.3s ease, opacity 0.25s ease';
    popout.style.transform = 'translate(-50%, -50%) scale(1)';
    popout.style.opacity = '1';

    activePopout = { container, shell, opts };
    requestAnimationFrame(() => popout.focus());

    if (opts.onOpen) opts.onOpen();
}

/**
 * Close the popout. If instant is true, skip animation.
 *
 * @param {boolean} [instant=false] - Close immediately without animation
 */
export function closePopout(instant = false) {
    if (!activePopout) return;

    const { container, shell, opts } = activePopout;
    const backdrop = shell.querySelector('.popout-backdrop');
    const popout = shell.querySelector('.popout');

    if (instant) {
        backdrop.classList.remove('visible');
        popout.classList.remove('visible');
        popout.style.transform = '';
        popout.style.opacity = '';
        popout.style.transition = '';
        activePopout = null;
        if (opts && opts.onClose) opts.onClose();
        return;
    }

    popout.style.transition = 'transform 0.25s ease, opacity 0.2s ease';
    popout.style.transform = 'translate(-50%, -50%) scale(0.92)';
    popout.style.opacity = '0';
    backdrop.classList.remove('visible');

    const cleanup = () => {
        popout.removeEventListener('transitionend', cleanup);
        popout.classList.remove('visible');
        popout.style.transform = '';
        popout.style.opacity = '';
        popout.style.transition = '';
        activePopout = null;
        if (opts && opts.onClose) opts.onClose();
    };
    popout.addEventListener('transitionend', cleanup, { once: true });
    setTimeout(cleanup, 350);
}

/**
 * Check if a popout is currently open.
 * @returns {boolean}
 */
export function isPopoutOpen() {
    return activePopout !== null;
}

/**
 * Set up global Escape key handler. Call once at init time.
 */
export function initPopoutKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activePopout) {
            closePopout();
        }
    });
}
