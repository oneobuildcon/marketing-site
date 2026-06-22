"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";

function Instagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Behold loads its widget as a custom element; declare it for TypeScript/JSX.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "feed-id"?: string;
      };
    }
  }
}

const BEHOLD_FEED_ID = "dbv65Oku9uLS1gglEzYa";
const INSTAGRAM_URL = "https://www.instagram.com/one_o_buildcon/";

const copy = {
  en: {
    badge: "Follow Our Journey",
    title: "Latest from Instagram",
    desc: "See our newest projects, site updates and finished homes — fresh from the field.",
    follow: "Follow @one_o_buildcon",
    viewAll: "View Full Gallery",
    galleryTitle: "Our Instagram Gallery",
    galleryDesc: "Every project, site update and finished home we share on Instagram — all in one place.",
  },
  mr: {
    badge: "आमचा प्रवास फॉलो करा",
    title: "इंस्टाग्रामवरील ताजे अपडेट्स",
    desc: "आमचे नवीन प्रकल्प, साइट अपडेट्स आणि पूर्ण झालेली घरे पहा — थेट कामाच्या ठिकाणाहून.",
    follow: "फॉलो करा @one_o_buildcon",
    viewAll: "संपूर्ण गॅलरी पहा",
    galleryTitle: "आमची इंस्टाग्राम गॅलरी",
    galleryDesc: "इंस्टाग्रामवर शेअर केलेले प्रत्येक प्रकल्प, साइट अपडेट आणि पूर्ण झालेले घर — एकाच ठिकाणी.",
  },
};

// `full` = the dedicated /gallery page (shows everything).
// Default (homepage) shows a compact preview capped to ~2 rows with a "View Full Gallery" link.
export default function InstagramFeed({ full = false }: { full?: boolean }) {
  const { lang } = useLanguage();
  const t = copy[lang] ?? copy.en;

  useEffect(() => {
    if (document.getElementById("behold-widget-script")) return;
    const s = document.createElement("script");
    s.id = "behold-widget-script";
    s.type = "module";
    s.src = "https://w.behold.so/widget.js";
    document.head.appendChild(s);
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber">
            <Instagram className="h-4 w-4" /> {t.badge}
          </p>
          <h2 className="mt-2 text-3xl font-bold text-navy">{full ? t.galleryTitle : t.title}</h2>
          <p className="mt-3 max-w-xl text-navy/60">{full ? t.galleryDesc : t.desc}</p>
        </div>

        {full ? (
          <div className="mt-10">
            <behold-widget feed-id={BEHOLD_FEED_ID} />
          </div>
        ) : (
          // Compact preview: cap the height and fade the bottom so the homepage stays short.
          <div className="relative mt-10 max-h-[640px] overflow-hidden">
            <behold-widget feed-id={BEHOLD_FEED_ID} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
          </div>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {!full && (
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-md bg-amber px-8 py-3.5 font-semibold text-navy-dark transition hover:bg-amber-light hover:scale-105 transform"
            >
              {t.viewAll}
            </Link>
          )}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-navy px-8 py-3.5 font-semibold text-white transition hover:bg-navy-dark hover:scale-105 transform"
          >
            <Instagram className="h-5 w-5" /> {t.follow}
          </a>
        </div>
      </div>
    </section>
  );
}
