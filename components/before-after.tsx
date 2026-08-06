"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type BeforeAfterProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
};

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
}: BeforeAfterProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const afterRef = useRef<HTMLDivElement>(null);
  const beforeTagRef = useRef<HTMLSpanElement>(null);
  const afterTagRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // No motion: show the finished site outright rather than a half-dissolved
      // frame, and let both labels read as static captions.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(afterRef.current, { opacity: 1 });
        gsap.set(progressRef.current, { scaleX: 1 });
        gsap.set(beforeTagRef.current, { opacity: 0.35 });
        gsap.set(afterTagRef.current, { opacity: 1 });
        return;
      }

      // Set the start state here rather than with a Tailwind class: `scale-x-0`
      // compiles to the CSS `scale` property, which would pin the bar at zero
      // no matter what GSAP writes to `transform`.
      gsap.set(progressRef.current, { scaleX: 0 });

      // A dissolve rather than a positional wipe: the two layouts share no
      // structure, so sliding between them would compare nothing. The range is
      // deliberately wide — the frame is short on mobile, and a tighter one
      // finished the whole transition inside ~300px of scroll.
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: frameRef.current,
          start: "top 88%",
          end: "bottom 35%",
          scrub: 0.6,
        },
      });

      timeline
        .to(afterRef.current, { opacity: 1, ease: "none" }, 0)
        .to(progressRef.current, { scaleX: 1, ease: "none" }, 0)
        .to(beforeTagRef.current, { opacity: 0.3, ease: "none" }, 0)
        .to(afterTagRef.current, { opacity: 1, ease: "none" }, 0);
    },
    { scope: frameRef },
  );

  return (
    <div>
      <div
        ref={frameRef}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-[1.5rem]"
      >
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          width={1600}
          height={785}
          quality={82}
          sizes="(min-width: 1024px) 900px, 100vw"
          className="w-full"
        />
        <div ref={afterRef} className="absolute inset-0 opacity-0">
          <Image
            src={afterSrc}
            alt={afterAlt}
            width={1600}
            height={785}
            quality={82}
            sizes="(min-width: 1024px) 900px, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <span
          ref={beforeTagRef}
          className="shrink-0 text-[11px] uppercase tracking-[0.3em] text-white/60"
        >
          {beforeLabel}
        </span>
        <div className="relative h-px flex-1 bg-white/10">
          <div ref={progressRef} className="absolute inset-0 origin-left bg-[#c7a97b]" />
        </div>
        <span
          ref={afterTagRef}
          className="shrink-0 text-[11px] uppercase tracking-[0.3em] text-[#c7a97b] opacity-30"
        >
          {afterLabel}
        </span>
      </div>
    </div>
  );
}
