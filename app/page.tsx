"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Home as HomeIcon,
  Building2,
  Hammer,
  ClipboardList,
  Ruler,
  PaintBucket,
  Award,
  ShieldCheck,
  Users,
  Package,
  Clock,
  HardHat,
  CheckCircle2,
  MessageSquare,
  PencilRuler,
  KeyRound,
  Download,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import CraneAnimation from "@/components/CraneAnimation";

// ── Translations ────────────────────────────────────────────────────────────
const translations = {
  en: {
    badge: "One O Buildcon",
    heroTitle1: "Building",
    heroHighlight: "Strong Foundations",
    heroTitle2: "for the Future",
    weBuild: "We build",
    typewriterWords: ["Bungalows", "Row Houses", "Farmhouses", "RCC Work"],
    heroDesc: "Trusted experts in premium bungalows, row houses, residential buildings, farmhouses, and RCC work — delivering quality, safety, and on-time results.",
    ctaMain: "Get Price of Your Dream Home",
    ctaProjects: "View Our Projects →",
    ctaProfile: "Company Profile",
    stats: [
      { label: "Projects Completed", value: 20, suffix: "+" },
      { label: "Years Experience",   value: 6,  suffix: "+" },
      { label: "Happy Clients",      value: 25, suffix: "+" },
      { label: "Cities Served",      value: 3,  suffix: "" },
    ],
    servicesBadge: "What We Do",
    servicesTitle: "Our Services",
    services: [
      { title: "Premium Bungalows",     desc: "Custom builds with premium finishes" },
      { title: "Row Houses",            desc: "Planned developments, built to last" },
      { title: "Residential Buildings", desc: "Multi-storey complexes done right" },
      { title: "Farmhouses",            desc: "Retreats built for comfort and durability" },
      { title: "RCC Work",              desc: "Foundations, slabs & structural framing" },
      { title: "Interior Finishing",    desc: "Flooring, fittings, and final touches" },
    ],
    processBadge: "How We Work",
    processTitle: "Our Construction Process",
    processDesc: "From first conversation to final handover — a transparent, structured process you can trust.",
    processSteps: [
      { step: "01", title: "Consultation",    desc: "We understand your vision, budget, and site requirements in a free initial meeting." },
      { step: "02", title: "Design & Planning", desc: "Our team prepares detailed blueprints, 3D layouts, and material estimates." },
      { step: "03", title: "Construction",    desc: "Skilled workers execute the work with precision, using quality materials and modern equipment." },
      { step: "04", title: "Handover",        desc: "Final inspection, finishing touches, and keys handed over on schedule." },
    ],
    whyBadge: "Why Us",
    whyTitle: "Why Choose One O Buildcon",
    whyDesc: "We combine years of hands-on expertise with modern techniques to deliver structures that stand the test of time.",
    yearsLabel: "6+ Years",
    yearsSubLabel: "of trusted construction",
    whyPoints: [
      "6+ Years of Experience",
      "Licensed & Insured",
      "Skilled Team of Experts",
      "High-Quality Materials",
      "On-Time Delivery",
      "Transparent Pricing",
    ],
    portfolioBadge: "Portfolio",
    portfolioTitle: "Our Projects",
    viewAll: "View All →",
    projects: [
      { name: "Premium Bungalow" },
      { name: "Row House Development" },
      { name: "Residential Tower" },
      { name: "Countryside Farmhouse" },
    ],
    testimonialsBadge: "Testimonials",
    testimonialsTitle: "What Our Clients Say",
    testimonials: [
      { name: "Suresh P.", project: "Premium Bungalow", quote: "One O Buildcon exceeded our expectations. Fantastic work and great attention to detail." },
      { name: "Anita R.",  project: "Row House",        quote: "Highly professional team, always on schedule, and transparent throughout." },
      { name: "Vikram M.", project: "Farmhouse",        quote: "Top-notch quality and great communication from start to finish." },
    ],
    ctaBannerTitle: "Planning a Construction Project?",
    ctaBannerDesc: "Let One O Buildcon bring your vision to life. Free consultation, no obligation.",
    ctaBannerBtn: "Request a Free Quote →",
    langToggle: "मराठी",
  },
  mr: {
    badge: "वन ओ बिल्डकॉन",
    heroTitle1: "भविष्यासाठी",
    heroHighlight: "मजबूत पाया",
    heroTitle2: "बांधणे",
    weBuild: "आम्ही बांधतो",
    typewriterWords: ["बंगले", "रो हाउस", "फार्महाउस", "आरसीसी काम"],
    heroDesc: "प्रीमियम बंगले, रो हाउस, निवासी इमारती, फार्महाउस आणि आरसीसी कामातील विश्वासू तज्ञ — दर्जा, सुरक्षितता आणि वेळेवर निकाल देणारे.",
    ctaMain: "तुमच्या स्वप्नातील घराची किंमत जाणा",
    ctaProjects: "आमचे प्रकल्प पाहा →",
    ctaProfile: "कंपनी प्रोफाइल",
    stats: [
      { label: "पूर्ण झालेले प्रकल्प", value: 20, suffix: "+" },
      { label: "वर्षांचा अनुभव",        value: 6,  suffix: "+" },
      { label: "समाधानी ग्राहक",        value: 25, suffix: "+" },
      { label: "सेवा दिलेली शहरे",      value: 3,  suffix: "" },
    ],
    servicesBadge: "आम्ही काय करतो",
    servicesTitle: "आमच्या सेवा",
    services: [
      { title: "प्रीमियम बंगले",     desc: "उत्तम फिनिशिंगसह कस्टम बांधकाम" },
      { title: "रो हाउस",           desc: "नियोजित विकास, टिकाऊ बांधकाम" },
      { title: "निवासी इमारती",     desc: "बहुमजली संकुले योग्यरीत्या बांधलेली" },
      { title: "फार्महाउस",         desc: "आरामासाठी आणि टिकाऊपणासाठी बांधलेले" },
      { title: "आरसीसी काम",        desc: "पाया, स्लॅब आणि संरचनात्मक फ्रेमिंग" },
      { title: "इंटेरियर फिनिशिंग", desc: "फ्लोरिंग, फिटिंग्ज आणि अंतिम स्पर्श" },
    ],
    processBadge: "आम्ही कसे काम करतो",
    processTitle: "आमची बांधकाम प्रक्रिया",
    processDesc: "पहिल्या संभाषणापासून अंतिम हस्तांतरणापर्यंत — एक पारदर्शक, सुव्यवस्थित प्रक्रिया जी तुम्ही विश्वास ठेवू शकता.",
    processSteps: [
      { step: "01", title: "सल्लामसलत",         desc: "आम्ही एका मोफत प्रारंभिक बैठकीत तुमची दृष्टी, बजेट आणि साइटच्या आवश्यकता समजून घेतो." },
      { step: "02", title: "डिझाइन आणि नियोजन", desc: "आमची टीम तपशीलवार ब्लूप्रिंट, 3D लेआउट आणि सामग्री अंदाज तयार करते." },
      { step: "03", title: "बांधकाम",            desc: "कुशल कामगार दर्जेदार साहित्य आणि आधुनिक उपकरणे वापरून अचूकतेने काम पार पाडतात." },
      { step: "04", title: "हस्तांतरण",          desc: "अंतिम तपासणी, फिनिशिंग टच आणि वेळापत्रकानुसार चाव्या दिल्या जातात." },
    ],
    whyBadge: "आम्हीच का",
    whyTitle: "वन ओ बिल्डकॉन का निवडावे",
    whyDesc: "आम्ही आधुनिक तंत्रांसह वर्षांच्या अनुभवाला एकत्र करतो जेणेकरून टिकाऊ संरचना तयार होतात.",
    yearsLabel: "६+ वर्षे",
    yearsSubLabel: "विश्वासू बांधकामाचे",
    whyPoints: [
      "६+ वर्षांचा अनुभव",
      "परवानाधारक आणि विमाधारक",
      "तज्ञांची कुशल टीम",
      "उच्च दर्जाचे साहित्य",
      "वेळेवर डिलिव्हरी",
      "पारदर्शक किंमत",
    ],
    portfolioBadge: "पोर्टफोलिओ",
    portfolioTitle: "आमचे प्रकल्प",
    viewAll: "सर्व पाहा →",
    projects: [
      { name: "प्रीमियम बंगला" },
      { name: "रो हाउस डेव्हलपमेंट" },
      { name: "निवासी टॉवर" },
      { name: "ग्रामीण फार्महाउस" },
    ],
    testimonialsBadge: "प्रशंसापत्रे",
    testimonialsTitle: "आमचे ग्राहक काय म्हणतात",
    testimonials: [
      { name: "सुरेश पी.", project: "प्रीमियम बंगला",    quote: "वन ओ बिल्डकॉनने आमच्या अपेक्षा पूर्ण केल्या. अप्रतिम काम आणि उत्कृष्ट लक्ष तपशीलांकडे." },
      { name: "अनिता आर.", project: "रो हाउस",          quote: "अत्यंत व्यावसायिक टीम, नेहमी वेळापत्रकानुसार आणि संपूर्ण प्रक्रियेत पारदर्शक." },
      { name: "विक्रम एम.", project: "फार्महाउस",        quote: "उत्तम दर्जा आणि सुरुवातीपासून शेवटपर्यंत उत्कृष्ट संवाद." },
    ],
    ctaBannerTitle: "बांधकाम प्रकल्पाचे नियोजन करत आहात?",
    ctaBannerDesc: "वन ओ बिल्डकॉनला तुमची स्वप्ने साकार करण्याची संधी द्या. मोफत सल्लामसलत, कोणतेही बंधन नाही.",
    ctaBannerBtn: "मोफत कोटेशन मागवा →",
    langToggle: "English",
  },
};

// ── Service icons (same order as translation arrays) ─────────────────────────
const serviceIcons = [HomeIcon, Building2, ClipboardList, Ruler, Hammer, PaintBucket];

// ── Why choose us icons ───────────────────────────────────────────────────────
const whyIcons = [Award, ShieldCheck, Users, Package, Clock, CheckCircle2];

// ── Process icons ─────────────────────────────────────────────────────────────
const processIcons = [MessageSquare, PencilRuler, HardHat, KeyRound];

// ── Project images ────────────────────────────────────────────────────────────
const projectImgs = [
  "/services/bungalow.png",     // Premium Bungalow
  "/services/rowhouse.png",     // Row House Development
  "/services/residential.png",  // Residential Tower
  "/services/farmhouse.png",    // Countryside Farmhouse
];

// ── Testimonial avatars ───────────────────────────────────────────────────────
const avatarImgs = [
  "https://picsum.photos/seed/avatar1/80/80",
  "https://picsum.photos/seed/avatar2/80/80",
  "https://picsum.photos/seed/avatar3/80/80",
];

// ── Floating hero icons ───────────────────────────────────────────────────────
const floatingIcons = [
  {
    id: "hardhat",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M10 40 Q10 24 32 20 Q54 24 54 40 Z" />
        <rect x="6" y="38" width="52" height="8" rx="4" />
        <line x1="32" y1="20" x2="32" y2="12" />
      </svg>
    ),
    style: { top: "12%", left: "8%", width: 56, height: 56, animationDelay: "0s", animationDuration: "6s" },
  },
  {
    id: "crane",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <line x1="28" y1="6" x2="28" y2="58" />
        <line x1="28" y1="18" x2="56" y2="18" />
        <line x1="28" y1="6" x2="56" y2="18" />
        <line x1="56" y1="18" x2="56" y2="30" />
        <rect x="52" y="30" width="8" height="6" rx="1" />
        <line x1="28" y1="58" x2="20" y2="58" />
        <line x1="28" y1="58" x2="36" y2="58" />
      </svg>
    ),
    style: { top: "20%", right: "6%", width: 72, height: 72, animationDelay: "1.5s", animationDuration: "7s" },
  },
  {
    id: "brick",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <rect x="4" y="16" width="56" height="14" rx="2" />
        <rect x="4" y="34" width="56" height="14" rx="2" />
        <line x1="20" y1="16" x2="20" y2="30" />
        <line x1="44" y1="16" x2="44" y2="30" />
        <line x1="12" y1="34" x2="12" y2="48" />
        <line x1="36" y1="34" x2="36" y2="48" />
        <line x1="56" y1="34" x2="56" y2="48" />
      </svg>
    ),
    style: { bottom: "22%", left: "5%", width: 48, height: 48, animationDelay: "3s", animationDuration: "8s" },
  },
  {
    id: "wrench",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <path d="M14 10 Q8 16 10 26 Q12 34 20 38 L44 56 Q50 60 54 56 Q58 52 54 46 L36 22 Q34 14 26 10 Q20 8 14 10 Z" />
        <circle cx="14" cy="18" r="6" />
        <line x1="50" y1="50" x2="44" y2="44" />
      </svg>
    ),
    style: { bottom: "15%", right: "8%", width: 52, height: 52, animationDelay: "0.8s", animationDuration: "9s" },
  },
  {
    id: "ruler",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full">
        <rect x="6" y="22" width="52" height="20" rx="3" transform="rotate(-15 32 32)" />
        <line x1="16" y1="28" x2="16" y2="36" />
        <line x1="24" y1="30" x2="24" y2="36" />
        <line x1="32" y1="28" x2="32" y2="36" />
        <line x1="40" y1="30" x2="40" y2="36" />
        <line x1="48" y1="28" x2="48" y2="36" />
      </svg>
    ),
    style: { top: "55%", left: "3%", width: 44, height: 44, animationDelay: "2s", animationDuration: "7.5s" },
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else { setCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function TypewriterText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setIndex(0);
  }, [words]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="text-amber inline-block"
        >
          {words[index]}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function TravelingDot({ active }: { active: boolean }) {
  return (
    <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 items-center justify-center w-6 h-6">
      <svg className="h-6 w-6 text-amber" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
      {active && (
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-amber"
          initial={{ x: -14, opacity: 0 }}
          animate={{ x: 14, opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}

export default function Home() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const [processInView, setProcessInView] = useState(false);
  const processRef = useRef(null);
  const processVisible = useInView(processRef, { once: false });
  const { scrollY } = useScroll();
  const heroImgY = useTransform(scrollY, [0, 700], [0, 110]);

  useEffect(() => {
    if (processVisible) setProcessInView(true);
  }, [processVisible]);

  return (
    <main>
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(3deg); }
          66% { transform: translateY(-8px) rotate(-2deg); }
        }
        @keyframes dotGridMove {
          0% { background-position: 0px 0px; }
          100% { background-position: 40px 40px; }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes shimmerLine {
          0% { transform: scaleX(0); opacity: 0.5; }
          50% { transform: scaleX(1); opacity: 1; }
          100% { transform: scaleX(0); opacity: 0.5; }
        }
        @keyframes glowPulse {
          0%, 100% { filter: drop-shadow(0 0 0px #f59e0b); }
          50% { filter: drop-shadow(0 0 8px #f59e0b) drop-shadow(0 0 16px #f59e0b80); }
        }
        .floating-icon {
          animation: floatUpDown var(--dur, 7s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white" style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}>
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <Image src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1600&q=80" alt="Premium bungalow" fill priority className="object-cover opacity-30 scale-110" />
        </motion.div>
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px", animation: "dotGridMove 8s linear infinite" }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
        {floatingIcons.map((icon) => (
          <div key={icon.id} className="absolute pointer-events-none text-amber/20 floating-icon" style={icon.style as React.CSSProperties}>
            {icon.svg}
          </div>
        ))}

        {/* Animated tower crane */}
        <CraneAnimation className="pointer-events-none absolute bottom-0 right-1 h-[45%] w-auto opacity-30 sm:right-4 sm:h-[65%] sm:opacity-50 lg:h-[90%] lg:opacity-90 xl:right-16" />

        <div className="relative mx-auto max-w-6xl px-6 py-28 w-full">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col items-start gap-6">
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              <HardHat className="h-5 w-5 text-amber" />
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-light">{t.badge}</p>
            </motion.div>
            <motion.h1 variants={fadeUp} className="max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">
              {t.heroTitle1}{" "}
              <span className="text-amber">{t.heroHighlight}</span>{" "}
              {t.heroTitle2}
            </motion.h1>
            <motion.div variants={fadeUp} className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
              <span className="text-white/70">{t.weBuild}</span>
              <span className="min-w-[200px] inline-block">
                <TypewriterText words={t.typewriterWords} />
              </span>
            </motion.div>
            <motion.p variants={fadeUp} className="max-w-xl text-white/80 text-lg">{t.heroDesc}</motion.p>
            <motion.div variants={fadeUp} className="w-48 h-0.5 bg-amber/30 relative overflow-hidden rounded-full">
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-amber to-transparent" style={{ animation: "shimmerSweep 2.5s ease-in-out infinite" }} />
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-md bg-amber px-8 py-3 font-semibold text-navy-dark transition hover:bg-amber-light hover:scale-105 transform">
                {t.ctaMain}
              </Link>
              <Link href="/projects" className="rounded-md border border-white/30 px-8 py-3 font-semibold transition hover:bg-white/10">
                {t.ctaProjects}
              </Link>
              <Link href="/company-profile" className="flex items-center gap-2 rounded-md border border-amber/50 px-8 py-3 font-semibold text-amber transition hover:bg-amber/10">
                <Download className="h-4 w-4" />
                {t.ctaProfile}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-amber py-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ animation: "shimmerSweep 3s ease-in-out infinite" }} />
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 sm:grid-cols-4 relative">
          {t.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-navy-dark sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm font-medium text-navy/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">{t.servicesBadge}</p>
            <h2 className="mt-2 text-3xl font-bold text-white">{t.servicesTitle}</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.services.map((service, i) => {
              const Icon = serviceIcons[i];
              return (
                <motion.div key={service.title} variants={fadeUp} whileHover={{ y: -6, scale: 1.02 }} className="relative overflow-hidden rounded-xl p-6 border border-white/10 hover:border-amber/40 transition-colors cursor-default group">
                  {/* Cover image background */}
                  <Image src="/services/cover.png" alt="" fill className="object-cover opacity-20 transition-opacity group-hover:opacity-30" />
                  <div className="absolute inset-0 bg-gradient-to-br from-navy/95 via-navy/90 to-navy/80" />
                  <div className="relative">
                    <motion.div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber/10 border border-amber/20" whileHover={{ rotate: [0, -15, 15, -8, 8, 0], scale: 1.15 }} transition={{ duration: 0.5 }}>
                      <Icon className="h-6 w-6 text-amber" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="mt-4 font-semibold text-white text-lg">{service.title}</h3>
                    <p className="mt-1 text-sm text-white/60">{service.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CONSTRUCTION PROCESS */}
      <section className="bg-gray-50 py-20" ref={processRef}>
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber">{t.processBadge}</p>
            <h2 className="mt-2 text-3xl font-bold text-navy">{t.processTitle}</h2>
            <p className="mt-3 text-navy/60 max-w-xl mx-auto">{t.processDesc}</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.processSteps.map((step, i) => {
              const Icon = processIcons[i];
              return (
                <motion.div key={step.step} variants={fadeUp} whileHover={{ y: -6 }} className="relative rounded-2xl bg-white border border-black/8 p-6 shadow-sm hover:shadow-md hover:border-amber/40 transition-all">
                  <div className="absolute -top-4 left-6 rounded-lg bg-amber px-3 py-1">
                    <span className="text-xs font-bold text-navy-dark">{step.step}</span>
                  </div>
                  <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-xl bg-navy/5 border border-navy/10">
                    <Icon className="h-6 w-6 text-navy" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-bold text-navy text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm text-navy/60 leading-relaxed">{step.desc}</p>
                  {i < t.processSteps.length - 1 && <TravelingDot active={processInView} />}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image src="https://picsum.photos/seed/whyus/600/700" alt="Why choose One O Buildcon" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-lg bg-amber px-4 py-2">
              <p className="font-bold text-navy-dark text-lg">{t.yearsLabel}</p>
              <p className="text-xs text-navy-dark/80">{t.yearsSubLabel}</p>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber">{t.whyBadge}</p>
              <h2 className="mt-2 text-3xl font-bold text-navy">{t.whyTitle}</h2>
              <p className="mt-3 text-navy/70">{t.whyDesc}</p>
            </motion.div>
            <motion.div variants={stagger} className="mt-8 grid gap-3 sm:grid-cols-2">
              {t.whyPoints.map((label, i) => {
                const Icon = whyIcons[i];
                return (
                  <motion.div key={label} variants={fadeUp} whileHover={{ scale: 1.03 }} className="flex items-center gap-3 rounded-xl border border-black/8 p-4 hover:border-amber/40 hover:shadow-md transition-all">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber/10">
                      <Icon className="h-5 w-5 text-amber" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-navy/80">{label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber">{t.portfolioBadge}</p>
              <h2 className="mt-2 text-3xl font-bold text-navy">{t.portfolioTitle}</h2>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-navy hover:text-amber transition-colors">{t.viewAll}</Link>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.projects.map((project, i) => (
              <motion.div key={project.name} variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className="group relative h-56 overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-[radial-gradient(circle_at_50%_38%,#ffffff_0%,#dfe5ec_70%,#c7cfda_100%)]">
                <motion.div className="absolute inset-0 flex items-end" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: "easeOut" }}>
                  <Image src={projectImgs[i]} alt={project.name} fill className="object-contain p-4 [filter:drop-shadow(0_8px_12px_rgba(11,31,58,0.3))]" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none">
                  <div className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ animation: "shimmerSweep 1.5s ease-in-out" }} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="font-semibold text-white text-sm">{project.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-navy-dark py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">{t.testimonialsBadge}</p>
            <h2 className="mt-2 text-3xl font-bold text-white">{t.testimonialsTitle}</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-10 grid gap-6 sm:grid-cols-3">
            {t.testimonials.map((testimonial, i) => (
              <motion.div key={testimonial.name} variants={fadeUp} whileHover={{ y: -4 }} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-white hover:border-amber/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-amber/40">
                    <Image src={avatarImgs[i]} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-amber-light">{testimonial.project}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/80 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="h-4 w-4 fill-amber text-amber" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="relative overflow-hidden py-24 text-center text-white">
        <Image src="https://picsum.photos/seed/ctabg/1600/600" alt="Construction project" fill className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <HardHat className="h-10 w-10 text-amber" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold sm:text-4xl">{t.ctaBannerTitle}</motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-white/80 text-lg">{t.ctaBannerDesc}</motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="mt-8 inline-block rounded-md bg-amber px-10 py-4 font-semibold text-navy-dark transition hover:bg-amber-light hover:scale-105 transform text-lg">
              {t.ctaBannerBtn}
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
