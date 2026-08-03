import { ArrowRight } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { RevealSection } from "@/components/reveal-section";
import { MagneticLink } from "@/components/magnetic-link";
import { SplitReveal } from "@/components/split-reveal";

const services = [
  {
    index: "01",
    title: "Premium svetainės",
    value: "Pirmas įspūdis, kuris parduoda",
    description:
      "Svetainė, kuri per tris sekundes pasako, kad su jumis verta dirbti. Kiekvienas blokas, šriftas ir tarpas parenkamas taip, kad stiprintų pasitikėjimą.",
  },
  {
    index: "02",
    title: "Shopify parduotuvės",
    value: "Patirtis, orientuota į pardavimą",
    description:
      "Aiški navigacija, greitas krepšelis ir estetika, kuri neatitraukia nuo pirkimo — parduotuvė, kuri jaučiasi taip pat premium, kaip jūsų produktas.",
  },
  {
    index: "03",
    title: "Prekės ženklo identitetas",
    value: "Vizualinė kalba, kurią atsimena",
    description:
      "Logotipas, spalvų sistema, tipografija ir tonas — sukuriu nuoseklią sistemą, kuri veikia nuo vizitinės kortelės iki billboard'o.",
  },
  {
    index: "04",
    title: "Logotipo kūrimas ir verslo pavadinimai",
    value: "Pradžios taškas, kuris turi laikyti dešimtmetį",
    description:
      "Kartais viskas prasideda nuo vardo. Padedu sukurti pavadinimą ir ženklą, kuris tinka jūsų ambicijoms, ne tik dabartiniam etapui.",
  },
  {
    index: "05",
    title: "UX/UI dizainas",
    value: "Sąsaja, kuri jaučiasi savaime suprantama",
    description:
      "Vartotojo kelionė suprojektuota taip, kad nereikėtų galvoti — aiški hierarchija, intuityvi struktūra ir premium detalė kiekviename ekrane.",
  },
  {
    index: "06",
    title: "Digitalinė strategija ir priežiūra",
    value: "Augimas po paleidimo",
    description:
      "SEO pagrindai, techninis optimizavimas ir nuolatinis tobulinimas — kad projektas neliktų statiškas dieną po paleidimo.",
  },
];

export const metadata = {
  title: "Paslaugos",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">Paslaugos</p>
          <SplitReveal
            as="h1"
            by="lines"
            text="Ne paslaugų sąrašas — skaitmeninio brando sistema."
            className="font-['var(--font-condensed)'] text-[clamp(2.6rem,6vw,5rem)] uppercase leading-[0.92] text-white"
          />
          <p className="text-lg leading-8 text-white/50">
            Kiekviena paslauga sujungiama į vieną nuoseklią patirtį: nuo pirmo prisistatymo iki ilgalaikio augimo.
          </p>
        </div>

        <div className="mt-16 border-t border-white/10">
          {services.map((service, i) => (
            <RevealSection key={service.title} delay={i * 0.04}>
              <div className="group relative grid gap-4 border-b border-white/10 py-8 transition-colors sm:grid-cols-[80px_1fr] sm:gap-8 lg:grid-cols-[100px_1.1fr_1fr] lg:items-start lg:py-10">
                <div className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-white/[0.03] transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="font-['var(--font-display)'] text-2xl text-white/25 transition-colors group-hover:text-[#c7a97b] lg:text-3xl">
                  {service.index}
                </span>
                <div>
                  <h2 className="text-2xl font-semibold text-white sm:text-3xl">{service.title}</h2>
                  <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">{service.value}</p>
                </div>
                <p className="mt-3 max-w-xl text-base leading-8 text-white/55 lg:mt-0">{service.description}</p>
              </div>
            </RevealSection>
          ))}
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-8 text-white lg:px-10">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">Nuo idėjos iki paleidimo</p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <p className="max-w-2xl text-xl leading-8 text-white/70">
              Dirbu nuo pirmos idėjos iki paleidimo ir toliau — kai reikia patobulinti, plėtoti ir išlaikyti aukštą kokybę.
            </p>
            <MagneticLink href="/contact" variant="ghost-dark">
              Pradėkime <ArrowRight className="h-4 w-4" />
            </MagneticLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
