import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ConceptBadge } from "@/components/concept-badge";

export const metadata = {
  title: "Konceptas — Technical Grid",
};

const stats = [
  { label: "01", value: "Web" },
  { label: "02", value: "Shopify" },
  { label: "03", value: "Brand" },
  { label: "04", value: "UX / UI" },
];

export default function GridPage() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "var(--font-grid)" }}>
      <ConceptBadge label="04" name="Technical Grid" dark />

      <div
        className="flex items-center justify-between border-b border-white/10 px-5 py-4 text-[10px] uppercase tracking-[0.2em] text-white/50 sm:px-10"
        style={{ fontFamily: "var(--font-mono-grid)" }}
      >
        <span className="flex items-center gap-2">
          <Image src="/media/logo-mark.png" alt="" width={18} height={18} className="h-4 w-4 object-contain" />
          BY.AZUOLAS
        </span>
        <span>N°01 / Home</span>
      </div>

      <section className="px-5 py-12 sm:px-10 sm:py-20">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#c7a97b]" style={{ fontFamily: "var(--font-mono-grid)" }}>
          001 — Premium digital systems
        </p>
        <h1 className="mt-5 text-[11vw] font-medium leading-[1] tracking-[-0.02em] text-white sm:mt-6 sm:text-6xl lg:text-7xl">
          Tikslus dizainas.
          <br />
          Išmatuotas poveikis.
        </h1>
        <p className="mt-5 max-w-sm text-sm leading-6 text-white/55 sm:mt-6 sm:text-base sm:leading-7" style={{ fontFamily: "var(--font-sans)" }}>
          Kuriu skaitmenines sistemas su inžinerine tikslumu — kiekvienas elementas turi savo vietą ir tikslą.
        </p>

        <a
          href="/contact"
          className="mt-8 inline-flex min-h-[52px] items-center gap-2 bg-white px-6 text-sm font-medium text-black transition-colors hover:bg-white/85 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:mt-10"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Pasikalbėkime <ArrowRight className="h-4 w-4" />
        </a>
      </section>

      <div className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.value} className={`border-b border-white/10 px-5 py-5 sm:py-6 ${i % 2 === 0 ? "border-r" : ""} sm:border-r sm:last:border-r-0`}>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40" style={{ fontFamily: "var(--font-mono-grid)" }}>
              {stat.label}
            </p>
            <p className="mt-1.5 text-base text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="relative h-48 w-full border-t border-white/10 sm:h-64">
        <Image src="/media/azuolas-sedi.png" alt="BY.AZUOLAS" fill sizes="100vw" className="object-cover object-[center_20%] grayscale" />
        <div
          className="absolute bottom-3 left-5 border border-white/30 bg-black/50 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur"
          style={{ fontFamily: "var(--font-mono-grid)" }}
        >
          Fig. 01 — Portrait
        </div>
      </div>
    </div>
  );
}
