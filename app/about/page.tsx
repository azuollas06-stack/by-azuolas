import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { RevealSection } from "@/components/reveal-section";
import { MagneticLink } from "@/components/magnetic-link";
import { SplitReveal } from "@/components/split-reveal";
import { ScrollFadeOut } from "@/components/scroll-fade-out";
import { MaskReveal } from "@/components/mask-reveal";

export const metadata = {
  title: "Apie mane",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <section className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-4 pt-20 lg:px-10 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ScrollFadeOut className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">Apie mane</p>
            <SplitReveal
              as="h1"
              by="words"
              text="Kuriu tai, kas atrodo ir jaučiasi premium."
              className="font-condensed text-[clamp(2.6rem,6vw,5.2rem)] uppercase leading-[0.92] text-white"
            />
            <p className="max-w-2xl text-lg leading-8 text-white/50">
              Aš padedu verslams sukurti skaitmeninį brandą, kuris atrodo patikimai, kalba aiškiai ir užfiksuoja dėmesį.
              Ne tik svetainių kūrimas — tai galimybė padaryti jūsų verslą matomą, vertinamą ir lengviau pasirenkamą.
            </p>
            <MagneticLink href="/contact" variant="ghost-dark">
              Pasikalbėkime <ArrowRight className="h-4 w-4" />
            </MagneticLink>
          </ScrollFadeOut>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-3">
            <MaskReveal className="relative aspect-[4/5] lg:aspect-auto lg:h-full">
              <Image
                src="/media/azuolas-sedi.png"
                alt="BY.AZUOLAS"
                width={1536}
                height={1024}
                quality={90}
                sizes="(min-width: 1024px) 500px, 100vw"
                className="h-full w-full object-cover object-[center_20%]"
                priority
              />
            </MaskReveal>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <MaskReveal className="relative rounded-[2rem] border border-white/10 bg-white/[0.02]" panelColor="#c7a97b">
              <Image
                src="/media/azuolas-prie-stalo.png"
                alt="BY.AZUOLAS dirba prie nešiojamo kompiuterio"
                width={883}
                height={1106}
                quality={90}
                sizes="(min-width: 1024px) 450px, 100vw"
                className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[520px]"
              />
            </MaskReveal>
          </div>

          <div className="flex flex-col gap-16">
            <RevealSection>
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">Darbo etika</p>
              <blockquote className="mt-5 border-l-2 border-[#c7a97b] pl-6">
                <SplitReveal
                  as="p"
                  by="lines"
                  text="Jei reikia dirbti iki 6 ryto, kad galėčiau didžiuotis rezultatu — aš tai padarysiu."
                  className="font-display text-2xl italic leading-tight text-white sm:text-3xl"
                />
              </blockquote>
            </RevealSection>

            <RevealSection delay={0.05}>
              <p className="max-w-xl text-base leading-8 text-white/55">
                Netikiu trumpais keliais. Kiekvieną projektą traktuoju taip, tarsi jis būtų mano paties verslas — su tuo pačiu
                rūpesčiu, dėmesiu detalėms ir noru, kad rezultatas viršytų lūkesčius, o ne tik juos atitiktų.
              </p>
            </RevealSection>

            <RevealSection delay={0.1}>
              <p className="text-sm uppercase tracking-[0.35em] text-white/50">Mano požiūris</p>
              <h2 className="mt-4 max-w-lg text-2xl font-semibold text-white sm:text-3xl">
                Kiekvienam projektui skiriu dėmesio, kokio jis nusipelno.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/55">
                Aš neatskiriu dizaino nuo verslo problemų. Kiekvienam projektui žiūriu kaip į sprendimą, kuris turi tarnauti žmonėms ir stiprinti prekės ženklą.
              </p>
            </RevealSection>

            <RevealSection delay={0.15}>
              <p className="max-w-xl text-base leading-8 text-white/55">
                Vertinu detalę, našumą, patirtį ir aiškumą. Jei kažkas nėra pakankamai gerai — tobulinu, kol tampa tinkama.
                Noriu, kad kiekvienas klientas jaustųsi gavęs kur kas daugiau, nei tikėjosi.
              </p>
            </RevealSection>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
