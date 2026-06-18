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

const services = [
  { title: "Premium Bungalows", desc: "Custom builds with premium finishes", icon: HomeIcon },
  { title: "Row Houses", desc: "Planned developments, built to last", icon: Building2 },
  { title: "Residential Buildings", desc: "Multi-storey complexes done right", icon: ClipboardList },
  { title: "Farmhouses", desc: "Retreats built for comfort and durability", icon: Ruler },
  { title: "RCC Work", desc: "Foundations, slabs & structural framing", icon: Hammer },
  { title: "Interior Finishing", desc: "Flooring, fittings, and final touches", icon: PaintBucket },
];

const stats = [
  { label: "Projects Completed", value: 20, suffix: "+" },
  { label: "Years Experience", value: 6, suffix: "+" },
  { label: "Happy Clients", value: 25, suffix: "+" },
  { label: "Cities Served", value: 3, suffix: "" },
];

const whyChooseUs = [
  { label: "6+ Years of Experience", icon: Award },
  { label: "Licensed & Insured", icon: ShieldCheck },
  { label: "Skilled Team of Experts", icon: Users },
  { label: "High-Quality Materials", icon: Package },
  { label: "On-Time Delivery", icon: Clock },
  { label: "Transparent Pricing", icon: CheckCircle2 },
];

const processSteps = [
  { step: "01", title: "Consultation", desc: "We understand your vision, budget, and site requirements in a free initial meeting.", icon: MessageSquare },
  { step: "02", title: "Design & Planning", desc: "Our team prepares detailed blueprints, 3D layouts, and material estimates.", icon: PencilRuler },
  { step: "03", title: "Construction", desc: "Skilled workers execute the work with precision, using quality materials and modern equipment.", icon: HardHat },
  { step: "04", title: "Handover", desc: "Final inspection, finishing touches, and keys handed over on schedule.", icon: KeyRound },
];

const tools = [
  {
    name: "Tower Crane",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth="1.5">
        <line x1="32" y1="4" x2="32" y2="56" />
        <line x1="32" y1="16" x2="58" y2="16" />
        <line x1="32" y1="16" x2="14" y2="16" />
        <line x1="58" y1="16" x2="58" y2="28" />
        <line x1="32" y1="4" x2="58" y2="16" />
        <rect x="54" y="28" width="8" height="6" rx="1" />
        <line x1="32" y1="56" x2="24" y2="56" />
        <line x1="32" y1="56" x2="40" y2="56" />
      </svg>
    ),
  },
  {
    name: "Excavator",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="36" width="30" height="14" rx="2" />
        <circle cx="14" cy="52" r="5" />
        <circle cx="32" cy="52" r="5" />
        <line x1="8" y1="44" x2="38" y2="44" />
        <rect x="28" y="28" width="16" height="12" rx="2" />
        <line x1="36" y1="28" x2="48" y2="18" />
        <line x1="48" y1="18" x2="56" y2="30" />
        <path d="M56 30 L60 38 L48 40 L44 32" />
      </svg>
    ),
  },
  {
    name: "Concrete Mixer",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="32" cy="30" rx="14" ry="18" transform="rotate(-20 32 30)" />
        <line x1="18" y1="48" x2="14" y2="58" />
        <line x1="46" y1="48" x2="50" y2="58" />
        <line x1="14" y1="58" x2="50" y2="58" />
        <line x1="32" y1="12" x2="32" y2="4" />
        <circle cx="32" cy="30" r="5" />
      </svg>
    ),
  },
  {
    name: "Bulldozer",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth="1.5">
        <rect x="10" y="30" width="36" height="14" rx="2" />
        <rect x="16" y="22" width="20" height="10" rx="1" />
        <line x1="4" y1="38" x2="10" y2="38" />
        <line x1="4" y1="30" x2="4" y2="46" />
        <line x1="4" y1="46" x2="10" y2="44" />
        <circle cx="18" cy="46" r="4" />
        <circle cx="38" cy="46" r="4" />
        <line x1="18" y1="46" x2="38" y2="46" />
      </svg>
    ),
  },
  {
    name: "Laser Level",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth="1.5">
        <rect x="20" y="24" width="24" height="16" rx="3" />
        <circle cx="32" cy="32" r="4" />
        <line x1="4" y1="32" x2="20" y2="32" strokeDasharray="3 2" />
        <line x1="44" y1="32" x2="60" y2="32" strokeDasharray="3 2" />
        <line x1="32" y1="8" x2="32" y2="24" strokeDasharray="3 2" />
        <line x1="32" y1="40" x2="32" y2="56" strokeDasharray="3 2" />
      </svg>
    ),
  },
  {
    name: "Power Drill",
    svg: (
      <svg viewBox="0 0 64 64" fill="none" className="h-12 w-12" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="26" width="28" height="14" rx="3" />
        <path d="M36 30 L50 28 L52 36 L36 36" />
        <line x1="52" y1="32" x2="60" y2="32" />
        <rect x="14" y="40" width="12" height="8" rx="1" />
      </svg>
    ),
  },
];


const projects = [
  { name: "Premium Bungalow", img: "https://picsum.photos/seed/proj1/400/300" },
  { name: "Row House Development", img: "https://picsum.photos/seed/proj2/400/300" },
  { name: "Residential Tower", img: "https://picsum.photos/seed/proj3/400/300" },
  { name: "Countryside Farmhouse", img: "https://picsum.photos/seed/proj4/400/300" },
];

const testimonials = [
  {
    name: "Suresh P.",
    project: "Premium Bungalow",
    quote: "One O Buildcon exceeded our expectations. Fantastic work and great attention to detail.",
    avatar: "https://picsum.photos/seed/avatar1/80/80",
  },
  {
    name: "Anita R.",
    project: "Row House",
    quote: "Highly professional team, always on schedule, and transparent throughout.",
    avatar: "https://picsum.photos/seed/avatar2/80/80",
  },
  {
    name: "Vikram M.",
    project: "Farmhouse",
    quote: "Top-notch quality and great communication from start to finish.",
    avatar: "https://picsum.photos/seed/avatar3/80/80",
  },
];

const typewriterWords = ["Bungalows", "Row Houses", "Farmhouses", "RCC Work"];

// Floating hero icon SVGs
const floatingIcons = [
  // Hard hat
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
  // Crane
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
  // Brick
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
  // Wrench
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
  // Ruler
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
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function TypewriterText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % typewriterWords.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.span
          key={typewriterWords[index]}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="text-amber inline-block"
        >
          {typewriterWords[index]}
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
  const [processInView, setProcessInView] = useState(false);
  const processRef = useRef(null);
  const processVisible = useInView(processRef, { once: false });

  // Subtle hero parallax — background drifts as you scroll for depth
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
        .tool-icon-hover:hover svg {
          animation: glowPulse 1s ease-in-out infinite;
        }
      `}</style>

      {/* HERO */}
      <section
        className="relative overflow-hidden bg-navy text-white"
        style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}
      >
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <Image
            src="https://picsum.photos/seed/herosite/1600/900"
            alt="Construction site"
            fill
            priority
            className="object-cover opacity-30 scale-110"
          />
        </motion.div>

        {/* Animated blueprint dot-grid */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            animation: "dotGridMove 8s linear infinite",
          }}
        />

        {/* Static grid lines */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />

        {/* Floating construction icons */}
        {floatingIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute pointer-events-none text-amber/20 floating-icon"
            style={icon.style as React.CSSProperties}
          >
            {icon.svg}
          </div>
        ))}

        <div className="relative mx-auto max-w-6xl px-6 py-28 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              <HardHat className="h-5 w-5 text-amber" />
              <p className="text-sm font-semibold uppercase tracking-widest text-amber-light">
                One O Buildcon
              </p>
            </motion.div>

            <motion.h1 variants={fadeUp} className="max-w-2xl text-4xl font-bold leading-tight sm:text-6xl">
              Building{" "}
              <span className="text-amber">Strong Foundations</span>{" "}
              for the Future
            </motion.h1>

            {/* Typewriter headline */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 text-2xl font-bold sm:text-3xl">
              <span className="text-white/70">We build</span>
              <span className="min-w-[200px] inline-block">
                <TypewriterText />
              </span>
            </motion.div>

            <motion.p variants={fadeUp} className="max-w-xl text-white/80 text-lg">
              Trusted experts in premium bungalows, row houses, residential
              buildings, farmhouses, and RCC work — delivering quality, safety,
              and on-time results.
            </motion.p>

            {/* Animated shimmer line under tagline */}
            <motion.div variants={fadeUp} className="w-48 h-0.5 bg-amber/30 relative overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-transparent via-amber to-transparent"
                style={{ animation: "shimmerSweep 2.5s ease-in-out infinite" }}
              />
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-md bg-amber px-8 py-3 font-semibold text-navy-dark transition hover:bg-amber-light hover:scale-105 transform">
                Get Price of Your Dream Home
              </Link>
              <Link href="/projects" className="rounded-md border border-white/30 px-8 py-3 font-semibold transition hover:bg-white/10">
                View Our Projects →
              </Link>
              <a
                href="/one-o-buildcon-company-profile.pdf"
                download
                className="flex items-center gap-2 rounded-md border border-amber/50 px-8 py-3 font-semibold text-amber transition hover:bg-amber/10"
              >
                <Download className="h-4 w-4" />
                Company Profile
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR with shimmer sweep */}
      <section className="bg-amber py-10 relative overflow-hidden">
        {/* Left-to-right shimmer sweep */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ animation: "shimmerSweep 3s ease-in-out infinite" }}
          />
        </div>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 sm:grid-cols-4 relative">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-navy-dark sm:text-4xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-1 text-sm font-medium text-navy/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES with icon rotation/bounce on hover */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">What We Do</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Our Services</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-xl bg-white/5 p-6 border border-white/10 hover:bg-white/10 hover:border-amber/40 transition-colors cursor-default group"
                >
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber/10 border border-amber/20"
                    whileHover={{ rotate: [0, -15, 15, -8, 8, 0], scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon className="h-6 w-6 text-amber" strokeWidth={1.5} />
                  </motion.div>
                  <h3 className="mt-4 font-semibold text-white text-lg">{service.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{service.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CONSTRUCTION PROCESS with traveling dot on arrows */}
      <section className="bg-gray-50 py-20" ref={processRef}>
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber">How We Work</p>
            <h2 className="mt-2 text-3xl font-bold text-navy">Our Construction Process</h2>
            <p className="mt-3 text-navy/60 max-w-xl mx-auto">From first conversation to final handover — a transparent, structured process you can trust.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => {
              const Icon = step.icon;
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
                  {i < processSteps.length - 1 && (
                    <TravelingDot active={processInView} />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* EQUIPMENT with glow on hover */}
      <section className="bg-navy py-16">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">On Every Site</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Equipment & Tools We Use</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-3 gap-6 sm:grid-cols-6">
            {tools.map((tool) => (
              <motion.div
                key={tool.name}
                variants={fadeUp}
                whileHover={{ y: -4, scale: 1.05 }}
                className="tool-icon-hover flex flex-col items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-amber/10 hover:border-amber/40 transition-all cursor-default"
              >
                <motion.div
                  className="text-amber"
                  whileHover={{
                    filter: ["drop-shadow(0 0 0px #f59e0b)", "drop-shadow(0 0 8px #f59e0b)", "drop-shadow(0 0 0px #f59e0b)"],
                  }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  {tool.svg}
                </motion.div>
                <span className="text-xs font-medium text-white/70 text-center">{tool.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image src="https://picsum.photos/seed/whyus/600/700" alt="Why choose One O Buildcon" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-lg bg-amber px-4 py-2">
              <p className="font-bold text-navy-dark text-lg">6+ Years</p>
              <p className="text-xs text-navy-dark/80">of trusted construction</p>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber">Why Us</p>
              <h2 className="mt-2 text-3xl font-bold text-navy">Why Choose One O Buildcon</h2>
              <p className="mt-3 text-navy/70">We combine years of hands-on expertise with modern techniques to deliver structures that stand the test of time.</p>
            </motion.div>
            <motion.div variants={stagger} className="mt-8 grid gap-3 sm:grid-cols-2">
              {whyChooseUs.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.label} variants={fadeUp} whileHover={{ scale: 1.03 }} className="flex items-center gap-3 rounded-xl border border-black/8 p-4 hover:border-amber/40 hover:shadow-md transition-all">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber/10">
                      <Icon className="h-5 w-5 text-amber" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-medium text-navy/80">{item.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PROJECTS with enhanced Ken Burns */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber">Portfolio</p>
              <h2 className="mt-2 text-3xl font-bold text-navy">Our Projects</h2>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-navy hover:text-amber transition-colors">View All →</Link>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((project) => (
              <motion.div
                key={project.name}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative h-56 overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image src={project.img} alt={project.name} fill className="object-cover" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
                {/* Shimmer overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden pointer-events-none">
                  <div
                    className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    style={{ animation: "shimmerSweep 1.5s ease-in-out" }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="font-semibold text-white text-sm">{project.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-navy-dark py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">Testimonials</p>
            <h2 className="mt-2 text-3xl font-bold text-white">What Our Clients Say</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-10 grid gap-6 sm:grid-cols-3">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp} whileHover={{ y: -4 }} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-white hover:border-amber/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-amber/40">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-amber-light">{t.project}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-white/80 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-amber text-amber" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 text-center text-white">
        <Image src="https://picsum.photos/seed/ctabg/1600/600" alt="Construction project" fill className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-navy/85" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative mx-auto max-w-2xl px-6">
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <HardHat className="h-10 w-10 text-amber" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl font-bold sm:text-4xl">Planning a Construction Project?</motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-white/80 text-lg">Let One O Buildcon bring your vision to life. Free consultation, no obligation.</motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="mt-8 inline-block rounded-md bg-amber px-10 py-4 font-semibold text-navy-dark transition hover:bg-amber-light hover:scale-105 transform text-lg">
              Request a Free Quote →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
