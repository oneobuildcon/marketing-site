// Run: node scripts/generate-profile.mjs
// Generates public/one-o-buildcon-company-profile.pdf

import { jsPDF } from "jspdf";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../public/one-o-buildcon-company-profile.pdf");

const doc = new jsPDF({ unit: "mm", format: "a4" });
const W = 210;
const H = 297;

// ── Colours ──────────────────────────────────────────────────────────────────
const NAVY   = [11, 31, 58];
const AMBER  = [224, 138, 30];
const WHITE  = [255, 255, 255];
const LGRAY  = [245, 245, 245];
const MGRAY  = [200, 200, 200];
const DGRAY  = [100, 100, 100];

function setFill(rgb) { doc.setFillColor(...rgb); }
function setDraw(rgb) { doc.setDrawColor(...rgb); }
function setTxt(rgb)  { doc.setTextColor(...rgb); }

// ── Helpers ───────────────────────────────────────────────────────────────────
function footer(page) {
  const y = 287;
  setDraw(MGRAY); doc.line(14, y, W - 14, y);
  doc.setFontSize(7.5); doc.setFont("helvetica", "normal"); setTxt(DGRAY);
  doc.text("One O Buildcon  |  +91 96074 07474  |  oneobuildcon@gmail.com  |  Pune, Maharashtra, India", W / 2, y + 4, { align: "center" });
  doc.text(`Page ${page}`, W - 14, y + 4, { align: "right" });
}

function sectionHeading(text, y) {
  setFill(NAVY); doc.rect(14, y, W - 28, 8, "F");
  doc.setFontSize(10); doc.setFont("helvetica", "bold"); setTxt(WHITE);
  doc.text(text, 18, y + 5.5);
  return y + 14;
}

function bullet(text, x, y, maxW) {
  doc.setFontSize(9.5); doc.setFont("helvetica", "normal"); setTxt([40, 40, 40]);
  setFill(AMBER); doc.circle(x + 1.5, y - 1, 1, "F");
  const lines = doc.splitTextToSize(text, maxW - 6);
  doc.text(lines, x + 5, y);
  return y + lines.length * 5.5 + 1;
}

function infoRow(label, value, x, y) {
  doc.setFontSize(9); doc.setFont("helvetica", "bold"); setTxt(NAVY);
  doc.text(label, x, y);
  doc.setFont("helvetica", "normal"); setTxt([40, 40, 40]);
  doc.text(value, x + 35, y);
  return y + 6.5;
}

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 1 — COVER
// ══════════════════════════════════════════════════════════════════════════════

// Background gradient (navy top band)
setFill(NAVY); doc.rect(0, 0, W, 160, "F");

// Amber accent bar
setFill(AMBER); doc.rect(0, 155, W, 6, "F");

// Company name
doc.setFontSize(30); doc.setFont("helvetica", "bold"); setTxt(WHITE);
doc.text("ONE O BUILDCON", W / 2, 70, { align: "center" });

// Amber underline
setFill(AMBER); doc.rect(W / 2 - 30, 75, 60, 1.5, "F");

// Tagline
doc.setFontSize(13); doc.setFont("helvetica", "normal"); setTxt([200, 200, 200]);
doc.text("From Blueprint to Brilliance", W / 2, 88, { align: "center" });

// Document title box
setFill([30, 50, 90]); doc.roundedRect(W / 2 - 45, 104, 90, 14, 3, 3, "F");
doc.setFontSize(11); doc.setFont("helvetica", "bold"); setTxt(AMBER);
doc.text("COMPANY PROFILE", W / 2, 113, { align: "center" });

// Lower section
doc.setFontSize(10); doc.setFont("helvetica", "normal"); setTxt([60, 60, 60]);
doc.text("Full-Service Construction Company", W / 2, 175, { align: "center" });
doc.text("Residential  ·  Commercial  ·  Renovation", W / 2, 183, { align: "center" });

// Contact band
setFill(LGRAY); doc.rect(0, 200, W, 24, "F");
doc.setFontSize(10); doc.setFont("helvetica", "bold"); setTxt(NAVY);
doc.text("+91 96074 07474", 30, 214);
doc.text("oneobuildcon@gmail.com", W / 2, 214, { align: "center" });
doc.text("Pune, Maharashtra, India", W - 30, 214, { align: "right" });

// Year
doc.setFontSize(9); doc.setFont("helvetica", "normal"); setTxt(DGRAY);
const year = new Date().getFullYear();
doc.text(`© ${year} One O Buildcon. All rights reserved.`, W / 2, 280, { align: "center" });

footer(1);

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 2 — ABOUT & CORE VALUES
// ══════════════════════════════════════════════════════════════════════════════
doc.addPage();

// Header strip
setFill(NAVY); doc.rect(0, 0, W, 22, "F");
doc.setFontSize(14); doc.setFont("helvetica", "bold"); setTxt(WHITE);
doc.text("About One O Buildcon", 14, 14);
setFill(AMBER); doc.rect(14, 18, 50, 1.5, "F");

let y = 32;

// About paragraph
doc.setFontSize(10); doc.setFont("helvetica", "normal"); setTxt([40, 40, 40]);
const aboutText = "One O Buildcon is a full-service construction company based in Pune, Maharashtra. Founded in 2019, we have successfully delivered 20+ projects spanning premium bungalows, row houses, residential buildings, farmhouses, and RCC structural work. We are guided by a single principle — deliver construction projects that clients can trust, on time and within budget.";
const aboutLines = doc.splitTextToSize(aboutText, W - 28);
doc.text(aboutLines, 14, y);
y += aboutLines.length * 5.5 + 8;

// Mission box
setFill(LGRAY); doc.roundedRect(14, y, W - 28, 22, 3, 3, "F");
setFill(AMBER); doc.rect(14, y, 3, 22, "F");
doc.setFontSize(10); doc.setFont("helvetica", "bold"); setTxt(NAVY);
doc.text("Our Mission", 22, y + 8);
doc.setFont("helvetica", "normal"); setTxt([40, 40, 40]);
doc.setFontSize(9.5);
const mission = "To take every project from blueprint to brilliance — combining sound engineering, quality materials, and attentive project management to build spaces our clients are proud of.";
const mLines = doc.splitTextToSize(mission, W - 38);
doc.text(mLines, 22, y + 15);
y += 30;

y = sectionHeading("Core Values", y);

const values = [
  ["Integrity", "We do what we say — transparent pricing, honest timelines, no shortcuts."],
  ["Quality", "Every project is built to last, using trusted materials and skilled craftsmanship."],
  ["Partnership", "We work closely with clients at every stage, from planning to handover."],
  ["On-Time Delivery", "Timelines are commitments. We plan meticulously and communicate proactively."],
];

values.forEach(([title, desc]) => {
  setFill(LGRAY); doc.roundedRect(14, y - 3, W - 28, 16, 2, 2, "F");
  setFill(AMBER); doc.circle(22, y + 4, 3, "F");
  doc.setFontSize(10); doc.setFont("helvetica", "bold"); setTxt(NAVY);
  doc.text(title, 29, y + 2);
  doc.setFont("helvetica", "normal"); setTxt([60, 60, 60]); doc.setFontSize(9);
  doc.text(desc, 29, y + 8);
  y += 20;
});

// Milestones
y = sectionHeading("Our Journey", y);

const milestones = [
  ["2019", "One O Buildcon founded in Pune"],
  ["2021", "Expanded to farmhouse and commercial builds"],
  ["2023", "Completed 20+ projects across residential and commercial segments"],
  ["2024", "Expanding client base across Pune and Maharashtra"],
];

milestones.forEach(([yr, event]) => {
  setFill(AMBER); doc.roundedRect(14, y - 3, 20, 10, 2, 2, "F");
  doc.setFontSize(9); doc.setFont("helvetica", "bold"); setTxt(NAVY);
  doc.text(yr, 24, y + 4, { align: "center" });
  doc.setFont("helvetica", "normal"); setTxt([40, 40, 40]);
  doc.text(event, 40, y + 4);
  setDraw(MGRAY); doc.line(24, y + 7, 24, y + 13);
  y += 14;
});

footer(2);

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 3 — SERVICES & PACKAGES
// ══════════════════════════════════════════════════════════════════════════════
doc.addPage();

setFill(NAVY); doc.rect(0, 0, W, 22, "F");
doc.setFontSize(14); doc.setFont("helvetica", "bold"); setTxt(WHITE);
doc.text("Services & Packages", 14, 14);
setFill(AMBER); doc.rect(14, 18, 46, 1.5, "F");

y = 32;
y = sectionHeading("Our Services", y);

const services = [
  ["Premium Bungalows", "Custom-designed bungalows with premium finishes, built to your exact specifications from foundation to final touches."],
  ["Row Houses", "Thoughtfully planned row house developments that balance privacy, community, and efficient land use."],
  ["Residential Buildings", "Multi-storey residential complexes engineered for safety, durability, and comfortable modern living."],
  ["Farmhouses", "Farmhouse builds designed to blend with natural surroundings while offering modern comfort and durability."],
  ["RCC Work", "Precision RCC structural work — foundations, columns, slabs, and framing carried out to strict engineering standards."],
  ["Interior Finishing", "Floor-to-ceiling interior finishing — flooring, fittings, paint, and décor tailored to your taste."],
];

// 2-column layout
const colW = (W - 28 - 6) / 2;
services.forEach(([title, desc], i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const bx = 14 + col * (colW + 6);
  const by = y + row * 34;
  setFill(LGRAY); doc.roundedRect(bx, by, colW, 30, 2, 2, "F");
  setFill(AMBER); doc.rect(bx, by, 3, 30, "F");
  doc.setFontSize(9.5); doc.setFont("helvetica", "bold"); setTxt(NAVY);
  doc.text(title, bx + 7, by + 8);
  doc.setFont("helvetica", "normal"); setTxt([60, 60, 60]); doc.setFontSize(8.5);
  const dLines = doc.splitTextToSize(desc, colW - 10);
  doc.text(dLines, bx + 7, by + 15);
});

y += Math.ceil(services.length / 2) * 34 + 4;
y = sectionHeading("Construction Packages", y);

const pkgs = [
  { name: "Structure Only", price: "₹1,199/sqft", note: "Foundation, columns, slabs, basic structure" },
  { name: "Basic",          price: "₹1,549/sqft", note: "Structure + flooring, doors, windows, basic fit-out" },
  { name: "Standard",       price: "₹1,699/sqft", note: "Basic + tiling, kitchen, bathroom, plumbing & electrical" },
  { name: "Premium",        price: "₹1,949/sqft", note: "Standard + premium fittings, modular kitchen, wardrobe" },
  { name: "Royal",          price: "₹2,099/sqft", note: "Premium + designer interiors, high-end fixtures" },
  { name: "Luxury",         price: "₹2,499/sqft", note: "Top-tier materials, bespoke design, full turnkey delivery" },
];

const pkgColW = (W - 28 - 10) / 3;
pkgs.forEach((p, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const bx = 14 + col * (pkgColW + 5);
  const by = y + row * 26;
  setFill(NAVY); doc.roundedRect(bx, by, pkgColW, 22, 2, 2, "F");
  doc.setFontSize(9.5); doc.setFont("helvetica", "bold"); setTxt(WHITE);
  doc.text(p.name, bx + 5, by + 7);
  setTxt(AMBER); doc.setFontSize(9);
  doc.text(p.price, bx + 5, by + 13);
  doc.setFont("helvetica", "normal"); setTxt([180, 180, 180]); doc.setFontSize(7.5);
  const nLines = doc.splitTextToSize(p.note, pkgColW - 8);
  doc.text(nLines, bx + 5, by + 18);
});

footer(3);

// ══════════════════════════════════════════════════════════════════════════════
// PAGE 4 — WHY CHOOSE US & CONTACT
// ══════════════════════════════════════════════════════════════════════════════
doc.addPage();

setFill(NAVY); doc.rect(0, 0, W, 22, "F");
doc.setFontSize(14); doc.setFont("helvetica", "bold"); setTxt(WHITE);
doc.text("Why Choose Us & Contact", 14, 14);
setFill(AMBER); doc.rect(14, 18, 54, 1.5, "F");

y = 32;
y = sectionHeading("Why Choose One O Buildcon?", y);

const whyPoints = [
  "20+ successfully completed projects since 2019",
  "Transparent, fixed pricing — no hidden charges",
  "On-time delivery is our core commitment",
  "End-to-end service from design to handover",
  "We handle all approvals, permits, and documentation",
  "Free site visit and cost estimate before you commit",
  "Dedicated project manager assigned to every project",
  "Quality materials sourced from trusted suppliers",
];

whyPoints.forEach(pt => { y = bullet(pt, 16, y, W - 28); });

y += 6;
y = sectionHeading("Client Testimonials", y);

const testimonials = [
  { name: "Suresh P.", project: "Premium Bungalow", quote: "One O Buildcon exceeded our expectations. Fantastic work and great attention to detail." },
  { name: "Anita R.", project: "Row House", quote: "Highly professional team, always on schedule, and transparent throughout." },
  { name: "Vikram M.", project: "Farmhouse", quote: "Top-notch quality and great communication from start to finish." },
];

testimonials.forEach(t => {
  setFill(LGRAY); doc.roundedRect(14, y, W - 28, 20, 2, 2, "F");
  setFill(AMBER); doc.roundedRect(14, y, 3, 20, 1, 1, "F");
  doc.setFontSize(9); doc.setFont("helvetica", "bolditalic"); setTxt([40, 40, 40]);
  const qLines = doc.splitTextToSize(`"${t.quote}"`, W - 42);
  doc.text(qLines, 22, y + 7);
  doc.setFont("helvetica", "bold"); setTxt(NAVY);
  doc.text(`— ${t.name}`, 22, y + 16);
  doc.setFont("helvetica", "normal"); setTxt(DGRAY); doc.setFontSize(8);
  doc.text(t.project, 22 + doc.getTextWidth(`— ${t.name}`) + 3, y + 16);
  y += 24;
});

y += 4;
y = sectionHeading("Get in Touch", y);

// Contact box
setFill(LGRAY); doc.roundedRect(14, y, W - 28, 48, 3, 3, "F");
setFill(AMBER); doc.rect(14, y, 3, 48, "F");

y += 8;
y = infoRow("Phone :", "+91 96074 07474", 22, y);
y = infoRow("Email :", "oneobuildcon@gmail.com", 22, y);
y = infoRow("Address :", "Pune, Maharashtra, India", 22, y);
y = infoRow("Hours :", "Monday – Saturday, 9:00 AM – 6:00 PM", 22, y);
y = infoRow("WhatsApp :", "+91 96074 07474 (Quick responses)", 22, y);

y += 8;

// CTA band
setFill(NAVY); doc.rect(14, y, W - 28, 16, "F");
doc.setFontSize(11); doc.setFont("helvetica", "bold"); setTxt(AMBER);
doc.text("Ready to build your dream home?  Contact us for a FREE consultation.", W / 2, y + 10, { align: "center" });

footer(4);

// ── Write file ────────────────────────────────────────────────────────────────
const buf = Buffer.from(doc.output("arraybuffer"));
writeFileSync(OUT, buf);
console.log(`✅  Company profile saved to ${OUT}`);
