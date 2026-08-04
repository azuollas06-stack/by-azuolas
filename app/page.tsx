"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SiteShell } from "@/components/site-shell";
import { IntroScreen } from "@/components/intro-screen";
import { Hero } from "@/components/hero";
import { MagneticLink } from "@/components/magnetic-link";
import { RevealSection } from "@/components/reveal-section";
import { SplitReveal } from "@/components/split-reveal";
import { MaskReveal } from "@/components/mask-reveal";
import { PinnedSteps } from "@/components/pinned-steps";

const processSteps = [
  { title: "Tyrimas", description: "Peržiūriu jūsų verslą, konkurentus ir tai, kaip šiuo metu parduodate." },
  { title: "Strategija", description: "Nusprendžiame, kokios parduotuvės ar svetainės jums iš tikrųjų reikia." },
  { title: "Dizainas", description: "Piešiu kiekvieną ekraną taip, kad jis vestų prie pirkimo, ne tik atrodytų gražiai." },
  { title: "Kūrimas", description: "Sukuriu Shopify parduotuvę arba svetainę, kuri veikia greitai ir be klaidų." },
  { title: "Testavimas", description: "Tikrinu krepšelį, apmokėjimą ir greitį telefone — ten dažniausiai prarandami pirkėjai." },
  { title: "Paleidimas ir palaikymas", description: "Paleidžiame kartu, ir lieku šalia, kai reikia ką nors pakoreguoti." },
];

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = hasEntered ? "" : "hidden";
    if (hasEntered) {
      // The page laid out behind the overlay with scrolling locked, so every
      // scroll-driven trigger needs remeasuring against the real scroll height.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [hasEntered]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!hasEntered && <IntroScreen key="intro" onEnter={() => setHasEntered(true)} />}
      </AnimatePresence>

      {/* Rendered from the first paint so crawlers and screen readers reach the
          content; `inert` keeps focus and assistive tech inside the intro until entry. */}
      <div inert={!hasEntered}>
        <SiteShell>
          <Hero active={hasEntered} />

          <div className="flex items-center gap-5 border-y border-white/10 bg-black px-6 py-7 sm:px-10 sm:py-9">
            <span className="font-condensed text-3xl text-white/15 sm:text-4xl">02</span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px flex-1 origin-left bg-white/10"
            />
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
                text="Kuriu Shopify parduotuves, kurios parduoda."
                className="font-display text-3xl italic leading-[1.15] text-white sm:text-5xl sm:leading-[1.08] lg:text-6xl"
              />
              <p className="mt-6 max-w-xl text-base leading-7 text-white/50 sm:mt-8 sm:text-lg sm:leading-8">
                Daugiausia dirbu su Shopify parduotuvėmis — nuo pirmo eskizo iki paleidimo. Kuriu ir prekės ženklo identitetą bei pilną svetainės atnaujinimą, kai verslui reikia daugiau nei naujo puslapio.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6">
                <MaskReveal className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10" panelColor="#0a0a0a">
                  <Image
                    src="/media/azuolas-sedi.png"
                    alt="BY.AZUOLAS"
                    fill
                    quality={90}
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
                    quality={90}
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
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-px flex-1 origin-left bg-white/10"
            />
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
                text="Šeši žingsniai nuo pirmo pokalbio iki paleidimo."
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
      </div>
    </>
  );
}
