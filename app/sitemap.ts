import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site";

const routes = ["", "about", "services", "portfolio", "process", "faq", "contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: route ? `${SITE_URL}/${route}` : `${SITE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
