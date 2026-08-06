import { MetadataRoute } from "next";
import { getProjects } from "@/lib/db";
import { serviceAreas } from "@/lib/serviceAreas";
import { getBlogPosts } from "@/lib/site-db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://oneobuildcon.com";

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: "monthly" as const },
    { url: `${base}/projects`, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/services`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/about`, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/contact`, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/calculator`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/packages`, priority: 0.6, changeFrequency: "monthly" as const },
    { url: `${base}/company-profile`, priority: 0.5, changeFrequency: "monthly" as const },
    { url: `${base}/gallery`, priority: 0.6, changeFrequency: "weekly" as const },
    { url: `${base}/blog`, priority: 0.7, changeFrequency: "weekly" as const },
    { url: `${base}/mr/blog`, priority: 0.7, changeFrequency: "weekly" as const },
    ...serviceAreas.map((a) => ({ url: `${base}/${a.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
  ];

  // Pull live projects from the DB so admin-added projects appear in the sitemap.
  // Falls back to the static portfolio inside getProjects() if the DB is unavailable.
  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectPages = projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    }));
  } catch (e) {
    console.error("sitemap: could not load projects:", e);
  }

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    blogPages = posts
      .filter((p) => p.published)
      .flatMap((p) => [
        {
          url: `${base}/blog/${p.slug}`,
          lastModified: new Date(p.date),
          priority: 0.7,
          changeFrequency: "monthly" as const,
        },
        // Marathi versions are separate URLs, so they need their own entries.
        ...(p.mr?.title && p.mr?.body
          ? [{
              url: `${base}/mr/blog/${p.slug}`,
              lastModified: new Date(p.date),
              priority: 0.7,
              changeFrequency: "monthly" as const,
            }]
          : []),
      ]);
  } catch (e) {
    console.error("sitemap: could not load blog posts:", e);
  }

  return [...staticPages, ...projectPages, ...blogPages];
}
