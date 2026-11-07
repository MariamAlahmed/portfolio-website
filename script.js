/* ===== Hamburger menu ===== */
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

/* ===== Project carousels (Featured + Additional) ===== */
document.querySelectorAll(".carousel").forEach(function (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const prev = carousel.querySelector(".carousel-prev");
    const next = carousel.querySelector(".carousel-next");

    // How far one click moves: one card + the gap between cards
    function stepSize() {
        const card = track.querySelector(".project-card");
        const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
        return card.getBoundingClientRect().width + gap;
    }

    function atEnd() {
        return track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    }

    function goNext() {
        if (atEnd()) {
            track.scrollTo({ left: 0 });                 // loop back to the first card
        } else {
            track.scrollBy({ left: stepSize() });
        }
    }

    function goPrev() {
        if (track.scrollLeft <= 4) {
            track.scrollTo({ left: track.scrollWidth }); // loop to the last card
        } else {
            track.scrollBy({ left: -stepSize() });
        }
    }

    next.addEventListener("click", goNext);
    prev.addEventListener("click", goPrev);

    // Arrow keys when the strip is focused
    track.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
        if (e.key === "ArrowLeft")  { e.preventDefault(); goPrev(); }
    });

    // Auto-advance: only while visible, paused on hover/touch/focus,
    // and off completely if the visitor prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let paused = false;
    let visible = false;

    carousel.addEventListener("mouseenter", () => (paused = true));
    carousel.addEventListener("mouseleave", () => (paused = false));
    carousel.addEventListener("focusin", () => (paused = true));
    carousel.addEventListener("focusout", () => (paused = false));
    carousel.addEventListener("touchstart", () => (paused = true), { passive: true });
    carousel.addEventListener("touchend", () => setTimeout(() => (paused = false), 4000), { passive: true });

    if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
            visible = entries[0].isIntersecting;
        }, { threshold: 0.4 }).observe(carousel);
    } else {
        visible = true;
    }

    setInterval(function () {
        if (!paused && visible && !document.hidden) goNext();
    }, 3500);
});
