"use client";

import { useEffect } from "react";

/**
 * All scroll/pointer motion for the page in one place, driven by a single rAF loop
 * that sleeps when nothing is moving:
 * - [data-r] elements fade up once they enter the viewport;
 * - .reel grows from inset to full width as the hero scrolls away (--g 0→1);
 * - on fine pointers, a small dot follows the cursor and becomes an "Atidaryti"
 *   label over anything marked [data-cursor].
 */
export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // reveal
    const els = document.querySelectorAll<HTMLElement>("[data-r]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((e) => io.observe(e));

    // cursor state (used by the scroll handler too)
    const fine = window.matchMedia("(pointer: fine)").matches;
    const cur = document.querySelector<HTMLElement>(".cursor");
    let cx = -100, cy = -100, tx = -100, ty = -100, moving = 0;

    // reel growth
    const reel = document.querySelector<HTMLElement>(".reel");
    let raf = 0;
    const onScroll = () => {
      // The page moved under a still pointer: re-check what is under it.
      if (cur && tx > 0) {
        const t = document.elementFromPoint(tx, ty)?.closest("[data-cursor]");
        cur.classList.toggle("on", !!t);
      }
      if (raf || !reel) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = reel.getBoundingClientRect();
        const vh = window.innerHeight;
        const g = reduce ? 1 : Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.9)));
        reel.style.setProperty("--g", g.toFixed(3));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // cursor
    const loop = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      if (cur) cur.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`;
      moving = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!cur) return;
      const t = (e.target as Element | null)?.closest?.("[data-cursor]");
      cur.classList.toggle("on", !!t);
      cur.classList.add("vis");
      if (!moving) moving = requestAnimationFrame(loop);
    };
    const leave = () => cur?.classList.remove("vis");
    if (fine && cur && !reduce) {
      document.documentElement.classList.add("has-cursor");
      window.addEventListener("pointermove", move, { passive: true });
      document.addEventListener("pointerleave", leave);
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(moving);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <span>Atidaryti</span>
    </div>
  );
}
