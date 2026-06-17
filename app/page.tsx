"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Years Experience", value: 15, suffix: "+" },
  { label: "Happy Clients", value: 200, suffix: "+" },
  { label: "Cities Served", value: 5, suffix: "" },
];

const whyChooseUs = [
  { label: "15+ Years of Experience", icon: Award },
  { label: "Licensed & Insured", icon: ShieldCheck },
  { label: "Skilled Team of Experts", icon: Users },
  { label: "High-Quality Materials", icon: Package },
  { label: "On-Time Delivery", icon: Clock },
  { label: "Transparent Pricing", icon: CheckCircle2 },
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

export default function Home() {
  return (
    <main>
      <section
        className="relative overflow-hidden bg-navy text-white"
        style={{ minHeight: "90vh", display: "flex", alignItems: "center" }}
      >
        <Image
          src="https://picsum.photos/seed/herosite/1600/900"
          alt="Construction site"
          fill
          priority
          className="object-cover opacity-30"
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/30" />
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
            <motion.p variants={fadeUp} className="max-w-xl text-white/80 text-lg">
              Trusted experts in premium bungalows, row houses, residential
              buildings, farmhouses, and RCC work — delivering quality, safety,
              and on-time results.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link href="/contact" className="rounded-md bg-amber px-8 py-3 font-semibold text-navy-dark transition hover:bg-amber-light hover:scale-105 transform">
                Get a Free Quote
              </Link>
              <Link href="/projects" className="rounded-md border border-white/30 px-8 py-3 font-semibold transition hover:bg-white/10">
                View Our Projects →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-amber py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 sm:grid-cols-4">
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
                <motion.div key={service.title} variants={fadeUp} whileHover={{ y: -6, scale: 1.02 }} className="rounded-xl bg-white/5 p-6 border border-white/10 hover:bg-white/10 hover:border-amber/40 transition-colors cursor-default">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber/10 border border-amber/20">
                    <Icon className="h-6 w-6 text-amber" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-semibold text-white text-lg">{service.title}</h3>
                  <p className="mt-1 text-sm text-white/60">{service.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative h-96 w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image src="https://picsum.photos/seed/whyus/600/700" alt="Why choose One O Buildcon" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-lg bg-amber px-4 py-2">
              <p className="font-bold text-navy-dark text-lg">15+ Years</p>
              <p className="text-xs text-navy-dark/80">of trusted construction</p>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp}>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber">Why Us</p>
              <h2 className="mt-2 text-3xl font-bold text-navy">Why Choose One O Buildcon</h2>
              <p className="mt-3 text-navy/70">We combine decades of expertise with modern techniques to deliver structures that stand the test of time.</p>
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
              <motion.div key={project.name} variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }} className="group relative h-56 overflow-hidden rounded-2xl shadow-lg cursor-pointer">
                <Image src={project.img} alt={project.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent" />
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
          <motion.p variants={fadeUp} className="mt-3 text-white/80 text-lg">Let One O Buildcon bring your vision to life. Free consultation, no obligations.</motion.p>
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
