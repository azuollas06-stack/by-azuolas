import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

import { ConceptBadge } from "@/components/concept-badge";

export const metadata = {
  title: "Konceptas — Bento",
};

export default function BentoPage() {
  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white sm:px-8 sm:py-16">
      <ConceptBadge label="05" name="Bento" dark />

      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-2 pb-8 text-xs uppercase tracking-[0.25em] text-white/40 sm:pb-10">
          <Image src="/media/logo-mark.png" alt="" width={20} height={20} className="h-4 w-4 object-contain" />
          BY.AZUOLAS
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-6 sm:col-span-3 sm:p-10">
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#c7a97b] opacity-10 blur-3xl" />
            <p className="relative text-xs uppercase tracking-[0.3em] text-[#c7a97b]">Premium digital studio</p>
            <h1 className="relative mt-4 font-condensed text-[11vw] uppercase leading-[0.92] text-white sm:text-6xl">
              Prekės ženklai,
              <br />
              kurie parduoda.
            </h1>
            <a
              href="/contact"
              className="relative mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-white/85 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:mt-8"
            >
              Pasikalbėkime <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-white/10 sm:col-span-1 sm:row-span-2">
            <Image
              src="/media/azuolas-sedi.png"
              alt="BY.AZUOLAS"
              fill
              sizes="(min-width: 640px) 25vw, 100vw"
              className="hidden object-cover object-[center_15%] sm:block"
            />
            <Image
              src="/media/azuolas-sedi.png"
              alt="BY.AZUOLAS"
              width={800}
              height={600}
              sizes="100vw"
              className="h-40 w-full object-cover object-[center_15%] sm:hidden"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-4 text-[11px] uppercase tracking-[0.2em] text-white/80">Ąžuolas</span>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:col-span-1 sm:p-6">
            <p className="font-display text-3xl text-white sm:text-4xl">5+</p>
            <p className="mt-1 text-sm text-white/50">Metų patirties</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:col-span-1 sm:p-6">
            <p className="font-display text-3xl text-white sm:text-4xl">20+</p>
            <p className="mt-1 text-sm text-white/50">Užbaigtų projektų</p>
          </div>

          <div className="rounded-3xl border border-[#c7a97b]/30 bg-[#c7a97b]/[0.06] p-5 sm:col-span-2 sm:p-6">
            <Sparkles className="h-5 w-5 text-[#c7a97b]" />
            <p className="mt-3 font-display text-lg italic leading-snug text-white sm:text-xl">
              &ldquo;Kiekvienas projektas gauna tiek dėmesio, kiek jam reikia — ir dar šiek tiek daugiau.&rdquo;
            </p>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-5 sm:col-span-4 sm:flex-row sm:items-center sm:p-8">
            <p className="text-base text-white/70 sm:text-lg">Pasiruošęs sukurti kažką neįprasto?</p>
            <a
              href="/contact"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/30 px-6 text-sm font-medium text-white transition-colors hover:border-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Susisiekti <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
