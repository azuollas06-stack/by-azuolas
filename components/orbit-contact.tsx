"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

import { MagneticLink } from "@/components/magnetic-link";

const INSTAGRAM_URL = "https://www.instagram.com/by.azuolas/";

// Different aspect ratios and periods so the rings never resolve into a
// repeating pattern — the system should look like it is drifting, not looping.
const RINGS = [
  { width: "100%", height: "38%", tilt: 0, period: 34, reverse: false, opacity: 0.22, carriesDot: true },
  { width: "84%", height: "56%", tilt: 62, period: 24, reverse: true, opacity: 0.15, carriesDot: false },
  { width: "66%", height: "24%", tilt: 121, period: 16, reverse: false, opacity: 0.3, carriesDot: false },
];

export function OrbitContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<Array<HTMLDivElement | null>>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ringRefs.current.forEach((ring, index) => {
        if (!ring) return;
        const { period, reverse } = RINGS[index];
        // Relative, so each ring sweeps from its own resting tilt rather than
        // snapping to a shared absolute angle first.
        gsap.to(ring, {
          rotation: reverse ? "-=360" : "+=360",
          duration: period,
          ease: "none",
          repeat: -1,
        });
      });

      // Parallax only makes sense with a pointer to parallax against.
      if (window.matchMedia("(pointer: coarse)").matches || !systemRef.current) return;

      const moveX = gsap.quickTo(systemRef.current, "x", { duration: 1.1, ease: "power3.out" });
      const moveY = gsap.quickTo(systemRef.current, "y", { duration: 1.1, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        const relX = event.clientX / window.innerWidth - 0.5;
        const relY = event.clientY / window.innerHeight - 0.5;
        moveX(relX * 36);
        moveY(relY * 36);
      };

      window.addEventListener("pointermove", onMove);
      return () => window.removeEventListener("pointermove", onMove);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100dvh-var(--header-h,81px))] flex-col items-center justify-center overflow-hidden bg-black px-6 text-center"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        {/* Deliberately wider than a phone viewport: the rings should run off
            the edges so you read as being inside the system, not looking at a
            diagram sitting behind the type. */}
        <div
          ref={systemRef}
          className="relative aspect-square w-[min(140vw,90vh,760px)] shrink-0"
        >
          {RINGS.map((ring, index) => (
            <div
              key={ring.period}
              ref={(el) => {
                ringRefs.current[index] = el;
              }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#c7a97b]"
              style={{
                width: ring.width,
                height: ring.height,
                opacity: ring.opacity,
                // Resting tilt, so the system still reads as an armillary when
                // reduced motion stops the rotation entirely.
                rotate: `${ring.tilt}deg`,
              }}
            >
              {ring.carriesDot && (
                <span className="absolute left-full top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c7a97b] shadow-[0_0_12px_rgba(199,169,123,0.9)]" />
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="relative text-[11px] uppercase tracking-[0.35em] text-white/40 sm:text-xs">Kontaktas</p>

      <h1 className="relative mt-6 sm:mt-8">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          className="group inline-block rounded-sm font-condensed text-[clamp(2.8rem,16vw,6.5rem)] uppercase leading-none tracking-[0.04em] text-white transition-colors duration-500 hover:text-[#c7a97b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a97b] focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          @by.azuolas
        </a>
      </h1>

      <p className="relative mt-7 max-w-xs text-base leading-7 text-white/50 sm:mt-9 sm:max-w-sm sm:text-lg sm:leading-8">
        Greičiausiai atsakau Instagram žinute. Parašykite — aptarsime jūsų parduotuvę.
      </p>

      {/* The handle reads as a statement, not a control — especially on touch,
          where there is no hover to discover it. This is the actual affordance. */}
      <MagneticLink
        href={INSTAGRAM_URL}
        external
        variant="solid"
        className="relative mt-9 min-h-[52px] transition-shadow duration-300 hover:shadow-[0_0_36px_rgba(199,169,123,0.28)] sm:mt-11 sm:min-h-0"
      >
        Rašyti žinutę <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </MagneticLink>
    </section>
  );
}
