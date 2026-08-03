import Link from "next/link";

export function ConceptBadge({ label, name, dark = false }: { label: string; name: string; dark?: boolean }) {
  const tone = dark ? "border-white/25 bg-black/30 text-white backdrop-blur-md" : "border-stone-300 bg-white/70 text-stone-900 backdrop-blur-md";
  return (
    <Link
      href="/concepts"
      className={`fixed left-5 top-5 z-50 flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.25em] transition-opacity hover:opacity-80 ${tone}`}
    >
      ← Konceptas {label} · {name}
    </Link>
  );
}
