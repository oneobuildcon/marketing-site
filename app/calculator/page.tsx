"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HardHat, Calculator, Phone, ArrowRight, Info, FileText, FileSpreadsheet, ChevronDown } from "lucide-react";
import {
  defaultPackageContent,
  categories as defaultCategories,
  type PackageContent,
  type CategoryMeta,
} from "@/data/packagesData";

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

type ResultData = {
  rows: { label: string; slab: number; builtUp: number }[];
  plinthSlab: number; topSlab: number; plinthArea: number;
  terraceArea: number; totalArea: number;
  base: number; gstAmount: number; total: number;
};

async function exportPDF(
  result: ResultData,
  pkg: { id: string; name: string; price: number },
  upperFloors: number,
  parking: boolean,
  gst: boolean,
  clientName: string,
  projectLocation: string,
  pkgContent: PackageContent,
  cats: CategoryMeta[],
) {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const navy = [13, 27, 62] as const;
  const amber = [245, 158, 11] as const;
  const W = 210;
  const C1 = 18, C2 = 118, C3 = 152, C4 = 196;
  const quotationNo = `QT-${Date.now()}`;
  const dateStr = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  // Helper: draw page footer
  function drawFooter(pageNum: number) {
    const footerY = 288;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, footerY - 3, W - 14, footerY - 3);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 150);
    doc.text("One O Buildcon  |  +91 88060 29907  |  oneobuildcon@gmail.com", W / 2, footerY + 2, { align: "center" });
    doc.text(`Page ${pageNum}`, W - 14, footerY + 2, { align: "right" });
  }

  // ════════════════════════════════
  // PAGE 1 — Quotation / Cost Sheet
  // ════════════════════════════════

  // Header bar
  doc.setFillColor(...navy);
  doc.rect(0, 0, W, 38, "F");
  doc.setTextColor(245, 158, 11);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("ONE O BUILDCON", 14, 16);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text("Pune, Maharashtra  |  +91 88060 29907  |  oneobuildcon@gmail.com", 14, 24);
  // Quotation label on right
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(245, 158, 11);
  doc.text("QUOTATION", W - 14, 16, { align: "right" });
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text(`No: ${quotationNo}`, W - 14, 23, { align: "right" });
  doc.text(`Date: ${dateStr}`, W - 14, 29, { align: "right" });

  // Client info box
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(14, 44, W - 28, 28, 3, 3, "F");
  doc.setTextColor(...navy);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Client Details", 20, 53);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Client Name:  ${clientName || "—"}`, 20, 61);
  doc.text(`Project Location:  ${projectLocation || "—"}`, 20, 67);
  // Package / config on right side of box
  doc.setFont("helvetica", "bold");
  doc.text("Package:", W - 100, 53);
  doc.setFont("helvetica", "normal");
  doc.text(`${pkg.name}  @  Rs.${pkg.price}/sqft (excl. GST)`, W - 85, 53);
  doc.setFont("helvetica", "bold");
  doc.text("Config:", W - 100, 61);
  doc.setFont("helvetica", "normal");
  doc.text(`${upperFloors === 0 ? "G" : `G+${upperFloors}`}  |  Ground: ${parking ? "Parking" : "House"}`, W - 85, 61);

  // Area breakdown table
  let y = 82;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...navy);
  doc.text("Built-up Area Breakdown", 14, y);
  y += 6;

  doc.setFillColor(...navy);
  doc.rect(14, y, W - 28, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("Floor / Component", C1, y + 5.5);
  doc.text("Slab Area (sqft)", C2, y + 5.5, { align: "right" });
  doc.text("% Applied", C3, y + 5.5, { align: "right" });
  doc.text("Built-up Area (sqft)", C4, y + 5.5, { align: "right" });
  y += 8;

  const tableRows = [
    { label: `Plinth (Ground slab: ${result.plinthSlab.toLocaleString()} sqft)`, slab: result.plinthSlab, pct: "50%", builtUp: result.plinthArea },
    ...result.rows.map((r, i) => ({ label: r.label, slab: r.slab, pct: i === 0 && parking ? "50%" : "100%", builtUp: r.builtUp })),
    { label: `Terrace (Highest slab: ${result.topSlab.toLocaleString()} sqft)`, slab: result.topSlab, pct: "35%", builtUp: result.terraceArea },
  ];

  tableRows.forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 249, idx % 2 === 0 ? 255 : 250);
    doc.rect(14, y, W - 28, 7, "F");
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(row.label, C1, y + 4.8);
    doc.text(row.slab.toLocaleString(), C2, y + 4.8, { align: "right" });
    doc.text(row.pct, C3, y + 4.8, { align: "right" });
    doc.text(row.builtUp.toLocaleString(), C4, y + 4.8, { align: "right" });
    y += 7;
  });

  // Total row
  doc.setFillColor(...amber);
  doc.rect(14, y, W - 28, 8, "F");
  doc.setTextColor(...navy);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Total Built-up Area", C1, y + 5.5);
  doc.text(`${result.totalArea.toLocaleString()} sqft`, C4, y + 5.5, { align: "right" });
  y += 16;

  // Cost breakdown
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...navy);
  doc.text("Cost Breakdown", 14, y);
  y += 6;

  doc.setFillColor(...navy);
  doc.rect(14, y, W - 28, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("Description", C1, y + 5.5);
  doc.text("Amount (INR)", C4, y + 5.5, { align: "right" });
  y += 8;

  const costRows = [
    { label: `Construction Cost (${result.totalArea.toLocaleString()} sqft x Rs.${pkg.price}/sqft)`, value: `Rs. ${result.base.toLocaleString("en-IN")}` },
    ...(gst ? [{ label: "GST @ 18%", value: `Rs. ${result.gstAmount.toLocaleString("en-IN")}` }] : []),
  ];

  costRows.forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 249, idx % 2 === 0 ? 255 : 250);
    doc.rect(14, y, W - 28, 7, "F");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...navy);
    doc.text(row.label, C1, y + 4.8);
    doc.text(row.value, C4, y + 4.8, { align: "right" });
    y += 7;
  });

  // Total cost
  doc.setFillColor(...navy);
  doc.rect(14, y, W - 28, 11, "F");
  doc.setTextColor(...amber);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("TOTAL ESTIMATED COST", C1, y + 7);
  doc.text(`Rs. ${result.total.toLocaleString("en-IN")}`, C4, y + 7, { align: "right" });
  y += 19;

  // Disclaimer on page 1
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(150, 150, 150);
  doc.text("Disclaimer: This is an approximate estimate based on standard construction rates in Pune, Maharashtra. Actual costs may vary", 14, y);
  doc.text("depending on site conditions, material choices, design complexity, and current market rates. Contact us for an accurate quotation.", 14, y + 4);

  drawFooter(1);

  // ════════════════════════════════
  // PAGE 2+ — Package Inclusions
  // ════════════════════════════════
  const pkgCategories = pkgContent[pkg.id] ?? {};
  let pageNum = 2;

  doc.addPage();

  function drawInclusionsHeader() {
    doc.setFillColor(...navy);
    doc.rect(0, 0, W, 28, "F");
    doc.setTextColor(245, 158, 11);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Package Inclusions - ${pkg.name}`, 14, 13);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 255, 255);
    doc.text(`ONE O BUILDCON  |  Quotation: ${quotationNo}`, 14, 22);
    doc.text(`Client: ${clientName || "—"}  |  ${projectLocation || "—"}`, W - 14, 22, { align: "right" });
  }

  drawInclusionsHeader();
  let py = 38;

  cats.forEach((cat) => {
    const items: string[] = pkgCategories[cat.id] ?? [];
    const neededSpace = 10 + items.length * 6.5 + 5;

    if (py + neededSpace > 272) {
      drawFooter(pageNum);
      pageNum++;
      doc.addPage();
      drawInclusionsHeader();
      py = 38;
    }

    // Category header (navy background, white text)
    doc.setFillColor(...navy);
    doc.rect(14, py, W - 28, 9, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    doc.text(cat.name.toUpperCase(), C1, py + 6);
    py += 9;

    // Items
    items.forEach((item, idx) => {
      if (py > 272) {
        drawFooter(pageNum);
        pageNum++;
        doc.addPage();
        drawInclusionsHeader();
        py = 38;
      }
      doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 249, idx % 2 === 0 ? 255 : 250);
      doc.rect(14, py, W - 28, 6.5, "F");
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text("*  " + item, C1, py + 4.5);
      py += 6.5;
    });

    py += 5;
  });

  // Final disclaimer at end
  if (py + 20 > 272) {
    drawFooter(pageNum);
    pageNum++;
    doc.addPage();
    drawInclusionsHeader();
    py = 38;
  }
  py += 4;
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(150, 150, 150);
  doc.text("Disclaimer: Package inclusions are indicative. Exact specifications may be discussed and finalised during project consultation.", 14, py);
  doc.text("One O Buildcon reserves the right to substitute equivalent materials without affecting quality standards.", 14, py + 4);

  drawFooter(pageNum);

  doc.save(`OneO_Buildcon_Quotation_${quotationNo}.pdf`);
}

async function exportExcel(
  result: ResultData,
  pkg: { id: string; name: string; price: number },
  upperFloors: number,
  parking: boolean,
  gst: boolean,
  clientName: string,
  projectLocation: string,
  pkgContent: PackageContent,
  cats: CategoryMeta[],
) {
  const XLSX = await import("xlsx");
  const wb = XLSX.utils.book_new();
  const quotationNo = `QT-${Date.now()}`;
  const date = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  // Sheet 1: Cost Estimate
  const areaRows: (string | number)[][] = [
    ["ONE O BUILDCON — Construction Cost Quotation"],
    [`Quotation No: ${quotationNo}`],
    [`Date: ${date}`],
    [],
    ["CLIENT DETAILS"],
    ["Client Name:", clientName || "—"],
    ["Project Location:", projectLocation || "—"],
    [],
    ["PROJECT DETAILS"],
    ["Package:", `${pkg.name} @ Rs.${pkg.price}/sqft (excl. GST)`],
    ["Configuration:", `${upperFloors === 0 ? "G" : `G+${upperFloors}`} | Ground Floor: ${parking ? "Parking" : "House"}`],
    [],
    ["BUILT-UP AREA BREAKDOWN"],
    ["Floor / Component", "Slab Area (sqft)", "% Applied", "Built-up Area (sqft)"],
    [`Plinth (Ground slab)`, result.plinthSlab, "50%", result.plinthArea],
    ...result.rows.map((r, i): (string | number)[] => [r.label, r.slab, i === 0 && parking ? "50%" : "100%", r.builtUp]),
    [`Terrace (Highest slab)`, result.topSlab, "35%", result.terraceArea],
    ["TOTAL BUILT-UP AREA", "", "", result.totalArea],
    [],
    ["COST BREAKDOWN"],
    ["Description", "", "", "Amount (Rs.)"],
    [`Construction Cost (${result.totalArea.toLocaleString()} sqft x Rs.${pkg.price})`, "", "", result.base],
    ...(gst ? [["GST @ 18%", "", "", result.gstAmount] as (string | number)[]] : []),
    ["TOTAL ESTIMATED COST", "", "", result.total],
    [],
    ["Disclaimer: This is an approximate estimate. Contact One O Buildcon for an accurate site-specific quotation."],
    ["Phone: +91 88060 29907 | Email: oneobuildcon@gmail.com | Pune, Maharashtra"],
  ];

  const ws1 = XLSX.utils.aoa_to_sheet(areaRows);
  ws1["!cols"] = [{ wch: 45 }, { wch: 18 }, { wch: 12 }, { wch: 22 }];
  XLSX.utils.book_append_sheet(wb, ws1, "Cost Estimate");

  // Sheet 2: Package Details
  const pkgCategories = pkgContent[pkg.id] ?? {};
  const detailRows: (string | number)[][] = [
    [`Package Inclusions - ${pkg.name}`],
    [`Quotation No: ${quotationNo}  |  Date: ${date}`],
    [`Client: ${clientName || "—"}  |  Location: ${projectLocation || "—"}`],
    [],
  ];

  cats.forEach((cat) => {
    const items: string[] = pkgCategories[cat.id] ?? [];
    detailRows.push([cat.name.toUpperCase()]);
    items.forEach((item) => {
      detailRows.push(["", `* ${item}`]);
    });
    detailRows.push([]);
  });

  detailRows.push(["Disclaimer: Package inclusions are indicative. Exact specifications may be finalised during project consultation."]);
  detailRows.push(["One O Buildcon | +91 88060 29907 | oneobuildcon@gmail.com | Pune, Maharashtra"]);

  const ws2 = XLSX.utils.aoa_to_sheet(detailRows);
  ws2["!cols"] = [{ wch: 30 }, { wch: 70 }];
  XLSX.utils.book_append_sheet(wb, ws2, "Package Details");

  XLSX.writeFile(wb, `OneO_Buildcon_Quotation_${quotationNo}.xlsx`);
}

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
  const [clientName, setClientName] = useState("");
  const [projectLocation, setProjectLocation] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const [pkgContent, setPkgContent] = useState<PackageContent>(defaultPackageContent);
  const [cats, setCats] = useState<CategoryMeta[]>(defaultCategories);
  const [result, setResult] = useState<null | ResultData>(null);

  // Load package content and categories from localStorage on mount
  useEffect(() => {
    try {
      const storedContent = localStorage.getItem("oneo_packages_content");
      if (storedContent) {
        const parsed = JSON.parse(storedContent) as PackageContent;
        setPkgContent(parsed);
      }
    } catch {
      // fallback to default already set
    }
    try {
      const storedCats = localStorage.getItem("oneo_categories_meta");
      if (storedCats) {
        const parsed = JSON.parse(storedCats) as CategoryMeta[];
        setCats(parsed);
      }
    } catch {
      // fallback to default already set
    }
  }, []);

  // Rebuild floor rows when floor count or parking changes, preserve existing slab values
  useEffect(() => {
    setFloorRows((prev) => {
      const newRows = buildFloorRows(upperFloors, parking);
      return newRows.map((r, i) => ({ ...r, slab: prev[i]?.slab ?? "" }));
    });
  }, [upperFloors, parking]);

  function handleSubmitDetails() {
    const phone = clientPhone.replace(/\D/g, "");
    if (!clientName.trim()) { setDetailsError("Please enter your name."); return; }
    if (!projectLocation.trim()) { setDetailsError("Please enter your project location."); return; }
    if (phone.length !== 10 || !/^[6-9]/.test(phone)) {
      setDetailsError("Enter a valid 10-digit mobile number.");
      return;
    }
    setDetailsError("");

    // Save the lead so it reaches the admin leads page + Google Sheet
    const leadData = {
      name: clientName.trim(),
      phone: `+91${phone}`,
      location: projectLocation.trim(),
      source: "Cost Calculator",
      date: new Date().toLocaleString("en-IN"),
    };
    try {
      const existing = JSON.parse(localStorage.getItem("oneo_leads") || "[]");
      existing.push(leadData);
      localStorage.setItem("oneo_leads", JSON.stringify(existing));
    } catch {}
    fetch("/api/save-lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(leadData) }).catch(() => {});

    setDetailsSubmitted(true);
  }

  function updateSlab(index: number, value: string) {
    setFloorRows((prev) => prev.map((r, i) => i === index ? { ...r, slab: value } : r));
  }

  function calculate() {
    const slabs = floorRows.map((r) => parseFloat(r.slab) || 0);
    if (slabs.every((s) => s <= 0)) return;

    const groundSlab = slabs[0];
    const maxSlab = Math.max(...slabs);
    const plinthArea = Math.round(groundSlab * 0.50);
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

    setResult({ rows, plinthSlab: groundSlab, topSlab: maxSlab, plinthArea, terraceArea, totalArea, base, gstAmount, total });
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

              {/* Client Details */}
              <motion.div variants={fadeUp} className="rounded-2xl bg-white border border-black/8 shadow-sm p-6">
                <label className="block text-xs font-semibold uppercase tracking-widest text-navy/40 mb-3">Client Details</label>
                <p className="text-xs text-navy/50 mb-3 -mt-1">All fields are required to view your estimate.</p>
                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-navy">Client Name <span className="text-red-500">*</span></label>
                    <input
                      id="calc-name"
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); document.getElementById("calc-location")?.focus(); } }}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full rounded-xl border border-black/15 px-3 py-2.5 text-base text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-navy">Project Location <span className="text-red-500">*</span></label>
                    <input
                      id="calc-location"
                      type="text"
                      value={projectLocation}
                      onChange={(e) => setProjectLocation(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); document.getElementById("calc-phone")?.focus(); } }}
                      placeholder="e.g. Kothrud, Pune"
                      className="w-full rounded-xl border border-black/15 px-3 py-2.5 text-base text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-navy">Mobile Number <span className="text-red-500">*</span></label>
                    <div className="flex gap-2">
                      <span className="flex items-center rounded-xl border border-black/15 px-3 text-navy/60 font-medium text-sm bg-gray-50">+91</span>
                      <input
                        id="calc-phone"
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSubmitDetails(); } }}
                        placeholder="98765 43210"
                        maxLength={10}
                        className="flex-1 rounded-xl border border-black/15 px-3 py-2.5 text-base text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
                      />
                    </div>
                  </div>
                  {detailsError && <p className="text-red-500 text-xs font-medium">{detailsError}</p>}
                  {!detailsSubmitted ? (
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={handleSubmitDetails}
                      className="w-full rounded-xl bg-amber py-3 text-sm font-bold text-navy-dark hover:bg-amber/90 transition"
                    >
                      Submit &amp; See Estimate →
                    </motion.button>
                  ) : (
                    <p className="text-center text-xs font-medium text-emerald-600">✓ Details submitted — enter slab areas below to see your estimate.</p>
                  )}
                </div>
              </motion.div>

              {/* Package selector */}
              <motion.div variants={fadeUp} className="rounded-2xl bg-white border border-black/8 shadow-sm p-6">
                <label className="block text-xs font-semibold uppercase tracking-widest text-navy/40 mb-3">Select Package</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {packages.map((pkg, i) => {
                    const isSelected = selectedPkg.id === pkg.id;
                    const isPopular = pkg.id === "basic" || pkg.id === "standard";
                    return (
                      <motion.button
                        key={pkg.id}
                        onClick={() => setSelectedPkg(pkg)}
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
                        <p className="text-xs mt-1 font-semibold text-amber">₹{pkg.price}</p>
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
                <p className="text-xs text-navy/40 mb-4">Plinth &amp; Terrace calculated from the largest slab area automatically.</p>
                <div className="space-y-3">
                  {floorRows.map((row, i) => (
                    <div key={row.id} className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                      <span className="text-sm font-medium text-navy sm:w-44 sm:shrink-0">{row.label}</span>
                      <input
                        type="number"
                        value={row.slab}
                        onChange={(e) => updateSlab(i, e.target.value)}
                        placeholder="Enter sqft"
                        min={0}
                        className="w-full rounded-xl border border-black/15 px-3 py-2.5 text-base font-bold text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
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
                {result && detailsSubmitted ? (
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
                            <span className="text-white/60">Plinth (50% of ground {result.plinthSlab.toLocaleString()} sqft)</span>
                            <span>{result.plinthArea.toLocaleString()} sqft</span>
                          </div>
                          {result.rows.map((r) => (
                            <div key={r.label} className="flex justify-between">
                              <span className="text-white/60">{r.label} ({r.slab.toLocaleString()} sqft)</span>
                              <span>{r.builtUp.toLocaleString()} sqft</span>
                            </div>
                          ))}
                          <div className="flex justify-between">
                            <span className="text-white/60">Terrace (35% of highest slab {result.topSlab.toLocaleString()} sqft)</span>
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

                    {/* Export buttons */}
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => result && exportPDF(result, selectedPkg, upperFloors, parking, gst, clientName, projectLocation, pkgContent, cats)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-navy py-3 font-semibold text-white hover:bg-navy/90 transition text-sm"
                      >
                        <FileText className="h-4 w-4" /> Download PDF
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                        onClick={() => result && exportExcel(result, selectedPkg, upperFloors, parking, gst, clientName, projectLocation, pkgContent, cats)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700 transition text-sm"
                      >
                        <FileSpreadsheet className="h-4 w-4" /> Download Excel
                      </motion.button>
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
                    <p className="text-navy font-bold text-lg">Submit your details to see the estimate</p>
                    <p className="text-navy/50 text-sm mt-2">Enter your <strong>Name</strong>, <strong>Project Location</strong> and <strong>Mobile Number</strong> and click <strong>Submit</strong>, then fill in the floor slab areas to view your cost estimate.</p>
                    <div className="mt-6 flex items-center justify-center gap-1 text-xs text-navy/30">
                      <ArrowRight className="h-3 w-3" /> Submit details → Select package → Enter slab areas
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
