"use client";

import { useEffect, useRef } from "react";

/**
 * A muted recording of the real site in use. Plays only while on screen (and
 * not for reduced motion), so a page of eight of them costs nothing off-screen.
 */
export function Preview({ src, poster, label }: { src: string; poster: string; label: string }) {
  const v = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = v.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (el.preload !== "auto") el.preload = "auto";
          el.play().catch(() => {});
        } else el.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={v}
      className="preview"
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      disablePictureInPicture
    />
  );
}
