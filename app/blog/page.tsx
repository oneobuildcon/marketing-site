import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { getBlogPosts } from "@/lib/site-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | One O Buildcon — Construction Guides for Pune Home Owners",
  description:
    "Practical guides on house construction in Pune — costs per sq.ft, what turnkey packages include, choosing a contractor, and how built-up area is measured.",
  alternates: { canonical: "https://oneobuildcon.com/blog" },
  openGraph: {
    title: "One O Buildcon Blog",
    description: "Practical guides on building a house in Pune, written by people who build them.",
    url: "https://oneobuildcon.com/blog",
    siteName: "One O Buildcon",
  },
};

// next/image only accepts hosts listed in next.config.mjs.
function optimisable(url: string) {
  return url.startsWith("/") || /^https:\/\/[^/]*\.supabase\.co\//.test(url);
}

function formatDate(d: string) {
  const dt = new Date(d);
  return isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogIndex() {
  const posts = (await getBlogPosts())
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-cream">
      <section className="bg-navy px-6 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold sm:text-5xl">
            Building <span className="text-amber-light">Knowledge</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Straight answers about building a house in Pune — what things cost, what packages
            include, and what to ask before you hire anyone.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        {posts.length === 0 ? (
          <p className="text-navy/60">No posts yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {p.cover ? (
                  // Optimised through next/image so a full-size phone photo is
                  // not shipped to a phone. Falls back to a plain img for URLs
                  // outside the configured remote hosts.
                  optimisable(p.cover) ? (
                    <div className="relative h-44 w-full">
                      <Image
                        src={p.cover}
                        alt={p.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.cover} alt={p.title} className="h-44 w-full object-cover" />
                  )
                ) : (
                  <div className="h-3 w-full bg-gradient-to-r from-navy to-amber" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber">
                    <CalendarDays className="h-3.5 w-3.5" /> {formatDate(p.date)}
                  </div>
                  <h2 className="mb-2 text-lg font-bold leading-snug text-navy group-hover:text-amber">
                    {p.title}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-navy/70">{p.summary}</p>
                  <span className="mt-4 text-sm font-semibold text-navy group-hover:text-amber">
                    Read more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
