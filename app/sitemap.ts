import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://oneobuildcon.com";

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${base}/projects`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/services`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/calculator`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/packages`, priority: 0.6, changeFrequency: "monthly" as const },
  ];

  const projectPages = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticPages, ...projectPages];
}
