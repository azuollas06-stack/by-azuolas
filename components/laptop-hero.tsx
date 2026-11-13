"use client";

import { useEffect, useRef } from "react";

type Q = { q: Record<"tl" | "tr" | "br" | "bl", number[]>; v: number; a: number };
type Set = { dir: string; w: number; h: number; proj: Q[] };

const N = 72;

/** Homography taking the w×h rectangle onto the quad (tl, tr, br, bl), as a CSS matrix3d. */
function quadMatrix(w: number, h: number, p: number[][]) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = p;
  const dx1 = x1 - x2, dx2 = x3 - x2, dy1 = y1 - y2, dy2 = y3 - y2;
  const sx = x0 - x1 + x2 - x3, sy = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1 || 1e-9;
  const g = (sx * dy2 - dx2 * sy) / den, hh = (dx1 * sy - sx * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + hh * x3, c = x0;
  const d = y1 - y0 + g * y1, e = y3 - y0 + hh * y3, f = y0;
  // unit square → quad, then scale the element's w×h down to the unit square
  const m = [a / w, d / w, 0, g / w, b / h, e / h, 0, hh / h, 0, 0, 1, 0, c, f, 0, 1];
  return `matrix3d(${m.map((v) => +v.toFixed(9)).join(",")})`;
}

/**
 * The hero: a laptop rendered in Blender (72 frames, one set for landscape and one for
 * portrait screens) opens as you scroll and the camera pushes in until its screen fills
 * the view. The screen is the real reel video, laid onto the rendered display with the
 * corners Blender exported for each frame, so it plays live while the laptop moves.
 */
export function LaptopHero({ desktop, mobile }: { desktop: Set; mobile: Set }) {
  const wrap = useRef<HTMLElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = wrap.current!, canvas = cv.current!, video = vid.current!, text = copy.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let set: Set = desktop;
    const frames: (ImageBitmap | HTMLImageElement | null)[] = [];
    let cw = 0, ch = 0, dpr = 1, cur = 0, target = 0, raf = 0, alive = true, visible = true;
    let fit = { s: 1, ox: 0, oy: 0 };

    const load = (i: number) =>
      new Promise<void>((res) => {
        const im = new Image();
        im.decoding = "async";
        im.src = `${set.dir}/${String(i).padStart(3, "0")}.webp`;
        im.onload = async () => {
          try {
            frames[i] = "createImageBitmap" in window ? await createImageBitmap(im) : im;
          } catch {
            frames[i] = im;
          }
          if (i === Math.round(cur) || i === 0) draw();
          res();
        };
        im.onerror = () => res();
      });

    const pick = () => {
      const s = innerWidth / innerHeight < 0.9 ? mobile : desktop;
      if (s !== set || !frames.length) {
        set = s;
        frames.length = 0;
        frames.length = N;
        // first frame, then the rest in order of need
        load(0).then(async () => {
          for (let i = 1; i < N && alive; i += 6) await Promise.all([0, 1, 2, 3, 4, 5].map((k) => (i + k < N ? load(i + k) : null)));
        });
      }
    };

    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      cw = canvas.clientWidth;
      ch = canvas.clientHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      // contain, not cover: the frames fade to black at their edges, so letterboxing is invisible
      // and the screen is never cropped on a narrow phone
      const s = Math.min(cw / set.w, ch / set.h);
      fit = { s, ox: (cw - set.w * s) / 2, oy: (ch - set.h * s) / 2 };
    };

    const nearest = (i: number) => {
      for (let d = 0; d < N; d++) {
        if (frames[i - d]) return frames[i - d];
        if (frames[i + d]) return frames[i + d];
      }
      return null;
    };

    function draw() {
      const i = Math.min(N - 1, Math.max(0, Math.floor(cur))), t = cur - i;
      // at the top the laptop sits low, under the headline; it rises into place as it opens
      const p0 = Math.min(1, cur / (N - 1) / 0.4);
      const oy = fit.oy + (1 - p0 * p0 * (3 - 2 * p0)) * ch * (set === mobile ? 0.1 : 0.17);
      const A = frames[i] || nearest(i), B = frames[Math.min(N - 1, i + 1)];
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, cw, ch);
      if (A) {
        ctx.globalAlpha = 1;
        ctx.drawImage(A, fit.ox, oy, set.w * fit.s, set.h * fit.s);
        if (B && t > 0.01) {
          ctx.globalAlpha = t;
          ctx.drawImage(B, fit.ox, oy, set.w * fit.s, set.h * fit.s);
          ctx.globalAlpha = 1;
        }
      }
      // screen: interpolate the projected corners between the two frames
      const P = set.proj[i], Pn = set.proj[Math.min(N - 1, i + 1)];
      const pts = (["tl", "tr", "br", "bl"] as const).map((k) => {
        const x = P.q[k][0] + (Pn.q[k][0] - P.q[k][0]) * t, y = P.q[k][1] + (Pn.q[k][1] - P.q[k][1]) * t;
        return [fit.ox + x * set.w * fit.s, oy + y * set.h * fit.s];
      });
      const ang = P.a + (Pn.a - P.a) * t;
      const on = Math.min(1, Math.max(0, (ang - 70) / 35)) * Math.min(1, P.v * 1.2);
      video.style.opacity = on.toFixed(3);
      if (on > 0.001) video.style.transform = quadMatrix(1600, 1000, pts);
      const p = cur / (N - 1);
      text.style.opacity = Math.max(0, 1 - p * 3.2).toFixed(3);
      text.style.transform = `translate3d(0,${(-p * 60).toFixed(1)}px,0)`;
      if (on > 0.05 && video.paused) video.play().catch(() => {});
    }

    const progress = () => {
      const r = sec.getBoundingClientRect();
      const span = sec.offsetHeight - innerHeight;
      return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
    };

    const tick = () => {
      raf = 0;
      const d = target - cur;
      cur = Math.abs(d) < 0.002 ? target : cur + d * 0.16;
      draw();
      if (cur !== target) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      target = reduce ? 40 : progress() * (N - 1);
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    pick();
    size();
    kick();
    const onResize = () => {
      pick();
      size();
      draw();
      kick();
    };
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (!visible) video.pause();
      else kick();
    });
    io.observe(sec);
    return () => {
      alive = false;
      io.disconnect();
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [desktop, mobile]);

  return (
    <section ref={wrap} className="lh" aria-label="Pradžia">
      <div className="lh-stick">
        <canvas ref={cv} className="lh-cv" aria-hidden="true" />
        <video
          ref={vid}
          className="lh-screen"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/prev/reel.webp"
          width={1600}
          height={1000}
          aria-label="Ištraukos iš mano sukurtų svetainių"
        >
          <source src="/prev/reel-m.mp4" type="video/mp4" media="(max-width: 760px)" />
          <source src="/prev/reel.mp4" type="video/mp4" />
        </video>
        <div ref={copy} className="lh-copy">
          <p className="eyebrow h1">
            <span className="dot" aria-hidden="true" />
            Ąžuolas · Palanga · Nepriklausomas dizaineris
          </p>
          <h1 className="h2">
            Svetainės, kurios <em>atrodo kitaip</em> ir parduoda.
          </h1>
        </div>
      </div>
    </section>
  );
}
