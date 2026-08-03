"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-sm text-sm font-semibold uppercase tracking-[0.35em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <Image src="/media/logo-mark.png" alt="" width={40} height={40} className="h-5 w-5 object-contain" />
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
            className="rounded-full border border-white/20 p-2 text-white/70 transition-colors hover:border-white hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Uždaryti navigaciją" : "Atidaryti navigaciją"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden border-t border-white/10 bg-black/95 md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4 text-base text-white/70">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.03 * index, ease: "easeOut" }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block rounded-sm py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        pathname === item.href ? "text-white" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <PageTransition>{children}</PageTransition>
      </main>

      <footer className="border-t border-white/10 bg-black px-6 py-10 text-white/60 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-white/10">
              <Image src="/media/logo-mark.png" alt="" width={40} height={40} className="h-5 w-5 object-contain" />
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/80">BY.AZUOLAS</p>
              <p className="mt-1 max-w-xl text-sm leading-6 text-white/50">
                Premium digitalinis dizainas verslui, prekės ženklui ir skaitmeninei patirčiai.
              </p>
            </div>
          </div>
          <MagneticLink href="/contact" variant="ghost-dark">
            Susisiekti <ArrowRight className="h-4 w-4" />
          </MagneticLink>
        </div>
      </footer>
    </div>
  );
}
