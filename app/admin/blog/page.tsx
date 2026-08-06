"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save, Eye, EyeOff, FileText, Upload, DownloadCloud } from "lucide-react";
import { defaultBlogPosts, type BlogPost } from "@/data/blogPosts";

const input =
  "w-full rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20";
const label = "block text-xs font-semibold text-navy/60 mb-1";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 70);
}

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/blog");
        if (res.ok) setPosts(await res.json());
      } catch {}
      setLoading(false);
    })();
  }, []);

  function update(i: number, patch: Partial<BlogPost>) {
    setPosts(posts.map((p, j) => (j === i ? { ...p, ...patch } : p)));
  }

  async function save() {
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(posts),
      });
      if (!res.ok) throw new Error((await res.json())?.error || "Save failed");
      setMsg("Saved.");
    } catch (e: any) {
      setMsg(e?.message || "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  function addPost() {
    const today = new Date().toISOString().slice(0, 10);
    setPosts([
      {
        slug: "", title: "", summary: "", cover: "", date: today, published: false, body: "",
        author: "Avinash Shinde, Founder — One O Buildcon", faqs: [],
      },
      ...posts,
    ]);
    setOpenIdx(0);
  }

  // Posts saved here replace the code defaults entirely, so newly written
  // starter posts would otherwise never appear. This pulls in only the ones
  // whose slug is missing, leaving everything already edited untouched.
  function importNewPosts() {
    const have = new Set(posts.map((p) => p.slug));
    const missing = defaultBlogPosts.filter((p) => !have.has(p.slug));
    if (!missing.length) {
      setMsg("No new posts to add — you already have them all.");
      return;
    }
    if (!confirm(`Add ${missing.length} new post${missing.length > 1 ? "s" : ""}?\n\n${missing.map((p) => "• " + p.title).join("\n")}\n\nYour existing posts are not changed.`)) return;
    setPosts([...missing, ...posts]);
    setMsg(`${missing.length} added — press Save all to keep them.`);
  }

  function removePost(i: number) {
    if (!confirm(`Delete "${posts[i].title || "this post"}"? This cannot be undone once saved.`)) return;
    setPosts(posts.filter((_, j) => j !== i));
    setOpenIdx(null);
  }

  async function uploadCover(i: number, file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("slug", "blog");
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const d = await res.json();
      if (!res.ok) throw new Error(d?.error || "Upload failed");
      update(i, { cover: d.url });
    } catch (e: any) {
      alert(e?.message || "Could not upload the image.");
    } finally {
      setUploading(false);
    }
  }

  if (loading) return <div className="p-8 text-sm text-navy/60">Loading…</div>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-navy">
          <FileText className="h-6 w-6 text-amber" /> Blog
        </h1>
        <div className="flex items-center gap-2">
          {msg && <span className="text-xs font-semibold text-navy/70">{msg}</span>}
          <button
            onClick={importNewPosts}
            title="Pull in any newly written posts that aren't in your list yet"
            className="flex items-center gap-1 rounded-lg border border-navy/20 px-3 py-2 text-xs font-semibold text-navy hover:bg-navy/5"
          >
            <DownloadCloud className="h-3.5 w-3.5" /> Get new posts
          </button>
          <button
            onClick={addPost}
            className="flex items-center gap-1 rounded-lg border border-navy/20 px-3 py-2 text-xs font-semibold text-navy hover:bg-navy/5"
          >
            <Plus className="h-3.5 w-3.5" /> New post
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-1.5 rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-navy-dark hover:bg-amber-light disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save all"}
          </button>
        </div>
      </div>

      <p className="mb-5 text-xs text-navy/50">
        Write with <code className="rounded bg-navy/5 px-1">## Heading</code>,{" "}
        <code className="rounded bg-navy/5 px-1">- bullet</code> and{" "}
        <code className="rounded bg-navy/5 px-1">**bold**</code>. Leave a blank line between
        paragraphs. Nothing appears on the website until you tick Published <em>and</em> press Save all.
      </p>

      <div className="space-y-3">
        {posts.map((p, i) => (
          <div key={i} className="rounded-2xl border border-black/8 bg-white shadow-sm">
            <div className="flex items-center gap-3 p-4">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="flex-1 text-left"
              >
                <div className="text-sm font-bold text-navy">{p.title || "Untitled post"}</div>
                <div className="text-xs text-navy/50">
                  {p.date} · {p.published ? "Published" : "Draft"}
                </div>
              </button>
              <button
                onClick={() => update(i, { published: !p.published })}
                title={p.published ? "Published — click to unpublish" : "Draft — click to publish"}
                className={`shrink-0 rounded-lg p-2 ${p.published ? "text-green-600 hover:bg-green-50" : "text-navy/40 hover:bg-navy/5"}`}
              >
                {p.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button
                onClick={() => removePost(i)}
                className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {openIdx === i && (
              <div className="space-y-4 border-t border-black/8 p-4">
                <div>
                  <label className={label}>Title</label>
                  <input
                    className={input}
                    value={p.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      // Only auto-fill the slug while it is still untouched.
                      update(i, p.slug === "" || p.slug === slugify(p.title) ? { title, slug: slugify(title) } : { title });
                    }}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={label}>URL slug</label>
                    <input className={input} value={p.slug} onChange={(e) => update(i, { slug: slugify(e.target.value) })} />
                    <p className="mt-1 text-[11px] text-navy/40">oneobuildcon.com/blog/{p.slug || "…"}</p>
                  </div>
                  <div>
                    <label className={label}>Date</label>
                    <input className={input} type="date" value={p.date} onChange={(e) => update(i, { date: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className={label}>Summary — shown on the blog list and in Google results</label>
                  <textarea
                    rows={2}
                    className={`${input} resize-none`}
                    value={p.summary}
                    onChange={(e) => update(i, { summary: e.target.value })}
                  />
                </div>
                <div>
                  <label className={label}>Cover image</label>
                  <div className="flex flex-wrap items-center gap-3">
                    {p.cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.cover} alt="" className="h-16 w-24 rounded border border-black/10 object-cover" />
                    )}
                    <label className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-navy/20 px-3 py-2 text-xs font-semibold text-navy hover:bg-navy/5">
                      <Upload className="h-3.5 w-3.5" /> {uploading ? "Uploading…" : "Upload"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && uploadCover(i, e.target.files[0])}
                      />
                    </label>
                    {p.cover && (
                      <button onClick={() => update(i, { cover: "" })} className="text-xs font-semibold text-red-500 hover:underline">
                        Remove
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <label className={label}>Author byline</label>
                  <input className={input} value={p.author ?? ""} onChange={(e) => update(i, { author: e.target.value })} placeholder="e.g. Avinash Shinde, Founder — One O Buildcon" />
                </div>
                <div>
                  <label className={label}>Body</label>
                  <textarea
                    rows={18}
                    className={`${input} resize-y font-mono text-[13px]`}
                    value={p.body}
                    onChange={(e) => update(i, { body: e.target.value })}
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className={`${label} mb-0`}>FAQs — shown at the foot of the post</label>
                    <button
                      onClick={() => update(i, { faqs: [...(p.faqs ?? []), { q: "", a: "" }] })}
                      className="flex items-center gap-1 rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      <Plus className="h-3 w-3" /> Add FAQ
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(p.faqs ?? []).map((f, fi) => (
                      <div key={fi} className="rounded-xl border border-black/8 p-3">
                        <div className="flex gap-2">
                          <input
                            className={`${input} font-semibold`}
                            placeholder="Question"
                            value={f.q}
                            onChange={(e) => update(i, { faqs: (p.faqs ?? []).map((x, k) => (k === fi ? { ...x, q: e.target.value } : x)) })}
                          />
                          <button
                            onClick={() => update(i, { faqs: (p.faqs ?? []).filter((_, k) => k !== fi) })}
                            className="shrink-0 rounded-lg p-2 text-red-400 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          className={`${input} mt-2 resize-none`}
                          placeholder="Answer"
                          value={f.a}
                          onChange={(e) => update(i, { faqs: (p.faqs ?? []).map((x, k) => (k === fi ? { ...x, a: e.target.value } : x)) })}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
