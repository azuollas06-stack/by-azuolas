"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HorizontalScrollGallery({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!isDesktop || prefersReducedMotion) return;

      const scrollLength = track.scrollWidth - window.innerWidth;
      if (scrollLength <= 0) return;

      gsap.to(track, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollLength}`,
          scrub: 0.6,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={`lg:overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-6">
        {children}
      </div>
    </div>
  );
}
