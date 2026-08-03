import type { MetadataRoute } from "next";

const routes = ["", "about", "services", "portfolio", "process", "faq", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://byazuolas.com/${route}`,
    lastModified: new Date(),
  }));
}
