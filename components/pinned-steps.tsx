"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = { title: string; description: string };

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

function getReducedMotionOnServer() {
  return false;
}

export function PinnedSteps({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getReducedMotionOnServer,
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      // The thread. Scrubbed against the same centre line the step states use,
      // so a node ignites exactly as the fill arrives at it — if these two
      // disagree by even a little the whole section reads as sloppy.
      if (fillRef.current && listRef.current) {
        gsap.fromTo(
          fillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top center",
              end: "bottom center",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: containerRef, dependencies: [steps.length] },
  );

  return (
    <div ref={containerRef} className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
      <div className="hidden lg:sticky lg:top-28 lg:block lg:h-fit">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-condensed text-[7rem] leading-none text-white/15">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-white">{steps[activeIndex].title}</h3>
              <p className="mt-3 max-w-sm text-base leading-8 text-white/60">{steps[activeIndex].description}</p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center gap-1.5">
            {steps.map((step, index) => (
              <span
                key={step.title}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                  index <= activeIndex ? "bg-[#c7a97b]" : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div ref={listRef} className="relative flex flex-col">
        {/* The rail replaces the old per-step top borders: one continuous thread
            through the section instead of six separated rows. */}
        <div aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-white/10" />
        <div ref={fillRef} aria-hidden className="absolute bottom-0 left-0 top-0 w-px origin-top bg-[#c7a97b]" />

        {steps.map((step, index) => {
          // Reduced motion freezes activeIndex at 0, which used to leave five of
          // six steps permanently at white/25. Treat every step as reached there
          // so the section stays fully legible without any motion.
          const reached = reducedMotion || index <= activeIndex;
          const current = !reducedMotion && index === activeIndex;
          const done = !reducedMotion && index < activeIndex;

          return (
            <div
              key={step.title}
              ref={(el) => {
                stepRefs.current[index] = el;
              }}
              className="flex flex-col justify-center py-10 pl-8 sm:pl-10 lg:min-h-[60vh]"
            >
              <div className="relative">
                <span
                  aria-hidden
                  className={`absolute -left-8 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 sm:-left-10 ${
                    reached ? "bg-[#c7a97b]" : "bg-white/20"
                  } ${current ? "scale-150 ring-4 ring-[#c7a97b]/20" : "scale-100 ring-0"}`}
                />
                <span
                  className={`text-sm uppercase tracking-[0.3em] transition-colors duration-500 ${
                    reached ? "text-[#c7a97b]" : "text-white/40"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
                </span>
              </div>
              {/* Three tiers, not two: what is ahead, what you are on, and what
                  you have already passed — so the path behind stays readable. */}
              <h3
                className={`mt-4 max-w-md text-3xl font-semibold transition-colors duration-500 sm:text-4xl ${
                  current ? "text-white" : done ? "text-white/70" : reached ? "text-white" : "text-white/30"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`mt-4 max-w-sm text-base leading-8 transition-colors duration-500 ${
                  current ? "text-white/70" : done ? "text-white/45" : reached ? "text-white/70" : "text-white/25"
                }`}
              >
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
