import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ConceptBadge } from "@/components/concept-badge";
import { RevealSection } from "@/components/reveal-section";

export const metadata = {
  title: "Konceptas C — Structured Grid",
};

export default function ConceptCPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8] text-stone-950" style={{ fontFamily: "var(--font-grid)" }}>
      <ConceptBadge label="C" name="Structured Grid" />

      <section className="mx-auto min-h-screen max-w-[1400px] border-x border-stone-300/70">
        <div
          className="grid border-b border-stone-300/70 text-[11px] uppercase tracking-[0.2em] text-stone-500"
          style={{ fontFamily: "var(--font-mono-grid)" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4">
            <div className="flex items-center gap-2 border-r border-stone-300/70 px-6 py-4">
              <Image src="/media/logo-mark.png" alt="" width={18} height={18} className="h-4 w-4 object-contain" />
              BY.AZUOLAS
            </div>
            <div className="hidden items-center border-r border-stone-300/70 px-6 py-4 sm:flex">N°01 / Home</div>
            <div className="hidden items-center border-r border-stone-300/70 px-6 py-4 sm:flex">EST. 2024</div>
            <div className="flex items-center justify-end px-6 py-4">LT / EN</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col justify-center border-b border-stone-300/70 px-6 py-20 sm:px-10 lg:border-b-0 lg:border-r lg:px-14 lg:py-0">
            <p className="text-[11px] uppercase tracking-[0.3em] text-stone-500" style={{ fontFamily: "var(--font-mono-grid)" }}>
              001 — Premium digital systems
            </p>
            <h1 className="mt-6 text-[clamp(2.6rem,6.5vw,6rem)] font-medium leading-[0.98] tracking-[-0.02em]">
              Tikslus dizainas.
              <br />
              Išmatuotas poveikis.
            </h1>
            <p className="mt-8 max-w-md text-base leading-8 text-stone-600" style={{ fontFamily: "var(--font-sans)" }}>
              Kuriu skaitmenines sistemas su inžinerine tikslumu — kiekvienas elementas turi savo vietą tinklelyje ir savo tikslą.
            </p>
            <div className="mt-10 flex items-center gap-4">
              <span
                className="inline-flex items-center gap-2 bg-stone-950 px-6 py-3 text-sm font-medium text-white"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Pasikalbėkime <ArrowRight className="h-4 w-4" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-stone-500" style={{ fontFamily: "var(--font-mono-grid)" }}>
                Scroll ↓
              </span>
            </div>
          </div>

          <div className="relative min-h-[360px] lg:min-h-0">
            <Image
              src="/media/azuolas-sedi.png"
              alt="BY.AZUOLAS"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover grayscale"
            />
            <div className="absolute bottom-4 left-4 border border-white/40 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur" style={{ fontFamily: "var(--font-mono-grid)" }}>
              Fig. 01 — Portrait
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="mx-auto max-w-[1400px] border-x border-b border-stone-300/70 px-6 py-16 sm:px-10 lg:px-14">
        <div
          className="grid grid-cols-2 gap-6 text-[11px] uppercase tracking-[0.2em] text-stone-500 sm:grid-cols-4"
          style={{ fontFamily: "var(--font-mono-grid)" }}
        >
          {["Web", "Shopify", "Brand identity", "UX / UI"].map((item, index) => (
            <div key={item} className="border-t border-stone-300/70 pt-4">
              <p>0{index + 1}</p>
              <p className="mt-2 text-sm normal-case tracking-normal text-stone-900" style={{ fontFamily: "var(--font-grid)" }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      </RevealSection>
    </div>
  );
}
