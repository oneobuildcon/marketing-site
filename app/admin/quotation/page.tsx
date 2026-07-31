"use client";

import { useEffect, useState } from "react";
import { FileText, Plus, Trash2, Download, RotateCcw, Package, Eye, Send } from "lucide-react";
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

// The ONE wordmark, stored in Supabase. Loaded in the browser and drawn into
// the PDF beside typeset company details, so the letterhead stays crisp.
const LOGO_SRC = "https://fznldowoujwhcgjmsyhu.supabase.co/storage/v1/object/public/projects/image-1785485863964.png";

async function loadLogo(): Promise<{ data: string; ratio: number } | null> {
  try {
    const res = await fetch(LOGO_SRC);
    if (!res.ok) return null;
    const blob = await res.blob();
    const data = await new Promise<string | null>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
    if (!data) return null;
    // The stored asset is a white mark on a black field. Convert it to a black
    // mark on transparency so it sits correctly on the white letterhead.
    return await new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        try {
          const c = document.createElement("canvas");
          c.width = img.width;
          c.height = img.height;
          const ctx = c.getContext("2d");
          if (!ctx) return resolve({ data, ratio: img.width / img.height || 1.5 });
          ctx.drawImage(img, 0, 0);
          const px = ctx.getImageData(0, 0, c.width, c.height);
          const d8 = px.data;
          for (let i = 0; i < d8.length; i += 4) {
            const lum = (d8[i] + d8[i + 1] + d8[i + 2]) / 3;
            // Bright pixels are the glyph → paint them near-black and opaque.
            // Dark pixels are the backdrop → make them transparent.
            d8[i] = d8[i + 1] = d8[i + 2] = 20;
            d8[i + 3] = lum > 110 ? 255 : 0;
          }
          ctx.putImageData(px, 0, 0);
          // Trim the transparent padding so the mark starts flush with the
          // left margin instead of floating inside its own whitespace.
          let minX = c.width, minY = c.height, maxX = -1, maxY = -1;
          for (let py = 0; py < c.height; py++) {
            for (let pxx = 0; pxx < c.width; pxx++) {
              if (d8[(py * c.width + pxx) * 4 + 3] > 0) {
                if (pxx < minX) minX = pxx;
                if (pxx > maxX) maxX = pxx;
                if (py < minY) minY = py;
                if (py > maxY) maxY = py;
              }
            }
          }
          if (maxX > minX && maxY > minY) {
            const tw = maxX - minX + 1;
            const th = maxY - minY + 1;
            const t = document.createElement("canvas");
            t.width = tw;
            t.height = th;
            const tctx = t.getContext("2d");
            if (tctx) {
              tctx.drawImage(c, minX, minY, tw, th, 0, 0, tw, th);
              return resolve({ data: t.toDataURL("image/png"), ratio: tw / th });
            }
          }
          resolve({ data: c.toDataURL("image/png"), ratio: img.width / img.height || 1.5 });
        } catch {
          resolve({ data, ratio: img.width / img.height || 1.5 });
        }
      };
      img.onerror = () => resolve(null);
      img.crossOrigin = "anonymous";
      img.src = data;
    });
  } catch {
    return null;
  }
}

// Photographs of the hand signature and the rubber stamp, taken on paper.
const SIGN_SRC = "https://fznldowoujwhcgjmsyhu.supabase.co/storage/v1/object/public/projects/WhatsApp%20Image%202026-07-31%20at%205.16.36%20PM.png";
const STAMP_SRC = "https://fznldowoujwhcgjmsyhu.supabase.co/storage/v1/object/public/projects/WhatsApp%20Image%202026-07-31%20at%205.16.37%20PM.png";

type Mark = { data: string; ratio: number };

// Decode an image to a canvas. Tries fetch → data URL first (immune to CORS
// on the canvas), and falls back to loading the URL straight into an <img>
// with crossOrigin set, in case the fetch itself is blocked.
async function decodeToImage(src: string): Promise<HTMLImageElement | null> {
  const fromDataUrl = await (async () => {
    try {
      const res = await fetch(src);
      if (!res.ok) return null;
      const blob = await res.blob();
      return await new Promise<string | null>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(typeof reader.result === "string" ? reader.result : null);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(blob);
      });
    } catch {
      return null;
    }
  })();

  const attempt = (url: string, cors: boolean) =>
    new Promise<HTMLImageElement | null>((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      if (cors) img.crossOrigin = "anonymous";
      img.src = url;
    });

  if (fromDataUrl) {
    const img = await attempt(fromDataUrl, false);
    if (img) return img;
  }
  return attempt(src, true);
}

// Lift dark ink off the paper: anything darker than the paper becomes opaque
// navy, everything lighter becomes transparent, then the transparent margin is
// cropped away. Show-through from the reverse of the sheet is far lighter than
// the ink, so it falls below the threshold and disappears.
//
// The thresholds are derived from each photo rather than fixed, because the
// two images were shot in different light — a fixed cut-off that suits one can
// erase the other completely.
async function loadInkMark(src: string): Promise<Mark | null> {
  try {
    const img = await decodeToImage(src);
    if (!img || !img.width || !img.height) return null;

    // Phone photos are far larger than needed at 40mm wide, and the pixel loop
    // below is O(n). Cap the long edge; 1600px is still ~1000dpi in print.
    const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
    const w = Math.max(1, Math.round(img.width * scale));
    const h = Math.max(1, Math.round(img.height * scale));

    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, w, h);

    let px: ImageData;
    try {
      px = ctx.getImageData(0, 0, w, h);
    } catch {
      return null; // canvas tainted — CORS not allowed on the bucket
    }
    const d8 = px.data;

    // Luminance of every pixel, and a histogram to find the paper tone.
    const lums = new Uint8Array(w * h);
    const hist = new Uint32Array(256);
    for (let i = 0, p = 0; i < d8.length; i += 4, p++) {
      const lum = (d8[i] * 0.299 + d8[i + 1] * 0.587 + d8[i + 2] * 0.114) | 0;
      lums[p] = lum;
      hist[lum]++;
    }
    // Paper is the bulk of the frame, so the 75th percentile lands on it.
    let acc = 0;
    const target = (w * h) * 0.75;
    let paperTone = 200;
    for (let v = 0; v < 256; v++) {
      acc += hist[v];
      if (acc >= target) { paperTone = v; break; }
    }
    paperTone = Math.max(60, paperTone);

    // Two passes: tight first (clean edges, drops show-through), then looser if
    // the tight pass found no ink at all.
    const passes: Array<[number, number]> = [
      [paperTone * 0.58, paperTone * 0.82],
      [paperTone * 0.75, paperTone * 0.97],
    ];

    for (const [INK, PAPER] of passes) {
      const alpha = new Uint8Array(w * h);
      for (let p = 0; p < lums.length; p++) {
        const lum = lums[p];
        let a = 0;
        if (lum <= INK) a = 255;
        else if (lum < PAPER) a = Math.round(255 * ((PAPER - lum) / (PAPER - INK)));
        alpha[p] = a;
      }

      // Drop specks. Paper texture and shadow survive the threshold as small
      // islands scattered around the mark; the real ink is one big connected
      // shape (plus a few genuine pieces, like the letters inside the stamp).
      // So label every island and keep only those a meaningful fraction of the
      // largest — that clears the smudges without thinning any pen stroke.
      const label = new Int32Array(w * h).fill(-1);
      const areas: number[] = [];
      const stack = new Int32Array(w * h);
      for (let start = 0; start < alpha.length; start++) {
        if (alpha[start] <= 60 || label[start] !== -1) continue;
        const id = areas.length;
        let area = 0;
        let sp = 0;
        stack[sp++] = start;
        label[start] = id;
        while (sp > 0) {
          const p = stack[--sp];
          area++;
          const x = p % w;
          const y = (p - x) / w;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (!dx && !dy) continue;
              const nx = x + dx, ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
              const np = ny * w + nx;
              if (alpha[np] > 60 && label[np] === -1) {
                label[np] = id;
                stack[sp++] = np;
              }
            }
          }
        }
        areas.push(area);
      }
      let largest = 0;
      for (const a of areas) if (a > largest) largest = a;
      const minArea = Math.max(12, largest * 0.01);
      const keep = areas.map((a) => a >= minArea);
      const kept = (p: number) => label[p] !== -1 && keep[label[p]];
      for (let p = 0; p < alpha.length; p++) {
        if (kept(p)) continue;
        // Soft edge pixels sit below the labelling threshold, so keep the ones
        // touching real ink — that's what stops strokes looking ragged.
        if (alpha[p] > 0 && label[p] === -1) {
          const x = p % w;
          const y = (p - x) / w;
          let touches = false;
          for (let dy = -1; dy <= 1 && !touches; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              const nx = x + dx, ny = y + dy;
              if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
              if (kept(ny * w + nx)) { touches = true; break; }
            }
          }
          if (touches) continue;
        }
        alpha[p] = 0;
      }

      let minX = w, minY = h, maxX = -1, maxY = -1;
      for (let p = 0; p < alpha.length; p++) {
        if (alpha[p] <= 60) continue;
        const pxx = p % w;
        const py = (p - pxx) / w;
        if (pxx < minX) minX = pxx;
        if (pxx > maxX) maxX = pxx;
        if (py < minY) minY = py;
        if (py > maxY) maxY = py;
      }
      if (maxX <= minX || maxY <= minY) continue;

      for (let p = 0, i = 0; p < alpha.length; p++, i += 4) {
        d8[i] = 20;
        d8[i + 1] = 30;
        d8[i + 2] = 61; // navy, so it stays dark in black-and-white printing
        d8[i + 3] = alpha[p];
      }
      ctx.putImageData(px, 0, 0);

      const tw = maxX - minX + 1;
      const th = maxY - minY + 1;
      const t = document.createElement("canvas");
      t.width = tw;
      t.height = th;
      const tctx = t.getContext("2d");
      if (!tctx) return null;
      tctx.drawImage(c, minX, minY, tw, th, 0, 0, tw, th);
      return { data: t.toDataURL("image/png"), ratio: tw / th };
    }
    return null;
  } catch {
    return null;
  }
}

async function loadMarks(): Promise<{ stamp: Mark | null; sign: Mark | null }> {
  const [sign, stamp] = await Promise.all([loadInkMark(SIGN_SRC), loadInkMark(STAMP_SRC)]);
  if (!sign) console.warn("Quotation: signature image could not be loaded", SIGN_SRC);
  if (!stamp) console.warn("Quotation: stamp image could not be loaded", STAMP_SRC);
  return { stamp, sign };
}

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
  address: "Charholi Budruk, Pimpri Chinchwad, Pune, Maharashtra – 412105",
};

const ORDINALS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];

// Four stages have fixed percentages: advance 15%, after plinth 10%,
// before painting 5% and on handover 5%. The remaining 65% is split across
// the actual RCC slabs and the middle finishing stages, so a G+1 and a G+4
// project each get a sensible schedule that still totals exactly 100%.
function buildPaymentSchedule(slabCount: number): PayRow[] {
  const slabs = Math.max(1, slabCount);
  const MIDDLE = [
    "After Brickwork (all floors)",
    "After Plaster (all floors)",
    "After Tile & Plumbing Work",
    "After Electrical & POP Work",
  ];

  // Distribute a whole-percent total across labels, pushing the rounding
  // remainder onto the last rows so the group sums exactly.
  function spread(total: number, labels: string[]): PayRow[] {
    const base = Math.floor(total / labels.length);
    const extra = total - base * labels.length;
    return labels.map((stage, i) => ({
      stage,
      percent: String(base + (i >= labels.length - extra ? 1 : 0)),
    }));
  }

  const remaining = 100 - 15 - 10 - 5 - 5; // 65% to distribute
  const slabShare = Math.round((remaining * slabs) / (slabs + MIDDLE.length));
  const middleShare = remaining - slabShare;
  const slabLabels = Array.from({ length: slabs }, (_, i) => `After ${ORDINALS[i] ?? `${i + 1}th`} RCC Slab`);

  return [
    { stage: "Advance / Booking", percent: "15" },
    { stage: "After Plinth", percent: "10" },
    ...spread(slabShare, slabLabels),
    ...spread(middleShare, MIDDLE),
    { stage: "Before Painting", percent: "5" },
    { stage: "On Handover / Possession", percent: "5" },
  ];
}

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
  const [payments, setPayments] = useState<PayRow[]>(buildPaymentSchedule(2));
  // Once the admin edits the schedule by hand we stop regenerating it.
  const [paymentsEdited, setPaymentsEdited] = useState(false);

  // Client / quotation meta
  const [quotationNo, setQuotationNo] = useState("");
  const [date, setDate] = useState("");
  const [validity, setValidity] = useState("15 days");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [honorific, setHonorific] = useState("Sir");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [floorRows, setFloorRows] = useState<FloorRow[]>(clone(defaultFloorRows));
  const [groundUsage, setGroundUsage] = useState<GroundUsage>("house");
  const [groundHouseSqft, setGroundHouseSqft] = useState("");
  const [groundParkingSqft, setGroundParkingSqft] = useState("");
  // Area percentages, seeded from the package and editable per quotation.
  const DEFAULT_PCT = { plinth: 50, ground: 100, parking: 50, upper: 100, terrace: 35 };
  const [pcts, setPcts] = useState(DEFAULT_PCT);

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
    // Re-clicking the current package used to silently reload the defaults and
    // discard the admin's edits — leave it alone instead.
    if (pkgId === id) return;
    if (!confirm(`Load the ${preset.label} specifications? This replaces the current specs, rates & brands with that package's defaults.`)) return;
    setPkgId(id);
    setRate(String(preset.rate));
    setSections(clone(preset.sections));
    setRates(clone(preset.rates));
    setBrands(clone(preset.brands));
    setNotes(clone(preset.notes ?? defaultSpecialNotes));
    const ap = preset.areaPercents;
    setPcts(ap
      ? { plinth: ap.plinth * 100, ground: ap.ground * 100, parking: ap.parking * 100, upper: ap.upper * 100, terrace: ap.terrace * 100 }
      : DEFAULT_PCT);
    if (preset.payments) {
      setPayments(clone(preset.payments));
      setPaymentsEdited(true); // fixed schedule — don't regenerate from floors
    } else {
      setPaymentsEdited(false);
    }
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
  const pct = {
    plinth: (parseFloat(String(pcts.plinth)) || 0) / 100,
    ground: (parseFloat(String(pcts.ground)) || 0) / 100,
    parking: (parseFloat(String(pcts.parking)) || 0) / 100,
    upper: (parseFloat(String(pcts.upper)) || 0) / 100,
    terrace: (parseFloat(String(pcts.terrace)) || 0) / 100,
  };
  const plinthArea = Math.round(groundSlab * pct.plinth);
  const terraceArea = Math.round(maxSlab * pct.terrace);

  const areaRows: AreaRow[] = [];
  const pctLabel = (v: number) => `${Math.round(v * 100)}%`;
  areaRows.push({ label: `Plinth (${pctLabel(pct.plinth)} of ${inr(groundSlab)} sqft ground slab)`, area: String(plinthArea) });
  if (groundUsage === "mixed") {
    areaRows.push({ label: `Ground Floor — House (${pctLabel(pct.ground)})`, area: String(Math.round(groundHouse * pct.ground)) });
    areaRows.push({ label: `Ground Floor — Parking (${pctLabel(pct.parking)})`, area: String(Math.round(groundParking * pct.parking)) });
  } else {
    const gPct = groundUsage === "parking" ? pct.parking : pct.ground;
    areaRows.push({
      label: `${floorRows[0]?.label || "Ground Floor"}${gPct === 1 ? "" : ` (${pctLabel(gPct)})`}`,
      area: String(Math.round((slabs[0] || 0) * gPct)),
    });
  }
  floorRows.slice(1).forEach((r, i) => {
    areaRows.push({
      label: `${r.label}${pct.upper === 1 ? "" : ` (${pctLabel(pct.upper)})`}`,
      area: String(Math.round((slabs[i + 1] || 0) * pct.upper)),
    });
  });
  areaRows.push({ label: `Terrace (${pctLabel(pct.terrace)} of ${inr(maxSlab)} sqft top slab)`, area: String(terraceArea) });

  const totalArea = areaRows.reduce((s, r) => s + (parseFloat(r.area) || 0), 0);
  const totalAmount = Math.round(totalArea * rateNum);

  // One RCC slab per floor (ground + upper floors).
  const slabCount = floorRows.length;
  useEffect(() => {
    if (paymentsEdited) return;
    setPayments(buildPaymentSchedule(slabCount));
  }, [slabCount, paymentsEdited]);

  // Restore whatever schedule the selected package defines: a fixed list if it
  // has one (e.g. RCC & brick work), otherwise one derived from the floors.
  function resetPaymentSchedule() {
    const preset = quotationPresets.find((p) => p.id === pkgId);
    if (preset?.payments) {
      setPayments(clone(preset.payments));
      setPaymentsEdited(true);
    } else {
      setPaymentsEdited(false);
      setPayments(buildPaymentSchedule(slabCount));
    }
  }

  async function buildPDF() {
    saveTemplate();
    const [{ jsPDF }, logo, marks] = await Promise.all([import("jspdf"), loadLogo(), loadMarks()]);
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const navy = [13, 27, 62] as const;
    const W = 210;
    const L = 14, R = W - 14;
    let y = 0;

    function footer() {
      doc.setDrawColor(210, 210, 210);
      doc.line(L, 289, R, 289);
      doc.setFontSize(7.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 100, 100);
      doc.text(`${header.company}  |  ${header.phone}  |  ${header.email}  |  GSTIN ${header.gstin}`, W / 2, 293, { align: "center" });
    }
    // The footer leaves the draw state grey/small, so reset it after every
    // page break or the first rows on the new page render faint.
    function resetStyle() {
      doc.setTextColor(...navy);
      doc.setDrawColor(225, 225, 225);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
    }
    function ensure(space: number) {
      if (y + space > 286) { footer(); doc.addPage(); y = 16; resetStyle(); }
    }
    // Start a fresh page so a group of sections stays together.
    function newPage() {
      footer();
      doc.addPage();
      y = 16;
      resetStyle();
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
        ensure(lines.length * 4.9 + 2);
        // Re-assert per row: ensure() may have broken the page mid-list.
        doc.setTextColor(...navy);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9.5);
        doc.text(String(i + 1), L + 4, y + 4.4, { align: "center" });
        lines.forEach((ln, j) => doc.text(ln, L + 10, y + 4.3 + j * 4.9));
        const h = lines.length * 4.9 + 2;
        doc.setDrawColor(225, 225, 225);
        doc.rect(L, y, R - L, h);
        doc.line(L + 8, y, L + 8, y + h);
        y += h;
      });
      y += 2;
    }

    // ── Page 1: letterhead (logo + typeset company details) ──
    const gold = [198, 150, 48] as const;
    {
      let textX = L;
      if (logo) {
        // Sized and centred against the company name + tagline block.
        const logoH = 20;
        const logoW = logoH * logo.ratio;
        doc.addImage(logo.data, "PNG", L, 10, logoW, logoH);
        textX = L + logoW + 4;
      }
      doc.setTextColor(...gold);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text(header.company, textX, 20.5);
      doc.setTextColor(40, 45, 60);
      doc.setFontSize(9);
      doc.text(header.subtitle, textX + 1, 26.5);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.text(header.address, textX + 1, 33);
      // right column
      doc.setTextColor(20, 20, 20);
      doc.setFontSize(8.5);
      doc.text(header.phone, R, 13, { align: "right" });
      doc.text(header.email, R, 19, { align: "right" });
      doc.text(header.website, R, 25, { align: "right" });
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "bold");
      doc.text(`GSTIN  ${header.gstin}`, R, 32, { align: "right" });
      // navy / gold rule
      doc.setFillColor(23, 30, 48);
      doc.rect(L, 37, (R - L) / 2, 1.4, "F");
      doc.setFillColor(...gold);
      doc.rect(L + (R - L) / 2, 37, (R - L) / 2, 1.4, "F");
      y = 47;
    }
    doc.setTextColor(...navy);
    doc.setFontSize(15);
    doc.setFont("helvetica", "bold");
    doc.text("QUOTATION", W / 2, y, { align: "center" });
    y += 8;

    // Client box — all client fields stacked on the left.
    const clientLines = [
      `Name: ${clientName || "—"}`,
      `Phone: ${clientPhone || "—"}`,
      `Location: ${location || "—"}`,
      ...(address.trim() ? [`Address: ${address.trim()}`] : []),
    ];
    const boxRows = Math.max(clientLines.length, 2); // meta column is No + Date
    const boxH = boxRows * 5 + 6;
    doc.setFillColor(249, 250, 251);
    doc.roundedRect(L, y, R - L, boxH, 2, 2, "F");
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    clientLines.forEach((line, i) => doc.text(line, L + 5, y + 7 + i * 5));
    // Quotation meta, right-aligned level with the client rows.
    [`No: ${quotationNo}`, `Date: ${date}`].forEach((line, i) =>
      doc.text(line, R - 5, y + 7 + i * 5, { align: "right" })
    );
    y += boxH + 5;

    // ── Specifications ──
    sectionTitle(`SPECIFICATIONS  —  DETAILS OF WORK  @  Rs. ${rate} / SQ.FT`);
    y += 2;
    sections.forEach((sec) => {
      if (!sec.title.trim() && sec.items.every((i) => !i.trim())) return;
      // Orphan control: keep the heading with its first two items. Sections
      // longer than that flow onto the next page rather than leaving a large
      // gap behind.
      doc.setFontSize(9.5);
      const itemH = (it: string) => (doc.splitTextToSize(it, R - L - 14) as string[]).length * 4.9 + 2;
      const live = sec.items.filter(Boolean);
      const keepH = 7 + live.slice(0, 2).reduce((h, it) => h + itemH(it), 0);
      if (y + keepH > 286) { footer(); doc.addPage(); y = 16; resetStyle(); }
      ensure(16);
      doc.setFillColor(238, 240, 244);
      doc.rect(L, y, R - L, 7, "F");
      doc.setDrawColor(225, 225, 225);
      doc.rect(L, y, R - L, 7);
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(sec.title, W / 2, y + 4.8, { align: "center" });
      y += 7;
      numberedItems(sec.items);
    });

    // ── Special notes ──
    y += 3;
    {
      // Don't leave the heading stranded at the foot of a page.
      doc.setFontSize(9.5);
      const firstH = notes
        .filter(Boolean)
        .slice(0, 2)
        .reduce((h, it) => h + (doc.splitTextToSize(it, R - L - 14) as string[]).length * 4.9 + 2, 0);
      if (y + 9 + firstH > 286) { footer(); doc.addPage(); y = 16; resetStyle(); }
    }
    sectionTitle("SPECIAL NOTES");
    y += 2;
    numberedItems(notes);

    // ── Closing, stamp & signature, right after the special notes ──
    const signW = marks.sign ? 42 : 0;
    const signH = marks.sign ? signW / (marks.sign.ratio || 3) : 0;
    const stampW = marks.stamp ? 34 : 0;
    const stampH = marks.stamp ? stampW / (marks.stamp.ratio || 1) : 0;
    const markH = Math.max(signH, stampH);
    // Falls back to blank space for a wet signature if either image fails.
    const gap = markH > 0 ? markH + 6 : 20;

    ensure(20 + gap);
    y += 8;
    doc.setTextColor(...navy);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    // Left margin, the way a letter closes — the stamp sits directly beneath it
    // and the signature block balances it on the right.
    doc.text("Thanking you,", L, y);

    if (markH > 0) {
      const top = y + 3;
      // Stamp sits at the left margin, well clear of the signature on the right.
      if (marks.stamp) {
        doc.addImage(marks.stamp.data, "PNG", L, top + (markH - stampH) / 2, stampW, stampH);
      }
      if (marks.sign) {
        doc.addImage(marks.sign.data, "PNG", R - signW, top + (markH - signH) / 2, signW, signH);
      }
    }

    y += gap;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(header.company, R, y, { align: "right" });

    // ── Estimate + payment schedule: always together on one page ──
    // Row height and type size shrink to fit however many slabs there are, so
    // this pair never spills onto a second page.
    newPage();
    {
      const eRows = areaRows.filter((r) => r.label.trim() || r.area.trim());
      const pRows = payments.filter((p) => p.stage.trim());
      const fixed = 9 + 2 + 7 + 7.5 + 9 + 6 + 14 + 9 + 2 + 7 + 7 + 4; // titles, headers, totals, note, gaps
      const available = 284 - y;
      const rowCount = eRows.length + pRows.length;
      let rowH = 7.2;
      if (rowCount > 0) rowH = Math.min(7.2, Math.max(4.6, (available - fixed) / rowCount));
      const fs = rowH >= 6.6 ? 9.5 : rowH >= 5.8 ? 8.5 : rowH >= 5.2 ? 8 : 7.5;
      const tx = rowH / 2 + 1.3; // baseline inside a row

      sectionTitle("TENTATIVE ESTIMATE");
      y += 2;
      doc.setFillColor(238, 240, 244);
      doc.rect(L, y, R - L, 7, "F");
      doc.setDrawColor(225, 225, 225);
      doc.rect(L, y, R - L, 7);
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(fs);
      doc.text("Floor", L + 3, y + 4.8);
      doc.text("Approx Area (sqft)", L + 95, y + 4.8, { align: "right" });
      doc.text("Rate", L + 130, y + 4.8, { align: "right" });
      doc.text("Amount", R - 3, y + 4.8, { align: "right" });
      [L + 60, L + 99, L + 134].forEach((cx) => doc.line(cx, y, cx, y + 7));
      y += 7;
      eRows.forEach((r) => {
        const a = parseFloat(r.area) || 0;
        doc.setTextColor(...navy);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(fs);
        doc.setDrawColor(225, 225, 225);
        doc.rect(L, y, R - L, rowH);
        doc.text(r.label || "—", L + 3, y + tx);
        doc.text(inr(a), L + 95, y + tx, { align: "right" });
        doc.text(inr(rateNum), L + 130, y + tx, { align: "right" });
        doc.text(`Rs. ${inr(Math.round(a * rateNum))}`, R - 3, y + tx, { align: "right" });
        [L + 60, L + 99, L + 134].forEach((cx) => doc.line(cx, y, cx, y + rowH));
        y += rowH;
      });
      doc.setFillColor(...navy);
      doc.rect(L, y, R - L, 7.5, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(fs);
      doc.text("TOTAL", L + 3, y + 5.2);
      doc.text(`${inr(totalArea)} sqft`, L + 95, y + 5.2, { align: "right" });
      doc.text(`Rs. ${inr(totalAmount)}`, R - 3, y + 5.2, { align: "right" });
      doc.setDrawColor(255, 255, 255);
      [L + 60, L + 99, L + 134].forEach((cx) => doc.line(cx, y, cx, y + 7.5));
      doc.setDrawColor(225, 225, 225);
      y += 9;
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(70, 70, 70);
      doc.text("GST 18% extra on the base amount, as per Special Notes.", L, y + 3);
      y += 14;

      sectionTitle("TENTATIVE PAYMENT SCHEDULE");
      y += 2;
      doc.setFillColor(238, 240, 244);
      doc.rect(L, y, R - L, 7, "F");
      doc.setDrawColor(225, 225, 225);
      doc.rect(L, y, R - L, 7);
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(fs);
      doc.text("SR", L + 3, y + 4.8);
      doc.text("Stage", L + 14, y + 4.8);
      doc.text("%", L + 130, y + 4.8, { align: "right" });
      doc.text("Amount", R - 3, y + 4.8, { align: "right" });
      [L + 11, L + 112, L + 134].forEach((cx) => doc.line(cx, y, cx, y + 7));
      y += 7;
      let paySum = 0;
      pRows.forEach((p, i2) => {
        const pctv = parseFloat(p.percent) || 0;
        paySum += pctv;
        doc.setTextColor(...navy);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(fs);
        doc.setDrawColor(225, 225, 225);
        doc.rect(L, y, R - L, rowH);
        doc.text(String(i2 + 1), L + 3, y + tx);
        doc.text(p.stage, L + 14, y + tx);
        doc.text(`${p.percent}%`, L + 130, y + tx, { align: "right" });
        doc.text(`Rs. ${inr(Math.round((totalAmount * pctv) / 100))}`, R - 3, y + tx, { align: "right" });
        [L + 11, L + 112, L + 134].forEach((cx) => doc.line(cx, y, cx, y + rowH));
        y += rowH;
      });
      doc.setFillColor(238, 240, 244);
      doc.rect(L, y, R - L, 7, "F");
      doc.setDrawColor(225, 225, 225);
      doc.rect(L, y, R - L, 7);
      doc.setTextColor(...navy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(fs);
      doc.text("TOTAL", L + 14, y + 4.8);
      doc.text(`${paySum}%`, L + 130, y + 4.8, { align: "right" });
      doc.text(`Rs. ${inr(Math.round((totalAmount * paySum) / 100))}`, R - 3, y + 4.8, { align: "right" });
      [L + 11, L + 112, L + 134].forEach((cx) => doc.line(cx, y, cx, y + 7));
      y += 11;
    }

    // ── Rates & brands: always together on one page ──
    {
      const live = (gs: RateGroup[]) => gs.filter((g) => g.work.trim() || g.items.some(Boolean));
      const liveRates = live(rates);
      const liveBrands = live(brands);
      const countRows = (gs: RateGroup[]) => gs.reduce((n, g) => n + Math.max(1, g.items.filter(Boolean).length), 0);
      const tables = [
        ["RATE CONSIDERED", liveRates] as const,
        ["BRAND USED", liveBrands] as const,
      ].filter(([, gs]) => gs.length);

      if (tables.length) {
        newPage();
        const fixed = 9 + 2 + tables.length * (7 + 12) + 6;
        const totalRows = tables.reduce((n, [, gs]) => n + countRows(gs), 0);
        const available = 284 - y;
        let rowH = 6.8;
        if (totalRows > 0) rowH = Math.min(6.8, Math.max(4.4, (available - fixed) / totalRows));
        const fs = rowH >= 6.2 ? 9.5 : rowH >= 5.5 ? 8.5 : rowH >= 5 ? 8 : 7.5;
        const tx = rowH / 2 + 1.2;

        sectionTitle("RATE CONSIDERED & BRANDS USED");
        y += 2;
        tables.forEach(([headerLabel, groups]) => {
          doc.setFillColor(238, 240, 244);
          doc.rect(L, y, R - L, 7, "F");
          doc.setDrawColor(225, 225, 225);
          doc.rect(L, y, R - L, 7);
          doc.setTextColor(...navy);
          doc.setFont("helvetica", "bold");
          doc.setFontSize(fs);
          doc.text("WORK", L + 3, y + 4.8);
          doc.text(headerLabel, L + 62, y + 4.8);
          y += 7;
          groups.forEach((g) => {
            const items = g.items.filter(Boolean);
            const startY = y;
            (items.length ? items : [""]).forEach((it) => {
              doc.setTextColor(...navy);
              doc.setFont("helvetica", "normal");
              doc.setFontSize(fs);
              doc.setDrawColor(225, 225, 225);
              doc.rect(L + 60, y, R - L - 60, rowH);
              if (it) doc.text(it, L + 62, y + tx);
              y += rowH;
            });
            doc.setDrawColor(225, 225, 225);
            doc.rect(L, startY, 60, y - startY);
            doc.setTextColor(...navy);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(fs);
            doc.text(g.work, L + 3, startY + tx);
          });
          y += 12;
        });
      }
    }

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
    return doc;
  }

  const fileName = () => `Quotation-${(clientName.trim() || quotationNo).replace(/\s+/g, "-")}.pdf`;

  async function downloadPDF() {
    const doc = await buildPDF();
    doc.save(fileName());
  }

  // Open the PDF in a new tab so it can be checked before sending.
  async function previewPDF() {
    const doc = await buildPDF();
    const url = URL.createObjectURL(doc.output("blob"));
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  // WhatsApp can't accept a file through a link, so download the PDF and open
  // the chat with a ready message — the admin just attaches the saved file.
  function whatsAppMessage() {
    return (
      `Hello ${[clientName.trim(), honorific].filter(Boolean).join(" ") || "Sir/Madam"},\n\n` +
      `Thank you for your interest in *One O Buildcon*. Please find attached our quotation for your construction project${location.trim() ? ` at ${location.trim()}` : ""}.\n\n` +
      `If you have any queries, please feel free to call or message us. And if anything needs to be added or changed, do let us know — we would be very happy to accommodate your requirement.\n\n` +
      `Warm regards,\nTeam One O Buildcon`
    );
  }

  async function sendWhatsApp() {
    const d = clientPhone.replace(/\D/g, "");
    const to = d.length === 10 ? `91${d}` : d;
    if (to.length < 10) { alert("Enter the client's phone number first."); return; }
    const msg = whatsAppMessage();

    // Decide up front, while still inside the click, whether this device can
    // share a file — building the PDF first would cost us the user gesture and
    // the fallback tab would be blocked.
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
    const canShareFile =
      typeof nav.share === "function" &&
      !!nav.canShare?.({ files: [new File([new Blob()], "q.pdf", { type: "application/pdf" })] });
    // Fallback path opens the chat now; the share path needs no window.
    const chat = canShareFile ? null : window.open(`https://wa.me/${to}?text=${encodeURIComponent(msg)}`, "_blank");

    try {
      const doc = await buildPDF();
      if (canShareFile) {
        // Phone: hand the PDF straight to the share sheet — pick WhatsApp, pick
        // the contact, send. Nothing is written to storage.
        const file = new File([doc.output("blob")], fileName(), { type: "application/pdf" });
        await nav.share!({ files: [file], text: msg, title: fileName() });
        return;
      }
      doc.save(fileName());
    } catch (e: any) {
      if (e?.name === "AbortError") return; // share sheet dismissed
      if (!chat) alert("Could not generate the PDF. Please use Download.");
    }
  }

  // ── UI helpers ──
  const input = "w-full min-w-0 rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20";
  const label = "block text-xs font-semibold text-navy/60 mb-1";
  const payTotal = payments.reduce((s, p) => s + (parseFloat(p.percent) || 0), 0);

  return (
    <div className="mx-auto max-w-4xl px-3 py-6 sm:px-4 sm:py-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold text-navy sm:text-2xl">
          <FileText className="h-6 w-6 text-amber" /> Quotation Generator
        </h1>
        <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center">
          <button onClick={previewPDF} className="flex items-center justify-center gap-2 rounded-xl border border-navy/20 px-3 py-2.5 text-sm font-semibold text-navy hover:bg-navy/5 transition">
            <Eye className="h-4 w-4" /> Preview
          </button>
          <button onClick={downloadPDF} className="flex items-center justify-center gap-2 rounded-xl bg-amber px-3 py-2.5 text-sm font-semibold text-navy-dark hover:bg-amber-light transition">
            <Download className="h-4 w-4" /> Download
          </button>
          <button onClick={sendWhatsApp} className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-3 py-2.5 text-sm font-semibold text-white hover:bg-green-600 transition">
            <Send className="h-4 w-4" /> WhatsApp
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Package selector */}
        <section className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm sm:p-5">
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
        <section className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Client &amp; Quotation</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Client Name</label>
              <div className="flex gap-2">
                <input className={input} value={clientName} onChange={(e) => setClientName(e.target.value)} />
                <select
                  className={`${input} max-w-[5.5rem] shrink-0`}
                  value={honorific}
                  onChange={(e) => setHonorific(e.target.value)}
                  title="Added after the name in the WhatsApp greeting"
                >
                  <option value="Sir">Sir</option>
                  <option value="Mam">Mam</option>
                  <option value="">—</option>
                </select>
              </div>
            </div>
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
        <section className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber">Tentative Estimate</h2>
            <div className="flex flex-wrap items-center gap-2">
              <label className="text-xs font-semibold text-navy/60">Rate (Rs./sqft)</label>
              <input className={`${input} max-w-[6rem]`} type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
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

          {/* Area percentages */}
          <div className="mb-4 rounded-xl border border-black/8 bg-gray-50 p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-navy/40">Area Percentages</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {([["plinth", "Plinth"], ["ground", "Ground"], ["parking", "Parking"], ["upper", "Upper floors"], ["terrace", "Terrace"]] as const).map(([k, lbl]) => (
                <div key={k}>
                  <label className={label}>{lbl} %</label>
                  <input
                    className={input}
                    type="number"
                    value={(pcts as any)[k]}
                    onChange={(e) => setPcts({ ...pcts, [k]: e.target.value === "" ? 0 : Number(e.target.value) })}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Slab areas */}
          <div className="space-y-2">
            {groundUsage === "mixed" ? (
              <>
                <div className="flex flex-wrap gap-2">
                  <input className={`${input} basis-full sm:basis-auto`} value={floorRows[0]?.label ?? "Ground Floor"} onChange={(e) => setFloorRows(floorRows.map((x, j) => j === 0 ? { ...x, label: e.target.value } : x))} />
                  <input className={`${input} max-w-[5.5rem] shrink-0 sm:max-w-[8rem]`} type="number" placeholder="house" value={groundHouseSqft} onChange={(e) => setGroundHouseSqft(e.target.value)} />
                  <input className={`${input} max-w-[5.5rem] shrink-0 sm:max-w-[8rem]`} type="number" placeholder="parking" value={groundParkingSqft} onChange={(e) => setGroundParkingSqft(e.target.value)} />
                  <span className="hidden w-10 shrink-0 sm:block" />
                </div>
                <p className="pl-1 text-xs text-navy/40">House area counts 100%, parking area counts 50%.</p>
              </>
            ) : (
              <div className="flex gap-2">
                <input className={input} value={floorRows[0]?.label ?? "Ground Floor"} onChange={(e) => setFloorRows(floorRows.map((x, j) => j === 0 ? { ...x, label: e.target.value } : x))} />
                <input className={`${input} max-w-[5.5rem] shrink-0 sm:max-w-[8rem]`} type="number" placeholder="sqft" value={floorRows[0]?.slab ?? ""} onChange={(e) => setFloorRows(floorRows.map((x, j) => j === 0 ? { ...x, slab: e.target.value } : x))} />
                <span className="hidden w-10 shrink-0 sm:block" />
              </div>
            )}
            {floorRows.slice(1).map((r, i) => (
              <div key={i + 1} className="flex gap-2">
                <input className={input} value={r.label} onChange={(e) => setFloorRows(floorRows.map((x, j) => j === i + 1 ? { ...x, label: e.target.value } : x))} />
                <input className={`${input} max-w-[5.5rem] shrink-0 sm:max-w-[8rem]`} type="number" placeholder="sqft" value={r.slab} onChange={(e) => setFloorRows(floorRows.map((x, j) => j === i + 1 ? { ...x, slab: e.target.value } : x))} />
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
        <section className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm sm:p-5">
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
                        className={`${input} min-w-0 resize-none`}
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
        <section className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber">Special Notes</h2>
            <button onClick={() => setNotes([...notes, ""])} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add Note</button>
          </div>
          <div className="space-y-2">
            {notes.map((n, i) => (
              <div key={i} className="flex gap-2">
                <span className="flex w-6 shrink-0 items-center justify-center text-xs font-semibold text-navy/40">{i + 1}</span>
                <textarea rows={Math.max(1, Math.ceil(n.length / 95))} className={`${input} min-w-0 resize-none`} value={n} onChange={(e) => setNotes(notes.map((x, j) => j === i ? e.target.value : x))} />
                <button onClick={() => setNotes(notes.filter((_, j) => j !== i))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* Payment schedule */}
        <section className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest text-amber">Payment Schedule</h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold ${payTotal === 100 ? "text-green-600" : "text-red-500"}`}>{payTotal}%</span>
              <button onClick={resetPaymentSchedule} className="flex items-center gap-1 rounded-lg border border-navy/20 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-navy/5" title="Restore this package's payment schedule"><RotateCcw className="h-3 w-3" /> Reset</button>
              <button onClick={() => { setPaymentsEdited(true); setPayments([...payments, { stage: "", percent: "" }]); }} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add</button>
            </div>
          </div>
          <div className="space-y-2">
            {payments.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <input className={`${input} min-w-0`} placeholder="Stage" value={p.stage} onChange={(e) => { setPaymentsEdited(true); setPayments(payments.map((x, j) => j === i ? { ...x, stage: e.target.value } : x)); }} />
                <input className={`${input} max-w-[4.5rem] shrink-0`} type="number" placeholder="%" value={p.percent} onChange={(e) => { setPaymentsEdited(true); setPayments(payments.map((x, j) => j === i ? { ...x, percent: e.target.value } : x)); }} />
                <span className="hidden w-28 shrink-0 text-right text-xs text-navy/50 sm:block">Rs. {inr(Math.round((totalAmount * (parseFloat(p.percent) || 0)) / 100))}</span>
                <button onClick={() => { setPaymentsEdited(true); setPayments(payments.filter((_, j) => j !== i)); }} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        </section>

        {/* Rates & Brands */}
        <GroupEditor title="Rate Considered" groups={rates} setGroups={setRates} input={input} />
        <GroupEditor title="Brands Used" groups={brands} setGroups={setBrands} input={input} />

        {/* Header (saved) */}
        <section className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Company Header (saved)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {([["company", "Company Name"], ["subtitle", "Subtitle"], ["phone", "Phone"], ["email", "Email"], ["website", "Website"], ["gstin", "GSTIN"], ["address", "Address"]] as const).map(([k, lbl]) => (
              <div key={k} className={k === "address" ? "sm:col-span-2" : ""}><label className={label}>{lbl}</label><input className={input} value={(header as any)[k]} onChange={(e) => setHeader({ ...header, [k]: e.target.value })} /></div>
            ))}
          </div>
        </section>

        {/* Bank (saved) */}
        <section className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Bank Details (saved)</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {([["accountName", "Account Name"], ["accountNumber", "Account Number"], ["bankName", "Bank Name"], ["ifsc", "IFSC Code"], ["branch", "Branch"]] as const).map(([k, lbl]) => (
              <div key={k}><label className={label}>{lbl}</label><input className={input} value={(bank as any)[k]} onChange={(e) => setBank({ ...bank, [k]: e.target.value })} /></div>
            ))}
          </div>
        </section>

        {/* Quick check that the stamp and signature images are reachable — if
            either box below is empty, the PDF will print blank signing space. */}
        <section className="mt-5 rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-amber">Stamp &amp; Signature</h2>
          <div className="flex flex-wrap items-center gap-6">
            {[
              { label: "Signature", src: SIGN_SRC },
              { label: "Stamp", src: STAMP_SRC },
            ].map((m) => (
              <div key={m.label}>
                <div className="mb-1 text-xs font-semibold text-navy/60">{m.label}</div>
                {/* Plain img on purpose: it loads straight from the bucket, so a
                    broken box means the URL itself is wrong. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.src} alt={m.label} className="h-20 w-auto rounded border border-black/10 bg-white object-contain" />
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-navy/50">Both should appear above. If a box is blank or broken, the image URL is wrong and the PDF will leave empty space to sign by hand.</p>
        </section>

        <div className="mt-5 flex flex-col gap-3 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <button onClick={saveTemplate} className="flex items-center gap-2 rounded-xl border border-navy/20 px-4 py-2.5 text-sm font-semibold text-navy hover:bg-navy/5"><RotateCcw className="h-4 w-4" /> Save header &amp; bank</button>
          <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:items-center">
            <button onClick={previewPDF} className="flex items-center justify-center gap-2 rounded-xl border border-navy/20 px-3 py-3 text-sm font-semibold text-navy hover:bg-navy/5 transition"><Eye className="h-4 w-4" /> Preview</button>
            <button onClick={downloadPDF} className="flex items-center justify-center gap-2 rounded-xl bg-amber px-3 py-3 text-sm font-semibold text-navy-dark hover:bg-amber-light transition"><Download className="h-4 w-4" /> Download</button>
            <button onClick={sendWhatsApp} className="flex items-center justify-center gap-2 rounded-xl bg-green-500 px-3 py-3 text-sm font-semibold text-white hover:bg-green-600 transition"><Send className="h-4 w-4" /> WhatsApp</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GroupEditor({ title, groups, setGroups, input }: { title: string; groups: RateGroup[]; setGroups: (v: RateGroup[]) => void; input: string }) {
  return (
    <section className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-widest text-amber">{title}</h2>
        <button onClick={() => setGroups([...groups, { work: "", items: [""] }])} className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"><Plus className="h-3 w-3" /> Add</button>
      </div>
      <div className="space-y-3">
        {groups.map((g, gi) => (
          <div key={gi} className="rounded-xl border border-black/8 p-3">
            <div className="mb-2 flex items-center gap-2">
              <input className={`${input} min-w-0 font-semibold`} placeholder="Work (e.g. Tile)" value={g.work} onChange={(e) => setGroups(groups.map((x, j) => j === gi ? { ...x, work: e.target.value } : x))} />
              <button onClick={() => confirm(`Delete "${g.work || "this group"}"?`) && setGroups(groups.filter((_, j) => j !== gi))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600" title="Delete group"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="space-y-2 pl-3">
              {g.items.map((it, ii) => (
                <div key={ii} className="flex items-center gap-2">
                  <input className={`${input} min-w-0`} placeholder="Rate / brand line" value={it} onChange={(e) => setGroups(groups.map((x, j) => j === gi ? { ...x, items: x.items.map((y, k) => k === ii ? e.target.value : y) } : x))} />
                  <button onClick={() => setGroups(groups.map((x, j) => j === gi ? { ...x, items: x.items.filter((_, k) => k !== ii) } : x))} className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <button onClick={() => setGroups(groups.map((x, j) => j === gi ? { ...x, items: [...x.items, ""] } : x))} className="text-xs font-semibold text-navy/50 hover:text-amber">+ add line</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
