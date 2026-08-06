"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Star } from "lucide-react";

type Review = { author: string; rating: number; text: string; date: string };
type Payload = { rating: number | null; total: number; url: string; items: Review[] };

const input =
  "w-full rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20";
const label = "block text-xs font-semibold text-navy/60 mb-1";

const empty: Payload = { rating: 4.9, total: 0, url: "", items: [] };

export default function AdminReviews() {
  const [data, setData] = useState<Payload>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/reviews");
        if (res.ok) {
          const d = await res.json();
          setData({ ...empty, ...d });
        }
      } catch {}
      setLoading(false);
    })();
  }, []);

  function setItem(i: number, patch: Partial<Review>) {
    setData({ ...data, items: data.items.map((r, j) => (j === i ? { ...r, ...patch } : r)) });
  }

  async function save() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json())?.error || "Save failed");
      setMsg("Saved.");
    } catch (e: any) {
      setMsg(e?.message || "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8 text-sm text-navy/60">Loading…</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-navy">
          <Star className="h-6 w-6 fill-amber text-amber" /> Reviews
        </h1>
        <div className="flex items-center gap-2">
          {msg && <span className="text-xs font-semibold text-navy/70">{msg}</span>}
          <button
            onClick={() => setData({ ...data, items: [{ author: "", rating: 5, text: "", date: "" }, ...data.items] })}
            className="flex items-center gap-1 rounded-lg border border-navy/20 px-3 py-2 text-xs font-semibold text-navy hover:bg-navy/5"
          >
            <Plus className="h-3.5 w-3.5" /> Add review
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-navy-dark hover:bg-amber-light disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      <p className="mb-5 rounded-xl border border-amber/30 bg-amber/5 p-3 text-xs leading-relaxed text-navy/70">
        Copy real reviews from your Google profile — open your listing, click <strong>Read reviews</strong>, and
        paste each one in below. Only add reviews that genuinely exist on Google; the site links to your profile so
        anyone can check them.
      </p>

      <section className="mb-5 rounded-2xl border border-black/8 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-amber">Summary</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={label}>Average rating</label>
            <input
              className={input}
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={data.rating ?? ""}
              onChange={(e) => setData({ ...data, rating: parseFloat(e.target.value) || null })}
            />
          </div>
          <div>
            <label className={label}>Total reviews on Google</label>
            <input
              className={input}
              type="number"
              value={data.total || ""}
              onChange={(e) => setData({ ...data, total: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className={label}>Link to your Google reviews</label>
            <input
              className={input}
              value={data.url}
              onChange={(e) => setData({ ...data, url: e.target.value })}
              placeholder="https://www.google.com/maps?cid=…"
            />
          </div>
        </div>
      </section>

      <div className="space-y-3 pb-10">
        {data.items.length === 0 && (
          <p className="rounded-xl border border-dashed border-black/15 p-8 text-center text-sm text-navy/50">
            No reviews yet — press <strong>Add review</strong> to start.
          </p>
        )}
        {data.items.map((r, i) => (
          <div key={i} className="rounded-2xl border border-black/8 bg-white p-4 shadow-sm">
            <div className="mb-3 flex flex-wrap items-end gap-3">
              <div className="min-w-[10rem] flex-1">
                <label className={label}>Reviewer name</label>
                <input className={input} value={r.author} onChange={(e) => setItem(i, { author: e.target.value })} />
              </div>
              <div className="w-24">
                <label className={label}>Stars</label>
                <select className={input} value={r.rating} onChange={(e) => setItem(i, { rating: parseInt(e.target.value) })}>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <div className="w-32">
                <label className={label}>When</label>
                <input className={input} value={r.date} onChange={(e) => setItem(i, { date: e.target.value })} placeholder="2 months ago" />
              </div>
              <button
                onClick={() => setData({ ...data, items: data.items.filter((_, j) => j !== i) })}
                className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <label className={label}>Review text</label>
            <textarea
              rows={3}
              className={`${input} resize-none`}
              value={r.text}
              onChange={(e) => setItem(i, { text: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
