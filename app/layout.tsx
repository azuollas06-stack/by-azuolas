import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { StructuredData } from "@/components/structured-data";
import { SITE_URL } from "@/lib/site";

// Self-hosted variable font (weight 100–900, width 62–125): one file covers the
// wide light wordmark and the normal body text.
const archivo = localFont({
  src: "./fonts/Archivo.woff2",
  variable: "--font",
  weight: "100 900",
  display: "swap",
});

const title = "BY.AZUOLAS · Svetainės, el. parduotuvės ir logotipai";
const description =
  "Ąžuolas, nepriklausomas dizaineris iš Lietuvos. Kuriu svetaines, Shopify parduotuves ir logotipus. Prie kiekvienos svetainės nemokamas reklaminis video.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    type: "website",
    locale: "lt_LT",
    url: SITE_URL,
    siteName: "BY.AZUOLAS",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/img/og.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  viewportFit: "cover",
};

// Runs before paint: a visitor who already saw the intro this session (or prefers
// reduced motion) never gets a flash of it.
const seen = `try{if(sessionStorage.getItem("byazuolas:intro")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("seen","ready")}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: seen }} />
      </head>
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
