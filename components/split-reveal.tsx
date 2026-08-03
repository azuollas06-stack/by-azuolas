"use client";

import { useEffect, useRef } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SplitRevealProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  by?: "words" | "lines" | "chars";
};

export function SplitReveal({ text, as = "h2", className = "", by = "words" }: SplitRevealProps) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const typeMap = { words: "words", lines: "lines", chars: "chars" } as const;
    const split = new SplitType(el, { types: typeMap[by] });
    const targets = by === "words" ? split.words : by === "lines" ? split.lines : split.chars;
    if (!targets) return;

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
    };

    const tween = alreadyVisible
      ? gsap.to(targets, animation)
      : gsap.to(targets, {
          ...animation,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [text, by]);

  const Tag = as;

  return (
    <Tag ref={ref as never} className={className} style={{ overflow: by === "chars" ? "visible" : "hidden" }}>
      {text}
    </Tag>
  );
}
