import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ConceptBadge } from "@/components/concept-badge";
import { RevealSection } from "@/components/reveal-section";

export const metadata = {
  title: "Konceptas B — Cinematic Noir",
};

export default function ConceptBPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ConceptBadge label="B" name="Cinematic Noir" dark />

      <section className="relative flex min-h-screen items-end overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          poster="/media/azuolas-sedi.png"
        >
          <source src="/media/intro-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.35)_0%,_rgba(0,0,0,0.2)_35%,_rgba(0,0,0,0.9)_100%)]" />

        <div className="relative z-10 w-full px-6 pb-16 pt-32 sm:px-10 lg:px-16 lg:pb-24">
          <div className="mx-auto max-w-7xl">
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.5em] text-white/60">
              <Image src="/media/logo-mark.png" alt="" width={22} height={22} className="h-5 w-5 object-contain" />
              BY.AZUOLAS
            </p>
            <h1 className="font-['var(--font-condensed)'] text-[clamp(3.5rem,11vw,10.5rem)] uppercase leading-[0.85] tracking-[0.01em]">
              Premium.
              <br />
              Cinematiška.
              <br />
              Neužmirštama.
            </h1>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-white/15 pt-6">
              <p className="max-w-sm text-sm leading-7 text-white/60">
                Kuriu skaitmenines patirtis, kurios jaučiasi kaip kino kadras — ne kaip dar viena svetainė.
              </p>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium uppercase tracking-[0.25em] text-white">
                Pasikalbėkime <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="border-t border-white/10 bg-black px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <div className="mx-auto max-w-5xl">
          <p className="font-['var(--font-display)'] text-3xl italic leading-snug text-white/90 sm:text-4xl">
            &ldquo;Kiekvienas kadras, kiekvienas tarpas, kiekvienas judesys — sukurtas taip, kad būtų prisimintas.&rdquo;
          </p>
        </div>
      </RevealSection>
    </div>
  );
}
