"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HardHat, MapPin, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const projects = [
  { name: "Skyline Bungalow", type: "Premium Bungalow", location: "Pune", desc: "A premium bungalow with custom interiors and landscaped grounds.", img: "https://picsum.photos/seed/proj11/500/350" },
  { name: "Greenfield Row Houses", type: "Row House", location: "Pune", desc: "A gated row house community with modern amenities and shared green spaces.", img: "https://picsum.photos/seed/proj12/500/350" },
  { name: "The Orchid Residency", type: "Residential Building", location: "Lonavala", desc: "A multi-storey residential building with quality finishes and ample parking.", img: "https://picsum.photos/seed/proj13/500/350" },
  { name: "Riverside Farmhouse", type: "Farmhouse", location: "Mumbai", desc: "A countryside farmhouse retreat built to blend with its natural surroundings.", img: "https://picsum.photos/seed/proj14/500/350" },
  { name: "Foundation & Slab Work", type: "RCC Work", location: "Pune", desc: "Structural RCC work covering foundations, columns, and slab casting.", img: "https://picsum.photos/seed/proj15/500/350" },
  { name: "Hilltop Bungalow", type: "Premium Bungalow", location: "Lonavala", desc: "A luxury hilltop bungalow with panoramic views and premium fittings.", img: "https://picsum.photos/seed/proj16/500/350" },
];

const filters = ["All", "Premium Bungalow", "Row House", "Residential Building", "Farmhouse", "RCC Work"];

export default function Projects() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.type === active);

  return (
    <main className="overflow-hidden">
      <style>{`
        @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(8deg)} }
        @keyframes shimmerLine { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
      `}</style>

      {/* Hero */}
      <section className="relative bg-navy py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 60%, #F59E0B 0%, transparent 50%)" }} />
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
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">Portfolio</p>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl font-bold sm:text-5xl">
              Our <span className="text-amber">Projects</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-white/80 text-lg">
              A look at some of the work we&apos;re proud to have delivered.
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
            {filters.map((f) => (
              <motion.button
                key={f}
                onClick={() => setActive(f)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition-all border ${active === f ? "bg-navy text-white border-navy shadow-md" : "bg-gray-50 text-navy/60 border-black/8 hover:border-amber/40 hover:bg-amber/5"}`}
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
            <div className="text-center py-20 text-navy/40">No projects in this category yet.</div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-6xl px-6 text-center">
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white">Want to be our next success story?</motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-white/60 max-w-xl mx-auto">Let&apos;s discuss your project. Free consultation, no obligations.</motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="mt-8 inline-block rounded-xl bg-amber px-10 py-4 font-semibold text-navy-dark hover:bg-amber-light hover:scale-105 transform transition">
              Start Your Project →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
