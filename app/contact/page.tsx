"use client";

import { motion } from "framer-motion";
import { HardHat, Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 88060 29907", color: "text-amber" },
  { icon: Mail, label: "Email", value: "oneobuildcon@gmail.com", color: "text-amber" },
  { icon: MapPin, label: "Address", value: "Pune, Maharashtra, India", color: "text-amber" },
  { icon: Clock, label: "Hours", value: "Mon - Sat, 9am - 6pm", color: "text-amber" },
];

export default function Contact() {
  return (
    <main className="overflow-hidden">
      <style>{`
        @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(8deg)} }
        @keyframes shimmerLine { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(1.8);opacity:0} }
        @keyframes heroPulse { 0%,100%{opacity:.05} 50%{opacity:.12} }
      `}</style>

      {/* Hero */}
      <section className="relative bg-navy py-20 text-white overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 60% 40%, #F59E0B 0%, transparent 50%)", animation: "heroPulse 8s ease-in-out infinite" }} />
        {[
          { top: "20%", left: "4%", size: 36, delay: "0s", dur: "6s" },
          { top: "60%", left: "88%", size: 42, delay: "2s", dur: "7s" },
        ].map((f, i) => (
          <div key={i} className="absolute pointer-events-none text-amber/15" style={{ top: f.top, left: f.left, animation: `floatSlow ${f.dur} ${f.delay} ease-in-out infinite` }}>
            <HardHat style={{ width: f.size, height: f.size }} />
          </div>
        ))}
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <HardHat className="h-5 w-5 text-amber" />
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">Get in Touch</p>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl font-bold sm:text-5xl">
              Contact <span className="text-amber">Us</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-white/80 text-lg">
              Tell us about your project and we&apos;ll get back to you within one business day.
            </motion.p>
            <motion.div variants={fadeUp} className="relative mt-4 h-0.5 w-24 bg-amber/40 overflow-hidden rounded-full">
              <div className="absolute inset-y-0 w-12 bg-amber/80 rounded-full" style={{ animation: "shimmerLine 2s ease-in-out infinite" }} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">

            {/* Info cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="text-2xl font-bold text-navy mb-8">Get in Touch</motion.h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      variants={fadeUp}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="rounded-2xl bg-white border border-black/8 p-5 shadow-sm hover:shadow-md hover:border-amber/40 transition-all"
                    >
                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-amber/10 mb-3">
                        <Icon className="h-5 w-5 text-amber" />
                        <div className="absolute inset-0 rounded-full bg-amber/20" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-navy/40 mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-navy">{item.value}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Map placeholder */}
              <motion.div variants={fadeUp} whileHover={{ scale: 1.01 }} className="mt-6 rounded-2xl overflow-hidden border border-black/8 shadow-sm h-48 bg-navy/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-amber mx-auto mb-2" />
                  <p className="text-sm font-medium text-navy">Pune, Maharashtra, India</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="rounded-2xl bg-white border border-black/8 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-navy mb-6">Send a Message</h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />
    </main>
  );
}
