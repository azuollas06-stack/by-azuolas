import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Bebas_Neue, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { SmoothScroll } from "@/components/smooth-scroll";
import { FilmGrain } from "@/components/film-grain";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"] });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], variable: "--font-condensed", weight: "400" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grid", weight: ["400", "500", "700"] });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-grid", weight: ["400", "500"] });

const title = "BY.AZUOLAS | Premium skaitmeninis dizainas verslui";
const description =
  "Kuriu premium svetaines, Shopify parduotuves, prekės ženklo identitetą ir UX/UI dizainą verslams, kurie nori atrodyti ir jaustis premium.";

export const metadata: Metadata = {
  metadataBase: new URL("https://byazuolas.com"),
  title: {
    default: title,
    template: "%s | BY.AZUOLAS",
  },
  description,
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
    siteName: "BY.AZUOLAS",
    images: [{ url: "/media/azuolas-sedi.png", width: 1200, height: 1500 }],
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
      className={`${inter.variable} ${playfair.variable} ${bebasNeue.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
        <FilmGrain />
        <CursorGlow />
        <ScrollProgress />
      </body>
    </html>
  );
}
