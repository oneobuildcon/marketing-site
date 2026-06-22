"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

type GalleryImage = { url: string; caption?: string };

const copy = {
  en: {
    badge: "Our Work",
    title: "Project Gallery",
    desc: "A look at the bungalows, row houses and residential projects we've built across Pune.",
    empty: "Photos coming soon.",
    follow: "Follow us on Instagram",
  },
  mr: {
    badge: "आमचे काम",
    title: "प्रकल्प गॅलरी",
    desc: "पुण्यात आम्ही बांधलेले बंगले, रो हाऊस आणि निवासी प्रकल्प पहा.",
    empty: "लवकरच फोटो येत आहेत.",
    follow: "इंस्टाग्रामवर फॉलो करा",
  },
};

const INSTAGRAM_URL = "https://www.instagram.com/one_o_buildcon/";

export default function GalleryPage() {
  const { lang } = useLanguage();
  const t = copy[lang] ?? copy.en;
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setImages(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-white pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber">{t.badge}</p>
          <h1 className="mt-2 text-4xl font-bold text-navy">{t.title}</h1>
          <p className="mx-auto mt-3 max-w-xl text-navy/60">{t.desc}</p>
        </div>

        {loading ? (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <p className="mt-12 text-center text-navy/50">{t.empty}</p>
        ) : (
          <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {images.map((img, i) => (
              <button
                key={img.url}
                onClick={() => setActive(i)}
                className="group block w-full overflow-hidden rounded-2xl shadow-sm focus:outline-none"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.caption || "One O Buildcon project"}
                  className="w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                {img.caption && (
                  <span className="block bg-navy/90 px-3 py-2 text-left text-sm text-white">{img.caption}</span>
                )}
              </button>
            ))}
          </div>
        )}

        <div className="mt-14 flex justify-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-navy px-8 py-3.5 font-semibold text-white transition hover:bg-navy-dark hover:scale-105 transform"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            {t.follow}
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && images[active] && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <button onClick={() => setActive(null)} className="absolute top-5 right-6 text-3xl text-white/80 hover:text-white" aria-label="Close">×</button>
          <figure onClick={(e) => e.stopPropagation()} className="max-h-[90vh] max-w-4xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images[active].url} alt={images[active].caption || "Project"} className="max-h-[80vh] w-auto rounded-lg object-contain" />
            {images[active].caption && (
              <figcaption className="mt-3 text-center text-sm text-white/80">{images[active].caption}</figcaption>
            )}
          </figure>
        </div>
      )}
    </main>
  );
}
