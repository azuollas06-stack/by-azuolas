"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollFadeOut({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top 15%",
        end: "bottom -10%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const opacity = progress < 0.6 ? 1 : gsap.utils.mapRange(0.6, 1, 1, 0, progress);
          gsap.set(el, {
            opacity: Math.max(0, opacity),
            filter: `blur(${Math.max(0, progress - 0.6) * 12}px)`,
            y: Math.max(0, progress - 0.6) * -40,
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
