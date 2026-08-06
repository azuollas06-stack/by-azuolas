"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SiteShell } from "@/components/site-shell";
import { IntroScreen } from "@/components/intro-screen";
import { Hero } from "@/components/hero";
import { MagneticLink } from "@/components/magnetic-link";
import { RevealSection } from "@/components/reveal-section";
import { SplitReveal } from "@/components/split-reveal";
import { MaskReveal } from "@/components/mask-reveal";
import { BeforeAfter } from "@/components/before-after";

gsap.registerPlugin(ScrollTrigger);

const INTRO_SEEN_KEY = "byazuolas:intro-seen";

// A held beat of black between the intro dissolving out and the Hero speaking,
// so the headline lands as the first thing you read rather than as a competing
// layer. The Hero's own eyebrow carries a 100ms delay, so this is the remainder
// of the ~250ms beat rather than the whole of it — setting it to 250 here made
// the measured gap 350ms.
const INTRO_SETTLE_MS = 150;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Storage access throws in some privacy modes; the intro just replays there.
function introAlreadySeen() {
  try {
    return sessionStorage.getItem(INTRO_SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_SEEN_KEY, "1");
  } catch {
    // Non-fatal — the intro replays on the next navigation.
  }
}

// Layout effect on the client so the skip lands before paint; plain effect on
// the server to avoid React's "useLayoutEffect does nothing on the server".
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  // Separate from `hasEntered`: the intro leaves on click, but the Hero only
  // speaks once the dissolve and the black settle after it have finished.
  const [heroActive, setHeroActive] = useState(false);
  const settleTimer = useRef<number | undefined>(undefined);

  // The server always renders the intro so the markup hydrates cleanly; a
  // returning visitor drops it here, before the browser paints a single frame.
  useIsomorphicLayoutEffect(() => {
    if (introAlreadySeen()) {
      setSkipIntro(true);
      setHasEntered(true);
      setHeroActive(true);
    }
  }, []);

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  // onExitComplete is the normal path into the Hero. This guarantees the page
  // can never stay inert and scroll-locked if that callback is ever missed —
  // an interrupted exit must not be able to trap the visitor on a dead page.
  useEffect(() => {
    if (!hasEntered || heroActive) return;
    const failsafe = window.setTimeout(() => setHeroActive(true), 1500);
    return () => window.clearTimeout(failsafe);
  }, [hasEntered, heroActive]);

  // Held until the Hero is ready to speak, so nothing scrolls or takes focus
  // mid-transition.
  useEffect(() => {
    document.documentElement.style.overflow = heroActive ? "" : "hidden";
    if (heroActive) {
      // The page laid out behind the overlay with scrolling locked, so every
      // scroll-driven trigger needs remeasuring against the real scroll height.
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [heroActive]);

  return (
    <>
      {/* Dropping the whole AnimatePresence rather than just its child is
          deliberate: a skipped intro must not play its exit fade on the way out. */}
      {!skipIntro && (
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            if (prefersReducedMotion()) {
              setHeroActive(true);
              return;
            }
            settleTimer.current = window.setTimeout(() => setHeroActive(true), INTRO_SETTLE_MS);
          }}
        >
          {!hasEntered && (
            <IntroScreen
              key="intro"
              onEnter={() => {
                markIntroSeen();
                setHasEntered(true);
              }}
            />
          )}
        </AnimatePresence>
      )}

      {/* Rendered from the first paint so crawlers and screen readers reach the
          content; `inert` keeps focus and assistive tech inside the intro until entry. */}
      <div inert={!heroActive}>
        <SiteShell>
          <Hero active={heroActive} />

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
              {/* Calmer than the Hero on purpose: longer line duration and a
                  wider gap between them, so this reads as a held breath. */}
              <SplitReveal
                as="h2"
                by="lines"
                text="Kuriu Shopify parduotuves, kurios parduoda."
                duration={1.1}
                stagger={0.14}
                className="font-display text-3xl italic leading-[1.15] text-white sm:text-5xl sm:leading-[1.08] lg:text-6xl"
              />
              <p className="mt-6 max-w-xl text-base leading-7 text-white/50 sm:mt-8 sm:text-lg sm:leading-8">
                Daugiausia dirbu su Shopify parduotuvėmis — nuo pirmo eskizo iki paleidimo. Kuriu ir prekės ženklo identitetą bei pilną svetainės atnaujinimą, kai verslui reikia daugiau nei naujo puslapio.
              </p>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6">
                {/* Mirrored origins so the pair parts outward from the gutter
                    like a curtain, and opposite drift so they breathe against
                    each other instead of moving as one block. */}
                <MaskReveal
                  className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
                  panelColor="#0a0a0a"
                  origin="left"
                  drift={12}
                >
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
                  delay={0.15}
                  origin="right"
                  drift={-12}
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

              {/* The rule draws down as the line settles — the emotional beat of
                  the page, so it gets the slowest pace in the section. */}
              <blockquote className="relative mt-14 pl-5 sm:mt-20 sm:pl-6">
                <motion.span
                  aria-hidden
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-0 top-0 h-full w-0.5 origin-top bg-[#c7a97b]"
                />
                <SplitReveal
                  as="p"
                  by="lines"
                  text="Jei reikia dirbti iki 6 ryto, kad galėčiau didžiuotis rezultatu — aš tai padarysiu."
                  duration={1.2}
                  stagger={0.16}
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
              text="Prieš ir po"
              className="text-xs uppercase tracking-[0.3em] text-white/50 sm:text-sm"
            />
          </div>

          {/* This replaced the six process steps. Proof of outcome belongs in
              the position a visitor reaches second; how I work belongs on
              /process, where someone already interested goes looking for it. */}
          <section className="bg-black px-6 py-16 sm:px-10 sm:py-24 lg:py-28">
            <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
              <div>
                <SplitReveal
                  as="h2"
                  by="words"
                  text="Sena svetainė nekainuoja nieko — kol nesuskaičiuoji, kiek klientų ji nubaido."
                  className="font-condensed text-[clamp(2rem,9vw,2.6rem)] uppercase leading-[1] text-white sm:text-[clamp(2.4rem,5vw,3.6rem)] sm:leading-[0.96]"
                />
                <p className="mt-6 max-w-md text-base leading-7 text-white/50 sm:mt-8 sm:text-lg sm:leading-8">
                  Svečių namai Palangoje. Buvo nemokamas šablonas su svetima reklama viršuje, be kainų ir netinkamas telefonui. Dabar matosi kambariai, kaina ir vienas mygtukas paskambinti.
                </p>
                <div className="mt-8 flex flex-col items-start gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-6">
                  <MagneticLink href="https://passmilte.lt" external variant="solid" className="min-h-[52px] sm:min-h-0">
                    Žiūrėti gyvai <ArrowUpRight className="h-4 w-4" />
                  </MagneticLink>
                  <MagneticLink href="/portfolio" variant="ghost-dark">
                    Daugiau darbų <ArrowRight className="h-4 w-4" />
                  </MagneticLink>
                </div>
              </div>

              <BeforeAfter
                beforeSrc="/media/passmilte-pries.webp"
                afterSrc="/media/passmilte-po.webp"
                beforeAlt="Sena „Pas Smiltė“ svetainė — nemokamas WordPress.com šablonas"
                afterAlt="Nauja „Pas Smiltė“ svetainė su kainomis ir rezervacija"
                beforeLabel="Prieš"
                afterLabel="Po"
              />
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
