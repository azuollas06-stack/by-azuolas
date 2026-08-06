import { ArrowRight } from "lucide-react";

import { SiteShell } from "@/components/site-shell";
import { MagneticLink } from "@/components/magnetic-link";

export const metadata = {
  title: "Puslapis nerastas",
  // A 404 has no canonical value and should not compete in search results.
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SiteShell>
      <section className="relative flex min-h-[calc(100dvh-var(--header-h,81px))] flex-col items-center justify-center overflow-hidden bg-black px-6 text-center sm:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,_rgba(199,169,123,0.10),_transparent_60%)]"
        />

        <p className="relative text-[11px] uppercase tracking-[0.35em] text-white/40 sm:text-xs">
          Klaida 404
        </p>

        <h1 className="relative mt-6 font-condensed text-[clamp(4rem,26vw,10rem)] uppercase leading-[0.85] text-white sm:mt-8">
          404
        </h1>

        <p className="relative mt-6 max-w-xs text-base leading-7 text-white/50 sm:mt-8 sm:max-w-sm sm:text-lg sm:leading-8">
          Tokio puslapio nėra arba jis buvo perkeltas. Grįžkite į pradžią arba pažiūrėkite darbus.
        </p>

        <div className="relative mt-9 flex flex-col items-center gap-4 sm:mt-11 sm:flex-row sm:gap-6">
          <MagneticLink href="/" variant="solid" className="min-h-[52px] sm:min-h-0">
            Į pradžią <ArrowRight className="h-4 w-4" />
          </MagneticLink>
          <MagneticLink href="/portfolio" variant="ghost-dark">
            Žiūrėti darbus <ArrowRight className="h-4 w-4" />
          </MagneticLink>
        </div>
      </section>
    </SiteShell>
  );
}
