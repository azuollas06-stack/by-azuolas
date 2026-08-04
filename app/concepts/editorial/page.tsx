import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ConceptBadge } from "@/components/concept-badge";

export const metadata = {
  title: "Konceptas — Editorial",
};

const index = [
  "Premium svetainės",
  "Prekės ženklo identitetas",
  "UX/UI dizainas",
  "Shopify parduotuvės",
];

export default function EditorialPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "var(--font-sans)" }}>
      <ConceptBadge label="02" name="Editorial" dark />

      <div className="mx-auto flex min-h-screen max-w-3xl flex-col px-6 sm:px-10">
        <div className="flex items-center justify-between border-b border-white/15 py-5 text-[11px] uppercase tracking-[0.3em] text-white/50 sm:py-6">
          <span className="flex items-center gap-2">
            <Image src="/media/logo-mark.png" alt="" width={20} height={20} className="h-4 w-4 object-contain" />
            BY.AZUOLAS
          </span>
          <span>Nr. 01 — 2026</span>
        </div>

        <div className="flex-1 py-10 sm:py-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#c7a97b]">Skaitmeninis studijos žurnalas</p>
          <h1 className="mt-5 font-display text-[9vw] italic leading-[1.05] text-white sm:mt-6 sm:text-5xl lg:text-6xl">
            Prekės ženklai, kurie kalba tyliai, bet įsimena ilgam.
          </h1>

          <div className="mt-8 grid gap-8 sm:mt-12 sm:grid-cols-[1fr_1.1fr] sm:gap-10">
            <div>
              <div className="overflow-hidden rounded-sm border border-white/10">
                <Image
                  src="/media/azuolas-sedi.png"
                  alt="BY.AZUOLAS"
                  width={800}
                  height={1000}
                  sizes="(min-width: 640px) 320px, 100vw"
                  className="h-64 w-full object-cover object-[center_18%] sm:h-80"
                />
              </div>
              <p className="mt-3 text-xs italic leading-5 text-white/40">
                Fig. 01 — Ąžuolas, kūrėjas. Studija dirba nuotoliniu būdu, projektai visoje Lietuvoje.
              </p>
            </div>

            <div className="border-t border-white/10 pt-6 sm:border-t-0 sm:pt-0">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">Turinys</p>
              <ol className="mt-4 space-y-4">
                {index.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-4 border-b border-white/10 pb-4">
                    <span className="font-display text-sm text-[#c7a97b]">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-base text-white/80 sm:text-lg">{item}</span>
                  </li>
                ))}
              </ol>

              <a
                href="/contact"
                className="mt-8 inline-flex min-h-[48px] items-center gap-2 text-sm font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Pasikalbėkime <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
