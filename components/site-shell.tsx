"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { PageTransition } from "@/components/page-transition";
import { MagneticLink } from "@/components/magnetic-link";

const navItems = [
  { href: "/", label: "Pradžia" },
  { href: "/about", label: "Apie mane" },
  { href: "/services", label: "Paslaugos" },
  { href: "/portfolio", label: "Portfelis" },
  { href: "/process", label: "Procesas" },
  { href: "/faq", label: "DUK" },
  { href: "/contact", label: "Kontaktas" },
];

// How long the chosen item is left alone on screen before the page changes.
const SELECT_HOLD_MS = 460;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  // Which number sits behind the list. Falls back to the page you are on, so
  // the panel opens already saying where you are.
  const [touchedIndex, setTouchedIndex] = useState<number | null>(null);
  // The item you picked: it stays while its siblings clear out.
  const [selectedHref, setSelectedHref] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const selectTimer = useRef<number | undefined>(undefined);

  const activeIndex = navItems.findIndex((item) => item.href === pathname);
  const ghostIndex = touchedIndex ?? (activeIndex >= 0 ? activeIndex : 0);

  useEffect(() => () => window.clearTimeout(selectTimer.current), []);

  function closeMenu() {
    window.clearTimeout(selectTimer.current);
    setMenuOpen(false);
    setSelectedHref(null);
    setTouchedIndex(null);
  }

  function handleSelect(event: React.MouseEvent, href: string) {
    // Already here — nothing to hold on screen, just get out of the way.
    if (href === pathname) {
      closeMenu();
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      closeMenu();
      return;
    }
    event.preventDefault();
    setSelectedHref(href);
    selectTimer.current = window.setTimeout(() => {
      router.push(href);
      closeMenu();
    }, SELECT_HOLD_MS);
  }

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const setHeaderHeight = () => {
      document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    };

    setHeaderHeight();
    const observer = new ResizeObserver(setHeaderHeight);
    observer.observe(header);
    window.addEventListener("resize", setHeaderHeight);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", setHeaderHeight);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header ref={headerRef} className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-sm whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:gap-3 sm:text-sm sm:tracking-[0.35em]"
          >
            <span className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10 sm:h-7 sm:w-7">
              <Image src="/media/logo-mark.png" alt="" width={40} height={40} className="h-4 w-4 object-contain sm:h-5 sm:w-5" />
            </span>
            <span>BY.AZUOLAS</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-white/60 lg:flex">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-sm py-1 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                    isActive ? "text-white" : ""
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1 left-0 h-px w-full bg-[#c7a97b]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Uždaryti navigaciją" : "Atidaryti navigaciją"}
            aria-expanded={menuOpen}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.55 }}
            onDragEnd={(_, info) => {
              // Either a decisive flick or a deliberate drag past the threshold.
              if (info.offset.x > 90 || info.velocity.x > 500) closeMenu();
            }}
            className="fixed inset-0 z-50 flex touch-pan-y flex-col overflow-hidden bg-black lg:hidden"
          >
            {/* Same ambient treatment as the Hero, so the panel has depth
                instead of reading as flat black behind a list. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,_rgba(199,169,123,0.13),_transparent_60%)]"
            />

            {/* The number you are on, at a scale that makes it architecture
                rather than a label. Crossfades as you move down the list. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={ghostIndex}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.06 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="font-condensed text-[46vw] leading-none"
                  style={{ color: "rgba(199, 169, 123, 0.07)" }}
                >
                  {String(ghostIndex + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="relative flex items-center justify-between px-6 py-4">
              <Link
                href="/"
                onClick={closeMenu}
                className="flex items-center gap-2 whitespace-nowrap rounded-sm text-xs font-semibold uppercase tracking-[0.18em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10">
                  <Image src="/media/logo-mark.png" alt="" width={40} height={40} className="h-4 w-4 object-contain" />
                </span>
                <span>BY.AZUOLAS</span>
              </Link>
              <button
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={closeMenu}
                aria-label="Uždaryti navigaciją"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="relative flex flex-1 flex-col justify-center gap-0.5 overflow-y-auto px-8 pb-16">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleSelect(event, item.href)}
                    onPointerDown={() => setTouchedIndex(index)}
                    className={`group relative flex items-center justify-between gap-4 border-b border-white/10 py-3 transition-[opacity,transform] duration-400 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a97b] ${
                      selectedHref && selectedHref !== item.href
                        ? "-translate-y-1.5 opacity-0"
                        : "translate-y-0 opacity-100"
                    }`}
                  >
                    {/* Draws across under whichever item you chose, confirming
                        the pick before the page changes. */}
                    <span
                      aria-hidden
                      className={`absolute bottom-0 left-0 h-px w-full origin-left bg-[#c7a97b] transition-transform duration-500 ease-out ${
                        selectedHref === item.href ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                    {/* Each label rises from behind a mask rather than fading up,
                        reusing the reveal vocabulary the rest of the site uses. */}
                    {/* Hover shift lives on the mask, not the label: the label's
                        transform is owned by the rise keyframe. */}
                    <span className="overflow-hidden transition-transform duration-300 group-hover:translate-x-1.5 group-active:translate-x-1.5">
                      <span
                        style={{ animationDelay: `${index * 0.038}s` }}
                        className={`nav-item-rise block font-condensed text-[clamp(2.25rem,12vw,3.5rem)] uppercase leading-[1.05] transition-colors duration-300 ${
                          isActive || selectedHref === item.href ? "text-[#c7a97b]" : "text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    </span>
                    <span
                      className={`shrink-0 font-sans text-xs normal-case tracking-normal transition-colors duration-300 group-hover:text-[#c7a97b] group-active:text-[#c7a97b] ${
                        isActive || selectedHref === item.href ? "text-[#c7a97b]" : "text-white/30"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, delay: 0.34 }}
              className="relative px-8 pb-10"
            >
              {/* Was a mailto — the site routes everything to Instagram now, so
                  leaving the address here contradicted every other surface. */}
              <a
                href="https://www.instagram.com/by.azuolas/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm text-sm text-white/40 underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-[#c7a97b] hover:decoration-[#c7a97b]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a97b]"
              >
                @by.azuolas
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <PageTransition>{children}</PageTransition>
      </main>

      <footer className="border-t border-white/10 bg-black px-6 py-12 text-white/60 sm:py-10 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <Image src="/media/logo-mark.png" alt="" width={40} height={40} className="h-5 w-5 object-contain" />
            </span>
            <div>
              <p className="whitespace-nowrap text-xs uppercase tracking-[0.18em] text-white/80 sm:text-sm sm:tracking-[0.35em]">
                BY.AZUOLAS
              </p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                Premium digitalinis dizainas verslui, prekės ženklui ir skaitmeninei patirčiai.
              </p>
            </div>
          </div>
          <MagneticLink href="/contact" variant="ghost-dark" className="min-h-[48px] items-center">
            Susisiekti <ArrowRight className="h-4 w-4" />
          </MagneticLink>
        </div>
      </footer>
    </div>
  );
}
