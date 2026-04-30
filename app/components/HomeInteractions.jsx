"use client";

import { useEffect } from "react";

export default function HomeInteractions() {
  useEffect(() => {
    const root = document.documentElement;
    const sectionLinks = [...document.querySelectorAll("[data-section-link]")];
    const revealTargets = [...document.querySelectorAll("[data-reveal]")];
    const pageSections = [...document.querySelectorAll("main section[id]")];
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cleanups = [];

    const setReducedMotion = (matches) => {
      root.classList.toggle("reduced-motion", matches);
    };

    setReducedMotion(reducedMotionQuery.matches);

    const onReducedMotionChange = (event) => setReducedMotion(event.matches);
    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", onReducedMotionChange);
      cleanups.push(() => reducedMotionQuery.removeEventListener("change", onReducedMotionChange));
    }

    if (!reducedMotionQuery.matches) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -8% 0px",
        }
      );

      revealTargets.forEach((target) => revealObserver.observe(target));
      cleanups.push(() => revealObserver.disconnect());
    } else {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const currentId = visibleEntry.target.id;
        sectionLinks.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.sectionLink === currentId);
        });
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-20% 0px -45% 0px",
      }
    );

    pageSections.forEach((section) => sectionObserver.observe(section));
    cleanups.push(() => sectionObserver.disconnect());

    const syncScrollProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll", progress.toFixed(4));
    };

    syncScrollProgress();
    window.addEventListener("scroll", syncScrollProgress, { passive: true });
    window.addEventListener("resize", syncScrollProgress);
    cleanups.push(() => {
      window.removeEventListener("scroll", syncScrollProgress);
      window.removeEventListener("resize", syncScrollProgress);
    });

    if (!reducedMotionQuery.matches) {
      const onPointerMove = (event) => {
        const x = `${((event.clientX / window.innerWidth) * 100).toFixed(2)}%`;
        const y = `${((event.clientY / window.innerHeight) * 100).toFixed(2)}%`;
        root.style.setProperty("--pointer-x", x);
        root.style.setProperty("--pointer-y", y);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanups.push(() => window.removeEventListener("pointermove", onPointerMove));
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return null;
}
