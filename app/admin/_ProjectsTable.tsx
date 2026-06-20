"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2, ImageOff } from "lucide-react";
import type { DbProject } from "@/lib/db";

const statusBadge: Record<string, { label: string; cls: string }> = {
  completed: { label: "Completed", cls: "bg-emerald-100 text-emerald-700" },
  ongoing: { label: "Under Construction", cls: "bg-amber/15 text-amber" },
  pipeline: { label: "Upcoming", cls: "bg-sky-100 text-sky-700" },
};

export default function ProjectsTable({ projects }: { projects: DbProject[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(slug: string, name: string) {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(slug);
    try {
      const res = await fetch(`/api/admin/projects/${slug}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to delete project.");
        return;
      }
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl bg-white border border-black/8 shadow-sm p-12 text-center text-navy/40">
        No projects yet. Click “Add New Project” to create one.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white border border-black/8 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/8 bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-navy/40">
              <th className="px-4 py-3">Cover</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => {
              const cover = p.photos?.[0] ?? `/projects/${p.slug}/1.jpg`;
              const badge = statusBadge[p.status] ?? { label: p.status, cls: "bg-gray-100 text-gray-600" };
              return (
                <tr key={p.slug} className="border-b border-black/5 last:border-0 hover:bg-gray-50/60">
                  <td className="px-4 py-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gray-100">
                      {cover ? (
                        <Image src={cover} alt={p.en.name} fill className="object-cover" sizes="48px" />
                      ) : (
                        <ImageOff className="h-5 w-5 text-navy/20 m-auto" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-navy">{p.en.name}</td>
                  <td className="px-4 py-3 capitalize text-navy/70">{p.category}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-navy/70">{p.year || "—"}</td>
                  <td className="px-4 py-3 text-navy/70">{p.en.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${p.slug}/edit`}
                        className="inline-flex items-center gap-1 rounded-lg border border-black/10 px-3 py-1.5 text-xs font-medium text-navy transition hover:border-amber/40 hover:bg-amber/5"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(p.slug, p.en.name)}
                        disabled={deleting === p.slug}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> {deleting === p.slug ? "…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
