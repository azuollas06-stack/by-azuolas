import { ArrowRight } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { MagneticLink } from "@/components/magnetic-link";
import { PinnedSteps } from "@/components/pinned-steps";
import { SplitReveal } from "@/components/split-reveal";

const steps = [
  { title: "Tyrimas", description: "Suprantu jūsų tikslus, auditoriją ir verslo kontekstą." },
  { title: "Strategija", description: "Sukuriu aiškią komunikacijos ir dizaino kryptį." },
  { title: "Dizainas", description: "Formuoju vizualinį ir patirties modelį su dėmesiu detalėms." },
  { title: "Kūrimas", description: "Įgyvendinu projektą moderniu, aukštos kokybės tech sprendimu." },
  { title: "Testavimas", description: "Tikriname, ar projektas veikia intuityviai ir efektyviai." },
  { title: "Paleidimas ir palaikymas", description: "Padedu projektą paleisti ir toliau prižiūrėti jo kokybę." },
];

export const metadata = {
  title: "Procesas",
};

export default function ProcessPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-20 lg:px-10 lg:pt-28">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">Procesas</p>
          <SplitReveal
            as="h1"
            by="words"
            text="Kiekvienas žingsnis yra apgalvotas ir nuoseklus."
            className="font-['var(--font-condensed)'] text-[clamp(2rem,9vw,2.6rem)] uppercase leading-[1] text-white sm:text-[clamp(2.6rem,6vw,5rem)] sm:leading-[0.92]"
          />
          <p className="text-lg leading-8 text-white/50">
            Dirbu taip, kad procesas jaustųsi aiškus, profesionalus ir ramus — nuo pirmos idėjos iki paleidimo. Slinkite žemyn.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <PinnedSteps steps={steps} />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-8 text-white lg:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">Kokybė virš spartumo</p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <p className="max-w-2xl text-xl leading-8 text-white/70">
              Jei kažkas nėra pakankamai gerai — tobulinu. Tai yra mano standartas, kuris padeda užtikrinti aukštą rezultatą.
            </p>
            <MagneticLink href="/contact" variant="ghost-dark">
              Susisiekti <ArrowRight className="h-4 w-4" />
            </MagneticLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
