import { L, amountInWordsMr } from "./marathiQuotation";

/**
 * Marathi quotation PDF.
 *
 * jsPDF cannot shape Devanagari — it draws characters in typed order, so the
 * vowel sign ि lands after its consonant instead of before it and words like
 * किंमत come out as कमित. The browser has a proper shaping engine, so the
 * Marathi quotation is laid out as HTML, rasterised page by page, and each
 * page placed into the PDF as an image. Everything the client sees is correct;
 * the trade-off is that the text is a picture rather than selectable text.
 *
 * The English quotation still goes through jsPDF directly and is untouched.
 */

type Group = { title: string; items: string[] };
type RateGroup = { work: string; items: string[] };
type Mark = { data: string; ratio: number } | null;

export type MrQuotationInput = {
  header: { company: string; subtitle: string; address: string; phone: string; email: string; website: string; gstin: string };
  bank: { accountName: string; accountNumber: string; bankName: string; ifsc: string; branch: string };
  logo: Mark;
  stamp: Mark;
  sign: Mark;
  client: { name: string; phone: string; location: string; address: string };
  meta: { no: string; date: string; validity: string; duration: string };
  rate: number;
  sections: Group[];
  notes: Group[];
  rates: RateGroup[];
  brands: RateGroup[];
  areaRows: { label: string; area: string }[];
  totalArea: number;
  totalAmount: number;
  payments: { stage: string; percent: string }[];
  floorCount: number;
};

// A4 at 96dpi, the units the browser lays out in.
const PAGE_W = 794;
const PAGE_H = 1123;
const PAD_X = 42;
const PAD_TOP = 40;
const FOOTER_H = 58;
const CONTENT_W = PAGE_W - PAD_X * 2;
const CONTENT_H = PAGE_H - PAD_TOP - FOOTER_H;

const NAVY = "#171e30";
const GOLD = "#c69630";
const LINE = "#e1e1e1";

const inr = (n: number) => n.toLocaleString("en-IN");

/**
 * The logo, stamp and signature arrive at up to 1600px but are drawn at
 * around 150px. Rasterising the full-size originals into every page is the
 * slowest part of the build, so they are reduced to roughly what the page
 * needs before they ever reach html2canvas.
 */
async function shrink(mark: Mark, targetW: number): Promise<Mark> {
  if (!mark) return null;
  try {
    const img = new Image();
    img.src = mark.data;
    await img.decode();
    const w = Math.min(img.width, Math.round(targetW * 3)); // 3x for print
    if (w >= img.width) return mark;
    const h = Math.max(1, Math.round((w / img.width) * img.height));
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    if (!ctx) return mark;
    ctx.drawImage(img, 0, 0, w, h);
    return { data: c.toDataURL("image/png"), ratio: mark.ratio };
  } catch {
    return mark;
  }
}
const esc = (s: string) =>
  String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600;700&display=swap";

/** Loads the Devanagari webfont and waits for it, so nothing rasterises in a fallback face. */
async function ensureFont(doc: Document) {
  const ID = "noto-devanagari-quotation";
  if (!doc.getElementById(ID)) {
    const link = doc.createElement("link");
    link.id = ID;
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    doc.head.appendChild(link);
  }
  try {
    // Capped, so a slow or blocked font host cannot stall the whole build.
    await Promise.race([
      (async () => {
        await Promise.all([
          (doc as any).fonts?.load('400 14px "Noto Sans Devanagari"'),
          (doc as any).fonts?.load('700 14px "Noto Sans Devanagari"'),
        ]);
        await (doc as any).fonts?.ready;
      })(),
      new Promise((r) => setTimeout(r, 8000)),
    ]);
  } catch {
    // Font unavailable (offline, blocked) — the layout still renders in a
    // fallback face rather than failing outright.
  }
}

/**
 * The pages are laid out on this page, off to one side.
 *
 * Laying them out in a bare iframe was quicker — html2canvas clones the whole
 * document for every page, and this admin page is a very large form — but the
 * webfont then loaded separately inside that frame, and html2canvas measured
 * the text in one face and painted it in another. Words ran together. Correct
 * spacing matters more than the seconds it saved.
 */
async function openStage(): Promise<{ host: HTMLElement; close: () => void }> {
  await ensureFont(document);
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    `position:fixed;left:-20000px;top:0;width:${PAGE_W}px;background:#fff;z-index:-1;` +
    `font-family:"Noto Sans Devanagari",sans-serif;color:${NAVY};`;
  document.body.appendChild(host);
  return { host, close: () => host.remove() };
}

/** One block of the document: an element plus whether it must start a page. */
type Block = { el: HTMLElement; breakBefore?: boolean; keepWithNext?: boolean };

function h(html: string, opts: Omit<Block, "el"> = {}): Block {
  const el = document.createElement("div");
  el.innerHTML = html;
  const only = el.children.length === 1 ? (el.firstElementChild as HTMLElement) : el;
  return { el: only, ...opts };
}

function sectionTitle(text: string) {
  // Centred, to match the navy bars in the English quotation.
  return `<div style="margin:14px 0 6px;padding:7px 10px;background:${NAVY};color:#fff;font-weight:700;font-size:13px;letter-spacing:.4px;text-align:center;">${esc(text)}</div>`;
}

function numberedRow(n: number, text: string) {
  return `<div style="display:flex;border:1px solid ${LINE};border-top:none;font-size:12.5px;line-height:1.5;">
    <div style="width:30px;flex:none;text-align:center;padding:6px 0;border-right:1px solid ${LINE};color:${NAVY};">${n}</div>
    <div style="padding:6px 10px;color:#222;">${esc(text)}</div>
  </div>`;
}

function groupHeading(text: string) {
  return `<div style="margin:10px 0 0;font-weight:700;font-size:12.5px;color:${NAVY};">${esc(text)}</div>`;
}

function buildBlocks(d: MrQuotationInput): Block[] {
  const blocks: Block[] = [];
  const push = (html: string, o?: Omit<Block, "el">) => blocks.push(h(html, o));

  // ── Letterhead ──
  const logoImg = d.logo
    ? `<img src="${d.logo.data}" style="height:52px;width:${Math.round(52 * (d.logo.ratio || 1.5))}px;object-fit:contain;" />`
    : "";
  push(`<div>
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;">
      <div style="display:flex;align-items:center;gap:10px;">
        ${logoImg}
        <div>
          <div style="font-size:25px;font-weight:700;color:${GOLD};line-height:1.1;">${esc(d.header.company)}</div>
          <div style="font-size:9.5px;color:#282d3c;margin-top:3px;">${esc(d.header.subtitle)}</div>
          <div style="font-size:8.5px;color:#444;margin-top:3px;">${esc(d.header.address)}</div>
        </div>
      </div>
      <div style="text-align:right;font-size:9.5px;color:#111;line-height:1.9;">
        <div>${esc(d.header.phone)}</div>
        <div>${esc(d.header.email)}</div>
        <div>${esc(d.header.website)}</div>
        <div style="font-weight:700;color:${NAVY};">GSTIN ${esc(d.header.gstin)}</div>
      </div>
    </div>
    <div style="display:flex;margin-top:10px;height:5px;">
      <div style="flex:1;background:${NAVY};"></div><div style="flex:1;background:${GOLD};"></div>
    </div>
    <div style="text-align:center;font-size:17px;font-weight:700;color:${NAVY};margin-top:16px;">${L.quotation}</div>
  </div>`);

  // ── Client box ──
  const clientLines = [
    `${L.clientName}: ${d.client.name || "—"}`,
    `${L.phone}: ${d.client.phone || "—"}`,
    `${L.projectLocation}: ${d.client.location || "—"}`,
    ...(d.client.address.trim() ? [`${L.address}: ${d.client.address.trim()}`] : []),
  ];
  const metaLines = [
    `${L.quotationNo}: ${d.meta.no}`,
    `${L.date}: ${d.meta.date}`,
    `${L.validFor}: ${d.meta.validity}`,
  ];
  push(`<div style="margin-top:12px;background:#f9fafb;border-radius:6px;padding:10px 14px;display:flex;justify-content:space-between;font-size:11.5px;color:${NAVY};line-height:1.9;">
    <div>${clientLines.map(esc).join("<br/>")}</div>
    <div style="text-align:right;">${metaLines.map(esc).join("<br/>")}</div>
  </div>`);

  // ── Project summary ──
  const bits = [
    d.floorCount ? `${d.floorCount} ${L.floors}` : "",
    d.totalArea ? `${inr(d.totalArea)} ${L.sqft} ${L.builtUp}` : "",
    `रु. ${inr(d.rate)} ${L.perSqft}`,
    d.meta.duration.trim() ? `${L.duration}: ${d.meta.duration.trim()}` : "",
  ].filter(Boolean);
  if (bits.length) {
    push(`<div style="margin-top:8px;font-size:11px;color:#555;">${esc(bits.join("   |   "))}</div>`);
  }

  // ── Specifications ──
  push(sectionTitle(`${L.scopeTitle} — रु. ${inr(d.rate)} ${L.perSqft}`));
  d.sections.forEach((sec) => {
    const live = sec.items.filter((i) => i.trim());
    if (!sec.title.trim() && !live.length) return;
    push(
      `<div style="margin-top:10px;padding:6px 10px;background:#eef0f4;border:1px solid ${LINE};text-align:center;font-weight:700;font-size:12.5px;color:${NAVY};">${esc(sec.title)}</div>`,
      { keepWithNext: true }
    );
    live.forEach((it, i) => push(numberedRow(i + 1, it)));
  });

  // ── Special notes ──
  push(sectionTitle(L.specialNotes));
  d.notes.forEach((grp) => {
    const live = grp.items.filter((i) => i.trim());
    if (!live.length) return;
    if (grp.title.trim()) push(groupHeading(grp.title), { keepWithNext: true });
    live.forEach((it, i) => push(numberedRow(i + 1, it)));
  });

  // ── Closing, stamp & signature ──
  const signW = d.sign ? 150 : 0;
  const stampW = d.stamp ? 120 : 0;
  push(`<div style="margin-top:26px;">
    <div style="text-align:right;font-size:12px;color:${NAVY};padding-right:${Math.round(signW / 2)}px;">${L.thanking}</div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;min-height:${Math.max(stampW ? Math.round(stampW / (d.stamp!.ratio || 1)) : 0, signW ? Math.round(signW / (d.sign!.ratio || 3)) : 0, 46)}px;">
      <div>${d.stamp ? `<img src="${d.stamp.data}" style="width:${stampW}px;" />` : ""}</div>
      <div>${d.sign ? `<img src="${d.sign.data}" style="width:${signW}px;" />` : ""}</div>
    </div>
    <div style="text-align:right;font-weight:700;font-size:13px;color:${NAVY};margin-top:4px;">${esc(d.header.company)}</div>
  </div>`);

  // ── Client acceptance ──
  push(`<div style="margin-top:22px;border-top:1px solid #c8c8c8;padding-top:14px;">
    <div style="font-weight:700;font-size:12px;color:${NAVY};">${L.acceptedByClient}</div>
    <div style="display:flex;gap:18px;margin-top:22px;">
      ${[L.name, L.signature, L.dateShort]
        .map(
          (lbl) =>
            `<div style="flex:1;"><div style="border-top:1px solid #999;"></div><div style="font-size:11px;color:#555;margin-top:4px;">${lbl}</div></div>`
        )
        .join("")}
    </div>
  </div>`);

  // ── Rates & brands, on their own page ──
  const liveRates = d.rates.filter((g) => g.work.trim() || g.items.some((i) => i.trim()));
  const liveBrands = d.brands.filter((g) => g.work.trim() || g.items.some((i) => i.trim()));
  if (liveRates.length || liveBrands.length) {
    push(sectionTitle(L.ratesBrands), { breakBefore: true });
    ([[L.ratesConsidered, liveRates], [L.brandsUsed, liveBrands]] as const)
      .filter(([, gs]) => gs.length)
      .forEach(([heading, gs]) => {
        push(
          `<div style="margin-top:10px;padding:6px 10px;background:#eef0f4;border:1px solid ${LINE};font-weight:700;font-size:12.5px;color:${NAVY};">${esc(heading)}</div>`,
          { keepWithNext: true }
        );
        gs.forEach((g) => {
          const items = g.items.filter((i) => i.trim());
          push(`<div style="display:flex;border:1px solid ${LINE};border-top:none;font-size:12.5px;">
            <div style="width:170px;flex:none;padding:6px 10px;border-right:1px solid ${LINE};font-weight:600;color:${NAVY};">${esc(g.work)}</div>
            <div style="padding:6px 10px;color:#222;line-height:1.6;">${items.map(esc).join("<br/>")}</div>
          </div>`);
        });
      });
  }

  // ── Estimate + payment schedule, on their own page ──
  const eRows = d.areaRows.filter((r) => r.label.trim() || r.area.trim());
  push(sectionTitle(L.estimate), { breakBefore: true });
  push(`<div style="border:1px solid ${LINE};font-size:12.5px;">
    <div style="display:flex;background:#eef0f4;font-weight:700;color:${NAVY};">
      <div style="flex:1;padding:7px 10px;">${L.description}</div>
      <div style="width:170px;flex:none;padding:7px 10px;text-align:right;border-left:1px solid ${LINE};">${L.approxArea}</div>
      <div style="width:150px;flex:none;padding:7px 10px;text-align:right;border-left:1px solid ${LINE};">${L.amount}</div>
    </div>
    ${eRows
      .map((r) => {
        const a = parseFloat(r.area) || 0;
        return `<div style="display:flex;border-top:1px solid ${LINE};color:#222;">
          <div style="flex:1;padding:6px 10px;">${esc(r.label || "—")}</div>
          <div style="width:170px;flex:none;padding:6px 10px;text-align:right;border-left:1px solid ${LINE};">${inr(a)}</div>
          <div style="width:150px;flex:none;padding:6px 10px;text-align:right;border-left:1px solid ${LINE};">रु. ${inr(Math.round(a * d.rate))}</div>
        </div>`;
      })
      .join("")}
    <div style="display:flex;background:${NAVY};color:#fff;font-weight:700;">
      <div style="flex:1;padding:7px 10px;">${L.total}</div>
      <div style="width:170px;flex:none;padding:7px 10px;text-align:right;">${inr(d.totalArea)} ${L.sqft}</div>
      <div style="width:150px;flex:none;padding:7px 10px;text-align:right;">रु. ${inr(d.totalAmount)}</div>
    </div>
  </div>
  <div style="margin-top:8px;font-weight:700;font-size:12px;color:${NAVY};">${esc(amountInWordsMr(d.totalAmount))}</div>
  <div style="margin-top:5px;font-size:10.5px;color:#555;font-style:italic;">${L.gstNote}</div>`);

  const pRows = d.payments.filter((p) => p.stage.trim());
  const paySum = pRows.reduce((s, p) => s + (parseFloat(p.percent) || 0), 0);
  push(sectionTitle(L.paymentSchedule), { keepWithNext: true });
  push(`<div style="border:1px solid ${LINE};font-size:12.5px;">
    <div style="display:flex;background:#eef0f4;font-weight:700;color:${NAVY};">
      <div style="width:52px;flex:none;padding:7px 10px;">${L.srNo}</div>
      <div style="flex:1;padding:7px 10px;border-left:1px solid ${LINE};">${L.stageOfWork}</div>
      <div style="width:70px;flex:none;padding:7px 10px;text-align:right;border-left:1px solid ${LINE};">%</div>
      <div style="width:150px;flex:none;padding:7px 10px;text-align:right;border-left:1px solid ${LINE};">${L.amount}</div>
    </div>
    ${pRows
      .map((p, i) => {
        const pct = parseFloat(p.percent) || 0;
        return `<div style="display:flex;border-top:1px solid ${LINE};color:#222;">
          <div style="width:52px;flex:none;padding:6px 10px;">${i + 1}</div>
          <div style="flex:1;padding:6px 10px;border-left:1px solid ${LINE};">${esc(p.stage)}</div>
          <div style="width:70px;flex:none;padding:6px 10px;text-align:right;border-left:1px solid ${LINE};">${esc(p.percent)}%</div>
          <div style="width:150px;flex:none;padding:6px 10px;text-align:right;border-left:1px solid ${LINE};">रु. ${inr(Math.round((d.totalAmount * pct) / 100))}</div>
        </div>`;
      })
      .join("")}
    <div style="display:flex;border-top:1px solid ${LINE};background:#eef0f4;font-weight:700;color:${NAVY};">
      <div style="width:52px;flex:none;padding:7px 10px;"></div>
      <div style="flex:1;padding:7px 10px;border-left:1px solid ${LINE};">${L.total}</div>
      <div style="width:70px;flex:none;padding:7px 10px;text-align:right;border-left:1px solid ${LINE};">${paySum}%</div>
      <div style="width:150px;flex:none;padding:7px 10px;text-align:right;border-left:1px solid ${LINE};">रु. ${inr(Math.round((d.totalAmount * paySum) / 100))}</div>
    </div>
  </div>`);

  // ── Bank details ──
  if (d.bank.accountName || d.bank.accountNumber || d.bank.bankName) {
    push(`<div style="margin-top:18px;background:#f9fafb;border-radius:6px;padding:12px 14px;">
      <div style="font-weight:700;font-size:12.5px;color:${NAVY};margin-bottom:6px;">${L.bankDetails}</div>
      <div style="display:flex;gap:28px;font-size:11.5px;color:${NAVY};line-height:1.9;">
        <div>${esc(L.accountName)}: ${esc(d.bank.accountName)}<br/>${esc(L.accountNumber)}: ${esc(d.bank.accountNumber)}<br/>${esc(L.bank)}: ${esc(d.bank.bankName)}</div>
        <div>${esc(L.ifsc)}: ${esc(d.bank.ifsc)}<br/>${esc(L.branch)}: ${esc(d.bank.branch)}</div>
      </div>
    </div>`);
  }

  return blocks;
}

/** Lays blocks into fixed-height A4 pages, measuring each one in the DOM. */
async function paginate(blocks: Block[], host: HTMLElement): Promise<HTMLElement[]> {
  // Measure first: every block is rendered at the final content width so its
  // height is exactly what it will be on the page.
  const measure = document.createElement("div");
  measure.style.cssText = `position:absolute;left:0;top:0;width:${CONTENT_W}px;visibility:hidden;`;
  host.appendChild(measure);
  blocks.forEach((b) => measure.appendChild(b.el));

  // The logo, stamp and signature set a width and leave height to the image,
  // so heights are only correct once they have decoded.
  await Promise.all(
    Array.from(measure.querySelectorAll("img")).map((img) =>
      img.complete ? Promise.resolve() : img.decode().catch(() => undefined)
    )
  );
  // Headings carry a top margin, and offsetHeight leaves margins out. Ignoring
  // them let the running total drift below the real one, so the last block on a
  // page ran over the footer.
  const heights = blocks.map((b) => {
    // Measured through the stage's own window — the blocks live in the iframe.
    const cs = (b.el.ownerDocument.defaultView || window).getComputedStyle(b.el);
    return b.el.offsetHeight + (parseFloat(cs.marginTop) || 0) + (parseFloat(cs.marginBottom) || 0);
  });

  const pages: HTMLElement[] = [];
  let page: HTMLElement | null = null;
  let used = 0;

  const newPage = () => {
    const p = document.createElement("div");
    p.style.cssText =
      `position:relative;width:${PAGE_W}px;height:${PAGE_H}px;background:#fff;` +
      `padding:${PAD_TOP}px ${PAD_X}px 0;box-sizing:border-box;overflow:hidden;`;
    const body = document.createElement("div");
    body.setAttribute("data-body", "1");
    p.appendChild(body);
    pages.push(p);
    host.appendChild(p);
    page = body;
    used = 0;
  };

  newPage();
  blocks.forEach((b, i) => {
    const hgt = heights[i];
    // A heading must not be stranded at the foot of a page, so it moves down
    // with the first row that follows it.
    const need = b.keepWithNext ? hgt + (heights[i + 1] ?? 0) : hgt;
    if (b.breakBefore && used > 0) newPage();
    else if (used > 0 && used + need > CONTENT_H) newPage();
    page!.appendChild(b.el);
    used += hgt;
  });

  measure.remove();
  return pages;
}

function addFooters(pages: HTMLElement[], d: MrQuotationInput) {
  pages.forEach((p, i) => {
    const f = document.createElement("div");
    f.style.cssText =
      `position:absolute;left:${PAD_X}px;right:${PAD_X}px;bottom:18px;padding-top:7px;` +
      `border-top:1px solid #d2d2d2;display:flex;justify-content:space-between;font-size:9.5px;color:#666;`;
    f.innerHTML =
      `<span>${esc(d.header.company)}  |  ${esc(d.header.phone)}  |  ${esc(d.header.email)}  |  GSTIN ${esc(d.header.gstin)}</span>` +
      `<span>${L.page} ${i + 1} ${L.of} ${pages.length}</span>`;
    p.appendChild(f);
  });
}

/** Builds the Marathi quotation and returns it as a jsPDF document. */
export async function buildMarathiPDF(
  d: MrQuotationInput,
  onPage?: (done: number, total: number) => void
) {
  const [{ jsPDF }, html2canvas] = await Promise.all([
    import("jspdf"),
    import("html2canvas").then((m) => m.default),
  ]);
  const { host, close } = await openStage();

  try {
    const [logo, stamp, sign] = await Promise.all([
      shrink(d.logo, 90),
      shrink(d.stamp, 120),
      shrink(d.sign, 150),
    ]);
    const pages = await paginate(buildBlocks({ ...d, logo, stamp, sign }), host);
    addFooters(pages, d);

    const doc = new jsPDF({ unit: "mm", format: "a4" });
    for (let i = 0; i < pages.length; i++) {
      // 2x is about 190dpi — still crisp in a black-and-white printout, and
      // far quicker to produce than 2.5x, which matters on a phone.
      const canvas = await html2canvas(pages[i], {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        windowWidth: PAGE_W,
      });
      if (i > 0) doc.addPage();
      // JPEG rather than PNG: encoding is much faster and the file far
      // smaller, which is what gets shared over WhatsApp.
      doc.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 210, 297, undefined, "FAST");
      // Release the bitmap straight away; five full-page canvases held at once
      // is enough to stall a phone.
      canvas.width = 0;
      canvas.height = 0;
      onPage?.(i + 1, pages.length);
      // Give the browser a frame to breathe between pages.
      await new Promise((r) => setTimeout(r, 0));
    }
    return doc;
  } finally {
    close();
  }
}
