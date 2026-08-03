import { ArrowRight } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { FaqIndex } from "@/components/faq-index";
import { MagneticLink } from "@/components/magnetic-link";
import { SplitReveal } from "@/components/split-reveal";

const faqs = [
  {
    question: "Ar galite pradėti nuo paprastesnio projekto?",
    answer: "Taip. Dirbu su įvairaus dydžio projektais ir pritaikau požiūrį prie kliento poreikių ir biudžeto — svarbiausia, kad rezultatas atrodytų nuosekliai ir profesionaliai, nepriklausomai nuo apimties.",
  },
  {
    question: "Kiek laiko užtrunka projektas?",
    answer: "Priklauso nuo sudėtingumo — paprastesnė svetainė gali užtrukti kelias savaites, o pilnas prekės ženklo ir svetainės paketas ilgiau. Visada dirbu struktūruotai ir iš anksto aptariu realų laikotarpį.",
  },
  {
    question: "Ar dirbate su verslo savininkais ir startuoliais?",
    answer: "Taip. Dirbu su įvairiomis įmonėmis — nuo mažų vietinių verslų iki augančių prekės ženklų ir startuolių, kuriems svarbu profesionalus pirmas įspūdis.",
  },
  {
    question: "Ar galite padėti ir su strategija, ir su dizainu?",
    answer: "Taip. Dažnai dirbu tiek su vizualiniu sprendimu, tiek su komunikacijos ir patirties logika — nuo pirmos idėjos iki galutinio įgyvendinimo.",
  },
  {
    question: "Kas atsitinka po svetainės paleidimo?",
    answer: "Nepalieku projekto vieno po paleidimo. Siūlau priežiūrą, tobulinimą ir pagalbą, kad skaitmeninis prekės ženklas augtų kartu su jūsų verslu.",
  },
  {
    question: "Kaip vyksta bendradarbiavimo pradžia?",
    answer: "Viskas prasideda nuo trumpo pokalbio apie jūsų verslą ir tikslus. Tada pasiūlau kryptį, apimtį ir aiškų sekančių žingsnių planą prieš pradedant darbą.",
  },
];

export const metadata = {
  title: "DUK",
};

export default function FaqPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm uppercase tracking-[0.35em] text-white/50">DUK</p>
          <SplitReveal
            as="h1"
            by="words"
            text="Dažniausiai užduodami klausimai."
            className="font-['var(--font-condensed)'] text-[clamp(2.6rem,6vw,5rem)] uppercase leading-[0.92] text-white"
          />
          <p className="text-lg leading-8 text-white/50">
            Čia surinkti klausimai, kuriuos dažniausiai užduoda tie, kurie svarsto bendradarbiavimą.
          </p>
        </div>

        <FaqIndex faqs={faqs} />

        <div className="mt-10 flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-8 text-white md:flex-row md:items-center md:justify-between lg:px-10">
          <p className="text-lg leading-8 text-white/70">
            Jei turite konkretų klausimą, mielai atsakysiu asmeniškai.
          </p>
          <MagneticLink href="/contact" variant="ghost-dark">
            Rašyti <ArrowRight className="h-4 w-4" />
          </MagneticLink>
        </div>
      </section>
    </SiteShell>
  );
}
