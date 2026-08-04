import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ConceptBadge } from "@/components/concept-badge";

export const metadata = {
  title: "Konceptas — Cinematic",
};

export default function CinematicPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <ConceptBadge label="03" name="Cinematic" dark />

      <section className="relative flex min-h-screen flex-col justify-end overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover object-[center_25%]" poster="/media/azuolas-sedi.png">
          <source src="/media/intro-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(0,0,0,0.25)_0%,_rgba(0,0,0,0.15)_30%,_rgba(0,0,0,0.92)_100%)]" />

        <div className="relative z-10 flex items-center justify-between px-5 pt-6 sm:px-10 sm:pt-8">
          <span className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/70">
            <Image src="/media/logo-mark.png" alt="" width={20} height={20} className="h-4 w-4 object-contain" />
            BY.AZUOLAS
          </span>
        </div>

        <div className="relative z-10 px-5 pb-10 pt-24 sm:px-10 sm:pb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Premium digital studio</p>
          <h1 className="mt-4 font-condensed text-[13vw] uppercase leading-[0.88] text-white sm:text-7xl lg:text-8xl">
            Skaitmeninis
            <br />
            meistriškumas.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/60 sm:text-base sm:leading-7">
            Svetainės, prekės ženklai ir patirtys, kurios atrodo taip, kaip jaučiasi jūsų verslas — profesionaliai.
          </p>

          <div className="mt-7 flex flex-col gap-3 border-t border-white/15 pt-6 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
            <a
              href="/contact"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full border border-white/50 bg-white/10 px-7 text-sm font-medium uppercase tracking-[0.15em] text-white backdrop-blur-md transition-colors hover:bg-white/20 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Pasikalbėkime <ArrowRight className="h-4 w-4" />
            </a>
            <span className="text-xs uppercase tracking-[0.25em] text-white/40">Shopify · Web · Brand</span>
          </div>
        </div>
      </section>
    </div>
  );
}
