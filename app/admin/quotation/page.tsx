"use client";

import { useEffect, useState } from "react";
import { FileText, Plus, Trash2, Download, RotateCcw } from "lucide-react";

// Everything on the quotation is editable. Template fields (header, bank,
// terms, payment schedule, scope) are remembered in localStorage so they don't
// need re-typing; client/project fields start blank each time.
const TPL_KEY = "oneo_quotation_template";

type AreaRow = { label: string; area: string };
type PayRow = { stage: string; percent: string };

const defaultHeader = {
  company: "ONE O BUILDCON",
  subtitle: "CONSTRUCTIONS · RCC · DEVELOPMENTS · INTERIORS",
  phone: "+91 96074 07474",
  email: "oneobuildcon@gmail.com",
  website: "www.oneobuildcon.com",
  gstin: "27GKVPS6241G1ZE",
  address: "Patharemala, Charholi Budruk, Pimpri Chinchwad, Pune, Maharashtra – 412105",
};

const defaultScope = [
  "Design & Drawings (Architectural + Structural)",
  "Earth work & excavation",
  "RCC framework — footing, columns, beams, slabs",
  "Brickwork & internal/external plaster",
  "Flooring, kitchen & bathroom work",
  "Doors, windows, plumbing & electrical",
];

const defaultPayments: PayRow[] = [
  { stage: "Booking / Agreement", percent: "10" },
  { stage: "At plinth level", percent: "15" },
  { stage: "RCC / slab work (per stage)", percent: "40" },
  { stage: "Brickwork & plaster", percent: "15" },
  { stage: "Flooring & finishing", percent: "15" },
  { stage: "Handover", percent: "5" },
];

const defaultTerms = [
  "Prices are inclusive of 18% GST. Quotation valid for 15 days from the date above.",
  "Rate is per sq.ft of built-up area as per the breakdown above.",
  "Any additional / extra work beyond the agreed scope will be charged separately.",
  "Payment to be made as per the payment schedule above.",
  "Material brands as per the selected package specification.",
];

const defaultBank = {
  accountName: "",
  accountNumber: "",
  bankName: "",
  ifsc: "",
  branch: "",
};

export default function AdminQuotation() {
  // Template (persisted)
  const [header, setHeader] = useState(defaultHeader);
  const [scope, setScope] = useState<string[]>(defaultScope);
  const [payments, setPayments] = useState<PayRow[]>(defaultPayments);
  const [terms, setTerms] = useState<string[]>(defaultTerms);
  const [bank, setBank] = useState(defaultBank);

  // Per-quotation (blank each time)
  const [quotationNo, setQuotationNo] = useState("");
  const [date, setDate] = useState("");
  const [validity, setValidity] = useState("15 days");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [location, setLocation] = useState("");
  const [packageName, setPackageName] = useState("Basic");
  const [rate, setRate] = useState("1499");
  const [gstPercent, setGstPercent] = useState("18");
  const [areaRows, setAreaRows] = useState<AreaRow[]>([
    { label: "Ground Floor", area: "" },
    { label: "First Floor", area: "" },
  ]);

  // Load saved template + set defaults that need the browser (date, number)
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(TPL_KEY) || "null");
      if (saved) {
        if (saved.header) setHeader({ ...defaultHeader, ...saved.header });
        if (Array.isArray(saved.scope)) setScope(saved.scope);
        if (Array.isArray(saved.payments)) setPayments(saved.payments);
        if (Array.isArray(saved.terms)) setTerms(saved.terms);
        if (saved.bank) setBank({ ...defaultBank, ...saved.bank });
      }
    } catch {}
    setQuotationNo(`QT-${Date.now().toString().slice(-6)}`);
    setDate(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }));
  }, []);

  function saveTemplate() {
    try {
      localStorage.setItem(TPL_KEY, JSON.stringify({ header, scope, payments, terms, bank }));
    } catch {}
  }

  // ── Derived totals ──
  const totalArea = areaRows.reduce((s, r) => s + (parseFloat(r.area) || 0), 0);
  const rateNum = parseFloat(rate) || 0;
  const constructionCost = Math.round(totalArea * rateNum);
  const gstAmount = Math.round((constructionCost * (parseFloat(gstPercent) || 0)) / 100);
  const grandTotal = constructionCost + gstAmount;
  const inr = (n: number) => n.toLocaleString("en-IN");

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
      doc.text(`${header.company}  |  ${header.phone}  |  ${header.email}`, W / 2, 293, { align: "center" });
    }
    function ensure(space: number) {
      if (y + space > 285) { footer(); doc.addPage(); y = 16; }
    }

    // ── Header bar ──
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
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.text(header.phone, R, 11, { align: "right" });
    doc.text(header.email, R, 16, { align: "right" });
    doc.text(header.website, R, 21, { align: "right" });
    doc.setTextColor(...amber);
    doc.setFont("helvetica", "bold");
    doc.text(`GSTIN  ${header.gstin}`, R, 27, { align: "right" });
    doc.setTextColor(210, 210, 210);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(header.address, L, 27);

    // ── Quotation meta ──
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

    // ── Client box ──
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(L, y, R - L, 22, 2, 2, "F");
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Client Details", L + 5, y + 6);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(`Name: ${clientName || "—"}`, L + 5, y + 12);
    doc.text(`Phone: ${clientPhone || "—"}`, L + 5, y + 17);
    doc.text(`Location: ${location || "—"}`, L + 75, y + 12);
    doc.setFont("helvetica", "bold");
    doc.text("Package:", R - 78, y + 6);
    doc.setFont("helvetica", "normal");
    doc.text(`${packageName} @ Rs.${rate}/sqft`, R - 60, y + 6);
    y += 28;

    // ── Area breakdown ──
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Built-up Area Breakdown", L, y);
    y += 4;
    doc.setFillColor(...navy);
    doc.rect(L, y, R - L, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.text("Floor / Component", L + 3, y + 4.8);
    doc.text("Area (sqft)", R - 3, y + 4.8, { align: "right" });
    y += 7;
    areaRows.filter((r) => r.label || r.area).forEach((r, i) => {
      doc.setFillColor(i % 2 ? 248 : 255, i % 2 ? 249 : 255, i % 2 ? 250 : 255);
      doc.rect(L, y, R - L, 6.5, "F");
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(r.label || "—", L + 3, y + 4.4);
      doc.text(inr(parseFloat(r.area) || 0), R - 3, y + 4.4, { align: "right" });
      y += 6.5;
    });
    doc.setFillColor(...amber);
    doc.rect(L, y, R - L, 7, "F");
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Total Built-up Area", L + 3, y + 4.8);
    doc.text(`${inr(totalArea)} sqft`, R - 3, y + 4.8, { align: "right" });
    y += 12;

    // ── Cost summary ──
    ensure(30);
    const boxX = W - 14 - 80;
    const rows: [string, string][] = [
      [`Construction Cost (${inr(totalArea)} x Rs.${rate})`, `Rs. ${inr(constructionCost)}`],
      [`GST (${gstPercent}%)`, `Rs. ${inr(gstAmount)}`],
    ];
    doc.setFontSize(9);
    rows.forEach(([k, v]) => {
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "normal");
      doc.text(k, boxX, y);
      doc.text(v, R, y, { align: "right" });
      y += 6;
    });
    doc.setFillColor(...navy);
    doc.rect(boxX - 4, y - 1, R - boxX + 4, 9, "F");
    doc.setTextColor(...amber);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Grand Total", boxX, y + 5);
    doc.text(`Rs. ${inr(grandTotal)}`, R, y + 5, { align: "right" });
    y += 15;

    // ── Scope of work ──
    ensure(20);
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Scope of Work", L, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    scope.filter(Boolean).forEach((s) => {
      ensure(6);
      const lines = doc.splitTextToSize(`•  ${s}`, R - L - 4) as string[];
      lines.forEach((ln) => { doc.text(ln, L + 2, y); y += 4.6; });
    });
    y += 4;

    // ── Payment schedule ──
    ensure(18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Payment Schedule", L, y);
    y += 5;
    doc.setFillColor(...navy);
    doc.rect(L, y, R - L, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8.5);
    doc.text("Stage", L + 3, y + 4.8);
    doc.text("%", R - 45, y + 4.8, { align: "right" });
    doc.text("Amount", R - 3, y + 4.8, { align: "right" });
    y += 7;
    payments.filter((p) => p.stage).forEach((p, i) => {
      ensure(7);
      const pct = parseFloat(p.percent) || 0;
      doc.setFillColor(i % 2 ? 248 : 255, i % 2 ? 249 : 255, i % 2 ? 250 : 255);
      doc.rect(L, y, R - L, 6.5, "F");
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(p.stage, L + 3, y + 4.4);
      doc.text(`${p.percent}%`, R - 45, y + 4.4, { align: "right" });
      doc.text(`Rs. ${inr(Math.round((grandTotal * pct) / 100))}`, R - 3, y + 4.4, { align: "right" });
      y += 6.5;
    });
    y += 6;

    // ── Terms ──
    ensure(18);
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Terms & Conditions", L, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    terms.filter(Boolean).forEach((t, i) => {
      ensure(6);
      const lines = doc.splitTextToSize(`${i + 1}.  ${t}`, R - L - 4) as string[];
      lines.forEach((ln) => { doc.text(ln, L + 2, y); y += 4.4; });
    });
    y += 6;

    // ── Bank details ──
    if (bank.accountName || bank.accountNumber || bank.bankName) {
      ensure(30);
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
    doc.save(`Quotation-${clientName || quotationNo}.pdf`);
  }

  // ── UI helpers ──
  const input = "w-full rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20";
  const label = "block text-xs font-semibold text-navy/60 mb-1";

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
        {/* Client & project */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Client & Project</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className={label}>Client Name</label><input className={input} value={clientName} onChange={(e) => setClientName(e.target.value)} /></div>
            <div><label className={label}>Client Phone</label><input className={input} value={clientPhone} onChange={(e) => setClientPhone(e.target.value)} /></div>
            <div className="sm:col-span-2"><label className={label}>Project Location</label><input className={input} value={location} onChange={(e) => setLocation(e.target.value)} /></div>
            <div><label className={label}>Quotation No.</label><input className={input} value={quotationNo} onChange={(e) => setQuotationNo(e.target.value)} /></div>
            <div><label className={label}>Date</label><input className={input} value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div><label className={label}>Valid For</label><input className={input} value={validity} onChange={(e) => setValidity(e.target.value)} /></div>
          </div>
        </section>

        {/* Package & rate */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Package & Rate</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><label className={label}>Package</label><input className={input} value={packageName} onChange={(e) => setPackageName(e.target.value)} /></div>
            <div><label className={label}>Rate (Rs./sqft)</label><input className={input} type="number" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
            <div><label className={label}>GST %</label><input className={input} type="number" value={gstPercent} onChange={(e) => setGstPercent(e.target.value)} /></div>
          </div>
        </section>

        {/* Area breakdown */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber">Built-up Area</h2>
            <button onClick={() => setAreaRows([...areaRows, { label: "", area: "" }])} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add Floor</button>
          </div>
          <div className="space-y-2">
            {areaRows.map((r, i) => (
              <div key={i} className="flex gap-2">
                <input className={input} placeholder="Floor / component" value={r.label} onChange={(e) => setAreaRows(areaRows.map((x, j) => j === i ? { ...x, label: e.target.value } : x))} />
                <input className={`${input} w-32`} type="number" placeholder="sqft" value={r.area} onChange={(e) => setAreaRows(areaRows.map((x, j) => j === i ? { ...x, area: e.target.value } : x))} />
                <button onClick={() => setAreaRows(areaRows.filter((_, j) => j !== i))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-end gap-6 text-sm">
            <span className="text-navy/60">Total Area: <b className="text-navy">{inr(totalArea)} sqft</b></span>
            <span className="text-navy/60">Cost: <b className="text-navy">Rs. {inr(constructionCost)}</b></span>
            <span className="text-navy/60">+GST: <b className="text-navy">Rs. {inr(gstAmount)}</b></span>
            <span className="rounded-lg bg-amber/10 px-3 py-1 font-bold text-amber">Grand Total: Rs. {inr(grandTotal)}</span>
          </div>
        </section>

        {/* Editable list sections */}
        <ListSection title="Scope of Work" items={scope} setItems={setScope} input={input} />
        <PaymentSection payments={payments} setPayments={setPayments} input={input} grandTotal={grandTotal} inr={inr} />
        <ListSection title="Terms & Conditions" items={terms} setItems={setTerms} input={input} />

        {/* Header (editable) */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Company Header (saved)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {([["company", "Company Name"], ["subtitle", "Subtitle"], ["phone", "Phone"], ["email", "Email"], ["website", "Website"], ["gstin", "GSTIN"], ["address", "Address"]] as const).map(([k, lbl]) => (
              <div key={k} className={k === "address" ? "sm:col-span-2" : ""}><label className={label}>{lbl}</label><input className={input} value={(header as any)[k]} onChange={(e) => setHeader({ ...header, [k]: e.target.value })} /></div>
            ))}
          </div>
        </section>

        {/* Bank (editable) */}
        <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Bank Details (saved)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {([["accountName", "Account Name"], ["accountNumber", "Account Number"], ["bankName", "Bank Name"], ["ifsc", "IFSC Code"], ["branch", "Branch"]] as const).map(([k, lbl]) => (
              <div key={k}><label className={label}>{lbl}</label><input className={input} value={(bank as any)[k]} onChange={(e) => setBank({ ...bank, [k]: e.target.value })} /></div>
            ))}
          </div>
        </section>

        <div className="flex items-center justify-between gap-3 pb-10">
          <button onClick={saveTemplate} className="flex items-center gap-2 rounded-xl border border-navy/20 px-4 py-2.5 text-sm font-semibold text-navy hover:bg-navy/5"><RotateCcw className="h-4 w-4" /> Save template</button>
          <button onClick={downloadPDF} className="flex items-center gap-2 rounded-xl bg-amber px-6 py-3 font-semibold text-navy-dark hover:bg-amber-light transition"><Download className="h-4 w-4" /> Download PDF</button>
        </div>
      </div>
    </div>
  );
}

function ListSection({ title, items, setItems, input }: { title: string; items: string[]; setItems: (v: string[]) => void; input: string }) {
  return (
    <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-amber">{title} (saved)</h2>
        <button onClick={() => setItems([...items, ""])} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add</button>
      </div>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="flex gap-2">
            <input className={input} value={it} onChange={(e) => setItems(items.map((x, j) => j === i ? e.target.value : x))} />
            <button onClick={() => setItems(items.filter((_, j) => j !== i))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </section>
  );
}

function PaymentSection({ payments, setPayments, input, grandTotal, inr }: { payments: PayRow[]; setPayments: (v: PayRow[]) => void; input: string; grandTotal: number; inr: (n: number) => string }) {
  return (
    <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-amber">Payment Schedule (saved)</h2>
        <button onClick={() => setPayments([...payments, { stage: "", percent: "" }])} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add</button>
      </div>
      <div className="space-y-2">
        {payments.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <input className={input} placeholder="Stage" value={p.stage} onChange={(e) => setPayments(payments.map((x, j) => j === i ? { ...x, stage: e.target.value } : x))} />
            <input className={`${input} w-20`} type="number" placeholder="%" value={p.percent} onChange={(e) => setPayments(payments.map((x, j) => j === i ? { ...x, percent: e.target.value } : x))} />
            <span className="w-28 shrink-0 text-right text-xs text-navy/50">Rs. {inr(Math.round((grandTotal * (parseFloat(p.percent) || 0)) / 100))}</span>
            <button onClick={() => setPayments(payments.filter((_, j) => j !== i))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </section>
  );
}
