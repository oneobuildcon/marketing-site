"use client";

import { useEffect, useRef, useState } from "react";
import { Images, Save, Trash2, Upload, Loader2 } from "lucide-react";

import { compressImage } from "@/lib/imageCompress";

type GalleryImage = { url: string; caption?: string };

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/gallery", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setItems(data); })
      .catch(() => setMsg({ type: "err", text: "Could not load gallery." }))
      .finally(() => setLoading(false));
  }, []);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setMsg(null);
    const added: GalleryImage[] = [];
    try {
      for (const original of Array.from(files)) {
        const file = await compressImage(original);
        const form = new FormData();
        form.append("file", file);
        form.append("slug", "gallery");
        const res = await fetch("/api/admin/upload", { method: "POST", body: form });
        const text = await res.text();
        let data: any = {};
        try { data = JSON.parse(text); } catch { /* non-JSON error body */ }
        if (!res.ok) throw new Error(data.error || (res.status === 413 ? "Image too large — try a smaller photo" : "Upload failed"));
        added.push({ url: data.url, caption: "" });
      }
      setItems((prev) => [...added, ...prev]);
      setMsg({ type: "ok", text: `Uploaded ${added.length} photo${added.length > 1 ? "s" : ""}. Don't forget to Save.` });
    } catch (e: any) {
      setMsg({ type: "err", text: e.message || "Upload failed" });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function setCaption(i: number, caption: string) {
    setItems((prev) => prev.map((g, idx) => (idx === i ? { ...g, caption } : g)));
  }
  function remove(i: number) {
    setItems((prev) => prev.filter((_, idx) => idx !== i));
  }
  function move(i: number, dir: -1 | 1) {
    setItems((prev) => {
      const next = [...prev];
      const j = i + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  async function save() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(items),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e.error || "Save failed");
      }
      setMsg({ type: "ok", text: "Saved! Your website gallery is updated." });
    } catch (e: any) {
      setMsg({ type: "err", text: e.message || "Save failed" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-navy/50">Loading…</p>;

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-bold text-navy">
          <Images className="h-6 w-6 text-amber" /> Gallery
        </h1>
        <p className="text-sm text-navy/50 mt-1">
          Your website photo gallery (shown on the <strong>/gallery</strong> page). Upload as many project photos as you like, add an optional caption, then Save.
        </p>
      </div>

      {/* Upload box */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
        className="rounded-2xl border-2 border-dashed border-navy/20 bg-white p-6 text-center"
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-2.5 text-sm font-bold text-navy-dark transition hover:bg-amber-light disabled:opacity-60"
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          {uploading ? "Uploading…" : "Upload Photos"}
        </button>
        <p className="mt-2 text-xs text-navy/40">or drag &amp; drop images here · you can select multiple at once</p>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <p className="text-sm text-navy/50">No photos yet. Upload some above.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((g, i) => (
            <div key={g.url} className="rounded-2xl bg-white border border-black/8 shadow-sm overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.url} alt={g.caption || "Gallery photo"} className="h-44 w-full object-cover" />
              <div className="p-3 space-y-2">
                <input
                  value={g.caption || ""}
                  onChange={(e) => setCaption(i, e.target.value)}
                  placeholder="Caption (optional)"
                  className="w-full rounded-lg border border-black/15 px-2.5 py-1.5 text-sm text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    <button onClick={() => move(i, -1)} className="rounded-md border border-black/10 px-2 py-1 text-xs text-navy/60 hover:bg-navy/5" aria-label="Move left">←</button>
                    <button onClick={() => move(i, 1)} className="rounded-md border border-black/10 px-2 py-1 text-xs text-navy/60 hover:bg-navy/5" aria-label="Move right">→</button>
                  </div>
                  <button
                    onClick={() => remove(i)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                    aria-label="Remove photo"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="sticky bottom-0 flex items-center gap-4 border-t border-black/8 bg-gray-50 py-4">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-navy-dark disabled:opacity-60"
        >
          <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save Gallery"}
        </button>
        {msg && (
          <p className={`text-sm font-medium ${msg.type === "ok" ? "text-emerald-600" : "text-red-500"}`}>{msg.text}</p>
        )}
      </div>
    </div>
  );
}
