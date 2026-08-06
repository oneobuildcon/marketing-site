import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Phone, User } from "lucide-react";
import BlogBody from "@/components/BlogBody";
import { getBlogPosts } from "@/lib/site-db";

export const dynamic = "force-dynamic";

async function findPost(slug: string) {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug && p.published) ?? null;
}

// Other published posts, newest first. Automatic, so posts written in the
// admin get linked without anyone having to maintain a list.
async function relatedPosts(slug: string, limit = 3) {
  const posts = await getBlogPosts();
  return posts
    .filter((p) => p.published && p.slug !== slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) return { title: "Post not found | One O Buildcon" };
  const url = `https://oneobuildcon.com/blog/${post.slug}`;
  return {
    title: `${post.title} | One O Buildcon`,
    description: post.summary,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      siteName: "One O Buildcon",
      publishedTime: post.date,
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
  };
}

function formatDate(d: string) {
  const dt = new Date(d);
  return isNaN(dt.getTime())
    ? d
    : dt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) notFound();
  const related = await relatedPosts(slug);

  // Article structured data, so the post can show a headline and date in search.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    ...(post.cover ? { image: post.cover } : {}),
    author: { "@type": "Organization", name: "One O Buildcon" },
    publisher: {
      "@type": "Organization",
      name: "One O Buildcon",
      logo: { "@type": "ImageObject", url: "https://oneobuildcon.com/logo.png" },
    },
    mainEntityOfPage: `https://oneobuildcon.com/blog/${post.slug}`,
  };

  // FAQPage markup is a bonus rather than a guarantee — Google has cut back FAQ
  // rich results — but it costs nothing and the block is useful to readers.
  const faqLd = post.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <div className="bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      <article className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy/60 transition hover:text-amber"
        >
          <ArrowLeft className="h-4 w-4" /> All posts
        </Link>

        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-amber">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" /> {formatDate(post.date)}
          </span>
          {post.author && (
            <span className="flex items-center gap-1.5 text-navy/50">
              <User className="h-3.5 w-3.5" /> {post.author}
            </span>
          )}
        </div>
        <h1 className="mb-4 text-2xl font-bold leading-tight text-navy sm:text-4xl">{post.title}</h1>
        <p className="mb-8 border-l-4 border-amber pl-4 text-base leading-relaxed text-navy/70">
          {post.summary}
        </p>

        {post.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover} alt={post.title} className="mb-8 w-full rounded-2xl object-cover" />
        )}

        <BlogBody body={post.body} />

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-navy sm:text-2xl">Frequently asked questions</h2>
            <div className="space-y-3">
              {post.faqs.map((f, i) => (
                <details key={i} className="group rounded-xl border border-black/8 bg-white p-4">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-navy marker:hidden">
                    {f.q}
                  </summary>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12 border-t border-black/8 pt-8">
            <h2 className="mb-4 text-xl font-bold text-navy sm:text-2xl">Read next</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-xl border border-black/8 bg-white p-4 transition hover:border-amber/40 hover:shadow-sm"
                >
                  <div className="text-sm font-bold leading-snug text-navy group-hover:text-amber">
                    {r.title}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-navy/60">{r.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-8 rounded-2xl border border-black/8 bg-white p-5">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-amber">Where we build</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <Link href="/rcc-contractor-pune" className="rounded-lg border border-navy/15 px-3 py-1.5 font-medium text-navy transition hover:border-amber hover:text-amber">
              RCC contractor in Pune
            </Link>
            <Link href="/bungalow-construction-pimpri-chinchwad" className="rounded-lg border border-navy/15 px-3 py-1.5 font-medium text-navy transition hover:border-amber hover:text-amber">
              Bungalow construction in Pimpri-Chinchwad
            </Link>
            <Link href="/construction-company-charholi" className="rounded-lg border border-navy/15 px-3 py-1.5 font-medium text-navy transition hover:border-amber hover:text-amber">
              Construction company in Charholi
            </Link>
            <Link href="/projects" className="rounded-lg border border-navy/15 px-3 py-1.5 font-medium text-navy transition hover:border-amber hover:text-amber">
              Our completed projects
            </Link>
            <Link href="/packages" className="rounded-lg border border-navy/15 px-3 py-1.5 font-medium text-navy transition hover:border-amber hover:text-amber">
              Packages &amp; rates
            </Link>
          </div>
        </section>

        <div className="mt-8 rounded-2xl border border-amber/30 bg-amber/5 p-6">
          <h2 className="mb-2 text-lg font-bold text-navy">Planning to build in Pune?</h2>
          <p className="mb-4 text-sm leading-relaxed text-navy/70">
            We prepare written quotations with the built-up area calculation, material rates, brands
            and a stage-wise payment schedule set out in full — so you can compare honestly.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-2.5 text-sm font-semibold text-navy-dark transition hover:bg-amber-light"
            >
              <Phone className="h-4 w-4" /> Get a quotation
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 rounded-xl border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5"
            >
              Cost calculator
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
