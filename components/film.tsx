"use client";

import { useRef, useState } from "react";
import type { Film as FilmT } from "@/lib/content";

export function Film({ film }: { film: FilmT }) {
  const [tall, setTall] = useState(false);
  const v = useRef<HTMLVideoElement>(null);

  const pick = (t: boolean) => {
    v.current?.pause();
    setTall(t);
  };

  return (
    <figure className={`film${tall ? " tall" : ""}`}>
      <div className="frame">
        <video
          ref={v}
          key={tall ? "t" : "w"}
          controls
          playsInline
          preload="none"
          poster={tall ? undefined : film.poster}
          src={tall && film.tall ? film.tall : film.src}
        />
      </div>
      <figcaption>
        <span>
          {film.title} <i>{film.note}</i>
        </span>
        {film.tall && (
          <span className="fmt" role="group" aria-label="Formatas">
            <button type="button" aria-pressed={!tall} onClick={() => pick(false)}>
              16:9
            </button>
            <button type="button" aria-pressed={tall} onClick={() => pick(true)}>
              9:16
            </button>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
