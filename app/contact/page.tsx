import { ArrowRight, ArrowUpRight, MessageCircleMore, Mail } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { MagneticLink } from "@/components/magnetic-link";
import { ContactForm } from "@/components/contact-form";
import { SplitReveal } from "@/components/split-reveal";

const CONTACT_EMAIL = "by.azuolas@gmail.com";

export const metadata = {
  title: "Kontaktas",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">Kontaktas</p>
            <SplitReveal
              as="h1"
              by="lines"
              text="Kurkime kažką, kuo didžiuositės."
              className="font-['var(--font-condensed)'] text-[clamp(2.6rem,6vw,5rem)] uppercase leading-[0.9] text-white"
            />
            <p className="max-w-md text-lg leading-8 text-white/50">
              Jei turite idėją, verslo problemą ar norite stipresnio skaitmeninio prekės ženklo — parašykite. Atsakau asmeniškai.
            </p>
            <div className="space-y-4 pt-2 text-base text-white/70">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex items-center gap-3 rounded-sm py-1 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Mail className="h-4 w-4 text-white/40" /> {CONTACT_EMAIL}
                <ArrowUpRight className="h-3.5 w-3.5 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://www.instagram.com/by.azuolas/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-sm py-1 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <MessageCircleMore className="h-4 w-4 text-white/40" /> @by.azuolas
                <ArrowUpRight className="h-3.5 w-3.5 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-8 text-white lg:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-xl leading-8 text-white/70">
              Pasiruošęs aptarti jūsų verslo, prekės ženklo ar skaitmeninės patirties tobulinimą.
            </p>
            <MagneticLink href="/" variant="ghost-dark">
              Grįžti į pradžią <ArrowRight className="h-4 w-4" />
            </MagneticLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
