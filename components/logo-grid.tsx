"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { Logo } from "@/lib/content";

export function LogoGrid({ logos }: { logos: Logo[] }) {
  const dlg = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<Logo | null>(null);

  const show = (l: Logo) => {
    setOpen(l);
    dlg.current?.showModal();
  };

  return (
    <>
      <ul className="logos">
        {logos.map((l, i) => (
          <li key={l.file} className={i === 0 ? "wide" : undefined} data-r>
            <button
              type="button"
              onClick={() => show(l)}
              aria-label={`Padidinti: ${l.name}`}
              className={l.fill ? "fill" : undefined}
              style={{ background: l.bg }}
            >
              <Image src={l.file} alt={`Logotipas ${l.name}`} width={l.w} height={l.h} sizes="(min-width: 900px) 40vw, 100vw" />
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dlg}
        className="lightbox"
        onClick={(e) => e.target === dlg.current && dlg.current?.close()}
        onClose={() => setOpen(null)}
      >
        {open && <Image src={open.file} alt={`Logotipas ${open.name}`} width={open.w} height={open.h} sizes="90vw" />}
        <form method="dialog">
          <button type="submit">Uždaryti</button>
        </form>
      </dialog>
    </>
  );
}
