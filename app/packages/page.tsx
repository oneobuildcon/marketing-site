"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  PencilRuler, Shovel, Building2, Layers, UtensilsCrossed,
  Bath, DoorOpen, Square, Droplets, Zap, CheckCircle2, HardHat,
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
  designs: PencilRuler,
  earthwork: Shovel,
  structure: Building2,
  flooring: Layers,
  kitchen: UtensilsCrossed,
  bathroom: Bath,
  doors: DoorOpen,
  window: Square,
  plumbing: Droplets,
  electrical: Zap,
};

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

  const items = content[selectedPkg][selectedCat];
  const pkgInfo = pkgMeta.find((p) => p.id === selectedPkg)!;
  const catInfo = categories.find((c) => c.id === selectedCat)!;
  const CatIcon = categoryIcons[selectedCat];

  return (
    <main>
      {/* Hero */}
      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-center gap-2 mb-2">
            <HardHat className="h-5 w-5 text-amber" />
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-light">Transparent Pricing</p>
          </div>
          <h1 className="text-4xl font-bold">Construction Packages</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Choose from our range of customizable home construction packages — every package includes quality materials, skilled labour, and on-time delivery.
          </p>
        </div>
      </section>

      {/* Package Tabs */}
      <section className="bg-amber py-6 sticky top-16 z-40 shadow-md">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {pkgMeta.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg.id as PackageId)}
                className={`rounded-lg px-3 py-3 text-center transition-all font-medium text-sm ${
                  selectedPkg === pkg.id
                    ? "bg-navy text-white shadow-lg scale-105"
                    : "bg-white/80 text-navy hover:bg-white hover:shadow-md"
                }`}
              >
                <p className="font-bold">{pkg.name}</p>
                <p className="text-xs mt-0.5 opacity-80">₹{pkg.price}/sqft</p>
                <p className="text-xs opacity-60">(Incl. GST)</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-gray-50 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-64 shrink-0">
              <div className="rounded-2xl overflow-hidden border border-black/8 shadow-sm bg-white">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.id as CategoryId];
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCat(cat.id as CategoryId)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm font-medium transition-all border-b border-black/5 last:border-0 ${
                        selectedCat === cat.id
                          ? "bg-navy text-white"
                          : "text-navy/80 hover:bg-amber/10 hover:text-navy"
                      }`}
                    >
                      <Icon className={`h-4 w-4 shrink-0 ${selectedCat === cat.id ? "text-amber" : "text-navy/50"}`} strokeWidth={1.5} />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Content */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedPkg}-${selectedCat}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl bg-white border border-black/8 shadow-sm p-6"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="rounded-full bg-amber px-3 py-0.5 text-xs font-bold text-navy-dark">{pkgInfo.name} Package</span>
                    <span className="text-xs text-navy/50">₹{pkgInfo.price}/sqft (Incl. GST)</span>
                  </div>

                  <div className="flex items-center gap-2 mt-4 mb-5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy/5 border border-navy/10">
                      <CatIcon className="h-5 w-5 text-navy" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-xl font-bold text-navy">{catInfo.name}</h2>
                  </div>

                  <div className="h-px bg-black/8 mb-5" />

                  <ul className="space-y-3">
                    {items.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`flex items-start gap-3 text-sm ${item.includes("Not included") ? "text-navy/40" : "text-navy/80"}`}
                      >
                        <CheckCircle2 className={`h-4 w-4 mt-0.5 shrink-0 ${item.includes("Not included") ? "text-black/20" : "text-amber"}`} />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              {/* CTA */}
              <div className="mt-6 rounded-2xl bg-navy p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-white font-bold text-lg">Interested in the {pkgInfo.name} Package?</p>
                  <p className="text-white/60 text-sm mt-1">Get a free detailed estimate tailored to your plot and requirements.</p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 rounded-md bg-amber px-6 py-3 font-semibold text-navy-dark transition hover:bg-amber-light hover:scale-105 transform text-sm"
                >
                  Get Free Quote →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
