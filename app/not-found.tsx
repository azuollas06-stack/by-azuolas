import Link from "next/link";

export const metadata = {
  title: "Puslapis nerastas · BY.AZUOLAS",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="nf">
      <p className="eyebrow">404</p>
      <h1>Tokio puslapio nėra.</h1>
      <Link className="btn" href="/">
        Į pradžią
      </Link>
    </main>
  );
}
