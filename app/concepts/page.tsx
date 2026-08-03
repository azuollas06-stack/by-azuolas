import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Concepts",
};

const concepts = [
  {
    href: "/concepts/a",
    label: "A",
    name: "Editorial Cream",
    description: "Šilta, ramybę kelianti, serif tipografija. Aesop / Notion nuotaika.",
    swatch: "bg-[#f5f1eb]",
  },
  {
    href: "/concepts/b",
    label: "B",
    name: "Cinematic Noir",
    description: "Pilnas video fonas, milžiniška antraštė, tamsu ir dramatiška. Apple / Porsche nuotaika.",
    swatch: "bg-[#0a0a0a]",
  },
  {
    href: "/concepts/c",
    label: "C",
    name: "Structured Grid",
    description: "Šviesu, tiksliai suplanuota tinkleliu, techniška. Linear / Stripe nuotaika.",
    swatch: "bg-[#fafaf8]",
  },
];

export default function ConceptsPage() {
  return (
    <div className="min-h-screen bg-[#f5f1eb] px-6 py-16 text-stone-900 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.35em] text-stone-500">BY.AZUOLAS — Concepts</p>
        <h1 className="mt-4 text-4xl font-semibold leading-[0.95] sm:text-5xl">Trys krypčių variantai.</h1>
        <p className="mt-4 max-w-xl text-lg leading-8 text-stone-700">
          Kiekvienas variantas — pilnas pradinis ekranas su realiu turiniu, šriftais ir judesiu. Peržiūrėkite kiekvieną ir pasakykite, kuris labiausiai patinka.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {concepts.map((concept) => (
            <Link
              key={concept.href}
              href={concept.href}
              className="group flex flex-col overflow-hidden rounded-[1.6rem] border border-stone-300/70 bg-white/70 transition-shadow hover:shadow-[0_16px_60px_-30px_rgba(17,17,17,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950"
            >
              <div className={`flex h-32 items-center justify-center border-b border-stone-300/70 ${concept.swatch}`}>
                <span className={`text-4xl font-semibold ${concept.label === "B" ? "text-white" : "text-stone-900"}`}>
                  {concept.label}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <h2 className="text-lg font-semibold text-stone-950">{concept.name}</h2>
                <p className="text-sm leading-6 text-stone-600">{concept.description}</p>
                <span className="mt-auto flex items-center gap-2 pt-3 text-sm font-medium text-stone-800 transition-transform group-hover:translate-x-1">
                  Žiūrėti <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-14 inline-flex items-center gap-2 text-sm text-stone-500 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
        >
          ← Grįžti į dabartinę svetainę
        </Link>
      </div>
    </div>
  );
}
