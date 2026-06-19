"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HardHat, MapPin, Tag, Images, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { projects, type ProjectCategory } from "@/lib/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const filterDefs: { category: ProjectCategory | "all"; en: string; mr: string }[] = [
  { category: "all", en: "All", mr: "सर्व" },
  { category: "bungalow", en: "Premium Bungalow", mr: "प्रीमियम बंगला" },
  { category: "rowhouse", en: "Row House", mr: "रो हाउस" },
  { category: "residential", en: "Residential Building", mr: "निवासी इमारत" },
  { category: "farmhouse", en: "Farmhouse", mr: "फार्महाउस" },
];

const ui = {
  en: {
    heroBadge: "Portfolio",
    heroTitle: "Our",
    heroTitleHighlight: "Projects",
    heroSub: "A look at some of the work we're proud to have delivered.",
    noneMessage: "No projects in this category yet.",
    viewProject: "View project",
    photos: "photos",
    completed: "Completed",
    ongoing: "Ongoing",
    pipeline: "Pipeline",
    ctaTitle: "Want to be our next success story?",
    ctaSub: "Let's discuss your project. Free consultation, no obligations.",
    ctaBtn: "Start Your Project →",
  },
  mr: {
    heroBadge: "पोर्टफोलिओ",
    heroTitle: "आमचे",
    heroTitleHighlight: "प्रकल्प",
    heroSub: "आम्ही अभिमानाने पूर्ण केलेल्या कामांपैकी काही.",
    noneMessage: "या श्रेणीत अद्याप प्रकल्प नाहीत.",
    viewProject: "प्रकल्प पहा",
    photos: "फोटो",
    completed: "पूर्ण",
    ongoing: "सुरू",
    pipeline: "नियोजित",
    ctaTitle: "आमची पुढील यशोगाथा बनायची आहे का?",
    ctaSub: "तुमच्या प्रकल्पाबद्दल चर्चा करूया. मोफत सल्लामसलत, कोणतेही बंधन नाही.",
    ctaBtn: "तुमचा प्रकल्प सुरू करा →",
  },
};

const MotionLink = motion(Link);

export default function Projects() {
  const { lang } = useLanguage();
  const t = ui[lang];
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = filterDefs[activeIndex].category;
  const filtered = activeCategory === "all" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="overflow-hidden">
      <style>{`
        @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(8deg)} }
        @keyframes shimmerLine { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        @keyframes heroPulse { 0%,100%{opacity:.05} 50%{opacity:.12} }
      `}</style>

      {/* Hero */}
      <section className="relative bg-navy py-20 text-white overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 20% 60%, #F59E0B 0%, transparent 50%)", animation: "heroPulse 8s ease-in-out infinite" }} />
        {[
          { top: "25%", left: "6%", size: 38, delay: "0s", dur: "7s" },
          { top: "50%", left: "90%", size: 30, delay: "2s", dur: "5s" },
        ].map((f, i) => (
          <div key={i} className="absolute pointer-events-none text-amber/15" style={{ top: f.top, left: f.left, animation: `floatSlow ${f.dur} ${f.delay} ease-in-out infinite` }}>
            <HardHat style={{ width: f.size, height: f.size }} />
          </div>
        ))}
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <HardHat className="h-5 w-5 text-amber" />
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">{t.heroBadge}</p>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl font-bold sm:text-5xl">
              {t.heroTitle} <span className="text-amber">{t.heroTitleHighlight}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-white/80 text-lg">
              {t.heroSub}
            </motion.p>
            <motion.div variants={fadeUp} className="relative mt-4 h-0.5 w-24 bg-amber/40 overflow-hidden rounded-full">
              <div className="absolute inset-y-0 w-12 bg-amber/80 rounded-full" style={{ animation: "shimmerLine 2s ease-in-out infinite" }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="bg-white border-b border-black/8 py-5 sticky top-16 z-40">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {filterDefs.map((f, i) => (
              <motion.button
                key={f.category}
                onClick={() => setActiveIndex(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all border ${activeIndex === i ? "bg-navy text-white border-navy shadow-md" : "bg-gray-50 text-navy/60 border-black/8 hover:border-amber/40 hover:bg-amber/5"}`}
              >
                {f[lang]}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => {
              const c = project[lang];
              return (
                <MotionLink
                  key={project.slug}
                  href={`/projects/${project.slug}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8 }}
                  className="group block overflow-hidden rounded-2xl bg-white border border-black/8 shadow-sm hover:shadow-xl hover:border-amber/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                >
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image src={`/projects/${project.slug}/1.jpg`} alt={c.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                    <span className="absolute right-3 top-3 rounded-full bg-amber px-3 py-1 text-xs font-bold text-navy-dark flex items-center gap-1">
                      <Tag className="h-3 w-3" /> {c.type}
                    </span>
                    <span
                      className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white flex items-center gap-1.5 backdrop-blur-sm ${
                        project.status === "completed"
                          ? "bg-emerald-500/90"
                          : project.status === "pipeline"
                          ? "bg-sky-500/90"
                          : "bg-amber/90 text-navy-dark"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {project.status === "completed" ? t.completed : project.status === "pipeline" ? t.pipeline : t.ongoing}
                    </span>
                    {project.count > 1 && (
                      <span className="absolute right-3 bottom-3 rounded-full bg-navy/80 px-2.5 py-1 text-xs font-semibold text-white flex items-center gap-1 backdrop-blur-sm">
                        <Images className="h-3.5 w-3.5 text-amber" /> {project.count} {t.photos}
                      </span>
                    )}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/80 text-xs">
                      <MapPin className="h-3 w-3 text-amber" /> {c.location}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-navy group-hover:text-amber transition-colors">{c.name}</h3>
                    <p className="mt-2 text-sm text-navy/70 leading-relaxed line-clamp-3">{c.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-amber text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
                      {t.viewProject} <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </MotionLink>
              );
            })}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-navy/40">{t.noneMessage}</div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-6xl px-6 text-center">
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white">{t.ctaTitle}</motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-white/60 max-w-xl mx-auto">{t.ctaSub}</motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="mt-8 inline-block rounded-xl bg-amber px-10 py-4 font-semibold text-navy-dark hover:bg-amber-light hover:scale-105 transform transition">
              {t.ctaBtn}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
