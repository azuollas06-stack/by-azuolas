/**
 * Single source of truth for the site's absolute origin.
 *
 * Used by metadataBase, canonical URLs, robots and the sitemap. Kept in one
 * place because these previously disagreed with reality: they all pointed at
 * byazuolas.com, which does not resolve, so the sitemap advertised seven dead
 * URLs and every Open Graph image 404'd.
 *
 * When the custom domain goes live, set NEXT_PUBLIC_SITE_URL in the Vercel
 * project (no trailing slash) — nothing else needs to change.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://by-azuolas.vercel.app").replace(
  /\/$/,
  "",
);

export const SITE_NAME = "BY.AZUOLAS";
