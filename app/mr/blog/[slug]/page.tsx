import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Phone, User } from "lucide-react";
import BlogBody from "@/components/BlogBody";
import { getBlogPosts } from "@/lib/site-db";

export const dynamic = "force-dynamic";

async function findPost(slug: string) {
  const posts = await getBlogPosts();
  const p = posts.find((x) => x.slug === slug && x.published);
  return p?.mr?.title && p.mr.body ? p : null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) return { title: "लेख सापडला नाही | वन ओ बिल्डकॉन" };
  const mrUrl = `https://oneobuildcon.com/mr/blog/${post.slug}`;
  const enUrl = `https://oneobuildcon.com/blog/${post.slug}`;
  return {
    title: `${post.mr!.title} | वन ओ बिल्डकॉन`,
    description: post.mr!.summary,
    alternates: {
      canonical: mrUrl,
      // hreflang tells Google these are language versions of one page, not
      // duplicates — without it one of the two can be filtered out.
      languages: { "en-IN": enUrl, "mr-IN": mrUrl },
    },
    openGraph: {
      type: "article",
      title: post.mr!.title,
      description: post.mr!.summary,
      url: mrUrl,
      siteName: "One O Buildcon",
      locale: "mr_IN",
      publishedTime: post.date,
      ...(post.cover ? { images: [{ url: post.cover }] } : {}),
    },
  };
}

function optimisable(url: string) {
  return url.startsWith("/") || /^https:\/\/[^/]*\.supabase\.co\//.test(url);
}

function formatDate(d: string) {
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString("mr-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function MarathiPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await findPost(slug);
  if (!post) notFound();
  const mr = post.mr!;

  const all = await getBlogPosts();
  const related = all
    .filter((p) => p.published && p.slug !== slug && p.mr?.title)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: mr.title,
    description: mr.summary,
    inLanguage: "mr-IN",
    datePublished: post.date,
    ...(post.cover ? { image: post.cover } : {}),
    author: { "@type": "Organization", name: "One O Buildcon" },
    publisher: {
      "@type": "Organization",
      name: "One O Buildcon",
      logo: { "@type": "ImageObject", url: "https://oneobuildcon.com/logo.png" },
    },
    mainEntityOfPage: `https://oneobuildcon.com/mr/blog/${post.slug}`,
  };

  const faqLd = mr.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        inLanguage: "mr-IN",
        mainEntity: mr.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <div className="bg-cream">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <article className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link href="/mr/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy/60 transition hover:text-amber">
            <ArrowLeft className="h-4 w-4" /> सर्व लेख
          </Link>
          <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-amber hover:underline">
            Read in English →
          </Link>
        </div>

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
        <h1 className="mb-4 text-2xl font-bold leading-tight text-navy sm:text-4xl">{mr.title}</h1>
        <p className="mb-8 border-l-4 border-amber pl-4 text-base leading-relaxed text-navy/70">{mr.summary}</p>

        {post.cover &&
          (optimisable(post.cover) ? (
            <Image src={post.cover} alt={mr.title} width={1200} height={675} priority sizes="(max-width: 768px) 100vw, 768px" className="mb-8 h-auto w-full rounded-2xl object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.cover} alt={mr.title} className="mb-8 w-full rounded-2xl object-cover" />
          ))}

        <BlogBody body={mr.body} />

        {mr.faqs && mr.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 text-xl font-bold text-navy sm:text-2xl">वारंवार विचारले जाणारे प्रश्न</h2>
            <div className="space-y-3">
              {mr.faqs.map((f, i) => (
                <details key={i} className="group rounded-xl border border-black/8 bg-white p-4">
                  <summary className="cursor-pointer list-none text-sm font-semibold text-navy marker:hidden">{f.q}</summary>
                  <p className="mt-2 text-sm leading-relaxed text-navy/70">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12 border-t border-black/8 pt-8">
            <h2 className="mb-4 text-xl font-bold text-navy sm:text-2xl">हेही वाचा</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/mr/blog/${r.slug}`} className="group rounded-xl border border-black/8 bg-white p-4 transition hover:border-amber/40 hover:shadow-sm">
                  <div className="text-sm font-bold leading-snug text-navy group-hover:text-amber">{r.mr!.title}</div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-navy/60">{r.mr!.summary}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 rounded-2xl border border-amber/30 bg-amber/5 p-6">
          <h2 className="mb-2 text-lg font-bold text-navy">पुण्यात घर बांधण्याचा विचार करत आहात?</h2>
          <p className="mb-4 text-sm leading-relaxed text-navy/70">
            बिल्ट-अप क्षेत्राचे गणित, मटेरियल दर, ब्रँड आणि टप्प्यानुसार पेमेंट शेड्यूल — सर्व काही
            लेखी स्वरूपात, जेणेकरून तुम्ही प्रामाणिक तुलना करू शकाल.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-2.5 text-sm font-semibold text-navy-dark transition hover:bg-amber-light">
              <Phone className="h-4 w-4" /> कोटेशन मागवा
            </Link>
            <Link href="/calculator" className="inline-flex items-center gap-2 rounded-xl border border-navy/20 px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5">
              खर्च कॅल्क्युलेटर
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
