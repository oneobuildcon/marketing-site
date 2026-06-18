"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Tag, ArrowLeft, ChevronLeft, ChevronRight, CheckCircle2, Ruler, Clock, IndianRupee, BadgeCheck, Quote } from "lucide-react";
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
  const [active, setActive] = useState(0);

  if (!project) return notFound();

  const t = ui[lang];
  const c = project[lang];
  const photos = Array.from({ length: project.count }, (_, i) => `/projects/${project.slug}/${i + 1}.jpg`);
  const statusLabel = project.status === "completed" ? t.completed : t.ongoing;

  const next = () => setActive((i) => (i + 1) % project.count);
  const prev = () => setActive((i) => (i - 1 + project.count) % project.count);

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

      {/* Gallery */}
      <section className="bg-navy-dark pb-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black sm:aspect-[16/9]">
            <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="absolute inset-0">
              <Image src={photos[active]} alt={`${c.name} ${active + 1}`} fill className="object-contain" sizes="100vw" priority />
            </motion.div>
            {project.count > 1 && (
              <>
                <button type="button" onClick={prev} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-amber hover:text-navy-dark">
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button type="button" onClick={next} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-amber hover:text-navy-dark">
                  <ChevronRight className="h-6 w-6" />
                </button>
                <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                  {active + 1} / {project.count}
                </span>
              </>
            )}
          </div>

          {project.count > 1 && (
            <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
              {photos.map((src, i) => (
                <button key={src} type="button" onClick={() => setActive(i)} className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${i === active ? "border-amber" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <Image src={src} alt="" fill className="object-cover" sizes="96px" />
                </button>
              ))}
            </div>
          )}
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

              {c.testimonial && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="relative rounded-2xl bg-amber/10 border border-amber/30 p-7">
                  <Quote className="h-8 w-8 text-amber/40 mb-3" />
                  <p className="text-navy/80 italic leading-relaxed">&ldquo;{c.testimonial.quote}&rdquo;</p>
                  <p className="mt-4 text-sm font-bold text-navy">— {c.testimonial.author}</p>
                  <p className="text-xs text-navy/50">{c.location}</p>
                </motion.div>
              )}
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
    </main>
  );
}
