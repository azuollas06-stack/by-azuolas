"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight } from "lucide-react";

import { MagneticLink } from "@/components/magnetic-link";
import { SplitReveal } from "@/components/split-reveal";

gsap.registerPlugin(ScrollTrigger);

export function Hero({ active = true }: { active?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowTwoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion || !sectionRef.current || !contentRef.current) return;

      gsap.to(glowRef.current, {
        xPercent: 6,
        yPercent: -5,
        duration: 12,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(glowTwoRef.current, {
        xPercent: -9,
        yPercent: 6,
        scale: 1.1,
        duration: 15,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      gsap.to(contentRef.current, {
        yPercent: -8,
        opacity: 0.15,
        scale: 0.97,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      if (cueRef.current) {
        gsap.to(cueRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "180 top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef },
  );

  function handleScrollCue() {
    sectionRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100dvh-var(--header-h,81px))] flex-col items-center justify-center overflow-hidden bg-black px-6 pt-12 pb-32 text-center sm:px-10 sm:py-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          ref={glowRef}
          className="absolute left-1/2 top-[26%] h-[62vw] w-[62vw] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(199,169,123,0.14),_transparent_65%)] blur-2xl"
        />
        <div
          ref={glowTwoRef}
          className="absolute bottom-[8%] right-[12%] h-[38vw] w-[38vw] max-h-[360px] max-w-[360px] rounded-full bg-[radial-gradient(circle,_rgba(199,169,123,0.09),_transparent_70%)] blur-3xl"
        />
      </div>

      <div ref={contentRef} className="relative flex flex-col items-center">
        <SplitReveal
          as="p"
          by="lines"
          text="Shopify parduotuvės"
          enabled={active}
          delay={0.1}
          className="text-[11px] uppercase tracking-[0.35em] text-white/40 sm:text-xs"
        />

        <h1 className="mt-5 font-condensed uppercase leading-[0.86] text-white sm:mt-7">
          <SplitReveal
            as="span"
            by="chars"
            text="Mažiau."
            enabled={active}
            delay={0.24}
            className="block text-[clamp(2.75rem,13vw,4.25rem)] sm:text-7xl lg:text-8xl xl:text-[7rem]"
          />
          <SplitReveal
            as="span"
            by="chars"
            text="Bet geriau."
            enabled={active}
            delay={0.36}
            className="block text-[clamp(2.75rem,13vw,4.25rem)] text-[#c7a97b] sm:text-7xl lg:text-8xl xl:text-[7rem]"
          />
        </h1>

        <SplitReveal
          as="p"
          by="lines"
          text="Shopify parduotuvės ir svetainės, kurios parduoda — ne tik gražiai atrodo."
          enabled={active}
          delay={0.58}
          className="mt-6 max-w-xs text-base leading-7 text-white/50 sm:mt-8 sm:max-w-sm sm:text-lg sm:leading-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticLink
            href="/contact"
            variant="solid"
            className="mt-10 min-h-[52px] transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(199,169,123,0.28)] sm:mt-12 sm:min-h-0"
          >
            Pasikalbėkime <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </MagneticLink>
        </motion.div>
      </div>

      <motion.button
        ref={cueRef}
        type="button"
        onClick={handleScrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 1.05 }}
        className="group absolute bottom-8 flex flex-col items-center gap-2 text-white/30 transition-colors duration-300 hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="Slinkti į kitą skiltį"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Slinkite žemyn</span>
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
