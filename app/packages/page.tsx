"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  PencilRuler, Shovel, Building2, Layers, UtensilsCrossed,
  Bath, DoorOpen, Square, Droplets, Zap, CheckCircle2, HardHat, ChevronDown,
} from "lucide-react";
import {
  packages as defaultPkgs,
  categories,
  defaultPackageContent,
  PackageContent,
  PackageId,
  CategoryId,
  PackageMeta,
} from "@/data/packagesData";

const categoryIcons: Record<CategoryId, React.ElementType> = {
  designs: PencilRuler, earthwork: Shovel, structure: Building2,
  flooring: Layers, kitchen: UtensilsCrossed, bathroom: Bath,
  doors: DoorOpen, window: Square, plumbing: Droplets, electrical: Zap,
};

const popularIds = ["basic", "standard"];

export default function Packages() {
  const [content, setContent] = useState<PackageContent>(defaultPackageContent);
  const [pkgMeta, setPkgMeta] = useState<PackageMeta[]>(defaultPkgs.map((p) => ({ ...p })));
  const [selectedPkg, setSelectedPkg] = useState<PackageId>("basic");
  const [selectedCat, setSelectedCat] = useState<CategoryId>("designs");

  useEffect(() => {
    const stored = localStorage.getItem("oneo_packages_content");
    if (stored) { try { setContent(JSON.parse(stored)); } catch { /* ignore */ } }
    const storedMeta = localStorage.getItem("oneo_packages_meta");
    if (storedMeta) { try { setPkgMeta(JSON.parse(storedMeta)); } catch { /* ignore */ } }
  }, []);

  const items = content[selectedPkg]?.[selectedCat] ?? [];
  const pkgInfo = pkgMeta.find((p) => p.id === selectedPkg)!;

  return (
    <main>
      {/* Hero */}
      <section className="bg-navy py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #F59E0B 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F59E0B 0%, transparent 40%)" }} />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HardHat className="h-5 w-5 text-amber" />
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">Transparent Pricing</p>
          </div>
          <h1 className="text-4xl font-bold sm:text-5xl">Pick Your <span className="text-amber">Package</span></h1>
          <p className="mt-4 max-w-xl mx-auto text-white/70 text-lg">
            Every package is built around quality, honesty, and on-time delivery. Choose what fits your vision.
          </p>
        </div>
      </section>

      {/* Package Cards */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {pkgMeta.map((pkg, i) => {
              const isSelected = selectedPkg === pkg.id;
              const isPopular = popularIds.includes(pkg.id);
              return (
                <motion.button
                  key={pkg.id}
                  onClick={() => { setSelectedPkg(pkg.id); setSelectedCat("designs"); }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative rounded-2xl p-4 text-center transition-all border-2 ${
                    isSelected
                      ? "bg-navy border-amber shadow-xl shadow-navy/20 text-white"
                      : "bg-white border-transparent shadow-sm hover:border-amber/30 hover:shadow-md text-navy"
                  }`}
                >
                  {isPopular && !isSelected && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-amber px-2 py-0.5 text-[10px] font-bold text-navy-dark whitespace-nowrap">
                      Popular
                    </span>
                  )}
                  <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full ${isSelected ? "bg-amber/20" : "bg-navy/5"}`}>
                    <span className={`text-lg font-black ${isSelected ? "text-amber" : "text-navy/40"}`}>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className={`font-bold text-sm ${isSelected ? "text-white" : "text-navy"}`}>{pkg.name}</p>
                  <p className={`text-xs mt-1 font-semibold ${isSelected ? "text-amber" : "text-amber"}`}>₹{pkg.price}</p>
                  <p className={`text-[10px] ${isSelected ? "text-white/50" : "text-navy/40"}`}>per sqft</p>
                  {isSelected && (
                    <div className="mt-2 flex justify-center">
                      <ChevronDown className="h-4 w-4 text-amber animate-bounce" />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detail Panel */}
      <section className="bg-white py-10 border-t border-black/5">
        <div className="mx-auto max-w-6xl px-6">

          {/* Package header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber">You selected</p>
              <h2 className="text-2xl font-bold text-navy mt-1">
                {pkgInfo?.name} Package
                <span className="ml-3 text-lg font-semibold text-amber">₹{pkgInfo?.price}/sqft</span>
                <span className="ml-1 text-sm text-navy/40 font-normal">(Incl. GST)</span>
              </h2>
            </div>
            <Link
              href="/contact"
              className="shrink-0 rounded-xl bg-amber px-6 py-3 font-semibold text-navy-dark transition hover:bg-amber-light hover:scale-105 transform text-sm"
            >
              Get Free Quote →
            </Link>
          </div>

          {/* Category tabs - horizontal scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.id as CategoryId];
              const isActive = selectedCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id as CategoryId)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all border ${
                    isActive
                      ? "bg-navy text-white border-navy shadow-md"
                      : "bg-gray-50 text-navy/60 border-black/8 hover:bg-amber/10 hover:text-navy hover:border-amber/30"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-amber" : "text-navy/40"}`} strokeWidth={1.5} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Items grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedPkg}-${selectedCat}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {items.length === 0 ? (
                <div className="rounded-2xl bg-gray-50 border border-black/8 py-16 text-center text-navy/30 text-sm">
                  No items listed for this package &amp; category.
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item, i) => {
                    const notIncluded = item.toLowerCase().includes("not included");
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className={`flex items-start gap-3 rounded-xl p-4 border ${
                          notIncluded
                            ? "bg-gray-50 border-black/5 opacity-50"
                            : "bg-navy/2 border-navy/8 hover:border-amber/40 hover:bg-amber/5 transition-colors"
                        }`}
                      >
                        <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${notIncluded ? "text-black/20" : "text-amber"}`} />
                        <span className={`text-sm leading-snug ${notIncluded ? "text-navy/30" : "text-navy/80"}`}>{item}</span>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, #F59E0B 0%, transparent 50%)" }} />
        <div className="relative mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Not sure which package fits you?</h3>
            <p className="mt-2 text-white/60">Talk to our team — we&apos;ll help you choose the right one for your budget and requirements.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-xl bg-amber px-8 py-4 font-semibold text-navy-dark hover:bg-amber-light hover:scale-105 transform transition text-sm"
          >
            Talk to an Expert →
          </Link>
        </div>
      </section>
    </main>
  );
}
