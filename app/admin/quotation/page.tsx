"use client";

import { useEffect, useState } from "react";
import { FileText, Plus, Trash2, Download, RotateCcw, Package } from "lucide-react";
import {
  quotationPresets,
  defaultSpecialNotes,
  type SpecSection,
  type RateGroup,
} from "@/data/quotationSpecs";

// Header + bank details rarely change, so they persist in localStorage.
// Specs/notes/rates load from the selected package preset and are fully
// editable per quotation.
const TPL_KEY = "oneo_quotation_template_v2";

type AreaRow = { label: string; area: string };
type PayRow = { stage: string; percent: string };
type FloorRow = { label: string; slab: string };
type GroundUsage = "house" | "parking" | "mixed";

const defaultHeader = {
  company: "ONE O BUILDCON",
  subtitle: "CONSTRUCTIONS · RCC · DEVELOPMENTS · INTERIORS",
  phone: "+91 96074 07474",
  email: "oneobuildcon@gmail.com",
  website: "www.oneobuildcon.com",
  gstin: "27GKVPS6241G1ZE",
  address: "Patharemala, Charholi Budruk, Pimpri Chinchwad, Pune, Maharashtra – 412105",
};

const defaultPayments: PayRow[] = [
  { stage: "Advance / Booking", percent: "5" },
  { stage: "After Plinth", percent: "10" },
  { stage: "After 1st RCC Slab", percent: "8" },
  { stage: "After 2nd RCC Slab", percent: "8" },
  { stage: "After 3rd RCC Slab", percent: "8" },
  { stage: "After 4th RCC Slab", percent: "8" },
  { stage: "After Brickwork (all floors)", percent: "10" },
  { stage: "After Plaster (all floors)", percent: "10" },
  { stage: "After Tile & Plumbing Work", percent: "10" },
  { stage: "After Electrical & POP Work", percent: "8" },
  { stage: "After Painting", percent: "10" },
  { stage: "On Handover / Possession", percent: "5" },
];

const defaultBank = { accountName: "", accountNumber: "", bankName: "", ifsc: "", branch: "" };

const defaultFloorRows: FloorRow[] = [
  { label: "Ground Floor", slab: "" },
  { label: "First Floor", slab: "" },
];

function clone<T>(v: T): T {
  return JSON.parse(JSON.stringify(v));
}

export default function AdminQuotation() {
  // Persisted template bits
  const [header, setHeader] = useState(defaultHeader);
  const [bank, setBank] = useState(defaultBank);

  // Package-driven, per-quotation editable state
  const [pkgId, setPkgId] = useState("basic");
  const [rate, setRate] = useState(String(quotationPresets[0].rate));
  const [sections, setSections] = useState<SpecSection[]>(clone(quotationPresets[0].sections));
  const [notes, setNotes] = useState<string[]>(clone(defaultSpecialNotes));
  const [rates, setRates] = useState<RateGroup[]>(clone(quotationPresets[0].rates));
  const [brands, setBrands] = useState<RateGroup[]>(clone(quotationPresets[0].brands));
  const [payments, setPayments] = useState<PayRow[]>(clone(defaultPayments));

  // Client / quotation meta
  const [quotationNo, setQuotationNo] = useState("");
  const [date, setDate] = useState("");
  const [validity, setValidity] = useState("15 days");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [floorRows, setFloorRows] = useState<FloorRow[]>(clone(defaultFloorRows));
  const [groundUsage, setGroundUsage] = useState<GroundUsage>("house");
  const [groundHouseSqft, setGroundHouseSqft] = useState("");
  const [groundParkingSqft, setGroundParkingSqft] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(TPL_KEY) || "null");
      if (saved) {
        if (saved.header) setHeader({ ...defaultHeader, ...saved.header });
        if (saved.bank) setBank({ ...defaultBank, ...saved.bank });
      }
    } catch {}
    setQuotationNo(`QT-${Date.now().toString().slice(-6)}`);
    setDate(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }));
  }, []);

  function saveTemplate() {
    try {
      localStorage.setItem(TPL_KEY, JSON.stringify({ header, bank }));
    } catch {}
  }

  function selectPackage(id: string) {
    const preset = quotationPresets.find((p) => p.id === id);
    if (!preset) return;
    if (pkgId !== id && !confirm(`Load the ${preset.label} specifications? This replaces the current specs, rates & brands with that package's defaults.`)) return;
    setPkgId(id);
    setRate(String(preset.rate));
    setSections(clone(preset.sections));
    setRates(clone(preset.rates));
    setBrands(clone(preset.brands));
    setNotes(clone(defaultSpecialNotes));
  }

  const rateNum = parseFloat(rate) || 0;
  const inr = (n: number) => n.toLocaleString("en-IN");

  // ── Built-up area, using the same rules as the public cost calculator:
  // plinth = 50% of ground slab, terrace = 35% of the largest slab,
  // ground floor counts 100% (house), 50% (parking) or a house/parking split.
  // GST is extra on the base amount, as per Special Note 8. ──
  const slabs = floorRows.map((r) => parseFloat(r.slab) || 0);
  const groundHouse = groundUsage === "mixed" ? parseFloat(groundHouseSqft) || 0 : 0;
  const groundParking = groundUsage === "mixed" ? parseFloat(groundParkingSqft) || 0 : 0;
  const groundSlab = groundUsage === "mixed" ? groundHouse + groundParking : slabs[0] || 0;
  const maxSlab = Math.max(groundSlab, ...slabs.slice(1), 0);
  const plinthArea = Math.round(groundSlab * 0.5);
  const terraceArea = Math.round(maxSlab * 0.35);

  const areaRows: AreaRow[] = [];
  areaRows.push({ label: `Plinth (50% of ${inr(groundSlab)} sqft ground slab)`, area: String(plinthArea) });
  if (groundUsage === "mixed") {
    areaRows.push({ label: "Ground Floor — House (100%)", area: String(Math.round(groundHouse)) });
    areaRows.push({ label: "Ground Floor — Parking (50%)", area: String(Math.round(groundParking * 0.5)) });
  } else {
    const pct = groundUsage === "parking" ? 0.5 : 1;
    areaRows.push({
      label: `${floorRows[0]?.label || "Ground Floor"}${groundUsage === "parking" ? " — Parking (50%)" : ""}`,
      area: String(Math.round((slabs[0] || 0) * pct)),
    });
  }
  floorRows.slice(1).forEach((r, i) => {
    areaRows.push({ label: r.label, area: String(Math.round(slabs[i + 1] || 0)) });
  });
  areaRows.push({ label: `Terrace (35% of ${inr(maxSlab)} sqft top slab)`, area: String(terraceArea) });

  const totalArea = areaRows.reduce((s, r) => s + (parseFloat(r.area) || 0), 0);
  const totalAmount = Math.round(totalArea * rateNum);

  async function downloadPDF() {
    saveTemplate();
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const navy = [13, 27, 62] as const;
    const amber = [245, 158, 11] as const;
    const W = 210;
    const L = 14, R = W - 14;
    let y = 0;

    function footer() {
      doc.setDrawColor(210, 210, 210);
      doc.line(L, 289, R, 289);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(150, 150, 150);
      doc.text(`${header.company}  |  ${header.phone}  |  ${header.email}  |  GSTIN ${header.gstin}`, W / 2, 293, { align: "center" });
    }
    function ensure(space: number) {
      if (y + space > 283) { footer(); doc.addPage(); y = 16; }
    }
    function sectionTitle(text: string) {
      ensure(14);
      doc.setFillColor(...navy);
      doc.rect(L, y, R - L, 7.5, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.text(text, W / 2, y + 5.2, { align: "center" });
      y += 7.5;
    }
    function numberedItems(items: string[]) {
      doc.setTextColor(...navy);
      items.filter(Boolean).forEach((it, i) => {
        const lines = doc.splitTextToSize(it, R - L - 14) as string[];
        ensure(lines.length * 4.4 + 3);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        doc.text(String(i + 1), L + 4, y + 4, { align: "center" });
        lines.forEach((ln, j) => doc.text(ln, L + 10, y + 4 + j * 4.4));
        const h = lines.length * 4.4 + 2.2;
        doc.setDrawColor(225, 225, 225);
        doc.rect(L, y, R - L, h);
        doc.line(L + 8, y, L + 8, y + h);
        y += h;
      });
      y += 3;
    }

    // ── Page 1: header ──
    doc.setFillColor(...navy);
    doc.rect(0, 0, W, 34, "F");
    doc.setTextColor(...amber);
    doc.setFontSize(19);
    doc.setFont("helvetica", "bold");
    doc.text(header.company, L, 15);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(210, 210, 210);
    doc.text(header.subtitle, L, 21);
    doc.text(header.address, L, 27);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(header.phone, R, 11, { align: "right" });
    doc.text(header.email, R, 16, { align: "right" });
    doc.text(header.website, R, 21, { align: "right" });
    doc.setTextColor(...amber);
    doc.setFont("helvetica", "bold");
    doc.text(`GSTIN  ${header.gstin}`, R, 27, { align: "right" });

    y = 42;
    doc.setTextColor(...navy);
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("QUOTATION", L, y);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.text(`No: ${quotationNo}`, R, y - 4, { align: "right" });
    doc.text(`Date: ${date}`, R, y, { align: "right" });
    doc.text(`Valid: ${validity}`, R, y + 4, { align: "right" });
    y += 8;

    // Client box
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(L, y, R - L, 27, 2, 2, "F");
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Client Details", L + 5, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(`Name: ${clientName || "—"}`, L + 5, y + 12);
    doc.text(`Phone: ${clientPhone || "—"}`, L + 5, y + 17);
    doc.text(`Location: ${location || "—"}`, L + 90, y + 12);
    doc.text(`Address: ${address || "—"}`, L + 90, y + 17);
    doc.setFont("helvetica", "bold");
    doc.text(`Package: ${quotationPresets.find((p) => p.id === pkgId)?.label.split(" — ")[0] ?? ""} @ Rs.${rate}/sqft`, L + 5, y + 23);
    y += 33;

    // ── Specifications ──
    sectionTitle(`SPECIFICATIONS  —  DETAILS OF WORK  @  Rs. ${rate} / SQ.FT`);
    y += 2;
    sections.forEach((sec) => {
      if (!sec.title.trim() && sec.items.every((i) => !i.trim())) return;
      ensure(16);
      doc.setFillColor(238, 240, 244);
      doc.rect(L, y, R - L, 6.5, "F");
      doc.setDrawColor(225, 225, 225);
      doc.rect(L, y, R - L, 6.5);
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(sec.title, W / 2, y + 4.5, { align: "center" });
      y += 6.5;
      numberedItems(sec.items);
    });

    // ── Special notes ──
    y += 2;
    sectionTitle("SPECIAL NOTES");
    y += 2;
    numberedItems(notes);

    // ── Estimate ──
    y += 2;
    sectionTitle("TENTATIVE ESTIMATE");
    y += 2;
    ensure(12);
    doc.setFillColor(238, 240, 244);
    doc.rect(L, y, R - L, 7, "F");
    doc.setDrawColor(225, 225, 225);
    doc.rect(L, y, R - L, 7);
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("Floor", L + 3, y + 4.8);
    doc.text("Approx Area (sqft)", L + 95, y + 4.8, { align: "right" });
    doc.text("Rate", L + 130, y + 4.8, { align: "right" });
    doc.text("Amount", R - 3, y + 4.8, { align: "right" });
    y += 7;
    areaRows.filter((r) => r.label.trim() || r.area.trim()).forEach((r) => {
      ensure(7);
      const a = parseFloat(r.area) || 0;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setDrawColor(225, 225, 225);
      doc.rect(L, y, R - L, 6.5);
      doc.text(r.label || "—", L + 3, y + 4.4);
      doc.text(inr(a), L + 95, y + 4.4, { align: "right" });
      doc.text(inr(rateNum), L + 130, y + 4.4, { align: "right" });
      doc.text(`Rs. ${inr(Math.round(a * rateNum))}`, R - 3, y + 4.4, { align: "right" });
      y += 6.5;
    });
    ensure(10);
    doc.setFillColor(...amber);
    doc.rect(L, y, R - L, 7.5, "F");
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("TOTAL", L + 3, y + 5.2);
    doc.text(`${inr(totalArea)} sqft`, L + 95, y + 5.2, { align: "right" });
    doc.text(`Rs. ${inr(totalAmount)}`, R - 3, y + 5.2, { align: "right" });
    y += 9;
    ensure(6);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(120, 120, 120);
    doc.text("GST 18% extra on the base amount, as per Special Notes.", L, y + 3);
    y += 8;

    // ── Payment schedule ──
    sectionTitle("TENTATIVE PAYMENT SCHEDULE");
    y += 2;
    ensure(12);
    doc.setFillColor(238, 240, 244);
    doc.rect(L, y, R - L, 7, "F");
    doc.setDrawColor(225, 225, 225);
    doc.rect(L, y, R - L, 7);
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("SR", L + 3, y + 4.8);
    doc.text("Stage", L + 14, y + 4.8);
    doc.text("%", L + 130, y + 4.8, { align: "right" });
    doc.text("Amount", R - 3, y + 4.8, { align: "right" });
    y += 7;
    let paySum = 0;
    payments.filter((p) => p.stage.trim()).forEach((p, i) => {
      ensure(7);
      const pct = parseFloat(p.percent) || 0;
      const amt = Math.round((totalAmount * pct) / 100);
      paySum += pct;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setDrawColor(225, 225, 225);
      doc.rect(L, y, R - L, 6.5);
      doc.text(String(i + 1), L + 3, y + 4.4);
      doc.text(p.stage, L + 14, y + 4.4);
      doc.text(`${p.percent}%`, L + 130, y + 4.4, { align: "right" });
      doc.text(`Rs. ${inr(amt)}`, R - 3, y + 4.4, { align: "right" });
      y += 6.5;
    });
    ensure(9);
    doc.setFillColor(238, 240, 244);
    doc.rect(L, y, R - L, 7, "F");
    doc.setDrawColor(225, 225, 225);
    doc.rect(L, y, R - L, 7);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL", L + 14, y + 4.8);
    doc.text(`${paySum}%`, L + 130, y + 4.8, { align: "right" });
    doc.text(`Rs. ${inr(Math.round((totalAmount * paySum) / 100))}`, R - 3, y + 4.8, { align: "right" });
    y += 11;

    // ── Rates & brands ──
    sectionTitle("RATE CONSIDERED & BRANDS USED");
    y += 2;
    function rateTable(headerLabel: string, groups: RateGroup[]) {
      ensure(12);
      doc.setFillColor(238, 240, 244);
      doc.rect(L, y, R - L, 7, "F");
      doc.setDrawColor(225, 225, 225);
      doc.rect(L, y, R - L, 7);
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text("WORK", L + 3, y + 4.8);
      doc.text(headerLabel, L + 62, y + 4.8);
      y += 7;
      groups.forEach((g) => {
        const items = g.items.filter(Boolean);
        if (!g.work.trim() && !items.length) return;
        ensure(items.length * 6 + 2);
        const startY = y;
        items.forEach((it, j) => {
          doc.setFont("helvetica", "normal");
          doc.setFontSize(8.5);
          doc.setDrawColor(225, 225, 225);
          doc.rect(L + 60, y, R - L - 60, 6);
          doc.text(it, L + 62, y + 4.2);
          if (j === 0) {
            doc.setFont("helvetica", "bold");
          }
          y += 6;
        });
        doc.setDrawColor(225, 225, 225);
        doc.rect(L, startY, 60, y - startY);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text(g.work, L + 3, startY + 4.2);
      });
      y += 4;
    }
    rateTable("RATE CONSIDERED", rates);
    rateTable("BRAND USED", brands);

    // ── Bank details ──
    if (bank.accountName || bank.accountNumber || bank.bankName) {
      ensure(32);
      doc.setFillColor(249, 250, 251);
      doc.roundedRect(L, y, R - L, 26, 2, 2, "F");
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Bank Details", L + 5, y + 6);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(`Account Name: ${bank.accountName}`, L + 5, y + 12);
      doc.text(`Account Number: ${bank.accountNumber}`, L + 5, y + 17);
      doc.text(`Bank: ${bank.bankName}`, L + 5, y + 22);
      doc.text(`IFSC: ${bank.ifsc}`, R - 70, y + 12);
      doc.text(`Branch: ${bank.branch}`, R - 70, y + 17);
      y += 30;
    }

    footer();
    doc.save(`Quotation-${clientName.trim() || quotationNo}.pdf`);
  }

  // ── UI helpers ──
  const input = "w-full rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20";
  const label = "block text-xs font-semibold text-navy/60 mb-1";
  const payTotal = payments.reduce((s, p) => s + (parseFloat(p.percent) || 0), 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-navy">
          <FileText className="h-6 w-6 text-amber" /> Quotation Generator
        </h1>
        <button onClick={downloadPDF} className="flex items-center gap-2 rounded-xl bg-amber px-5 py-2.5 font-semibold text-navy-dark hover:bg-amber-light transition">
          <Download className="h-4 w-4" /> Download PDF
        </button>
      </div>

      <div className="space-y-6">
        {/* Package selector */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-amber"><Package className="h-4 w-4" /> Package</h2>
          <div className="flex flex-wrap gap-3">
            {quotationPresets.map((p) => (
              <button
                key={p.id}
                onClick={() => selectPackage(p.id)}
                className={`rounded-xl border-2 px-5 py-3 text-sm font-semibold transition ${
                  pkgId === p.id ? "border-amber bg-navy text-white" : "border-black/10 bg-white text-navy hover:border-amber/40"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-navy/50">Selecting a package loads its specifications, rates &amp; brands. Everything stays editable below.</p>
        </section>

        {/* Client & meta */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Client &amp; Quotation</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={label}>Client Name</label><input className={input} value={clientName} onChange={(e) => setClientName(e.target.value)} /></div>
            <div><label className={label}>Client Phone</label><input className={input} value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} /></div>
            <div><label className={label}>Project Location</label><input className={input} value={location} onChange={(e) => setLocation(e.target.value)} /></div>
            <div><label className={label}>Address</label><input className={input} value={address} onChange={(e) => setAddress(e.target.value)} /></div>
            <div><label className={label}>Quotation No.</label><input className={input} value={quotationNo} onChange={(e) => setQuotationNo(e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className={label}>Date</label><input className={input} value={date} onChange={(e) => setDate(e.target.value)} /></div>
              <div><label className={label}>Valid For</label><input className={input} value={validity} onChange={(e) => setValidity(e.target.value)} /></div>
            </div>
          </div>
        </section>

        {/* Estimate */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber">Tentative Estimate</h2>
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-navy/60">Rate (Rs./sqft)</label>
              <input className={`${input} w-24`} type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
              <button onClick={() => setFloorRows([...floorRows, { label: `Floor ${floorRows.length}`, slab: "" }])} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add Floor</button>
            </div>
          </div>
          {/* Ground floor usage */}
          <div className="mb-4">
            <label className={label}>Ground Floor Usage</label>
            <div className="flex flex-wrap gap-2">
              {([["house", "Full House"], ["parking", "Full Parking"], ["mixed", "House + Parking"]] as const).map(([v, lbl]) => (
                <button
                  key={v}
                  onClick={() => setGroundUsage(v)}
                  className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
                    groundUsage === v ? "border-amber bg-navy text-white" : "border-black/10 bg-white text-navy hover:border-amber/40"
                  }`}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          {/* Slab areas */}
          <div className="space-y-2">
            {groundUsage === "mixed" ? (
              <>
                <div className="flex gap-2">
                  <input className={input} value={floorRows[0]?.label ?? "Ground Floor"} onChange={(e) => setFloorRows(floorRows.map((x, j) => j === 0 ? { ...x, label: e.target.value } : x))} />
                  <input className={`${input} w-32`} type="number" placeholder="house sqft" value={groundHouseSqft} onChange={(e) => setGroundHouseSqft(e.target.value)} />
                  <input className={`${input} w-32`} type="number" placeholder="parking sqft" value={groundParkingSqft} onChange={(e) => setGroundParkingSqft(e.target.value)} />
                  <span className="w-10 shrink-0" />
                </div>
                <p className="pl-1 text-xs text-navy/40">House area counts 100%, parking area counts 50%.</p>
              </>
            ) : (
              <div className="flex gap-2">
                <input className={input} value={floorRows[0]?.label ?? "Ground Floor"} onChange={(e) => setFloorRows(floorRows.map((x, j) => j === 0 ? { ...x, label: e.target.value } : x))} />
                <input className={`${input} w-32`} type="number" placeholder="slab sqft" value={floorRows[0]?.slab ?? ""} onChange={(e) => setFloorRows(floorRows.map((x, j) => j === 0 ? { ...x, slab: e.target.value } : x))} />
                <span className="w-10 shrink-0" />
              </div>
            )}
            {floorRows.slice(1).map((r, i) => (
              <div key={i + 1} className="flex gap-2">
                <input className={input} value={r.label} onChange={(e) => setFloorRows(floorRows.map((x, j) => j === i + 1 ? { ...x, label: e.target.value } : x))} />
                <input className={`${input} w-32`} type="number" placeholder="slab sqft" value={r.slab} onChange={(e) => setFloorRows(floorRows.map((x, j) => j === i + 1 ? { ...x, slab: e.target.value } : x))} />
                <button onClick={() => setFloorRows(floorRows.filter((_, j) => j !== i + 1))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>

          {/* Auto breakdown */}
          <div className="mt-5 rounded-xl border border-black/8 bg-gray-50 p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-navy/40">Built-up Area Breakdown (auto)</p>
            <div className="space-y-1">
              {areaRows.map((r, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-navy/70">{r.label}</span>
                  <span className="font-semibold text-navy">{inr(parseFloat(r.area) || 0)} sqft</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-end gap-4 text-sm">
            <span className="text-navy/60">Total Built-up: <b className="text-navy">{inr(totalArea)} sqft</b></span>
            <span className="rounded-lg bg-amber/10 px-3 py-1 font-bold text-amber">Total: Rs. {inr(totalAmount)}</span>
            <span className="text-xs text-navy/40">GST 18% extra</span>
          </div>
        </section>

        {/* Specifications */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber">Specifications — Details of Work</h2>
            <button onClick={() => setSections([...sections, { title: "NEW SECTION", items: [""] }])} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add Section</button>
          </div>
          <div className="space-y-5">
            {sections.map((sec, si) => (
              <div key={si} className="rounded-xl border border-black/8 p-4">
                <div className="mb-2 flex gap-2">
                  <input
                    className={`${input} font-bold`}
                    value={sec.title}
                    onChange={(e) => setSections(sections.map((s, j) => j === si ? { ...s, title: e.target.value } : s))}
                  />
                  <button onClick={() => setSections(sections.map((s, j) => j === si ? { ...s, items: [...s.items, ""] } : s))} className="shrink-0 rounded-lg bg-navy/5 px-3 text-xs font-semibold text-navy hover:bg-amber/20" title="Add item"><Plus className="h-3.5 w-3.5" /></button>
                  <button onClick={() => confirm(`Delete section "${sec.title}"?`) && setSections(sections.filter((_, j) => j !== si))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600" title="Delete section"><Trash2 className="h-4 w-4" /></button>
                </div>
                <div className="space-y-2">
                  {sec.items.map((it, ii) => (
                    <div key={ii} className="flex gap-2">
                      <span className="flex w-6 shrink-0 items-center justify-center text-xs font-semibold text-navy/40">{ii + 1}</span>
                      <textarea
                        rows={Math.max(1, Math.ceil(it.length / 95))}
                        className={`${input} resize-none`}
                        value={it}
                        onChange={(e) => setSections(sections.map((s, j) => j === si ? { ...s, items: s.items.map((x, k) => k === ii ? e.target.value : x) } : s))}
                      />
                      <button onClick={() => setSections(sections.map((s, j) => j === si ? { ...s, items: s.items.filter((_, k) => k !== ii) } : s))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Special notes */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber">Special Notes</h2>
            <button onClick={() => setNotes([...notes, ""])} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add Note</button>
          </div>
          <div className="space-y-2">
            {notes.map((n, i) => (
              <div key={i} className="flex gap-2">
                <span className="flex w-6 shrink-0 items-center justify-center text-xs font-semibold text-navy/40">{i + 1}</span>
                <textarea rows={Math.max(1, Math.ceil(n.length / 95))} className={`${input} resize-none`} value={n} onChange={(e) => setNotes(notes.map((x, j) => j === i ? e.target.value : x))} />
                <button onClick={() => setNotes(notes.filter((_, j) => j !== i))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* Payment schedule */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber">Payment Schedule</h2>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold ${payTotal === 100 ? "text-green-600" : "text-red-500"}`}>{payTotal}%</span>
              <button onClick={() => setPayments([...payments, { stage: "", percent: "" }])} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add</button>
            </div>
          </div>
          <div className="space-y-2">
            {payments.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <input className={input} placeholder="Stage" value={p.stage} onChange={(e) => setPayments(payments.map((x, j) => j === i ? { ...x, stage: e.target.value } : x))} />
                <input className={`${input} w-20`} type="number" placeholder="%" value={p.percent} onChange={(e) => setPayments(payments.map((x, j) => j === i ? { ...x, percent: e.target.value } : x))} />
                <span className="w-28 shrink-0 text-right text-xs text-navy/50">Rs. {inr(Math.round((totalAmount * (parseFloat(p.percent) || 0)) / 100))}</span>
                <button onClick={() => setPayments(payments.filter((_, j) => j !== i))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* Rates & Brands */}
        <GroupEditor title="Rate Considered" groups={rates} setGroups={setRates} input={input} />
        <GroupEditor title="Brands Used" groups={brands} setGroups={setBrands} input={input} />

        {/* Header (saved) */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Company Header (saved)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {([["company", "Company Name"], ["subtitle", "Subtitle"], ["phone", "Phone"], ["email", "Email"], ["website", "Website"], ["gstin", "GSTIN"], ["address", "Address"]] as const).map(([k, lbl]) => (
              <div key={k} className={k === "address" ? "sm:col-span-2" : ""}><label className={label}>{lbl}</label><input className={input} value={(header as any)[k]} onChange={(e) => setHeader({ ...header, [k]: e.target.value })} /></div>
            ))}
          </div>
        </section>

        {/* Bank (saved) */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Bank Details (saved)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {([["accountName", "Account Name"], ["accountNumber", "Account Number"], ["bankName", "Bank Name"], ["ifsc", "IFSC Code"], ["branch", "Branch"]] as const).map(([k, lbl]) => (
              <div key={k}><label className={label}>{lbl}</label><input className={input} value={(bank as any)[k]} onChange={(e) => setBank({ ...bank, [k]: e.target.value })} /></div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between gap-3 pb-10">
          <button onClick={saveTemplate} className="flex items-center gap-2 rounded-xl border border-navy/20 px-4 py-2.5 text-sm font-semibold text-navy hover:bg-navy/5"><RotateCcw className="h-4 w-4" /> Save header &amp; bank</button>
          <button onClick={downloadPDF} className="flex items-center gap-2 rounded-xl bg-amber px-6 py-3 font-semibold text-navy-dark hover:bg-amber-light transition"><Download className="h-4 w-4" /> Download PDF</button>
        </div>
      </div>
    </div>
  );
}

function GroupEditor({ title, groups, setGroups, input }: { title: string; groups: RateGroup[]; setGroups: (v: RateGroup[]) => void; input: string }) {
  return (
    <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-amber">{title}</h2>
        <button onClick={() => setGroups([...groups, { work: "", items: [""] }])} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add</button>
      </div>
      <div className="space-y-3">
        {groups.map((g, gi) => (
          <div key={gi} className="flex gap-2">
            <input className={`${input} w-44 shrink-0 font-semibold`} placeholder="Work" value={g.work} onChange={(e) => setGroups(groups.map((x, j) => j === gi ? { ...x, work: e.target.value } : x))} />
            <div className="flex-1 space-y-2">
              {g.items.map((it, ii) => (
                <div key={ii} className="flex gap-2">
                  <input className={input} value={it} onChange={(e) => setGroups(groups.map((x, j) => j === gi ? { ...x, items: x.items.map((y, k) => k === ii ? e.target.value : y) } : x))} />
                  <button onClick={() => setGroups(groups.map((x, j) => j === gi ? { ...x, items: x.items.filter((_, k) => k !== ii) } : x))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <button onClick={() => setGroups(groups.map((x, j) => j === gi ? { ...x, items: [...x.items, ""] } : x))} className="text-xs font-semibold text-navy/50 hover:text-amber">+ add line</button>
            </div>
            <button onClick={() => setGroups(groups.filter((_, j) => j !== gi))} className="shrink-0 self-start rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </section>
  );
}
