// Pre-translates every line of every quotation package into Marathi and writes
// lib/marathiGlossary.ts.
//
// The specification text is the same on every quotation of a package — only the
// client's name and the amounts change. Translating it afresh each time meant a
// phone waited on a dozen round trips to Google before the PDF could even start
// rendering. Doing it once, here, makes a Marathi quotation as quick as an
// English one.
//
// Run it after changing data/quotationSpecs.ts:
//
//   npx next build && npx next start -p 3100 &
//   node scripts/buildMarathiGlossary.mjs
//
// It needs the dev server because it goes through the app's own translate
// route, which is what the browser uses, so the wording matches exactly.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ROOT = process.cwd();
const BASE = process.env.BASE_URL || "http://localhost:3100";
const PASSWORD = process.env.ADMIN_PASSWORD || "oneo2026";

// ── Load the TypeScript sources by compiling them to a scratch directory ──
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mr-glossary-"));
execFileSync(
  "npx",
  ["tsc", "data/quotationSpecs.ts", "lib/marathiQuotation.ts",
   "--outDir", tmp, "--module", "es2022", "--target", "es2022", "--moduleResolution", "bundler"],
  { cwd: ROOT, stdio: "inherit" }
);
for (const f of ["data/quotationSpecs.js", "lib/marathiQuotation.js"]) {
  const p = path.join(tmp, f);
  fs.writeFileSync(p, fs.readFileSync(p, "utf8").replace(/\.js"/g, '.js"'));
}
const { quotationPresets, defaultSpecialNotes } = await import(
  path.join(tmp, "data/quotationSpecs.js")
);
const { TERMS, polish } = await import(path.join(tmp, "lib/marathiQuotation.js"));

// ── Every distinct line a default quotation can print ──
const strings = new Set();
const add = (s) => {
  const t = (s ?? "").toString().trim();
  if (t && !TERMS[t]) strings.add(t);
};
const addGroups = (groups = []) =>
  groups.forEach((g) => {
    add(g.title ?? g.work);
    (g.items || []).forEach(add);
  });

for (const p of quotationPresets) {
  addGroups(p.sections);
  addGroups(p.rates);
  addGroups(p.brands);
  addGroups(p.notes);
  (p.payments || []).forEach((r) => add(r.stage));
}
addGroups(defaultSpecialNotes);

const all = [...strings].sort();
console.log(`${all.length} lines to translate`);

// ── Translate through the app's own route ──
const login = await fetch(`${BASE}/api/admin/auth`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ password: PASSWORD }),
});
if (!login.ok) throw new Error(`Login failed (${login.status}). Is the server running on ${BASE}?`);
const cookie = (login.headers.getSetCookie?.() || []).join("; ");

const glossary = {};
const BATCH = 15;
for (let i = 0; i < all.length; i += BATCH) {
  const items = all.slice(i, i + BATCH);
  const res = await fetch(`${BASE}/api/admin/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie },
    body: JSON.stringify({ items }),
  });
  const d = await res.json();
  if (!res.ok) throw new Error(d?.error || `Translation failed (${res.status})`);
  items.forEach((src, n) => {
    const got = d.items?.[n];
    if (!got) throw new Error(`No translation came back for: ${src}`);
    glossary[src] = polish(got.toString());
  });
  console.log(`  ${Math.min(i + BATCH, all.length)}/${all.length}`);
}

// ── Write the generated module ──
const body = Object.keys(glossary)
  .sort()
  .map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(glossary[k])},`)
  .join("\n");

fs.writeFileSync(
  path.join(ROOT, "lib/marathiGlossary.ts"),
  `// GENERATED FILE — do not edit by hand.
//
// Every default package line, translated once and shipped with the app, so a
// Marathi quotation needs no network at all. Regenerate after changing
// data/quotationSpecs.ts:
//
//   node scripts/buildMarathiGlossary.mjs
//
// Corrections to wording belong in lib/marathiQuotation.ts (TERMS or FIXES);
// they are applied on top of this file, so a fix reaches these lines too.

export const GLOSSARY: Record<string, string> = {
${body}
};
`
);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`wrote lib/marathiGlossary.ts (${Object.keys(glossary).length} lines)`);
