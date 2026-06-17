"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HardHat, Calculator, Phone, ArrowRight, Info } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

const packages = [
  { id: "structure", name: "Structure Only", price: 1199, color: "border-gray-200 bg-gray-50" },
  { id: "basic",     name: "Basic",          price: 1549, color: "border-amber/40 bg-amber/5" },
  { id: "standard",  name: "Standard",       price: 1699, color: "border-blue-200 bg-blue-50" },
  { id: "premium",   name: "Premium",        price: 1949, color: "border-purple-200 bg-purple-50" },
  { id: "royal",     name: "Royal",          price: 2099, color: "border-rose-200 bg-rose-50" },
  { id: "luxury",    name: "Luxury",         price: 2499, color: "border-yellow-300 bg-yellow-50" },
];

const upperFloorOptions = [0, 1, 2, 3, 4, 5, 6];

function formatINR(num: number) {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return `₹${num.toLocaleString("en-IN")}`;
}

type FloorRow = { id: string; label: string; slab: string };

function buildFloorRows(upperFloors: number, parking: boolean): FloorRow[] {
  const rows: FloorRow[] = [
    { id: "ground", label: parking ? "Ground Floor (Parking)" : "Ground Floor (House)", slab: "" },
  ];
  for (let i = 1; i <= upperFloors; i++) {
    rows.push({ id: `f${i}`, label: `${i}${i === 1 ? "st" : i === 2 ? "nd" : i === 3 ? "rd" : "th"} Floor`, slab: "" });
  }
  return rows;
}

export default function CalculatorPage() {
  const [selectedPkg, setSelectedPkg] = useState(packages[1]);
  const [upperFloors, setUpperFloors] = useState(0);
  const [parking, setParking] = useState(false);
  const [gst, setGst] = useState(true);
  const [floorRows, setFloorRows] = useState<FloorRow[]>(buildFloorRows(0, false));
  const [result, setResult] = useState<null | {
    rows: { label: string; slab: number; builtUp: number }[];
    plinthSlab: number; plinthArea: number;
    terraceArea: number; totalArea: number;
    base: number; gstAmount: number; total: number;
  }>(null);

  // Rebuild floor rows when floor count or parking changes, preserve existing slab values
  useEffect(() => {
    setFloorRows((prev) => {
      const newRows = buildFloorRows(upperFloors, parking);
      return newRows.map((r, i) => ({ ...r, slab: prev[i]?.slab ?? "" }));
    });
  }, [upperFloors, parking]);

  function updateSlab(index: number, value: string) {
    setFloorRows((prev) => prev.map((r, i) => i === index ? { ...r, slab: value } : r));
  }

  function calculate() {
    const slabs = floorRows.map((r) => parseFloat(r.slab) || 0);
    if (slabs.every((s) => s <= 0)) return;

    const maxSlab = Math.max(...slabs);
    const plinthArea = Math.round(maxSlab * 0.50);
    const terraceArea = Math.round(maxSlab * 0.35);

    const rows = floorRows.map((r, i) => {
      const slab = parseFloat(r.slab) || 0;
      const pct = i === 0 && parking ? 0.50 : 1.00;
      return { label: r.label, slab, builtUp: Math.round(slab * pct) };
    });

    const floorTotal = rows.reduce((s, r) => s + r.builtUp, 0);
    const totalArea = plinthArea + floorTotal + terraceArea;
    const base = Math.round(totalArea * selectedPkg.price);
    const gstAmount = gst ? Math.round(base * 0.18) : 0;
    const total = base + gstAmount;

    setResult({ rows, plinthSlab: maxSlab, plinthArea, terraceArea, totalArea, base, gstAmount, total });
  }

  useEffect(() => {
    calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floorRows, selectedPkg, gst]);

  return (
    <main className="overflow-hidden">
      <style>{`
        @keyframes shimmerLine { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(8deg)} }
      `}</style>

      {/* Hero */}
      <section className="relative bg-navy py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #F59E0B 0%, transparent 50%), radial-gradient(circle at 75% 20%, #F59E0B 0%, transparent 40%)" }} />
        {[{ top: "20%", left: "5%", size: 36, delay: "0s", dur: "6s" }, { top: "55%", left: "88%", size: 42, delay: "2s", dur: "5s" }].map((f, idx) => (
          <div key={idx} className="absolute pointer-events-none text-amber/15" style={{ top: f.top, left: f.left, animation: `floatSlow ${f.dur} ${f.delay} ease-in-out infinite` }}>
            <HardHat style={{ width: f.size, height: f.size }} />
          </div>
        ))}
        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-3">
              <Calculator className="h-5 w-5 text-amber" />
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">Free Tool</p>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl font-bold sm:text-5xl">
              Construction <span className="text-amber">Cost Calculator</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-3 max-w-2xl text-white/80 text-lg">
              Get an instant estimate — enter each floor&apos;s slab area and see your total built-up area and cost.
            </motion.p>
            <motion.div variants={fadeUp} className="relative mt-4 h-0.5 w-24 bg-amber/40 overflow-hidden rounded-full">
              <div className="absolute inset-y-0 w-12 bg-amber/80 rounded-full" style={{ animation: "shimmerLine 2s ease-in-out infinite" }} />
            </motion.div>
            <motion.p variants={fadeUp} className="mt-3 flex items-center gap-1 text-xs text-white/50">
              <Info className="h-3 w-3" /> Estimate only — final cost depends on site conditions and finishes.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">

            {/* LEFT — Inputs */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-6">

              {/* Package selector */}
              <motion.div variants={fadeUp} className="rounded-2xl bg-white border border-black/8 shadow-sm p-6">
                <label className="block text-xs font-semibold uppercase tracking-widest text-navy/40 mb-3">Select Package</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {packages.map((pkg) => (
                    <motion.button key={pkg.id} onClick={() => setSelectedPkg(pkg)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className={`rounded-xl border-2 p-3 text-center transition-all ${selectedPkg.id === pkg.id ? "border-amber bg-amber/10 shadow-md" : `${pkg.color} border`}`}>
                      <p className="font-bold text-sm text-navy">{pkg.name}</p>
                      <p className="text-xs text-amber font-semibold mt-0.5">₹{pkg.price}/sqft</p>
                      <p className="text-[10px] text-navy/40 mt-0.5">excl. GST</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Ground floor type */}
              <motion.div variants={fadeUp} className="rounded-2xl bg-white border border-black/8 shadow-sm p-6">
                <label className="block text-xs font-semibold uppercase tracking-widest text-navy/40 mb-3">Ground Floor Usage</label>
                <div className="grid grid-cols-2 gap-3">
                  {[{ label: "House / Residential", sub: "100% of slab", value: false }, { label: "Parking", sub: "50% of slab", value: true }].map((opt) => (
                    <motion.button key={String(opt.value)} onClick={() => setParking(opt.value)} whileHover={{ scale: 1.02 }}
                      className={`rounded-xl border-2 p-3 text-center transition-all ${parking === opt.value ? "border-amber bg-amber/10 shadow-md" : "border-black/10 bg-gray-50 hover:border-amber/40"}`}>
                      <p className="font-semibold text-sm text-navy">{opt.label}</p>
                      <p className="text-[11px] text-navy/40 mt-0.5">{opt.sub}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Upper floors count */}
              <motion.div variants={fadeUp} className="rounded-2xl bg-white border border-black/8 shadow-sm p-6">
                <label className="block text-xs font-semibold uppercase tracking-widest text-navy/40 mb-3">Upper Floors (above Ground)</label>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {upperFloorOptions.map((n) => (
                    <motion.button key={n} onClick={() => setUpperFloors(n)} whileHover={{ scale: 1.06 }}
                      className={`rounded-xl border-2 py-3 text-center font-bold text-sm transition-all ${upperFloors === n ? "border-amber bg-amber/10 shadow-md text-navy" : "border-black/10 bg-gray-50 text-navy/60 hover:border-amber/40"}`}>
                      {n === 0 ? "None" : `+${n}`}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Per-floor slab inputs */}
              <motion.div variants={fadeUp} className="rounded-2xl bg-white border border-black/8 shadow-sm p-6">
                <label className="block text-xs font-semibold uppercase tracking-widest text-navy/40 mb-1">Slab Area per Floor (sq ft)</label>
                <p className="text-xs text-navy/40 mb-4">Plinth &amp; Terrace will use the largest slab area automatically.</p>
                <div className="space-y-3">
                  {floorRows.map((row, i) => (
                    <div key={row.id} className="flex items-center gap-3">
                      <span className="w-44 shrink-0 text-sm font-medium text-navy">{row.label}</span>
                      <input
                        type="number"
                        value={row.slab}
                        onChange={(e) => updateSlab(i, e.target.value)}
                        placeholder="sqft"
                        min={0}
                        className="flex-1 rounded-xl border border-black/15 px-3 py-2 text-base font-bold text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* GST toggle */}
              <motion.div variants={fadeUp} className="rounded-2xl bg-white border border-black/8 shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-navy">Include GST (18%)</span>
                  <button onClick={() => setGst(!gst)} className={`relative h-6 w-11 rounded-full transition-colors ${gst ? "bg-amber" : "bg-gray-300"}`}>
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${gst ? "translate-x-5" : "translate-x-0.5"}`} />
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* RIGHT — Result */}
            <div className="lg:sticky lg:top-24 h-fit">
              <AnimatePresence mode="wait">
                {result ? (
                  <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-4">

                    {/* Main estimate card */}
                    <div className="rounded-2xl bg-navy text-white shadow-xl overflow-hidden">
                      <div className="bg-amber/20 px-6 py-4 border-b border-white/10">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">Your Estimate</p>
                        <p className="text-sm text-white/60 mt-0.5">{selectedPkg.name} · {upperFloors === 0 ? "G" : `G+${upperFloors}`} · {parking ? "Parking" : "House"}</p>
                      </div>
                      <div className="px-6 py-6">
                        <motion.p key={result.total} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-5xl font-black text-amber">
                          {formatINR(result.total)}
                        </motion.p>
                        <p className="text-white/50 text-sm mt-1">Total estimated cost {gst ? "(incl. 18% GST)" : "(excl. GST)"}</p>

                        {/* Area breakdown */}
                        <div className="mt-5 rounded-xl bg-white/5 border border-white/10 p-4 space-y-1.5 text-xs">
                          <p className="text-white/40 font-semibold uppercase tracking-widest mb-2">Built-up Area Breakdown</p>
                          <div className="flex justify-between">
                            <span className="text-white/60">Plinth (50% of {result.plinthSlab.toLocaleString()} sqft)</span>
                            <span>{result.plinthArea.toLocaleString()} sqft</span>
                          </div>
                          {result.rows.map((r) => (
                            <div key={r.label} className="flex justify-between">
                              <span className="text-white/60">{r.label} ({r.slab.toLocaleString()} sqft)</span>
                              <span>{r.builtUp.toLocaleString()} sqft</span>
                            </div>
                          ))}
                          <div className="flex justify-between">
                            <span className="text-white/60">Terrace (35% of {result.plinthSlab.toLocaleString()} sqft)</span>
                            <span>{result.terraceArea.toLocaleString()} sqft</span>
                          </div>
                          <div className="h-px bg-white/10 my-1" />
                          <div className="flex justify-between font-bold">
                            <span>Total Built-up Area</span>
                            <span className="text-amber">{result.totalArea.toLocaleString()} sqft</span>
                          </div>
                        </div>

                        {/* Cost breakdown */}
                        <div className="mt-4 space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/60">{result.totalArea.toLocaleString()} sqft × ₹{selectedPkg.price}</span>
                            <span className="font-semibold">{formatINR(result.base)}</span>
                          </div>
                          {gst && (
                            <div className="flex justify-between">
                              <span className="text-white/60">GST (18%)</span>
                              <span className="font-semibold">+{formatINR(result.gstAmount)}</span>
                            </div>
                          )}
                          <div className="h-px bg-white/10" />
                          <div className="flex justify-between">
                            <span className="font-bold">Total</span>
                            <span className="font-black text-amber text-lg">{formatINR(result.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="rounded-2xl bg-amber p-6">
                      <p className="font-bold text-navy-dark text-lg">Get an accurate quote!</p>
                      <p className="text-navy/70 text-sm mt-1">This is an estimate. Our team will give you a detailed, site-specific quote — free of charge.</p>
                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <Link href="/contact" className="flex-1 rounded-xl bg-navy py-3 text-center font-semibold text-white hover:bg-navy/90 transition text-sm">
                          Get Free Quote →
                        </Link>
                        <a href="https://wa.me/918806029907" target="_blank" rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-navy py-3 font-semibold text-navy hover:bg-navy/10 transition text-sm">
                          <Phone className="h-4 w-4" /> WhatsApp Us
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl bg-white border border-black/8 shadow-sm p-10 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber/10 mx-auto mb-4">
                      <Calculator className="h-8 w-8 text-amber" />
                    </div>
                    <p className="text-navy font-bold text-lg">Enter floor slab areas</p>
                    <p className="text-navy/50 text-sm mt-2">Fill in the details on the left to see your instant cost estimate</p>
                    <div className="mt-6 flex items-center justify-center gap-1 text-xs text-navy/30">
                      <ArrowRight className="h-3 w-3" /> Select package → Choose floors → Enter slab areas
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white py-8 border-t border-black/5">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-xs text-navy/40 max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> This calculator provides an approximate estimate based on standard construction rates in Pune, Maharashtra. Actual costs may vary depending on site conditions, material choices, design complexity, and current market rates. Contact us for a detailed, accurate quotation.
          </p>
        </div>
      </section>
    </main>
  );
}
