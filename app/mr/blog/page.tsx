import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { getBlogPosts } from "@/lib/site-db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ब्लॉग | वन ओ बिल्डकॉन — पुण्यातील बांधकाम मार्गदर्शन",
  description:
    "पुणे आणि पिंपरी-चिंचवडमध्ये घर बांधकामाबाबत उपयुक्त माहिती — बांधकाम खर्च प्रति स्क्वेअर फूट, टर्नकी पॅकेजमध्ये काय येते, आणि कंत्राटदार निवडताना काय तपासावे.",
  alternates: {
    canonical: "https://oneobuildcon.com/mr/blog",
    languages: {
      "en-IN": "https://oneobuildcon.com/blog",
      "mr-IN": "https://oneobuildcon.com/mr/blog",
    },
  },
};

function optimisable(url: string) {
  return url.startsWith("/") || /^https:\/\/[^/]*\.supabase\.co\//.test(url);
}

function formatDate(d: string) {
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? d : dt.toLocaleDateString("mr-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function MarathiBlogIndex() {
  // Only posts that actually have a Marathi version — a half-translated page
  // is worse than none for both readers and search.
  const posts = (await getBlogPosts())
    .filter((p) => p.published && p.mr?.title && p.mr?.body)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="bg-cream">
      <section className="bg-navy px-6 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold sm:text-5xl">
            बांधकाम <span className="text-amber-light">मार्गदर्शन</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            पुणे आणि पिंपरी-चिंचवडमध्ये घर बांधताना खर्च किती येतो, पॅकेजमध्ये काय समाविष्ट असते
            आणि कंत्राटदार निवडण्यापूर्वी काय विचारावे — सरळ आणि स्पष्ट माहिती.
          </p>
          <Link href="/blog" className="mt-5 inline-block text-sm font-semibold text-amber-light hover:underline">
            Read in English →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        {posts.length === 0 ? (
          <p className="text-navy/60">लवकरच लेख प्रकाशित केले जातील.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/mr/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/8 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {p.cover ? (
                  optimisable(p.cover) ? (
                    <div className="relative h-44 w-full">
                      <Image src={p.cover} alt={p.mr!.title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.cover} alt={p.mr!.title} className="h-44 w-full object-cover" />
                  )
                ) : (
                  <div className="h-3 w-full bg-gradient-to-r from-navy to-amber" />
                )}
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-amber">
                    <CalendarDays className="h-3.5 w-3.5" /> {formatDate(p.date)}
                  </div>
                  <h2 className="mb-2 text-lg font-bold leading-snug text-navy group-hover:text-amber">{p.mr!.title}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-navy/70">{p.mr!.summary}</p>
                  <span className="mt-4 text-sm font-semibold text-navy group-hover:text-amber">पुढे वाचा →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
