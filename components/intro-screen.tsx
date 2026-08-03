"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import { SplitReveal } from "@/components/split-reveal";

export function IntroScreen({ onEnter }: { onEnter: () => void }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowButton(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.01 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[60] overflow-hidden bg-black"
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-[110%] w-full object-cover object-[center_30%]"
          poster="/media/azuolas-sedi.png"
        >
          <source src="/media/intro-hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.15)_0%,_rgba(0,0,0,0.68)_100%)]" />

        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 text-center sm:pb-16">
          <SplitReveal
            as="span"
            by="chars"
            text="BY.AZUOLAS"
            className="block font-['var(--font-condensed)'] text-[clamp(2.5rem,7vw,4.75rem)] uppercase tracking-[0.35em] text-white"
          />

          <motion.button
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 18 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={onEnter}
            className="mx-auto mt-6 flex min-h-[48px] items-center rounded-full border border-white/60 bg-white/10 px-6 py-3.5 text-sm font-medium uppercase tracking-[0.35em] text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/20 active:scale-[0.97] active:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-h-0 sm:py-3"
          >
            ĮEITI
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
