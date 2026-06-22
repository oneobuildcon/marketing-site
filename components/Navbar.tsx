"use client";

import Link from "next/link";
import { useState } from "react";
import { Languages, Download } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const navLabels = {
  en: {
    about: "About",
    services: "Services",
    packages: "Packages",
    projects: "Projects",
    gallery: "Gallery",
    calculator: "Calculator",
    contact: "Contact",
    getQuote: "Get a Quote",
    toggleLabel: "मराठी",
  },
  mr: {
    about: "आमच्याबद्दल",
    services: "सेवा",
    packages: "पॅकेजेस",
    projects: "प्रकल्प",
    gallery: "गॅलरी",
    calculator: "कॅल्क्युलेटर",
    contact: "संपर्क करा",
    getQuote: "कोटेशन मागवा",
    toggleLabel: "English",
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = navLabels[lang];

  const links = [
    { href: "/about", label: t.about },
    { href: "/services", label: t.services },
    { href: "/packages", label: t.packages },
    { href: "/projects", label: t.projects },
    { href: "/gallery", label: t.gallery },
    { href: "/calculator", label: t.calculator },
    { href: "/contact", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-navy text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          One O <span className="text-amber-light">Buildcon</span>
        </Link>

        <ul className="hidden gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-white/90 transition hover:text-amber-light"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "en" ? "mr" : "en")}
            className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/90 transition hover:bg-white/10 hover:border-amber/40"
            aria-label="Toggle language"
          >
            <Languages className="h-3.5 w-3.5 text-amber" />
            {t.toggleLabel}
          </button>
          <Link
            href="/company-profile"
            className="flex items-center gap-1.5 rounded-full border border-amber/40 px-3 py-1.5 text-xs font-semibold text-amber transition hover:bg-amber/10"
            aria-label="View company profile"
          >
            <Download className="h-3.5 w-3.5" />
            {lang === "en" ? "Profile" : "प्रोफाइल"}
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <span className="block h-0.5 w-6 bg-white mb-1.5" />
          <span className="block h-0.5 w-6 bg-white mb-1.5" />
          <span className="block h-0.5 w-6 bg-white" />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-4 bg-navy-dark px-6 py-4 md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-sm font-medium text-white/90"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/company-profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-full border border-amber/40 px-4 py-2 text-sm font-semibold text-amber transition hover:bg-amber/10 w-fit"
            >
              <Download className="h-4 w-4" />
              {lang === "en" ? "Company Profile" : "कंपनी प्रोफाइल"}
            </Link>
          </li>
          <li>
            <button
              onClick={() => { setLang(lang === "en" ? "mr" : "en"); setOpen(false); }}
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              <Languages className="h-4 w-4 text-amber" />
              {t.toggleLabel}
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}
