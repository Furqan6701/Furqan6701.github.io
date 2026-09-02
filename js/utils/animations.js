/**
 * Animation Utilities
 *
 * Scroll-triggered fade-in animations using IntersectionObserver.
 * Lightweight, performant, and respects prefers-reduced-motion.
 */

/**
 * Initialize scroll-triggered animations.
 * Adds .fade-in class to elements with [data-animate] attribute.
 */
export function initAnimations() {
    // Respect user preference for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const animatedElements = document.querySelectorAll('[data-animate]');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in--visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
        }
    );

    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Add animation CSS to the document head (injected once).
 * This keeps animation styles out of the main CSS bundle
 * and only loads them when JS is available.
 */
export function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        [data-animate] {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        [data-animate].fade-in--visible {
            opacity: 1;
            transform: translateY(0);
        }

        [data-animate="fade-left"] {
            transform: translateX(-20px);
        }

        [data-animate="fade-left"].fade-in--visible {
            transform: translateX(0);
        }

        [data-animate="fade-right"] {
            transform: translateX(20px);
        }

        [data-animate="fade-right"].fade-in--visible {
            transform: translateX(0);
        }

        [data-animate="scale"] {
            transform: scale(0.95);
        }

        [data-animate="scale"].fade-in--visible {
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
}
