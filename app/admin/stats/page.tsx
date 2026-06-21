"use client";

import { useEffect, useState } from "react";
import { BarChart3, Save, FolderKanban, CalendarClock } from "lucide-react";

export default function AdminStatsPage() {
  const [startYear, setStartYear] = useState("");
  const [clients, setClients] = useState("");
  const [cities, setCities] = useState("");
  const [projects, setProjects] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const currentYear = new Date().getFullYear();
  const computedYears = startYear ? Math.max(1, currentYear - (parseInt(startYear, 10) || currentYear)) : null;

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats", { cache: "no-store" }).then((r) => r.json()),
      fetch("/api/site-stats", { cache: "no-store" }).then((r) => r.json()),
    ])
      .then(([cfg, live]) => {
        setStartYear(String(cfg.startYear ?? ""));
        setClients(String(cfg.clients ?? ""));
        setCities(String(cfg.cities ?? ""));
        setProjects(typeof live.projects === "number" ? live.projects : null);
      })
      .catch(() => setMsg({ type: "err", text: "Could not load current stats." }))
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startYear: parseInt(startYear, 10),
          clients: parseInt(clients, 10),
          cities: parseInt(cities, 10),
        }),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || "Save failed");
      }
      setMsg({ type: "ok", text: "Saved! The homepage will show the new numbers." });
    } catch (e: any) {
      setMsg({ type: "err", text: e.message || "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-navy/50">Loading…</p>;
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-navy">
          <BarChart3 className="h-6 w-6 text-amber" /> Homepage Stats
        </h1>
        <p className="text-sm text-navy/50 mt-1">
          These are the four numbers shown on the homepage. Projects and Years update automatically — you only edit Clients and Cities (and your founding year).
        </p>
      </div>

      {/* Automatic stats (read-only) */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-white border border-black/8 shadow-sm p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy/5 mb-3">
            <FolderKanban className="h-5 w-5 text-navy" />
          </div>
          <p className="text-3xl font-bold text-navy">{projects ?? "—"}</p>
          <p className="text-sm text-navy/50 mt-0.5">Projects Completed <span className="text-emerald-600 font-medium">· auto</span></p>
          <p className="text-xs text-navy/40 mt-1">Counts every project you add. Add a project to increase this.</p>
        </div>
        <div className="rounded-2xl bg-white border border-black/8 shadow-sm p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber/10 mb-3">
            <CalendarClock className="h-5 w-5 text-amber" />
          </div>
          <p className="text-3xl font-bold text-navy">{computedYears ?? "—"}+</p>
          <p className="text-sm text-navy/50 mt-0.5">Years Experience <span className="text-emerald-600 font-medium">· auto</span></p>
          <p className="text-xs text-navy/40 mt-1">Ticks up every year from your founding year below.</p>
        </div>
      </div>

      {/* Editable fields */}
      <div className="rounded-2xl bg-white border border-black/8 shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Founding Year</label>
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            min={1990}
            max={currentYear}
            className="w-full rounded-xl border border-black/15 px-3 py-2.5 text-base font-medium text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
          />
          <p className="text-xs text-navy/40 mt-1">Year One O Buildcon started. "Years Experience" is calculated from this.</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Happy Clients</label>
          <input
            type="number"
            value={clients}
            onChange={(e) => setClients(e.target.value)}
            min={0}
            className="w-full rounded-xl border border-black/15 px-3 py-2.5 text-base font-medium text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
          />
          <p className="text-xs text-navy/40 mt-1">Shown as "{clients || "—"}+ Happy Clients".</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1.5">Cities Served</label>
          <input
            type="number"
            value={cities}
            onChange={(e) => setCities(e.target.value)}
            min={0}
            className="w-full rounded-xl border border-black/15 px-3 py-2.5 text-base font-medium text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
          />
          <p className="text-xs text-navy/40 mt-1">Number of cities where you've delivered projects.</p>
        </div>

        {msg && (
          <p className={`text-sm font-medium ${msg.type === "ok" ? "text-emerald-600" : "text-red-500"}`}>{msg.text}</p>
        )}

        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-2.5 text-sm font-bold text-navy-dark transition hover:bg-amber-light disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
