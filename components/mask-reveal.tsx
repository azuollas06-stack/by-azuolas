"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MaskReveal({
  children,
  className = "",
  panelColor = "#0a0a0a",
}: {
  children: React.ReactNode;
  className?: string;
  panelColor?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!container || !panel || !content) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      gsap.set(panel, { autoAlpha: 0 });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
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
    tl.to(panel, { scaleX: 0, transformOrigin: "right", duration: 1, ease: "power4.inOut" }).to(
      content,
      { scale: 1, duration: 1.3, ease: "power3.out" },
      "<",
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={contentRef} className="h-full w-full">
        {children}
      </div>
      <div ref={panelRef} className="absolute inset-0" style={{ background: panelColor }} />
    </div>
  );
}
