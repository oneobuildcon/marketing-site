"use client";

import { useEffect, useState } from "react";
import { Star, Send, Copy, CheckCircle2, RotateCcw } from "lucide-react";

// Template stored in localStorage so edits stick per browser.
const TPL_KEY = "oneo_review_request_template";
// Branded short link — WhatsApp shows the One O Buildcon logo preview, then
// redirects the visitor to the actual Google review URL. The path segment
// changes the URL enough that WhatsApp treats it as new and re-fetches the
// preview instead of using its stale cache.
const REVIEW_LINK = "https://oneobuildcon.com/review-us";

const defaultTemplate = `Hello {name},

Thank you for choosing *One O Buildcon* for your construction project at {location}. 🏗️

A quick Google review would mean a lot to us and helps our small business grow. Please share your experience using the link below.

👉 {link}

नमस्कार {name_mr},

{location_mr} येथील बांधकाम प्रकल्पासाठी *One O Buildcon* ची निवड केल्याबद्दल धन्यवाद. 🏗️

तुमचा Google रिव्ह्यू आमच्यासाठी खूप महत्त्वाचा आहे. कृपया खालील लिंकवरून तुमचा अनुभव शेअर करा.

👉 {link}

Team One O Buildcon
📞 9607407474`;

export default function AdminReviewRequest() {
  const [template, setTemplate] = useState(defaultTemplate);
  const [name, setName] = useState("");
  const [nameMr, setNameMr] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [locationMr, setLocationMr] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(TPL_KEY);
      if (saved) setTemplate(saved);
    } catch {}
  }, []);

  function saveTemplate() {
    try { localStorage.setItem(TPL_KEY, template); } catch {}
  }
  function resetTemplate() {
    if (!confirm("Reset the message back to the default template?")) return;
    setTemplate(defaultTemplate);
    try { localStorage.setItem(TPL_KEY, defaultTemplate); } catch {}
  }

  // Marathi variants fall back to English if the admin didn't fill them in,
  // so an English-only send still works.
  const nameEn = name.trim() || "[Client Name]";
  const locationEn = location.trim() || "[Location]";
  const finalMessage = template
    .replaceAll("{name_mr}", nameMr.trim() || nameEn)
    .replaceAll("{location_mr}", locationMr.trim() || locationEn)
    .replaceAll("{name}", nameEn)
    .replaceAll("{location}", locationEn)
    .replaceAll("{link}", REVIEW_LINK);

  function digits(p: string) {
    const d = p.replace(/\D/g, "");
    return d.length === 10 ? "91" + d : d.startsWith("91") ? d : d;
  }

  function sendWhatsApp() {
    saveTemplate();
    const d = digits(phone);
    if (d.length < 10) { alert("Please enter a valid phone number."); return; }
    const url = `https://wa.me/${d}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, "_blank");
  }
  function copyMessage() {
    navigator.clipboard.writeText(finalMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const input = "w-full rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20";
  const label = "block text-xs font-semibold text-navy/60 mb-1";

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 flex items-center gap-2 text-2xl font-bold text-navy">
        <Star className="h-6 w-6 fill-amber text-amber" /> Review Request
      </h1>
      <p className="mb-6 text-sm text-navy/60">Fill client details, tweak the message if you like, then send on WhatsApp in one click.</p>

      <section className="rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Client</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><label className={label}>Client Name (English)</label><input className={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rahul Sharma" /></div>
          <div><label className={label}>WhatsApp Number</label><input className={input} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile" /></div>
          <div><label className={label}>Client Name (Marathi) <span className="text-navy/40 font-normal">— optional</span></label><input className={input} value={nameMr} onChange={(e) => setNameMr(e.target.value)} placeholder="उदा. राहुल शर्मा" /></div>
          <div><label className={label}>Project Location (English)</label><input className={input} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Wagholi, Pune" /></div>
          <div><label className={label}>Project Location (Marathi) <span className="text-navy/40 font-normal">— optional</span></label><input className={input} value={locationMr} onChange={(e) => setLocationMr(e.target.value)} placeholder="उदा. वाघोली, पुणे" /></div>
        </div>
      </section>

      <section className="mt-5 rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-widest text-amber">Message Template</h2>
          <button onClick={resetTemplate} className="flex items-center gap-1 rounded-lg border border-navy/20 px-3 py-1 text-xs font-semibold text-navy hover:bg-navy/5"><RotateCcw className="h-3 w-3" /> Reset</button>
        </div>
        <p className="mb-2 text-xs text-navy/50">Use <code className="rounded bg-navy/5 px-1">{"{name}"}</code>, <code className="rounded bg-navy/5 px-1">{"{location}"}</code> and <code className="rounded bg-navy/5 px-1">{"{link}"}</code> — they fill in automatically.</p>
        <textarea
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          onBlur={saveTemplate}
          rows={14}
          className="w-full rounded-lg border border-black/15 p-3 text-sm text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20 font-mono"
        />
      </section>

      <section className="mt-5 rounded-2xl border border-amber/30 bg-amber/5 p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-widest text-amber">Preview</h2>
        <pre className="whitespace-pre-wrap font-sans text-sm text-navy/80">{finalMessage}</pre>
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-3 pb-10">
        <button onClick={sendWhatsApp} className="flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white shadow hover:bg-green-600 transition">
          <Send className="h-4 w-4" /> Send on WhatsApp
        </button>
        <button onClick={copyMessage} className="flex items-center gap-2 rounded-xl border border-navy/20 px-5 py-3 font-semibold text-navy hover:bg-navy/5 transition">
          {copied ? <><CheckCircle2 className="h-4 w-4 text-green-500" /> Copied!</> : <><Copy className="h-4 w-4" /> Copy message</>}
        </button>
      </div>
    </div>
  );
}
