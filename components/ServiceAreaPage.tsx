import Link from "next/link";
import { CheckCircle2, Phone, Calculator, MapPin, HardHat } from "lucide-react";
import type { ServiceArea } from "@/lib/serviceAreas";
import { getBlogPosts } from "@/lib/site-db";

// Server-rendered locality landing page (no client JS beyond the shared
// Navbar/Footer) — keeps it fast on mobile.
export default async function ServiceAreaPage({ area }: { area: ServiceArea }) {
  // Three most recent guides, so these pages feed the blog and the blog feeds
  // them back — internal links Google can follow in both directions.
  const guides = (await getBlogPosts())
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: area.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center gap-2">
            <HardHat className="h-5 w-5 text-amber" />
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">{area.badge}</p>
          </div>
          <h1 className="mt-3 text-4xl font-bold sm:text-5xl">{area.h1}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{area.intro[0]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-xl bg-amber px-6 py-3 text-sm font-semibold text-navy-dark transition hover:bg-amber-light">Get a Free Quote →</Link>
            <Link href="/calculator" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"><Calculator className="h-4 w-4" /> Cost Calculator</Link>
            <a href="tel:+919607407474" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"><Phone className="h-4 w-4" /> Call Now</a>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-6 space-y-4">
          {area.intro.slice(1).map((p, i) => (
            <p key={i} className="text-navy/75 leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-navy">What we do in {area.locality}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {area.services.map((s) => (
              <div key={s.title} className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm">
                <h3 className="font-bold text-navy">{s.title}</h3>
                <p className="mt-1 text-sm text-navy/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-navy">Why choose One O Buildcon</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {area.why.map((w) => (
              <div key={w} className="flex items-center gap-3 rounded-xl border border-black/8 p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-amber" />
                <span className="text-sm font-medium text-navy/80">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-bold text-navy">Areas we serve near {area.locality}</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {area.nearby.map((n) => (
              <span key={n} className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm font-medium text-navy/70">
                <MapPin className="h-3.5 w-3.5 text-amber" /> {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-14">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold text-navy">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {area.faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-black/8 p-6">
                <h3 className="font-semibold text-navy">{f.q}</h3>
                <p className="mt-2 text-sm text-navy/70 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides */}
      {guides.length > 0 && (
        <section className="bg-white py-14">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-1 text-2xl font-bold text-navy">Useful guides</h2>
            <p className="mb-6 text-sm text-navy/60">Costs, timelines and what to check before you appoint a contractor.</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/blog/${g.slug}`}
                  className="group rounded-xl border border-black/8 p-4 transition hover:border-amber/40 hover:shadow-sm"
                >
                  <div className="text-sm font-bold leading-snug text-navy group-hover:text-amber">{g.title}</div>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-navy/60">{g.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-navy py-14 text-white">
        <div className="mx-auto max-w-5xl px-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="text-2xl font-bold">Planning to build in {area.locality}?</h2>
            <p className="mt-2 text-white/60">Get a free estimate and site visit — no obligation.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rounded-xl bg-amber px-6 py-3 text-sm font-semibold text-navy-dark transition hover:bg-amber-light">Get a Free Quote →</Link>
            <a href="tel:+919607407474" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"><Phone className="h-4 w-4" /> +91 96074 07474</a>
          </div>
        </div>
      </section>
    </main>
  );
}
