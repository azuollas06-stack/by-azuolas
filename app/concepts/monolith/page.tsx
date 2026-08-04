import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ConceptBadge } from "@/components/concept-badge";

export const metadata = {
  title: "Konceptas — Monolith",
};

export default function MonolithPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <ConceptBadge label="01" name="Monolith" dark />

      <header className="flex items-center justify-center pt-8 sm:pt-10">
        <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-white/10">
          <Image src="/media/logo-mark.png" alt="BY.AZUOLAS" width={40} height={40} className="h-5 w-5 object-contain" />
        </span>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-14 text-center sm:px-10">
        <p className="text-[11px] uppercase tracking-[0.4em] text-white/40 sm:text-xs">Premium digital studio</p>

        <h1 className="mt-6 font-condensed uppercase leading-[0.86] text-white sm:mt-8">
          <span className="block text-[17vw] sm:text-[9rem] lg:text-[11rem]">Mažiau.</span>
          <span className="block text-[17vw] text-[#c7a97b] sm:text-[9rem] lg:text-[11rem]">Bet geriau.</span>
        </h1>

        <p className="mt-8 max-w-xs text-base leading-7 text-white/50 sm:mt-10 sm:max-w-sm sm:text-lg sm:leading-8">
          Premium skaitmeninis dizainas verslams, kurie nenori dar vieno šablono.
        </p>

        <a
          href="/contact"
          className="mt-9 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-white px-8 text-sm font-medium uppercase tracking-[0.15em] text-black transition-colors hover:bg-white/85 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:mt-12"
        >
          Pasikalbėkime <ArrowRight className="h-4 w-4" />
        </a>
      </main>

      <footer className="relative h-24 w-full overflow-hidden border-t border-white/10 sm:h-32">
        <Image
          src="/media/azuolas-sedi.png"
          alt="BY.AZUOLAS"
          fill
          sizes="100vw"
          className="object-cover object-[center_22%] opacity-70 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </footer>
    </div>
  );
}
