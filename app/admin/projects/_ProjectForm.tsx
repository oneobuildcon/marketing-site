"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Wand2, Trash2, Upload, Loader2 } from "lucide-react";
import type { DbProject } from "@/lib/db";

type Content = DbProject["en"];

function emptyContent(): Content {
  return { name: "", type: "", location: "", desc: "", highlights: ["", "", "", ""] };
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const inputCls =
  "w-full rounded-xl border border-black/15 px-4 py-2.5 text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20";
const labelCls = "block text-xs font-semibold uppercase tracking-wide text-navy/50 mb-1.5";

export default function ProjectForm({ project, isNew }: { project?: DbProject; isNew: boolean }) {
  const router = useRouter();

  const [slug, setSlug] = useState(project?.slug ?? "");
  const [category, setCategory] = useState<DbProject["category"]>(project?.category ?? "bungalow");
  const [status, setStatus] = useState<DbProject["status"]>(project?.status ?? "ongoing");
  const [year, setYear] = useState(project?.year ?? "");
  const [area, setArea] = useState(project?.area ?? "");
  const [duration, setDuration] = useState(project?.duration ?? "On request");
  const [budget, setBudget] = useState(project?.budget ?? "On request");

  const [en, setEn] = useState<Content>(
    project?.en
      ? { ...project.en, highlights: [...(project.en.highlights ?? []), "", "", "", ""].slice(0, 4) }
      : emptyContent()
  );
  const [enQuote, setEnQuote] = useState(project?.en.testimonial?.quote ?? "");
  const [enAuthor, setEnAuthor] = useState(project?.en.testimonial?.author ?? "");

  const [mr, setMr] = useState<Content>(
    project?.mr
      ? { ...project.mr, highlights: [...(project.mr.highlights ?? []), "", "", "", ""].slice(0, 4) }
      : emptyContent()
  );
  const [mrQuote, setMrQuote] = useState(project?.mr.testimonial?.quote ?? "");
  const [mrAuthor, setMrAuthor] = useState(project?.mr.testimonial?.author ?? "");

  const [photos, setPhotos] = useState<string[]>(project?.photos ?? []);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function setEnField<K extends keyof Content>(k: K, v: Content[K]) {
    setEn((p) => ({ ...p, [k]: v }));
  }
  function setMrField<K extends keyof Content>(k: K, v: Content[K]) {
    setMr((p) => ({ ...p, [k]: v }));
  }
  function setHighlight(which: "en" | "mr", idx: number, value: string) {
    const setter = which === "en" ? setEn : setMr;
    setter((p) => {
      const h = [...p.highlights];
      h[idx] = value;
      return { ...p, highlights: h };
    });
  }

  function buildContent(c: Content, quote: string, author: string): Content {
    const out: Content = {
      name: c.name,
      type: c.type,
      location: c.location,
      desc: c.desc,
      highlights: c.highlights.map((h) => h.trim()).filter(Boolean),
    };
    if (quote.trim()) out.testimonial = { quote: quote.trim(), author: author.trim() };
    return out;
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0 || !slug) return;
    setUploading(true);
    setError("");
    try {
      const newUrls: string[] = [];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("slug", slug);
        const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Upload failed");
        newUrls.push(data.url);
      }
      const next = [...photos, ...newUrls];
      setPhotos(next);
      // persist immediately on edit so cover/photos stay in sync
      if (!isNew) {
        await fetch(`/api/admin/projects/${slug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ photos: next }),
        });
      }
    } catch (e: any) {
      setError(e.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function removePhoto(url: string) {
    const next = photos.filter((p) => p !== url);
    setPhotos(next);
    if (!isNew) {
      await fetch(`/api/admin/projects/${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photos: next }),
      }).catch(() => {});
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!slug) {
      setError("Slug is required.");
      return;
    }
    if (!en.name) {
      setError("English name is required.");
      return;
    }
    setSaving(true);
    const payload = {
      slug,
      category,
      status,
      year,
      area,
      duration,
      budget,
      photos,
      en: buildContent(en, enQuote, enAuthor),
      mr: buildContent(mr, mrQuote, mrAuthor),
    };
    try {
      const res = isNew
        ? await fetch("/api/admin/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch(`/api/admin/projects/${slug}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to save project");
      router.push("/admin");
      router.refresh();
    } catch (e: any) {
      setError(e.message ?? "Failed to save project");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-navy/60 hover:text-amber">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <h1 className="text-2xl font-bold text-navy">{isNew ? "New Project" : `Edit: ${project?.en.name}`}</h1>
      </div>

      {error && <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>}

      {/* Basic Information */}
      <section className="rounded-2xl bg-white border border-black/8 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-bold text-navy">Basic Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls}>Slug</label>
            <div className="flex gap-2">
              <input
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                disabled={!isNew}
                placeholder="e.g. relekar"
                className={`${inputCls} disabled:bg-gray-100 disabled:text-navy/50`}
              />
              {isNew && (
                <button
                  type="button"
                  onClick={() => setSlug(slugify(en.name))}
                  className="inline-flex items-center gap-1 rounded-xl border border-black/15 px-3 text-sm font-medium text-navy hover:border-amber/40 hover:bg-amber/5"
                >
                  <Wand2 className="h-4 w-4" /> Generate
                </button>
              )}
            </div>
          </div>
          <div>
            <label className={labelCls}>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value as DbProject["category"])} className={inputCls}>
              <option value="bungalow">Bungalow</option>
              <option value="rowhouse">Row House</option>
              <option value="residential">Residential</option>
              <option value="farmhouse">Farmhouse</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as DbProject["status"])} className={inputCls}>
              <option value="completed">Completed</option>
              <option value="ongoing">Under Construction</option>
              <option value="pipeline">Upcoming</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Year</label>
            <input value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2024 or Dec 2026" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Area</label>
            <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g. 3,200 Sq.ft" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Duration</label>
            <input value={duration} onChange={(e) => setDuration(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Budget</label>
            <input value={budget} onChange={(e) => setBudget(e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      {/* English Content */}
      <section className="rounded-2xl bg-white border border-black/8 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-bold text-navy">English Content</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Name</label>
            <input value={en.name} onChange={(e) => setEnField("name", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Type</label>
            <input value={en.type} onChange={(e) => setEnField("type", e.target.value)} placeholder="e.g. Premium Bungalow" className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Location</label>
            <input value={en.location} onChange={(e) => setEnField("location", e.target.value)} placeholder="e.g. Charoli, Pune" className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Description</label>
            <textarea value={en.desc} onChange={(e) => setEnField("desc", e.target.value)} rows={4} className={inputCls} />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <label className={labelCls}>Highlight {i + 1}</label>
              <input value={en.highlights[i] ?? ""} onChange={(e) => setHighlight("en", i, e.target.value)} className={inputCls} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className={labelCls}>Testimonial Quote (optional)</label>
            <textarea value={enQuote} onChange={(e) => setEnQuote(e.target.value)} rows={2} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Testimonial Author (optional)</label>
            <input value={enAuthor} onChange={(e) => setEnAuthor(e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      {/* Marathi Content */}
      <section className="rounded-2xl bg-white border border-black/8 shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-bold text-navy">
          Marathi Content (मराठी)
          <span className="ml-2 text-xs font-normal text-navy/40">(optional — falls back to English if empty)</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Marathi Name</label>
            <input value={mr.name} onChange={(e) => setMrField("name", e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Marathi Type</label>
            <input value={mr.type} onChange={(e) => setMrField("type", e.target.value)} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Marathi Location</label>
            <input value={mr.location} onChange={(e) => setMrField("location", e.target.value)} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Marathi Description</label>
            <textarea value={mr.desc} onChange={(e) => setMrField("desc", e.target.value)} rows={4} className={inputCls} />
          </div>
          {[0, 1, 2, 3].map((i) => (
            <div key={i}>
              <label className={labelCls}>Marathi Highlight {i + 1}</label>
              <input value={mr.highlights[i] ?? ""} onChange={(e) => setHighlight("mr", i, e.target.value)} className={inputCls} />
            </div>
          ))}
          <div className="sm:col-span-2">
            <label className={labelCls}>Marathi Testimonial Quote (optional)</label>
            <textarea value={mrQuote} onChange={(e) => setMrQuote(e.target.value)} rows={2} className={inputCls} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Marathi Testimonial Author (optional)</label>
            <input value={mrAuthor} onChange={(e) => setMrAuthor(e.target.value)} className={inputCls} />
          </div>
        </div>
      </section>

      {/* Photos — edit only */}
      {!isNew && (
        <section className="rounded-2xl bg-white border border-black/8 shadow-sm p-6 space-y-4">
          <h2 className="text-lg font-bold text-navy">Photos</h2>
          <p className="text-xs text-navy/50">Cover photo: first photo in list.</p>
          {photos.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {photos.map((url) => (
                <div key={url} className="relative h-[100px] w-[100px] overflow-hidden rounded-lg border border-black/10 group">
                  <Image src={url} alt="" fill className="object-cover" sizes="100px" />
                  <button
                    type="button"
                    onClick={() => removePhoto(url)}
                    className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-white opacity-0 transition group-hover:opacity-100"
                    aria-label="Remove photo"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-black/20 px-4 py-3 text-sm font-medium text-navy hover:border-amber/50 hover:bg-amber/5">
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            {uploading ? "Uploading…" : "Upload Photos"}
            <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleUpload(e.target.files)} disabled={uploading} />
          </label>
        </section>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-xl bg-amber px-6 py-3 font-bold text-navy-dark transition hover:bg-amber-light disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {isNew ? "Create Project" : "Save Changes"}
        </button>
        <Link href="/admin" className="rounded-xl border border-black/15 px-6 py-3 font-medium text-navy hover:bg-gray-50">
          Cancel
        </Link>
      </div>
    </form>
  );
}
