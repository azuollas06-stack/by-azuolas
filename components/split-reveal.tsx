"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

type SplitRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  by?: "words" | "lines" | "chars";
  delay?: number;
};

export function SplitReveal({ text, as = "h2", className = "", by = "words", delay = 0 }: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const split = SplitText.create(el, { type: by, aria: "auto" });
      const targets = by === "words" ? split.words : by === "lines" ? split.lines : split.chars;
      if (!targets.length) return;

      const fromVars = by === "chars" ? { opacity: 0, yPercent: 60 } : { yPercent: 110, opacity: 0 };
      gsap.set(targets, fromVars);

      const rect = el.getBoundingClientRect();
      const alreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;

      const animation = {
        yPercent: 0,
        opacity: 1,
        duration: by === "chars" ? 0.5 : 0.9,
        ease: by === "chars" ? "power2.out" : "power4.out",
        stagger: by === "words" ? 0.035 : by === "lines" ? 0.09 : 0.02,
        delay,
      };

      if (alreadyVisible) {
        gsap.to(targets, animation);
      } else {
        gsap.to(targets, {
          ...animation,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      }

      return () => split.revert();
    },
    { scope: ref, dependencies: [text, by, delay] },
  );

  const Tag = as;

  return (
    <Tag ref={ref as never} className={className} style={{ overflow: by === "chars" ? "visible" : "hidden" }}>
      {text}
    </Tag>
  );
}
