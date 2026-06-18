"use client";

import { useLanguage } from "@/lib/LanguageContext";

const translations = {
  en: {
    tagline: "From blueprint to brilliance.",
    contact: "Contact",
    phone: "Phone",
    email: "Email",
    address: "Address",
    quickLinks: "Quick Links",
    services: "Services",
    projects: "Projects",
    contactLink: "Contact",
    rights: "All rights reserved.",
  },
  mr: {
    tagline: "ब्लूप्रिंटपासून उत्कृष्टतेपर्यंत.",
    contact: "संपर्क",
    phone: "फोन",
    email: "ईमेल",
    address: "पत्ता",
    quickLinks: "द्रुत दुवे",
    services: "सेवा",
    projects: "प्रकल्प",
    contactLink: "संपर्क करा",
    rights: "सर्व हक्क राखीव.",
  },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];

  return (
    <footer className="bg-navy-dark text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-white">
            One O <span className="text-amber-light">Buildcon</span>
          </h3>
          <p className="mt-2 text-sm">{t.tagline}</p>
        </div>

        <div>
          <h4 className="font-semibold text-white">{t.contact}</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li>{t.phone}: +91 88060 29907</li>
            <li>{t.email}: oneobuildcon@gmail.com</li>
            <li>{t.address}: Pune, Maharashtra, India</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">{t.quickLinks}</h4>
          <ul className="mt-2 space-y-1 text-sm">
            <li><a href="/services" className="hover:text-amber-light">{t.services}</a></li>
            <li><a href="/projects" className="hover:text-amber-light">{t.projects}</a></li>
            <li><a href="/contact" className="hover:text-amber-light">{t.contactLink}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-xs flex items-center justify-center gap-4">
        <span>© 2021 One O Buildcon. {t.rights}</span>
        <a href="/admin" className="text-white/20 hover:text-white/40 transition text-xs">Admin</a>
      </div>
    </footer>
  );
}
