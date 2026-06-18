"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Tag, ArrowLeft, X, CheckCircle2, Ruler, Clock, IndianRupee, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { getProject } from "@/lib/projects";
import { useLanguage } from "@/lib/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ui = {
  en: {
    back: "Back to Projects",
    projectInfo: "Project Information",
    about: "About This Project",
    highlights: "Key Highlights",
    testimonial: "What Our Client Says",
    type: "Type",
    location: "Location",
    area: "Area",
    duration: "Duration",
    budget: "Budget Range",
    status: "Status",
    completed: "Completed",
    ongoing: "Ongoing",
    ctaTitle: "Interested in a Similar Project?",
    ctaSub: "Let our team bring your dream home to life. Get a free consultation today.",
    ctaBtn: "Get a Free Quote →",
    gallery: "Project Gallery",
  },
  mr: {
    back: "प्रकल्पांकडे परत",
    projectInfo: "प्रकल्प माहिती",
    about: "या प्रकल्पाबद्दल",
    highlights: "ठळक वैशिष्ट्ये",
    testimonial: "आमचे ग्राहक काय म्हणतात",
    type: "प्रकार",
    location: "ठिकाण",
    area: "क्षेत्रफळ",
    duration: "कालावधी",
    budget: "बजेट श्रेणी",
    status: "स्थिती",
    completed: "पूर्ण",
    ongoing: "सुरू आहे",
    ctaTitle: "अशाच प्रकल्पात स्वारस्य आहे?",
    ctaSub: "आमच्या टीमला तुमचे स्वप्नातील घर साकार करू द्या. आज मोफत सल्लामसलत घ्या.",
    ctaBtn: "मोफत कोटेशन मागवा →",
    gallery: "प्रकल्प गॅलरी",
  },
};

export default function ProjectDetail() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";
  const project = getProject(slug);
  const { lang } = useLanguage();
  const [zoom, setZoom] = useState<number | null>(null);

  const photoCount = project?.count ?? 0;
  const showPrev = useCallback(
    () => setZoom((z) => (z === null ? z : (z - 1 + photoCount) % photoCount)),
    [photoCount]
  );
  const showNext = useCallback(
    () => setZoom((z) => (z === null ? z : (z + 1) % photoCount)),
    [photoCount]
  );

  useEffect(() => {
    if (zoom === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") showNext();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "Escape") setZoom(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom, showNext, showPrev]);

  if (!project) return notFound();

  const t = ui[lang];
  const c = project[lang];
  const photos = Array.from({ length: project.count }, (_, i) => `/projects/${project.slug}/${i + 1}.jpg`);
  const statusLabel = project.status === "completed" ? t.completed : t.ongoing;

  const infoRows = [
    { icon: Tag, label: t.type, value: c.type },
    { icon: MapPin, label: t.location, value: c.location },
    { icon: Ruler, label: t.area, value: project.area },
    { icon: Clock, label: t.duration, value: project.duration },
    { icon: IndianRupee, label: t.budget, value: project.budget },
  ];

  return (
    <main className="overflow-hidden bg-gray-50">
      {/* Top bar */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-amber-light">
            <ArrowLeft className="h-4 w-4" /> {t.back}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold sm:text-4xl">{c.name}</h1>
            <span className={`rounded-full px-3 py-1 text-xs font-bold ${project.status === "completed" ? "bg-emerald-500 text-white" : "bg-amber text-navy-dark"}`}>
              {statusLabel}
            </span>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-white/70">
            <MapPin className="h-4 w-4 text-amber" /> {c.location}
          </p>
        </div>
      </section>

      {/* Gallery — clean proportioned grid */}
      <section className="bg-navy-dark py-8">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-lg font-bold text-amber mb-5">{t.gallery}</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {photos.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setZoom(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-black ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                <Image src={src} alt={`${c.name} ${i + 1}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw" priority={i === 0} />
                <div className="absolute inset-0 bg-navy/0 transition group-hover:bg-navy/25" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* Sidebar: Project Information */}
            <motion.aside initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="h-fit rounded-2xl bg-white border border-black/8 shadow-sm p-6">
              <h2 className="text-lg font-bold text-amber mb-5">{t.projectInfo}</h2>
              <ul className="space-y-4">
                {infoRows.map((row) => (
                  <li key={row.label} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber/10">
                      <row.icon className="h-4 w-4 text-amber" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">{row.label}</p>
                      <p className="text-sm font-medium text-navy">{row.value}</p>
                    </div>
                  </li>
                ))}
                <li className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber/10">
                    <BadgeCheck className="h-4 w-4 text-amber" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-navy/40">{t.status}</p>
                    <p className={`text-sm font-bold ${project.status === "completed" ? "text-emerald-600" : "text-amber"}`}>{statusLabel}</p>
                  </div>
                </li>
              </ul>
            </motion.aside>

            {/* Right: About + Highlights */}
            <div className="space-y-8">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-2xl bg-white border border-black/8 shadow-sm p-7">
                <h2 className="text-xl font-bold text-navy mb-3">{t.about}</h2>
                <p className="text-navy/70 leading-relaxed">{c.desc}</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="rounded-2xl bg-navy text-white shadow-sm p-7">
                <h2 className="text-xl font-bold text-amber mb-4">{t.highlights}</h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {c.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-sm text-white/90">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-amber" /> {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white">{t.ctaTitle}</h2>
          <p className="mt-3 text-white/60 max-w-xl mx-auto">{t.ctaSub}</p>
          <Link href="/contact" className="mt-8 inline-block rounded-xl bg-amber px-10 py-4 font-semibold text-navy-dark transition hover:bg-amber-light hover:scale-105">
            {t.ctaBtn}
          </Link>
        </div>
      </section>

      {/* Fullscreen single-image view */}
      <AnimatePresence>
        {zoom !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setZoom(null)}
              aria-label="Close"
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); showPrev(); }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); showNext(); }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <span className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                  {zoom + 1} / {photos.length}
                </span>
              </>
            )}

            <div className="relative h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
              <Image src={photos[zoom]} alt={`${c.name} ${zoom + 1}`} fill className="object-contain" sizes="100vw" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
