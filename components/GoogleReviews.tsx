"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

type Review = {
  author: string;
  photo?: string;
  rating: number;
  text: string;
  relative: string;
  url?: string;
};

type Payload = {
  configured: boolean;
  rating: number | null;
  total: number;
  mapsUrl?: string | null;
  reviews: Review[];
};

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= Math.round(n) ? "fill-amber text-amber" : "text-white/25"}`}
        />
      ))}
    </div>
  );
}

/**
 * Live Google reviews. Renders nothing until the Places API is configured and
 * has returned something, so the page never shows an empty shell — the caller
 * keeps its own fallback content for that case.
 */
export default function GoogleReviews({
  onLoaded,
  lang = "en",
}: {
  onLoaded?: (hasReviews: boolean) => void;
  lang?: "en" | "mr";
}) {
  const [data, setData] = useState<Payload | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((d: Payload) => {
        if (!alive) return;
        setData(d);
        onLoaded?.(!!d?.reviews?.length);
      })
      .catch(() => onLoaded?.(false));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data?.reviews?.length) return null;

  const t =
    lang === "mr"
      ? { on: "Google वर", reviews: "रिव्ह्यू", all: "सर्व रिव्ह्यू पहा" }
      : { on: "on Google", reviews: "reviews", all: "See all reviews" };

  return (
    <div>
      {data.rating != null && (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-3xl font-bold text-white">{data.rating.toFixed(1)}</span>
          <Stars n={data.rating} />
          <span className="text-sm text-white/60">
            {data.total} {t.reviews} {t.on}
          </span>
          {data.mapsUrl && (
            <a
              href={data.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-amber-light hover:underline"
            >
              {t.all} →
            </a>
          )}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {data.reviews.slice(0, 9).map((r, i) => (
          <figure key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <Stars n={r.rating} />
            <blockquote className="mt-3 text-sm leading-relaxed text-white/80">
              &ldquo;{r.text.length > 260 ? `${r.text.slice(0, 260).trimEnd()}…` : r.text}&rdquo;
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              {r.photo ? (
                // Google serves these from its own CDN; a plain img avoids
                // having to allow another remote host in the image config.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={r.photo} alt="" className="h-9 w-9 rounded-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/20 text-sm font-bold text-amber">
                  {r.author.charAt(0)}
                </span>
              )}
              <span>
                <span className="block text-sm font-semibold text-white">{r.author}</span>
                <span className="block text-xs text-white/50">{r.relative}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
