"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Step = { title: string; description: string };

export function PinnedSteps({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

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

      <div className="flex flex-col">
        {steps.map((step, index) => (
          <div
            key={step.title}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className="flex flex-col justify-center border-t border-white/10 py-10 first:border-t-0 lg:min-h-[60vh]"
          >
            <span className={`text-sm uppercase tracking-[0.3em] transition-colors duration-500 ${index === activeIndex ? "text-[#c7a97b]" : "text-white/50"}`}>
              {String(index + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </span>
            <h3 className={`mt-4 max-w-md text-3xl font-semibold transition-colors duration-500 sm:text-4xl ${index === activeIndex ? "text-white" : "text-white/30"}`}>
              {step.title}
            </h3>
            <p className={`mt-4 max-w-sm text-base leading-8 transition-colors duration-500 ${index === activeIndex ? "text-white/70" : "text-white/25"}`}>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
