"use client";

import { useEffect, useRef, useState } from "react";

const KEY = "byazuolas:intro";

/**
 * A 3.6 s cut through real work, ending on the wordmark, then the page.
 * No button to enter: it leaves on its own. A returning visitor in the same
 * session (or anyone who prefers reduced motion) never sees it: an inline script
 * in the layout marks <html> before paint and CSS hides the overlay, so there
 * is no flash.
 */
export function Intro() {
  const [gone, setGone] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    // Already seen this session, or reduced motion: the layout script marked <html>
    // before paint and CSS keeps the overlay hidden, so there is nothing to play.
    if (root.classList.contains("seen")) return;
    root.classList.add("locked");
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      setLeaving(true);
      root.classList.remove("locked");
      root.classList.add("ready");
      window.setTimeout(() => setGone(true), 700);
    };
    const v = video.current;
    v?.addEventListener("ended", finish);
    // Autoplay can be refused (low-power mode); never trap anyone behind it.
    const blocked = window.setTimeout(() => {
      if (!v || v.currentTime < 0.05) finish();
    }, 1600);
    const cap = window.setTimeout(finish, 6000);
    const key = (e: KeyboardEvent) => e.key === "Escape" && finish();
    window.addEventListener("keydown", key);
    v?.play().catch(finish);
    return () => {
      v?.removeEventListener("ended", finish);
      window.clearTimeout(blocked);
      window.clearTimeout(cap);
      window.removeEventListener("keydown", key);
      root.classList.remove("locked");
    };
  }, []);

  if (gone) return null;
  return (
    <div className={`intro${leaving ? " out" : ""}`} aria-hidden="true">
      <video ref={video} muted playsInline preload="auto" disablePictureInPicture>
        <source src="/video/intro-port.mp4" type="video/mp4" media="(max-aspect-ratio: 4/5)" />
        <source src="/video/intro-land.mp4" type="video/mp4" />
      </video>
      <button
        type="button"
        className="skip"
        tabIndex={-1}
        onClick={() => video.current?.dispatchEvent(new Event("ended"))}
      >
        Praleisti
      </button>
    </div>
  );
}
