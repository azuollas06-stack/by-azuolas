"use client";

import { useEffect, useRef } from "react";

/**
 * A muted recording of the real site in use. Plays only while on screen (and
 * not for reduced motion), so a page of eight of them costs nothing off-screen.
 * `src` is the 1600 px file; phones get the 960 px one beside it (`name-m.mp4`).
 */
export function Preview({ src, poster, label }: { src: string; poster: string; label: string }) {
  const small = src.replace(/\.mp4$/, "-m.mp4");
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
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      disablePictureInPicture
    >
      <source src={small} type="video/mp4" media="(max-width: 760px)" />
      <source src={src} type="video/mp4" />
    </video>
  );
}
