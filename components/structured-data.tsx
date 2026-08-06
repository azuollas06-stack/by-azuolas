import { SITE_NAME, SITE_URL } from "@/lib/site";

const INSTAGRAM_URL = "https://www.instagram.com/by.azuolas/";

/**
 * Organization + WebSite rather than LocalBusiness/ProfessionalService.
 *
 * Those subtypes expect a postal address and opening hours, and inventing them
 * to satisfy a schema validator would put false information in front of search
 * engines. Everything below is verifiable from the site itself.
 */
const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      description:
        "Shopify parduotuvių, svetainių ir prekės ženklo identiteto kūrimas verslams Lietuvoje.",
      logo: `${SITE_URL}/media/logo-mark.png`,
      image: `${SITE_URL}/media/azuolas-sedi.png`,
      areaServed: { "@type": "Country", name: "Lietuva" },
      knowsLanguage: ["lt", "en"],
      sameAs: [INSTAGRAM_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: "lt-LT",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Static, author-controlled content. The `<` escape is belt-and-braces
      // against a future value ever closing the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  );
}
