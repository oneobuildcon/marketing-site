"use client";

import { useEffect, useState } from "react";
import { Milestone as MilestoneIcon, Save, Plus, Trash2 } from "lucide-react";

type Milestone = { year: string; en: string; mr: string };

const DISPLAY_LIMIT = 6;

export default function AdminMilestonesPage() {
  const [items, setItems] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/milestones", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setItems(data); })
      .catch(() => setMsg({ type: "err", text: "Could not load milestones." }))
      .finally(() => setLoading(false));
  }, []);

  function update(i: number, field: keyof Milestone, value: string) {
    setItems((prev) => prev.map((m, idx) => (idx === i ? { ...m, [field]: value } : m)));
  }
  function addRow() {
    const nextYear = String(new Date().getFullYear());
    setItems((prev) => [...prev, { year: nextYear, en: "", mr: "" }]);
  }
  function removeRow(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      // Keep them sorted by year so the timeline always reads in order.
      const sorted = [...items].sort((a, b) => a.year.localeCompare(b.year));
      const res = await fetch("/api/admin/milestones", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sorted),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || "Save failed");
      }
      setItems(sorted);
      setMsg({ type: "ok", text: "Saved! The About page timeline is updated." });
    } catch (e: any) {
      setMsg({ type: "err", text: e.message || "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-navy/50">Loading…</p>;

  const shownOnSite = items.length > DISPLAY_LIMIT ? DISPLAY_LIMIT : items.length;

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-navy">
          <MilestoneIcon className="h-6 w-6 text-amber" /> Milestones
        </h1>
        <p className="text-sm text-navy/50 mt-1">
          The journey timeline on your About page. Add one line per year. To keep the page tidy, the website shows only the{" "}
          <strong>most recent {DISPLAY_LIMIT}</strong> (plus your founding year) — currently showing {shownOnSite} of {items.length}.
        </p>
      </div>

      <div className="space-y-3">
        {items.map((m, i) => (
          <div key={i} className="rounded-2xl bg-white border border-black/8 shadow-sm p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="flex items-end gap-3 sm:block">
                <div className="w-24 shrink-0 sm:w-20">
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy/40 mb-1">Year</label>
                  <input
                    value={m.year}
                    onChange={(e) => update(i, "year", e.target.value)}
                    className="w-full rounded-lg border border-black/15 px-2 py-2 text-base font-bold text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
                  />
                </div>
                <button
                  onClick={() => removeRow(i)}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50 sm:hidden"
                  aria-label="Remove milestone"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 space-y-2">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy/40 mb-1">Event (English)</label>
                  <input
                    value={m.en}
                    onChange={(e) => update(i, "en", e.target.value)}
                    placeholder="e.g. Completed 30+ projects"
                    className="w-full rounded-lg border border-black/15 px-3 py-2 text-base text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-navy/40 mb-1">Event (Marathi)</label>
                  <input
                    value={m.mr}
                    onChange={(e) => update(i, "mr", e.target.value)}
                    placeholder="मराठी मजकूर (रिकामे ठेवल्यास इंग्रजी वापरले जाईल)"
                    className="w-full rounded-lg border border-black/15 px-3 py-2 text-base text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
                  />
                </div>
              </div>
              <button
                onClick={() => removeRow(i)}
                className="mt-6 hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50 sm:flex"
                aria-label="Remove milestone"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addRow}
        className="inline-flex items-center gap-2 rounded-xl border border-navy/20 px-4 py-2.5 text-sm font-semibold text-navy transition hover:bg-navy/5"
      >
        <Plus className="h-4 w-4" /> Add Milestone
      </button>

      <div className="flex items-center gap-4 border-t border-black/8 pt-5">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-2.5 text-sm font-bold text-navy-dark transition hover:bg-amber-light disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
        </button>
        {msg && (
          <p className={`text-sm font-medium ${msg.type === "ok" ? "text-emerald-600" : "text-red-500"}`}>{msg.text}</p>
        )}
      </div>
    </div>
  );
}
