"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HardHat, MapPin, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const translations = {
  en: {
    heroBadge: "Portfolio",
    heroTitle: "Our",
    heroTitleHighlight: "Projects",
    heroSub: "A look at some of the work we're proud to have delivered.",
    filters: ["All", "Premium Bungalow", "Row House", "Residential Building", "Farmhouse"],
    projects: [
      { name: "Porwal Road Residency", type: "Residential Building", location: "Porwal Road, Pune", desc: "A well-planned 3-storey residential building with terracotta and cream facade, quality RCC structure, and premium finishes throughout.", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80" },
      { name: "Gangurde Row House", type: "Row House", location: "Yerwada, Pune", desc: "A modern duplex row house development combining contemporary design with functional living spaces and premium exterior finishes.", img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&q=80" },
      { name: "Kamthe Bungalow", type: "Premium Bungalow", location: "Lohegaon, Pune", desc: "A premium custom bungalow built to exacting standards — from RCC structure to beautiful interior finishing with modern design aesthetics.", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&q=80" },
      { name: "Markal Farmhouse", type: "Farmhouse", location: "Markal, Pune", desc: "A charming single-storey farmhouse built with red stone and brick, designed to blend seamlessly with its natural rural surroundings.", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&q=80" },
      { name: "Relekar Bungalow", type: "Premium Bungalow", location: "Charoli, Pune", desc: "A sophisticated 3-storey bungalow with floor-to-ceiling glass facade, elegant lighting, and contemporary architecture for modern living.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80" },
      { name: "Raskar Bungalow", type: "Premium Bungalow", location: "Charoli, Pune", desc: "A striking modern bungalow featuring exposed brick accents, wooden louvers, and open balconies — a perfect blend of warmth and contemporary style.", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80" },
    ],
    noneMessage: "No projects in this category yet.",
    ctaTitle: "Want to be our next success story?",
    ctaSub: "Let's discuss your project. Free consultation, no obligations.",
    ctaBtn: "Start Your Project →",
  },
  mr: {
    heroBadge: "पोर्टफोलिओ",
    heroTitle: "आमचे",
    heroTitleHighlight: "प्रकल्प",
    heroSub: "आम्ही अभिमानाने पूर्ण केलेल्या कामांपैकी काही.",
    filters: ["सर्व", "प्रीमियम बंगला", "रो हाउस", "निवासी इमारत", "फार्महाउस"],
    projects: [
      { name: "पोरवाल रोड रेसिडेन्सी", type: "निवासी इमारत", location: "पोरवाल रोड, पुणे", desc: "टेराकोटा आणि क्रीम फसाडसह सुनियोजित ३-मजली निवासी इमारत, दर्जेदार आरसीसी संरचना आणि प्रीमियम फिनिशिंग.", img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80" },
      { name: "गांगुर्डे रो हाउस", type: "रो हाउस", location: "येरवडा, पुणे", desc: "आधुनिक डिझाइन आणि कार्यक्षम राहणीमान जागांसह प्रीमियम बाह्य फिनिशिंग असलेले आधुनिक डुप्लेक्स रो हाउस.", img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&q=80" },
      { name: "कामथे बंगला", type: "प्रीमियम बंगला", location: "लोहेगाव, पुणे", desc: "आरसीसी संरचनेपासून सुंदर इंटेरियर फिनिशिंगपर्यंत उच्च मानकांनुसार बांधलेला प्रीमियम कस्टम बंगला.", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=500&q=80" },
      { name: "मार्कळ फार्महाउस", type: "फार्महाउस", location: "मार्कळ, पुणे", desc: "लाल दगड आणि विटांनी बांधलेले एकमजली फार्महाउस, नैसर्गिक ग्रामीण परिसराशी सुंदरपणे मिसळणारे.", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&q=80" },
      { name: "रेलेकर बंगला", type: "प्रीमियम बंगला", location: "चारोली, पुणे", desc: "मजल्यापासून छतापर्यंत काचेचा दर्शनभाग, सुरेख प्रकाशयोजना आणि समकालीन वास्तुकलेसह ३-मजली बंगला.", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80" },
      { name: "रास्कर बंगला", type: "प्रीमियम बंगला", location: "चारोली, पुणे", desc: "एक्सपोज्ड विट, लाकडी लुव्हर्स आणि खुल्या बाल्कनींसह एक प्रभावी आधुनिक बंगला — उबदारपणा आणि समकालीन शैलीचा परिपूर्ण मिलाफ.", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80" },
    ],
    noneMessage: "या श्रेणीत अद्याप प्रकल्प नाहीत.",
    ctaTitle: "आमची पुढील यशोगाथा बनायची आहे का?",
    ctaSub: "तुमच्या प्रकल्पाबद्दल चर्चा करूया. मोफत सल्लामसलत, कोणतेही बंधन नाही.",
    ctaBtn: "तुमचा प्रकल्प सुरू करा →",
  },
};

export default function Projects() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = activeIndex === 0 ? t.projects : t.projects.filter((p) => p.type === t.filters[activeIndex]);

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
            {t.filters.map((f, i) => (
              <motion.button
                key={f}
                onClick={() => setActiveIndex(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all border ${activeIndex === i ? "bg-navy text-white border-navy shadow-md" : "bg-gray-50 text-navy/60 border-black/8 hover:border-amber/40 hover:bg-amber/5"}`}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                className="group overflow-hidden rounded-2xl bg-white border border-black/8 shadow-sm hover:shadow-xl hover:border-amber/30 transition-all"
              >
                <div className="relative h-52 w-full overflow-hidden">
                  <Image src={project.img} alt={project.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="absolute right-3 top-3 rounded-full bg-amber px-3 py-1 text-xs font-bold text-navy-dark flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" /> {project.type}
                  </motion.span>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white/80 text-xs">
                    <MapPin className="h-3 w-3 text-amber" /> {project.location}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-navy group-hover:text-amber transition-colors">{project.name}</h3>
                  <p className="mt-2 text-sm text-navy/70 leading-relaxed">{project.desc}</p>
                </div>
              </motion.div>
            ))}
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
