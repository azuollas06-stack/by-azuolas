"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { IntroScreen } from "@/components/intro-screen";
import { MagneticLink } from "@/components/magnetic-link";
import { RevealSection } from "@/components/reveal-section";
import { SplitReveal } from "@/components/split-reveal";
import { ScrollFadeOut } from "@/components/scroll-fade-out";

const focusPillars = [
  {
    title: "Editorial rhythm",
    text: "Kiekvienas skaidrus blokas turi savo tempą, o ne vienodą ritmą.",
  },
  {
    title: "Cinematic storytelling",
    text: "Dizainas juda lėtai, tiksliai ir su nuotaika, ne tik „užpildydamas ekraną“.",
  },
  {
    title: "Quiet confidence",
    text: "Tuščios erdvės ir aiškus kompozicijos balansas daro įspūdį brandžiau.",
  },
];

const processSteps = [
  {
    title: "1. Strategija",
    text: "Pradėju nuo esminės žinutės — ko norite, ką turėtų jaustis lankytojas ir kodėl tai svarbu.",
  },
  {
    title: "2. Vizualinė kalba",
    text: "Sukuriu originalią atmosferą, kuri atspindi jūsų vertybes ir išskiria jus iš masės.",
  },
  {
    title: "3. Premium execution",
    text: "Detalė, tipografija, erdvė ir judesiai — visa tai derinama į vientisą patirtį.",
  },
];

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const { scrollYProgress } = useScroll();
  const portraitScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.9]);
  const portraitY = useTransform(scrollYProgress, [0, 0.18], [0, 48]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0.92]);
  const glowY = useTransform(scrollYProgress, [0, 0.25], [0, 120]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasEntered && <IntroScreen key="intro" onEnter={() => setHasEntered(true)} />}
      </AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: hasEntered ? 1 : 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        {!hasEntered ? null : (
          <SiteShell>
            <section className="relative isolate overflow-hidden border-b border-white/10 bg-black">
              <motion.div
                aria-hidden
                style={{ y: glowY }}
                className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,_rgba(199,169,123,0.08),_transparent_45%)]"
              />
              <motion.div className="mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-between px-6 py-16 lg:px-10 lg:py-20">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-6 text-[11px] uppercase tracking-[0.35em] text-white/50"
                >
                  <span>BY.AZUOLAS</span>
                  <span>Digital direction / Shopify / Web</span>
                </motion.div>

                <div className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:py-12">
                  <ScrollFadeOut className="max-w-4xl space-y-8">
                    <motion.p
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
                      className="text-sm uppercase tracking-[0.35em] text-white/50"
                    >
                      Premium digital experiences
                    </motion.p>

                    <SplitReveal
                      as="h1"
                      by="words"
                      text="Skaitmeninė patirtis, kuri lieka atmintyje."
                      className="font-['var(--font-condensed)'] text-[clamp(3.4rem,8vw,8.5rem)] uppercase leading-[0.86] tracking-[0.005em] text-white"
                    />

                    <motion.p
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.65, delay: 0.45, ease: "easeOut" }}
                      className="max-w-2xl text-lg leading-8 text-white/50"
                    >
                      Kuriu skaitmeninę patirtį, kuri atrodo ramiai, kalba aiškiai ir palieka ilgalaikį įspūdį.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.65, delay: 0.55, ease: "easeOut" }}
                      className="flex flex-wrap items-center gap-5"
                    >
                      <MagneticLink href="/contact" variant="solid">
                        Pasikalbėkime <ArrowRight className="h-4 w-4" />
                      </MagneticLink>
                      <span className="flex items-center gap-2 text-sm text-white/50">
                        <Sparkles className="h-4 w-4" />
                        Shopify • Web • Brand systems
                      </span>
                    </motion.div>
                  </ScrollFadeOut>

                  <div className="relative flex justify-end lg:justify-start">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
                      style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
                      className="w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-3 shadow-[0_30px_100px_-30px_rgba(0,0,0,0.9)]"
                    >
                      <div className="relative overflow-hidden rounded-[1.4rem]">
                        <Image
                          src="/media/azuolas-sedi.png"
                          alt="BY.AZUOLAS"
                          width={1200}
                          height={1400}
                          priority
                          className="h-[440px] w-full object-cover sm:h-[520px]"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.1)_0%,_rgba(0,0,0,0.35)_100%)]" />
                        <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white/80 backdrop-blur">
                          Ąžuolas
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
                  className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50"
                >
                  <span>Slinkite žemyn.</span>
                  <span className="text-white/50">01 / 03</span>
                </motion.div>
              </motion.div>
            </section>

            <RevealSection className="border-b border-white/10 bg-black px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
              <div className="mx-auto max-w-5xl">
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Požiūris</p>
                <SplitReveal
                  as="p"
                  by="lines"
                  text="Nekuriu tik svetainių. Kuriu jausmą, kuris lieka po susitikimo."
                  className="mt-6 font-['var(--font-display)'] text-3xl italic leading-snug text-white/90 sm:text-4xl lg:text-5xl"
                />
                <p className="mt-6 max-w-xl text-base leading-8 text-white/50">
                  Kiekvienas projektas pradėtas nuo žinutės, kuri turi būti aiški, patraukli ir tikra. Tada pridedu vizualinį ritmą, kurio neužgožia perteklius.
                </p>

                <div className="mt-14 grid gap-4 sm:grid-cols-3">
                  {focusPillars.map((pillar, index) => (
                    <motion.div
                      key={pillar.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
                      className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-6"
                    >
                      <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">{String(index + 1).padStart(2, "0")}</p>
                      <h3 className="mt-3 text-lg font-semibold text-white">{pillar.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/50">{pillar.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealSection>

            <RevealSection className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 lg:p-10">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-2xl">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">Kaip dirbu</p>
                    <h2 className="mt-3 font-['var(--font-display)'] text-3xl leading-tight text-white sm:text-4xl">
                      Kiekvienas žingsnis turi savo ritmą — nuo idėjos iki galutinio poveikio.
                    </h2>
                  </div>
                  <MagneticLink href="/contact" variant="ghost-dark">
                    Pradėkime <ArrowRight className="h-4 w-4" />
                  </MagneticLink>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: 0.08 * index, ease: "easeOut" }}
                      className="rounded-[1.6rem] border border-white/10 bg-black/40 p-6"
                    >
                      <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-white/50">{step.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealSection>
          </SiteShell>
        )}
      </motion.div>
    </>
  );
}
