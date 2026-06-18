"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HardHat, Home, Building2, Hammer, Ruler, PaintBucket, ClipboardList, ArrowRight } from "lucide-react";
import Link from "next/link";

const MotionLink = motion(Link);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const services = [
  { title: "Premium Bungalows", desc: "Custom-designed bungalows with premium finishes, built to your exact specifications from foundation to final touches.", img: "https://picsum.photos/seed/bungalow2/500/350", icon: Home },
  { title: "Row Houses", desc: "Thoughtfully planned row house developments that balance privacy, community, and efficient land use.", img: "https://picsum.photos/seed/rowhouse2/500/350", icon: Building2 },
  { title: "Residential Buildings", desc: "Multi-storey residential complexes engineered for safety, durability, and comfortable modern living.", img: "https://picsum.photos/seed/residential2/500/350", icon: ClipboardList },
  { title: "Farmhouses", desc: "Farmhouse builds designed to blend with natural surroundings while offering modern comfort and durability.", img: "https://picsum.photos/seed/farmhouse2/500/350", icon: Ruler },
  { title: "RCC Work", desc: "Precision RCC structural work — foundations, columns, slabs, and framing carried out to strict engineering standards.", img: "https://picsum.photos/seed/rccwork2/500/350", icon: Hammer },
  { title: "Interior Finishing", desc: "Floor-to-ceiling interior finishing — flooring, fittings, paint, and décor tailored to your taste.", img: "https://picsum.photos/seed/interior2/500/350", icon: PaintBucket },
];

export default function Services() {
  return (
    <main className="overflow-hidden">
      <style>{`
        @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(8deg)} }
        @keyframes shimmerLine { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        @keyframes shimmerCard { 0%{left:-100%} 100%{left:200%} }
        @keyframes heroPulse { 0%,100%{opacity:.05} 50%{opacity:.12} }
      `}</style>

      {/* Hero */}
      <section className="relative bg-navy py-20 text-white overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, #F59E0B 0%, transparent 50%)", animation: "heroPulse 8s ease-in-out infinite" }} />
        {[
          { top: "20%", left: "8%", size: 36, delay: "0s", dur: "6s" },
          { top: "55%", left: "85%", size: 44, delay: "1.5s", dur: "5s" },
        ].map((f, i) => (
          <div key={i} className="absolute pointer-events-none text-amber/15" style={{ top: f.top, left: f.left, animation: `floatSlow ${f.dur} ${f.delay} ease-in-out infinite` }}>
            <HardHat style={{ width: f.size, height: f.size }} />
          </div>
        ))}
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <HardHat className="h-5 w-5 text-amber" />
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">What We Build</p>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl font-bold sm:text-5xl">
              Our <span className="text-amber">Services</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-white/80 text-lg">
              Core expertise — built on quality, precision, and reliability.
            </motion.p>
            <motion.div variants={fadeUp} className="relative mt-4 h-0.5 w-24 bg-amber/40 overflow-hidden rounded-full">
              <div className="absolute inset-y-0 w-12 bg-amber/80 rounded-full" style={{ animation: "shimmerLine 2s ease-in-out infinite" }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <MotionLink
                  key={service.title}
                  href="/contact"
                  aria-label={`${service.title} — get a free quote`}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group relative block overflow-hidden rounded-2xl bg-white border border-black/8 shadow-sm hover:shadow-xl hover:border-amber/30 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                >
                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ animation: "shimmerCard 0.8s ease-in-out" }} />
                  </div>

                  <div className="relative h-52 w-full overflow-hidden">
                    <Image src={service.img} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent" />
                    <motion.div whileHover={{ rotate: [0, -15, 15, 0], scale: 1.2 }} transition={{ duration: 0.4 }} className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber">
                      <Icon className="h-5 w-5 text-navy-dark" />
                    </motion.div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-navy group-hover:text-amber transition-colors">{service.title}</h3>
                    <p className="mt-2 text-sm text-navy/70 leading-relaxed">{service.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-amber text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
                      Get a quote <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </MotionLink>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mx-auto max-w-6xl px-6 text-center">
          <motion.h2 variants={fadeUp} className="text-3xl font-bold text-white">Ready to start your project?</motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-white/60 max-w-xl mx-auto">Our team is ready to bring your vision to life. Get a free consultation today.</motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact" className="mt-8 inline-block rounded-xl bg-amber px-10 py-4 font-semibold text-navy-dark hover:bg-amber-light hover:scale-105 transform transition">
              Get a Free Quote →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
