import { ArrowUp } from "lucide-react";

function ScrollToTopFloatingWidget({ isVisible }) {
    const handleScrollToTop = () => {
        // Scrolls to the beginning of the page using the visitor's motion preference.
        // Parameters: None.
        // Returns: undefined.
        // Example return: undefined.

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "instant" : "smooth"
        });
    };

    return (
        <button
            type="button"
            title="Scroll to top"
            aria-label="Scroll to top"
            inert={!isVisible}
            onClick={handleScrollToTop}
            className={`fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 text-white shadow-lg shadow-neutral-950/20 transition-[translate,opacity,background-color] duration-300 hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600 motion-reduce:transition-none sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-[calc(100%+2rem+env(safe-area-inset-bottom))] opacity-0"
            }`}
        >
            <ArrowUp className="size-5" />
        </button>
    );
}

export default ScrollToTopFloatingWidget;
