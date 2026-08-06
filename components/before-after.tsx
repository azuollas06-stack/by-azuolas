"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BeforeAfterProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel: string;
  afterLabel: string;
};

export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel,
  afterLabel,
}: BeforeAfterProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  // Explicit rather than inferred from hasPointerCapture: capture can fail or
  // be unsupported, and the drag must not silently stop tracking when it does.
  const draggingRef = useRef(false);
  // Percentage of the frame still showing the old site, measured from the left.
  const [position, setPosition] = useState(50);

  const setFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    // Capture so the drag survives the pointer leaving the frame; best effort.
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignored — draggingRef already keeps the gesture alive.
    }
    setFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    setFromClientX(event.clientX);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignored — nothing to release.
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - step));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + step));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      setPosition(100);
    }
  };

  return (
    <div>
      <div
        ref={frameRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        // pan-y rather than none: a horizontal drag is ours, but the page must
        // still scroll vertically when a finger passes over the image.
        className="relative touch-pan-y select-none overflow-hidden rounded-2xl border border-white/10 bg-black sm:rounded-[1.5rem]"
      >
        {/* The finished site sits underneath; the old one is clipped over it. */}
        <Image
          src={afterSrc}
          alt={afterAlt}
          width={1600}
          height={785}
          quality={82}
          sizes="(min-width: 1024px) 900px, 100vw"
          className="pointer-events-none w-full"
          draggable={false}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            width={1600}
            height={785}
            quality={82}
            sizes="(min-width: 1024px) 900px, 100vw"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-white/70"
          style={{ left: `${position}%` }}
        />

        <div
          role="slider"
          tabIndex={0}
          aria-label="Palyginti seną ir naują svetainę"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% senos svetainės`}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-white/70 bg-black/70 text-white backdrop-blur-md transition-colors duration-200 hover:border-[#c7a97b] hover:text-[#c7a97b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c7a97b] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          style={{ left: `${position}%` }}
        >
          <ChevronLeft className="h-4 w-4" />
          <ChevronRight className="-ml-1 h-4 w-4" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">{beforeLabel}</span>
        <span className="text-[11px] uppercase tracking-[0.25em] text-white/25">Tempkite</span>
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c7a97b]">{afterLabel}</span>
      </div>
    </div>
  );
}
