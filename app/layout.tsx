import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Bebas_Neue } from "next/font/google";
import "./globals.css";

import { SmoothScroll } from "@/components/smooth-scroll";
import { FilmGrain } from "@/components/film-grain";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";
import { MotionProvider } from "@/components/motion-provider";
import { SITE_URL } from "@/lib/site";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin", "latin-ext"], variable: "--font-display", weight: ["400", "500", "600", "700"] });
const bebasNeue = Bebas_Neue({ subsets: ["latin", "latin-ext"], variable: "--font-condensed", weight: "400" });

const title = "BY.AZUOLAS | Premium skaitmeninis dizainas verslui";
const description =
  "Kuriu premium svetaines, Shopify parduotuves, prekės ženklo identitetą ir UX/UI dizainą verslams, kurie nori atrodyti ir jaustis premium.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | BY.AZUOLAS",
  },
  description,
  alternates: { canonical: "/" },
  keywords: [
    "premium svetainių kūrimas",
    "Shopify parduotuvė",
    "prekės ženklo identitetas",
    "UX/UI dizainas",
    "logotipo kūrimas",
    "digital brand agency",
  ],
  authors: [{ name: "BY.AZUOLAS" }],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "lt_LT",
    url: SITE_URL,
    siteName: "BY.AZUOLAS",
    images: [{ url: "/media/azuolas-sedi.png", width: 1536, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/media/azuolas-sedi.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="lt"
      className={`${inter.variable} ${playfair.variable} ${bebasNeue.variable}`}
    >
      <body>
        {/* Wraps the overlays too — CursorGlow and ScrollProgress are Framer
            components and sit outside SmoothScroll. */}
        <MotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <FilmGrain />
          <CursorGlow />
          <ScrollProgress />
        </MotionProvider>
      </body>
    </html>
  );
}
