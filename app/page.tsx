"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { IntroScreen } from "@/components/intro-screen";
import { MagneticLink } from "@/components/magnetic-link";
import { RevealSection } from "@/components/reveal-section";
import { SplitReveal } from "@/components/split-reveal";
import { MaskReveal } from "@/components/mask-reveal";
import { PinnedSteps } from "@/components/pinned-steps";

const processSteps = [
  { title: "Tyrimas", description: "Suprantu jūsų tikslus, auditoriją ir verslo kontekstą." },
  { title: "Strategija", description: "Sukuriu aiškią komunikacijos ir dizaino kryptį." },
  { title: "Dizainas", description: "Formuoju vizualinį ir patirties modelį su dėmesiu detalėms." },
  { title: "Kūrimas", description: "Įgyvendinu projektą moderniu, aukštos kokybės tech sprendimu." },
  { title: "Testavimas", description: "Tikriname, ar projektas veikia intuityviai ir efektyviai." },
  { title: "Paleidimas ir palaikymas", description: "Padedu projektą paleisti ir toliau prižiūrėti jo kokybę." },
];

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasEntered && <IntroScreen key="intro" onEnter={() => setHasEntered(true)} />}
      </AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: hasEntered ? 1 : 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
        {!hasEntered ? null : (
          <SiteShell>
            <section className="relative flex min-h-[calc(100dvh-81px)] flex-col items-center justify-center overflow-hidden bg-black px-6 py-24 text-center sm:px-10 md:min-h-[calc(100dvh-61px)]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,_rgba(199,169,123,0.09),_transparent_55%)]"
              />

              <p className="relative text-[11px] uppercase tracking-[0.35em] text-white/40 sm:text-xs">Premium digital studio</p>

              <h1 className="relative mt-6 font-condensed uppercase leading-[0.88] text-white sm:mt-8">
                <span className="block text-[clamp(2.75rem,13vw,4.25rem)] sm:text-7xl lg:text-8xl">Mažiau.</span>
                <span className="block text-[clamp(2.75rem,13vw,4.25rem)] text-[#c7a97b] sm:text-7xl lg:text-8xl">Bet geriau.</span>
              </h1>

              <p className="relative mt-7 max-w-xs text-base leading-7 text-white/50 sm:mt-9 sm:max-w-sm sm:text-lg sm:leading-8">
                Premium skaitmeninis dizainas verslams, kurie nenori dar vieno šablono.
              </p>

              <MagneticLink href="/contact" variant="solid" className="relative mt-9 min-h-[52px] sm:mt-11 sm:min-h-0">
                Pasikalbėkime <ArrowRight className="h-4 w-4" />
              </MagneticLink>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 flex flex-col items-center gap-2 text-white/30"
              >
                <span className="text-[10px] uppercase tracking-[0.3em]">Slinkite žemyn</span>
                <ArrowDown className="h-4 w-4" />
              </motion.div>
            </section>

            <div className="flex items-center gap-5 border-y border-white/10 bg-black px-6 py-7 sm:px-10 sm:py-9">
              <span className="font-condensed text-3xl text-white/15 sm:text-4xl">02</span>
              <div className="h-px flex-1 bg-white/10" />
              <SplitReveal
                as="span"
                by="chars"
                text="Apie mane"
                className="text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm"
              />
            </div>

            <section className="bg-black px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
              <div className="mx-auto max-w-5xl">
                <SplitReveal
                  as="h2"
                  by="lines"
                  text="Kuriu tai, kas atrodo ir jaučiasi premium."
                  className="font-display text-3xl italic leading-[1.15] text-white sm:text-5xl sm:leading-[1.08] lg:text-6xl"
                />
                <p className="mt-6 max-w-xl text-base leading-7 text-white/50 sm:mt-8 sm:text-lg sm:leading-8">
                  Aš padedu verslams sukurti skaitmeninį brandą, kuris atrodo patikimai, kalba aiškiai ir užfiksuoja dėmesį. Ne tik svetainių kūrimas — tai galimybė padaryti jūsų verslą matomą, vertinamą ir lengviau pasirenkamą.
                </p>

                <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6">
                  <MaskReveal className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10" panelColor="#0a0a0a">
                    <Image
                      src="/media/azuolas-sedi.png"
                      alt="BY.AZUOLAS"
                      fill
                      sizes="(min-width: 640px) 320px, 45vw"
                      className="object-cover object-[center_18%]"
                    />
                  </MaskReveal>
                  <MaskReveal
                    className="relative mt-6 aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 sm:mt-10"
                    panelColor="#c7a97b"
                  >
                    <Image
                      src="/media/azuolas-prie-stalo.png"
                      alt="BY.AZUOLAS dirba prie nešiojamo kompiuterio"
                      fill
                      sizes="(min-width: 640px) 320px, 45vw"
                      className="object-cover"
                    />
                  </MaskReveal>
                </div>

                <blockquote className="mt-10 border-l-2 border-[#c7a97b] pl-5 sm:mt-14 sm:pl-6">
                  <SplitReveal
                    as="p"
                    by="lines"
                    text="Jei reikia dirbti iki 6 ryto, kad galėčiau didžiuotis rezultatu — aš tai padarysiu."
                    className="font-display text-xl italic leading-tight text-white sm:text-2xl"
                  />
                </blockquote>
              </div>
            </section>

            <div className="flex items-center gap-5 border-y border-white/10 bg-black px-6 py-7 sm:px-10 sm:py-9">
              <span className="font-condensed text-3xl text-white/15 sm:text-4xl">03</span>
              <div className="h-px flex-1 bg-white/10" />
              <SplitReveal
                as="span"
                by="chars"
                text="Kaip dirbu"
                className="text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm"
              />
            </div>

            <section className="bg-black px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
              <div className="mx-auto max-w-7xl">
                <SplitReveal
                  as="h2"
                  by="words"
                  text="Kiekvienas žingsnis yra apgalvotas ir nuoseklus."
                  className="font-condensed text-[clamp(2rem,9vw,2.6rem)] uppercase leading-[1] text-white sm:text-[clamp(2.6rem,6vw,5rem)] sm:leading-[0.92]"
                />
                <div className="mt-10 sm:mt-14">
                  <PinnedSteps steps={processSteps} />
                </div>
              </div>
            </section>

            <RevealSection className="border-t border-white/10 bg-black px-6 py-16 text-center sm:px-10 sm:py-24">
              <p className="mx-auto max-w-md font-display text-2xl italic leading-snug text-white sm:text-3xl">
                Kurkime kažką, kuo didžiuositės.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
                <MagneticLink href="/contact" variant="solid" className="min-h-[52px] sm:min-h-0">
                  Susisiekti <ArrowRight className="h-4 w-4" />
                </MagneticLink>
                <MagneticLink href="/portfolio" variant="ghost-dark">
                  Žiūrėti portfelį <ArrowRight className="h-4 w-4" />
                </MagneticLink>
              </div>
            </RevealSection>
          </SiteShell>
        )}
      </motion.div>
    </>
  );
}
