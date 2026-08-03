"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return !isCoarsePointer && !prefersReducedMotion;
}

function getServerSnapshot() {
  return false;
}

export function CursorGlow() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const springX = useSpring(x, { damping: 32, stiffness: 180, mass: 0.6 });
  const springY = useSpring(y, { damping: 32, stiffness: 180, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    function handleMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[45] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: springX,
        top: springY,
        background:
          "radial-gradient(circle, rgba(199,169,123,0.16) 0%, rgba(199,169,123,0.06) 38%, transparent 70%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
