"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number | null = null;

    function updateProgress() {
      frameId = null;

      const documentHeight = document.documentElement.scrollHeight;
      const scrollableHeight = documentHeight - window.innerHeight;

      const progress =
        scrollableHeight > 0
          ? Math.min(
              1,
              Math.max(0, window.scrollY / scrollableHeight),
            )
          : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    }

    function scheduleUpdate() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    }

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, {
      passive: true,
    });

    window.addEventListener("resize", scheduleUpdate);

    // Recalculate when images or other content change the page height.
    const resizeObserver = new ResizeObserver(scheduleUpdate);

    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      resizeObserver.disconnect();

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0
                 bottom-0 z-20 h-[3px] overflow-hidden"
    >
      <div
        ref={progressRef}
        className="h-full w-full origin-left scale-x-0
                   bg-gradient-to-r from-[#ab4219] to-[#ff4c00]"
      />
    </div>
  );
}