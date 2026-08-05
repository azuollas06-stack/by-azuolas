import { ArrowRight, ArrowUpRight } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { RevealSection } from "@/components/reveal-section";
import { MagneticLink } from "@/components/magnetic-link";
import { SplitReveal } from "@/components/split-reveal";
import { TiltCard } from "@/components/tilt-card";
import { HorizontalScrollGallery } from "@/components/horizontal-scroll-gallery";

type Concept = {
  index: string;
  category: string;
  title: string;
  description: string;
  palette: {
    bg: string;
    text: string;
    subtext: string;
    accent: string;
    border: string;
  };
  serif: string;
  detail: string;
};

const concepts: Concept[] = [
  {
    index: "02",
    category: "Restoranas",
    title: "Noir Table",
    description:
      "Tamsi, jausminga rezervacijų patirtis aukščiausios klasės restoranui — meniu jaučiasi kaip kvietimas, o ne katalogas.",
    palette: {
      bg: "bg-[#1a0f0f]",
      text: "text-[#f3e6dc]",
      subtext: "text-[#c9a98f]",
      accent: "#8a3b2e",
      border: "border-[#3a2420]",
    },
    serif: "Noir Table",
    detail: "Rezervacijos · Meniu · Atmosfera",
  },
  {
    index: "03",
    category: "Architektūra",
    title: "Studija Linija",
    description:
      "Minimalus, konstrukcinis portfelis architektų biurui — kur tuščia erdvė kalba tiek pat, kiek ir planai.",
    palette: {
      bg: "bg-[#efece6]",
      text: "text-stone-900",
      subtext: "text-stone-600",
      accent: "#8f8577",
      border: "border-stone-300",
    },
    serif: "Studija Linija",
    detail: "Projektai · Procesas · Kontaktai",
  },
  {
    index: "04",
    category: "Interjeras",
    title: "Terra Interiors",
    description:
      "Šilta, tekstūromis paremta prekės ženklo patirtis interjero studijai — smėlio ir molio tonai, ramus tempas.",
    palette: {
      bg: "bg-[#c98f5f]",
      text: "text-[#2b1c10]",
      subtext: "text-[#3d2a19]",
      accent: "#2b1c10",
      border: "border-[#a9754b]",
    },
    serif: "Terra Interiors",
    detail: "Projektai · Moodboard · Susisiekti",
  },
  {
    index: "05",
    category: "Mada",
    title: "Maison Aire",
    description:
      "Aukštos mados prekės ženklo svetainė — kontrastinga, tipografiška, kolekcijos pristatomos kaip meno kūriniai.",
    palette: {
      bg: "bg-[#0a0a0a]",
      text: "text-white",
      subtext: "text-stone-400",
      accent: "#ffffff",
      border: "border-white/15",
    },
    serif: "Maison Aire",
    detail: "Kolekcija · Žurnalas · Parduotuvė",
  },
  {
    index: "06",
    category: "Odontologija",
    title: "Clara Dental",
    description:
      "Švarus, ramybę keliantis skaitmeninis pasitikėjimas klinikai — aiški informacija, paprastas rezervavimas.",
    palette: {
      bg: "bg-[#eef4f1]",
      text: "text-[#123027]",
      subtext: "text-[#4d6b60]",
      accent: "#2f7a63",
      border: "border-[#bcd6cb]",
    },
    serif: "Clara Dental",
    detail: "Paslaugos · Komanda · Rezervacija",
  },
];

const projects = [
  {
    index: "01",
    category: "Shopify parduotuvė",
    name: "Petora",
    url: "https://petora.lt",
    domain: "petora.lt",
    description:
      "El. parduotuvė augintinių prekėms. Prekių puslapiai, krepšelis, apmokėjimas, nuolaidų kodai ir atsiliepimai — viskas veikia kasdien.",
  },
  {
    index: "02",
    category: "Svetainė",
    name: "Pas Smiltė",
    url: "https://passmilte.lt",
    domain: "passmilte.lt",
    description:
      "Svečių namų Palangoje svetainė. Septyni kambariai, aiškios kainos ir skambutis rezervacijai vienu paspaudimu.",
  },
];

export const metadata = {
  title: "Portfelis",
};

export default function PortfolioPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 pt-20 lg:px-10 lg:pt-28">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">Portfelis</p>
            <SplitReveal
              as="h1"
              by="lines"
              text="Parduotuvės ir svetainės, kurios jau dirba."
              className="font-condensed text-[clamp(2rem,9vw,2.6rem)] uppercase leading-[1] text-white sm:text-[clamp(2.6rem,6vw,5rem)] sm:leading-[0.9]"
            />
          </div>
          <p className="max-w-xl text-lg leading-8 text-white/50">
            Dalies darbų viešai nerodau — kai kurie klientai to prašo. Žemiau tie, kuriuos galiu parodyti: atidarykite ir pasižiūrėkite, kaip veikia.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-7xl px-6 lg:px-10">
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <RevealSection key={project.name} delay={index * 0.08}>
              <TiltCard intensity={2.5} className="h-full">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col justify-between gap-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition-colors duration-500 hover:border-[#c7a97b]/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a97b] lg:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-[#c7a97b]">{project.category}</p>
                    <span className="font-condensed text-2xl leading-none text-white/15">{project.index}</span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="font-condensed text-[clamp(2.25rem,10vw,3.5rem)] uppercase leading-[0.95] text-white">
                      {project.name}
                    </h2>
                    <p className="max-w-md text-base leading-8 text-white/55">{project.description}</p>
                    <span className="inline-flex items-center gap-2 pt-1 text-sm text-white/70 transition-colors duration-300 group-hover:text-[#c7a97b]">
                      {project.domain}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              </TiltCard>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Clearly separated from the client work above, so the two are never
          read as the same thing. */}
      <div className="mx-auto mt-20 max-w-7xl px-6 lg:mt-28 lg:px-10">
        <p className="text-sm uppercase tracking-[0.35em] text-white/50">Koncepcijos</p>
        <p className="mt-3 max-w-xl text-base leading-8 text-white/45">
          Kryptys skirtingoms sritims — nuo restorano iki mados prekės ženklo. Taip atrodo darbo pradžia, kol dar neturime jūsų turinio.
        </p>
        <p className="mt-4 hidden items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40 lg:flex">
          Slinkite žemyn — konceptai juda horizontaliai <ArrowRight className="h-3.5 w-3.5" />
        </p>
      </div>

      <HorizontalScrollGallery className="mt-6 px-6 pb-8 lg:px-10">
        {concepts.map((concept) => (
          <div key={concept.title} className="w-full shrink-0 lg:w-[78vw]">
            <TiltCard
              intensity={2.5}
              className={`relative overflow-hidden rounded-[2rem] border ${concept.palette.border} ${concept.palette.bg} px-6 py-10 sm:px-12 sm:py-14 lg:flex lg:h-[62vh] lg:flex-col lg:justify-center lg:px-16 lg:py-0`}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-20 blur-3xl"
                style={{ background: concept.palette.accent }}
              />
              <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-end">
                <span className={`font-display text-4xl leading-none ${concept.palette.subtext} opacity-60 sm:text-6xl lg:text-7xl`}>
                  {concept.index}
                </span>

                <div className="max-w-2xl space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3">
                    <p className={`text-xs uppercase tracking-[0.35em] ${concept.palette.subtext}`}>{concept.category}</p>
                    <span
                      className={`rounded-full border ${concept.palette.border} px-3 py-1 text-[10px] uppercase tracking-[0.3em] ${concept.palette.subtext}`}
                    >
                      Konceptas
                    </span>
                  </div>
                  <h2 className={`font-display text-3xl leading-[0.95] sm:text-5xl lg:text-6xl ${concept.palette.text}`}>
                    {concept.title}
                  </h2>
                  <p className={`max-w-lg text-base leading-7 sm:leading-8 ${concept.palette.subtext}`}>{concept.description}</p>
                  <p className={`pt-1 text-xs uppercase tracking-[0.3em] ${concept.palette.subtext} opacity-80`}>{concept.detail}</p>
                </div>

                <div className={`hidden lg:block ${concept.palette.subtext}`}>
                  <ArrowUpRight className="h-10 w-10 opacity-40" />
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </HorizontalScrollGallery>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28">
        <div className="flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-8 text-white md:flex-row md:items-center md:justify-between lg:px-10">
          <p className="text-lg leading-8 text-white/70">
            Jei norite tokio lygio patirties savo verslui — pradėkime nuo pokalbio.
          </p>
          <MagneticLink href="/contact" variant="ghost-dark">
            Susisiekti <ArrowRight className="h-4 w-4" />
          </MagneticLink>
        </div>
      </section>
    </SiteShell>
  );
}
