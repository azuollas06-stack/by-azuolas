"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

import { MagneticLink } from "@/components/magnetic-link";

const INSTAGRAM_URL = "https://www.instagram.com/by.azuolas/";

// Drawn at the rings' own hairline weight and in the same gold, so they read as
// part of the system rather than as borrowed third-party branding.
const GLYPHS = {
  storefront: (
    <>
      <path d="M3 8.5h18V20H3z" />
      <path d="M3 8.5 5 4h14l2 4.5" />
      <path d="M9.5 20v-5.5h5V20" />
    </>
  ),
  browser: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="M3 9h18" />
      <path d="M6.2 6.75h.01M8.9 6.75h.01" />
    </>
  ),
  cart: (
    <>
      <path d="M2.5 3.5h2.2l2.4 10.5h9.6l2.3-7.8H6.1" />
      <circle cx="9.5" cy="19" r="1.4" />
      <circle cx="16.5" cy="19" r="1.4" />
    </>
  ),
} as const;

// Different aspect ratios and periods so the rings never resolve into a
// repeating pattern — the system should look like it is drifting, not looping.
const RINGS = [
  { width: "100%", height: "38%", tilt: 0, period: 34, reverse: false, opacity: 0.22, glyph: "storefront" },
  { width: "84%", height: "56%", tilt: 62, period: 24, reverse: true, opacity: 0.15, glyph: "cart" },
  { width: "66%", height: "24%", tilt: 121, period: 16, reverse: false, opacity: 0.3, glyph: "browser" },
] as const;

export function OrbitContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const systemRef = useRef<HTMLDivElement>(null);
  const ringRefs = useRef<Array<HTMLDivElement | null>>([]);
  const glyphRefs = useRef<Array<SVGSVGElement | null>>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      ringRefs.current.forEach((ring, index) => {
        if (!ring) return;
        const { period, reverse, tilt } = RINGS[index];
        // Relative, so each ring sweeps from its own resting tilt rather than
        // snapping to a shared absolute angle first.
        gsap.to(ring, {
          rotation: reverse ? "-=360" : "+=360",
          duration: period,
          ease: "none",
          repeat: -1,
        });

        // The glyph rides the ring, so it inherits both the ring's resting tilt
        // and its spin. Cancel the tilt once and the spin continuously, or the
        // glyph orbits permanently rotated by the tilt — legible only on the
        // untilted ring, sideways on the others.
        const glyph = glyphRefs.current[index];
        if (glyph) {
          gsap.set(glyph, { rotation: -tilt });
          gsap.to(glyph, {
            rotation: reverse ? "+=360" : "-=360",
            duration: period,
            ease: "none",
            repeat: -1,
          });
        }
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border"
              style={{
                width: ring.width,
                height: ring.height,
                // Alpha on the border rather than the element: opacity here
                // would cascade to the glyph and dim the orbiting body too.
                borderColor: `rgba(199, 169, 123, ${ring.opacity})`,
                // Resting tilt, so the system still reads as an armillary when
                // reduced motion stops the rotation entirely.
                rotate: `${ring.tilt}deg`,
              }}
            >
              <svg
                ref={(el) => {
                  glyphRefs.current[index] = el;
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c7a97b"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute left-full top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 opacity-70 drop-shadow-[0_0_10px_rgba(199,169,123,0.55)]"
              >
                {GLYPHS[ring.glyph]}
              </svg>
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
