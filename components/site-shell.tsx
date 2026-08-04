"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

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

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
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
          <nav className="hidden items-center gap-7 text-sm text-white/60 md:flex">
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
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:hidden"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-black md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 whitespace-nowrap rounded-sm text-xs font-semibold uppercase tracking-[0.18em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/10">
                  <Image src="/media/logo-mark.png" alt="" width={40} height={40} className="h-4 w-4 object-contain" />
                </span>
                <span>BY.AZUOLAS</span>
              </Link>
              <button
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                onClick={() => setMenuOpen(false)}
                aria-label="Uždaryti navigaciją"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center gap-1 px-8 pb-20">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 * index, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center justify-between border-b border-white/10 py-4 font-condensed text-4xl uppercase leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        isActive ? "text-[#c7a97b]" : "text-white"
                      }`}
                    >
                      {item.label}
                      <span className="text-sm font-sans normal-case tracking-normal text-white/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="px-8 pb-10"
            >
              <a
                href="mailto:by.azuolas@gmail.com"
                className="text-sm text-white/40 underline decoration-white/20 underline-offset-4"
              >
                by.azuolas@gmail.com
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
