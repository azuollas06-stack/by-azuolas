import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Deliberately nonce-free.
 *
 * A nonce-based CSP needs middleware on every request, which would make each
 * page dynamic and give up static rendering across the whole site. This is a
 * static marketing site with no forms, no auth and no user input, so the XSS
 * surface it would protect is essentially nil — not worth trading the
 * performance of every page for. `'unsafe-inline'` here still leaves the
 * valuable part intact: no third-party origin can load script, and the site
 * cannot be framed.
 *
 * Fonts are self-hosted by next/font at build time, so no external font origin
 * is needed.
 *
 * The concept sites under /darbai are standalone pages that load Google Fonts,
 * so that path gets its own policy (declared after the global one, which it
 * overrides) allowing exactly those two origins.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  // Dev needs eval and a websocket for Fast Refresh; production gets neither.
  isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'",
  isDev ? "connect-src 'self' ws: wss:" : "connect-src 'self'",
  "upgrade-insecure-requests",
].join("; ");

const conceptPolicy = contentSecurityPolicy
  .replace("style-src 'self' 'unsafe-inline'", "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com")
  .replace("font-src 'self'", "font-src 'self' https://fonts.gstatic.com");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Redundant with frame-ancestors on modern browsers, kept for older ones.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/darbai/:path*", headers: [{ key: "Content-Security-Policy", value: conceptPolicy }] },
    ];
  },
  // The old multi-page site collapsed into one page; keep its links working.
  async redirects() {
    const to = (source: string, hash: string) => ({ source, destination: `/#${hash}`, permanent: true });
    return [
      to("/portfolio", "darbai"),
      to("/concepts/:path*", "darbai"),
      to("/services", "paslaugos"),
      to("/process", "paslaugos"),
      to("/about", "top"),
      to("/faq", "paslaugos"),
      to("/contact", "kontaktai"),
    ];
  },
};

export default nextConfig;
