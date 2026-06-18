"use client";

import { motion } from "framer-motion";
import { Award, Target, Handshake, HardHat } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const values = [
  { title: "Integrity", desc: "We do what we say — transparent pricing, honest timelines, no shortcuts.", icon: Award, color: "text-amber" },
  { title: "Quality", desc: "Every project is built to last, using trusted materials and skilled craftsmanship.", icon: HardHat, color: "text-amber" },
  { title: "Partnership", desc: "We work closely with clients at every stage, from planning to handover.", icon: Handshake, color: "text-amber" },
];

const milestones = [
  { year: "2019", event: "One O Buildcon founded in Pune" },
  { year: "2021", event: "Expanded to farmhouse & commercial builds" },
  { year: "2023", event: "Completed 20+ projects across residential & commercial" },
  { year: "2024", event: "Growing client base across Pune, Maharashtra" },
];

export default function About() {
  return (
    <main className="overflow-hidden">
      <style>{`
        @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(6deg)} }
        @keyframes shimmerLine { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        @keyframes heroPulse { 0%,100%{opacity:.05} 50%{opacity:.12} }
      `}</style>

      {/* Hero */}
      <section className="relative bg-navy py-20 text-white overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #F59E0B 0%, transparent 50%), radial-gradient(circle at 70% 70%, #F59E0B 0%, transparent 40%)", animation: "heroPulse 8s ease-in-out infinite" }} />
        {/* Floating icons */}
        {[
          { top: "15%", left: "5%", size: 40, delay: "0s", dur: "5s" },
          { top: "60%", left: "88%", size: 28, delay: "1s", dur: "7s" },
          { top: "30%", left: "80%", size: 50, delay: "2s", dur: "6s" },
        ].map((f, idx) => (
          <div key={idx} className="absolute pointer-events-none text-amber/15" style={{ top: f.top, left: f.left, animation: `floatSlow ${f.dur} ${f.delay} ease-in-out infinite` }}>
            <HardHat style={{ width: f.size, height: f.size }} />
          </div>
        ))}
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <HardHat className="h-5 w-5 text-amber" />
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">Our Story</p>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl font-bold sm:text-5xl">
              About <span className="text-amber">One O Buildcon</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-white/80 text-lg">
              Building trust, one project at a time — since 2019.
            </motion.p>
            <motion.div variants={fadeUp} className="relative mt-4 h-0.5 w-24 bg-amber/40 overflow-hidden rounded-full">
              <div className="absolute inset-y-0 w-12 bg-amber/80 rounded-full" style={{ animation: "shimmerLine 2s ease-in-out infinite" }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Story + Mission */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-10 sm:grid-cols-2">
            <motion.div variants={fadeUp} className="rounded-2xl bg-gray-50 border border-black/8 p-8 hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 mb-4">
                <Target className="h-5 w-5 text-amber" />
              </div>
              <h2 className="text-2xl font-bold text-navy">Our Story</h2>
              <p className="mt-3 text-navy/70 leading-relaxed">
                One O Buildcon was founded with a simple goal: deliver construction projects that clients can trust, on time and within budget. Over the years, we&apos;ve grown into a full-service construction company handling residential, commercial, and renovation work — guided by craftsmanship and accountability at every step.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="rounded-2xl bg-navy p-8 hover:shadow-md transition-shadow">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/20 mb-4">
                <Award className="h-5 w-5 text-amber" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              <p className="mt-3 text-white/70 leading-relaxed">
                To take every project from blueprint to brilliance — combining sound engineering, quality materials, and attentive project management to build spaces our clients are proud of.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber">What Drives Us</p>
            <h2 className="mt-2 text-3xl font-bold text-navy">Our Core Values</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-6 sm:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div key={v.title} variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className="rounded-2xl bg-white border border-black/8 p-8 shadow-sm hover:shadow-lg hover:border-amber/40 transition-all">
                  <motion.div whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }} transition={{ duration: 0.4 }} className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber/10 mb-4">
                    <Icon className="h-6 w-6 text-amber" />
                  </motion.div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-1 w-6 rounded-full bg-amber" />
                    <h3 className="font-bold text-navy text-lg">{v.title}</h3>
                  </div>
                  <p className="text-sm text-navy/70 leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">Our Journey</p>
            <h2 className="mt-2 text-3xl font-bold text-white">Milestones</h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-amber/20" />
            {milestones.map((m, i) => (
              <motion.div key={m.year} variants={fadeUp} className="relative flex gap-6 mb-8 last:mb-0">
                <motion.div whileInView={{ scale: [0, 1.3, 1] }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.4 }} className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber text-navy-dark font-bold text-xs" aria-hidden="true">
                  {m.year}
                </motion.div>
                <div className="flex-1 rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 hover:border-amber/30 transition-all">
                  <p className="text-white font-medium">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber py-14">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <motion.div variants={fadeUp}>
            <h3 className="text-2xl font-bold text-navy-dark">Ready to build with us?</h3>
            <p className="mt-1 text-navy/70">Let&apos;s discuss your project today — free consultation.</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="inline-block rounded-xl bg-navy px-8 py-3 font-semibold text-white hover:bg-navy/90 hover:scale-105 transform transition">
              Contact Us →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
