"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Old site on the left, new on the right; drag the handle (or use the arrow
 * keys on it) to move the line. The range input is the real control, so it
 * works with a keyboard and screen readers; the handle is its visual.
 */
export function BeforeAfter({ before, after, w, h }: { before: string; after: string; w: number; h: number }) {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);

  const fromPointer = (x: number) => {
    const r = box.current?.getBoundingClientRect();
    if (r) setPos(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className="ba"
      style={{ ["--p" as string]: `${pos}%` }}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        fromPointer(e.clientX);
      }}
      onPointerMove={(e) => e.buttons === 1 && fromPointer(e.clientX)}
    >
      <Image src={after} alt="Nauja Pas Smiltę svetainė" width={w} height={h} sizes="(min-width: 900px) 62vw, 100vw" className="ba-img" />
      <div className="ba-old" aria-hidden="true">
        <Image src={before} alt="" width={w} height={h} sizes="(min-width: 900px) 62vw, 100vw" className="ba-img" />
      </div>
      <span className="ba-tag ba-l">Senas</span>
      <span className="ba-tag ba-r">Naujas</span>
      <span className="ba-line" aria-hidden="true">
        <span className="ba-knob">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M9 6 3 12l6 6M15 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
      <input
        className="ba-range"
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(+e.target.value)}
        aria-label="Palyginti seną ir naują svetainę"
      />
    </div>
  );
}
