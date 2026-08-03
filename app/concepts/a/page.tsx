import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

import { ConceptBadge } from "@/components/concept-badge";
import { RevealSection } from "@/components/reveal-section";

export const metadata = {
  title: "Konceptas A — Editorial Cream",
};

export default function ConceptAPage() {
  return (
    <div className="min-h-screen bg-[#f5f1eb] text-stone-900">
      <ConceptBadge label="A" name="Editorial Cream" />

      <section className="relative isolate overflow-hidden border-b border-stone-300/60">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,_rgba(199,169,123,0.14),_transparent_45%)]" />
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24 lg:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl space-y-7">
              <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Premium digital experiences</p>
              <h1 className="font-['var(--font-display)'] text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.98] tracking-[-0.02em]">
                Skaitmeninė patirtis, kuri atrodo kaip premium sprendimas.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-stone-600">
                Kuriu skaitmeninę patirtį, kuri atrodo ramiai, kalba aiškiai ir palieka ilgalaikį įspūdį.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-6 py-3 text-sm font-medium text-white">
                  Pasikalbėkime <ArrowRight className="h-4 w-4" />
                </span>
                <span className="flex items-center gap-2 text-sm text-stone-500">
                  <Sparkles className="h-4 w-4" /> Shopify • Web • Brand systems
                </span>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="w-full max-w-[380px] overflow-hidden rounded-[2rem] border border-stone-300/70 bg-white p-3 shadow-[0_30px_100px_-40px_rgba(17,17,17,0.5)]">
                <div className="relative overflow-hidden rounded-[1.4rem]">
                  <Image
                    src="/media/azuolas-sedi.png"
                    alt="BY.AZUOLAS"
                    width={1200}
                    height={1400}
                    priority
                    className="h-[440px] w-full object-cover sm:h-[520px]"
                  />
                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white backdrop-blur">
                    Ąžuolas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RevealSection className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-stone-300/70 bg-stone-950 p-10 text-stone-100 shadow-[0_18px_70px_-30px_rgba(17,17,17,0.45)]">
            <p className="text-[10px] uppercase tracking-[0.35em] text-stone-400">Požiūris</p>
            <h2 className="mt-4 max-w-xl font-['var(--font-display)'] text-3xl leading-tight sm:text-4xl">
              Nekuriu tik svetainių. Kuriu jausmą, kuris lieka po susitikimo.
            </h2>
          </div>
          <div className="grid gap-4">
            {["Editorial rhythm", "Cinematic storytelling", "Quiet confidence"].map((title, index) => (
              <div key={title} className="rounded-[1.6rem] border border-stone-300/70 bg-white/75 p-6">
                <p className="text-[10px] uppercase tracking-[0.35em] text-stone-500">{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-stone-900">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>
    </div>
  );
}
