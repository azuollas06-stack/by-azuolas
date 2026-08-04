import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Concepts",
};

const concepts = [
  {
    href: "/concepts/monolith",
    label: "01",
    name: "Monolith",
    description: "Milžiniška tipografija, tuščia erdvė, viena mintis per ekraną. Nothing / Apple nuotaika.",
  },
  {
    href: "/concepts/editorial",
    label: "02",
    name: "Editorial",
    description: "Žurnalo makete įkvėpta — serif citata, turinio sąrašas, nuotrauka su parašu.",
  },
  {
    href: "/concepts/cinematic",
    label: "03",
    name: "Cinematic",
    description: "Pilnas video fonas, patikslinta mobiliajam ekranui — antraštė apačioje, saugus atstumas.",
  },
  {
    href: "/concepts/grid",
    label: "04",
    name: "Technical Grid",
    description: "Švarus, tikslus, mono etiketės — Linear / Vercel stiliaus specifikacijos jausmas.",
  },
  {
    href: "/concepts/bento",
    label: "05",
    name: "Bento",
    description: "Tamsių kortelių mozaika su stiklo efektu ir auksiniais akcentais — 2025 SaaS nuotaika.",
  },
];

export default function ConceptsPage() {
  return (
    <div className="min-h-screen bg-black px-5 py-14 text-white sm:px-8 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">BY.AZUOLAS — Concepts</p>
        <h1 className="mt-4 font-condensed text-[clamp(2.4rem,10vw,3.5rem)] uppercase leading-[0.95] text-white">
          Penki tamsūs variantai.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-white/50 sm:text-lg sm:leading-8">
          Kiekvienas — pilnas mobiliajam ekranui pritaikytas pradinis puslapis. Peržiūrėkite kiekvieną tiesiai savo telefone ir pasakykite, kuris labiausiai patinka.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:mt-14">
          {concepts.map((concept) => (
            <Link
              key={concept.href}
              href={concept.href}
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:gap-6 sm:p-6"
            >
              <span className="font-display text-2xl text-[#c7a97b] sm:text-3xl">{concept.label}</span>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-white sm:text-xl">{concept.name}</h2>
                <p className="mt-1 text-sm leading-6 text-white/50">{concept.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-white/30 transition-transform group-hover:translate-x-1 group-hover:text-white/70" />
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-10 inline-flex min-h-[48px] items-center text-sm text-white/40 underline decoration-white/20 underline-offset-4 hover:text-white sm:mt-14"
        >
          ← Grįžti į dabartinę svetainę
        </Link>
      </div>
    </div>
  );
}
