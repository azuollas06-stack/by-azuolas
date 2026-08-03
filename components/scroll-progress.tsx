"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 280, damping: 40, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[80] h-[2px] w-full origin-left bg-[#c7a97b]"
      style={{ scaleX }}
    />
  );
}
