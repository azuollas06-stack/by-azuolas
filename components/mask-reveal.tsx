"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type MaskRevealProps = {
  children: React.ReactNode;
  className?: string;
  panelColor?: string;
  /** Offsets this reveal so a pair reads as a relationship, not one gesture. */
  delay?: number;
  /** Edge the panel collapses toward. Mirror it across a pair to part outward. */
  origin?: "left" | "right";
  /** Counter-drift in px across the scroll range; give a pair opposite signs. */
  drift?: number;
};

export function MaskReveal({
  children,
  className = "",
  panelColor = "#0a0a0a",
  delay = 0,
  origin = "right",
  drift = 0,
}: MaskRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const panel = panelRef.current;
      const content = contentRef.current;
      if (!container || !panel || !content) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        gsap.set(panel, { autoAlpha: 0 });
        return;
      }

      gsap.set(panel, { scaleX: 1 });
      gsap.set(content, { scale: 1.15 });

      const rect = container.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;

      const tl = gsap.timeline(
        alreadyVisible
          ? {}
          : {
              scrollTrigger: {
                trigger: container,
                start: "top 80%",
                once: true,
              },
            },
      );
      // `delay` as a position parameter rather than a timeline option, so it
      // still offsets correctly when the timeline is driven by ScrollTrigger.
      tl.to(panel, { scaleX: 0, transformOrigin: origin, duration: 1, ease: "power4.inOut" }, delay).to(
        content,
        { scale: 1, duration: 1.3, ease: "power3.out" },
        "<",
      );

      if (drift !== 0) {
        gsap.fromTo(
          container,
          { y: drift },
          {
            y: -drift,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: containerRef, dependencies: [delay, origin, drift] },
  );

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      {/* `relative` matters: next/image with `fill` needs a positioned parent.
          Without it these portraits resolved against the outer box by luck and
          Next warned on every render. */}
      <div ref={contentRef} className="relative h-full w-full">
        {children}
      </div>
      <div ref={panelRef} className="absolute inset-0" style={{ background: panelColor }} />
    </div>
  );
}
