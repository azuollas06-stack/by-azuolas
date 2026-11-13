"use client";

import { useEffect, useRef, useState } from "react";

/** A phone playing a real example of the free promo video. Muted until asked; plays only on screen. */
export function GiftPhone() {
  const v = useRef<HTMLVideoElement>(null);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const el = v.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const el = v.current;
    if (!el) return;
    el.muted = sound;
    setSound(!sound);
    if (el.paused) el.play().catch(() => {});
  };

  return (
    <div className="phone">
      <div className="phone-body">
        <video
          ref={v}
          src="/gift/silas-9x16.mp4"
          poster="/gift/silas-9x16.webp"
          muted
          loop
          playsInline
          preload="none"
          aria-label="Pavyzdys: reklaminis video apie ŠILAS svetainę"
        />
      </div>
      <button type="button" className="phone-snd" onClick={toggle} aria-pressed={sound}>
        {sound ? "Išjungti garsą" : "Įjungti garsą"}
      </button>
    </div>
  );
}
