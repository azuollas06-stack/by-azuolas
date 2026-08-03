"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

type MagneticLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "ghost" | "ghost-dark";
  external?: boolean;
};

export function MagneticLink({ href, children, className = "", variant = "ghost-dark", external }: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMove(event: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = event.clientX - rect.left - rect.width / 2;
    const relY = event.clientY - rect.top - rect.height / 2;
    setOffset({ x: relX * 0.28, y: relY * 0.32 });
  }

  function handleLeave() {
    setOffset({ x: 0, y: 0 });
  }

  const base =
    "group relative inline-flex items-center gap-2 text-sm font-medium tracking-wide transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const variants: Record<string, string> = {
    solid:
      "rounded-full bg-white px-6 py-3 text-black hover:bg-white/85 focus-visible:ring-white focus-visible:ring-offset-black",
    outline:
      "rounded-full border border-white/30 px-6 py-3 text-white hover:border-white focus-visible:ring-white focus-visible:ring-offset-black",
    ghost:
      "text-stone-900 underline decoration-stone-400 underline-offset-4 hover:decoration-stone-900 focus-visible:ring-stone-950 focus-visible:ring-offset-[#f5f1eb] rounded-sm",
    "ghost-dark":
      "text-white underline decoration-white/40 underline-offset-4 hover:decoration-white focus-visible:ring-white focus-visible:ring-offset-black rounded-sm",
  };

  return (
    <motion.div
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 14, mass: 0.4 }}
      className="inline-block"
    >
      <Link
        ref={ref}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
