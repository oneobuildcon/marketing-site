"use client";

import { useState, useEffect } from "react";
import {
  packages,
  categories as defaultCategories,
  defaultPackageContent,
  PackageContent,
} from "@/data/packagesData";
import { Lock, Save, RotateCcw, Plus, Trash2, Copy, CheckCircle2, LogOut, Pencil, X, ChevronUp, ChevronDown } from "lucide-react";

const ADMIN_PASSWORD = "oneo2024";
const STORAGE_KEY = "oneo_packages_content";
const META_KEY = "oneo_packages_meta";
const CAT_KEY = "oneo_categories_meta";
const SESSION_KEY = "oneo_admin_session";

interface PkgMeta { id: string; name: string; price: string; }
interface CatMeta { id: string; name: string; }

function buildEmptyRow(catIds: string[]): Record<string, string[]> {
  return Object.fromEntries(catIds.map((id) => [id, []]));
}

export default function AdminPackages() {
  // Access is enforced by the admin login (JWT middleware), so no separate
  // password gate is needed here.
  const [authed] = useState(true);
  const [password, setPassword] = useState("");
  const [wrongPw, setWrongPw] = useState(false);

  const [content, setContent] = useState<PackageContent>(defaultPackageContent);
  const [pkgMeta, setPkgMeta] = useState<PkgMeta[]>(packages.map((p) => ({ ...p })));
  const [catMeta, setCatMeta] = useState<CatMeta[]>(defaultCategories.map((c) => ({ ...c })));

  const [selectedPkg, setSelectedPkg] = useState<string>("basic");
  const [selectedCat, setSelectedCat] = useState<string>("designs");

  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);
  const [showAddPkg, setShowAddPkg] = useState(false);
  const [newPkg, setNewPkg] = useState({ name: "", price: "" });

  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingCatName, setEditingCatName] = useState("");
  const [showAddCat, setShowAddCat] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  useEffect(() => {
    // Load the saved packages from the database (shared across all devices).
    fetch("/api/packages", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        if (data.content) setContent(data.content);
        if (Array.isArray(data.pkgMeta) && data.pkgMeta.length) {
          setPkgMeta(data.pkgMeta);
          setSelectedPkg(data.pkgMeta[0].id);
        }
        if (Array.isArray(data.catMeta) && data.catMeta.length) {
          setCatMeta(data.catMeta);
          setSelectedCat(data.catMeta[0].id);
        }
      })
      .catch(() => {});
  }, []);

  function login() {
    if (password === ADMIN_PASSWORD) {
      setWrongPw(false);
    } else { setWrongPw(true); }
  }

  function logout() {
    window.location.href = "/admin";
  }

  async function save() {
    try {
      const res = await fetch("/api/admin/packages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, pkgMeta, catMeta }),
      });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(payload?.error || `Save failed (HTTP ${res.status})`);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e: any) {
      alert("Could not save: " + (e?.message || "unknown error"));
    }
  }

  function reset() {
    if (!confirm("Reset everything to default? This will overwrite the live site on next save.")) return;
    setContent(defaultPackageContent);
    setPkgMeta(packages.map((p) => ({ ...p })));
    setCatMeta(defaultCategories.map((c) => ({ ...c })));
    setSelectedPkg("basic");
    setSelectedCat("designs");
  }

  // ── Package actions ──────────────────────────────────────
  function addPackage() {
    if (!newPkg.name.trim() || !newPkg.price.trim()) return;
    const id = newPkg.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    setPkgMeta((prev) => [...prev, { id, name: newPkg.name.trim(), price: newPkg.price.trim() }]);
    setContent((prev) => ({ ...prev, [id]: buildEmptyRow(catMeta.map((c) => c.id)) }));
    setSelectedPkg(id);
    setNewPkg({ name: "", price: "" });
    setShowAddPkg(false);
  }

  function deletePackage(id: string) {
    if (!confirm(`Delete "${pkgMeta.find((p) => p.id === id)?.name}" package?`)) return;
    const remaining = pkgMeta.filter((p) => p.id !== id);
    setPkgMeta(remaining);
    const updated = { ...content };
    delete updated[id];
    setContent(updated);
    setSelectedPkg(remaining[0]?.id ?? "");
  }

  function updatePkgMeta(id: string, field: "name" | "price", value: string) {
    setPkgMeta((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
  }

  // ── Category actions ─────────────────────────────────────
  function addCategory() {
    if (!newCatName.trim()) return;
    const id = newCatName.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    setCatMeta((prev) => [...prev, { id, name: newCatName.trim() }]);
    // add empty array for this category in every package
    setContent((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((pkgId) => {
        updated[pkgId] = { ...updated[pkgId], [id]: [] };
      });
      return updated;
    });
    setSelectedCat(id);
    setNewCatName("");
    setShowAddCat(false);
  }

  function deleteCategory(id: string) {
    if (!confirm(`Delete "${catMeta.find((c) => c.id === id)?.name}" category? All items inside will be lost.`)) return;
    const remaining = catMeta.filter((c) => c.id !== id);
    setCatMeta(remaining);
    setContent((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((pkgId) => {
        const pkg = { ...updated[pkgId] };
        delete pkg[id];
        updated[pkgId] = pkg;
      });
      return updated;
    });
    setSelectedCat(remaining[0]?.id ?? "");
  }

  function startEditCat(cat: CatMeta) {
    setEditingCatId(cat.id);
    setEditingCatName(cat.name);
  }

  function saveEditCat() {
    if (!editingCatId || !editingCatName.trim()) return;
    setCatMeta((prev) => prev.map((c) => c.id === editingCatId ? { ...c, name: editingCatName.trim() } : c));
    setEditingCatId(null);
  }

  // Reorder categories — the sidebar order is the order shown on the public
  // Packages page. dir -1 = up, +1 = down.
  function moveCategory(id: string, dir: -1 | 1) {
    setCatMeta((prev) => {
      const i = prev.findIndex((c) => c.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  // ── Item actions ─────────────────────────────────────────
  function updateItem(index: number, value: string) {
    const updated = { ...content };
    const items = [...(updated[selectedPkg]?.[selectedCat] ?? [])];
    items[index] = value;
    updated[selectedPkg] = { ...updated[selectedPkg], [selectedCat]: items };
    setContent(updated);
  }

  function addItem() {
    const updated = { ...content };
    const items = [...(updated[selectedPkg]?.[selectedCat] ?? []), "New item"];
    updated[selectedPkg] = { ...updated[selectedPkg], [selectedCat]: items };
    setContent(updated);
  }

  function removeItem(index: number) {
    const updated = { ...content };
    const items = [...(updated[selectedPkg]?.[selectedCat] ?? [])];
    items.splice(index, 1);
    updated[selectedPkg] = { ...updated[selectedPkg], [selectedCat]: items };
    setContent(updated);
  }

  // Copy every item (all categories) from the currently selected package into
  // all the other packages, overwriting theirs. Lets the admin fill one package
  // fully, then duplicate it and tweak the others by hand.
  function copyToAllPackages() {
    const source = content[selectedPkg];
    if (!source) return;
    const srcName = pkgMeta.find((p) => p.id === selectedPkg)?.name ?? "this package";
    const others = pkgMeta.filter((p) => p.id !== selectedPkg);
    if (!others.length) return;
    if (!confirm(`Copy ALL items from "${srcName}" into the other ${others.length} package(s)? This replaces their current items. You can still edit each one afterwards.`)) return;
    setContent((prev) => {
      const updated = { ...prev };
      others.forEach((p) => {
        const copy: Record<string, string[]> = {};
        Object.keys(source).forEach((catId) => { copy[catId] = [...source[catId]]; });
        updated[p.id] = copy;
      });
      return updated;
    });
  }

  function copyExport() {
    navigator.clipboard.writeText(JSON.stringify({ content, pkgMeta, catMeta }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  const currentItems = content[selectedPkg]?.[selectedCat] ?? [];
  const currentPkg = pkgMeta.find((p) => p.id === selectedPkg);
  const currentCat = catMeta.find((c) => c.id === selectedCat);

  if (!authed) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl border border-black/8 p-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy">
              <Lock className="h-6 w-6 text-amber" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-navy text-center">Admin Login</h1>
          <p className="text-sm text-navy/50 text-center mt-1 mb-6">One O Buildcon — Package Editor</p>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full rounded-lg border border-black/15 px-4 py-3 text-sm text-navy focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
          />
          {wrongPw && <p className="text-red-500 text-xs mt-2 text-center">Incorrect password. Try again.</p>}
          <button onClick={login} className="mt-4 w-full rounded-lg bg-navy py-3 text-sm font-semibold text-white hover:bg-navy/90 transition">
            Login
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-navy text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <div>
            <p className="text-xs text-amber-light font-semibold uppercase tracking-widest">Admin Panel</p>
            <h1 className="text-lg font-bold">Package Editor — One O Buildcon</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={save} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${saved ? "bg-green-500 text-white" : "bg-amber text-navy-dark hover:bg-amber-light"}`}>
              {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save</>}
            </button>
            <button onClick={logout} className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition">
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">

        {/* ── Packages ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy/40">Packages</p>
            <button onClick={() => setShowAddPkg(true)} className="flex items-center gap-2 rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-navy-dark hover:bg-amber-light transition">
              <Plus className="h-4 w-4" /> Add Package
            </button>
          </div>

          {showAddPkg && (
            <div className="mb-4 rounded-xl bg-white border border-amber/40 p-4 flex flex-wrap gap-4 items-end shadow-sm">
              <div>
                <p className="text-xs font-semibold text-navy/50 mb-1">Package Name</p>
                <input value={newPkg.name} onChange={(e) => setNewPkg((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. Elite"
                  className="rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber w-40" />
              </div>
              <div>
                <p className="text-xs font-semibold text-navy/50 mb-1">Price (₹/sqft)</p>
                <input value={newPkg.price} onChange={(e) => setNewPkg((p) => ({ ...p, price: e.target.value }))} placeholder="e.g. 2,799"
                  className="rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber w-32" />
              </div>
              <button onClick={addPackage} className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90 transition">Add</button>
              <button onClick={() => setShowAddPkg(false)} className="rounded-lg border border-black/15 px-4 py-2 text-sm font-medium text-navy/60 hover:bg-gray-50 transition">Cancel</button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {pkgMeta.map((pkg) => (
              <div key={pkg.id} className="relative group">
                <button
                  onClick={() => { setSelectedPkg(pkg.id); setEditingPkgId(null); }}
                  className={`w-full rounded-xl px-3 py-3 text-center transition-all border ${selectedPkg === pkg.id ? "bg-navy text-white border-navy shadow-lg" : "bg-white text-navy border-black/10 hover:border-amber/50 hover:shadow-sm"}`}
                >
                  <p className="font-bold text-sm">{pkg.name}</p>
                  <p className="text-xs mt-0.5 opacity-70">₹{pkg.price}/sqft</p>
                </button>
                <div className="absolute -top-2 -right-2 hidden group-hover:flex gap-1">
                  <button onClick={() => setEditingPkgId(editingPkgId === pkg.id ? null : pkg.id)} className="flex h-5 w-5 items-center justify-center rounded-full bg-amber shadow" title="Edit">
                    <Pencil className="h-3 w-3 text-navy-dark" />
                  </button>
                  <button onClick={() => deletePackage(pkg.id)} className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 shadow" title="Delete">
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editingPkgId && (
            <div className="mt-3 rounded-xl bg-white border border-amber/40 p-4 flex flex-wrap gap-4 items-end shadow-sm">
              <div>
                <p className="text-xs font-semibold text-navy/50 mb-1">Package Name</p>
                <input value={pkgMeta.find((p) => p.id === editingPkgId)?.name ?? ""} onChange={(e) => updatePkgMeta(editingPkgId, "name", e.target.value)}
                  className="rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber w-40" />
              </div>
              <div>
                <p className="text-xs font-semibold text-navy/50 mb-1">Price (₹/sqft)</p>
                <input value={pkgMeta.find((p) => p.id === editingPkgId)?.price ?? ""} onChange={(e) => updatePkgMeta(editingPkgId, "price", e.target.value)}
                  className="rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber w-32" placeholder="e.g. 1,549" />
              </div>
              <button onClick={() => setEditingPkgId(null)} className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90 transition">Done</button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Category sidebar ── */}
          <aside className="lg:w-60 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-navy/40">Categories</p>
              <button onClick={() => setShowAddCat(true)} className="flex items-center gap-1 rounded-lg bg-amber px-3 py-1.5 text-xs font-semibold text-navy-dark hover:bg-amber-light transition">
                <Plus className="h-3 w-3" /> Add
              </button>
            </div>

            {showAddCat && (
              <div className="mb-3 rounded-xl bg-white border border-amber/40 p-3 shadow-sm">
                <p className="text-xs font-semibold text-navy/50 mb-1">Category Name</p>
                <input
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addCategory()}
                  placeholder="e.g. Roofing"
                  className="w-full rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber mb-2"
                />
                <div className="flex gap-2">
                  <button onClick={addCategory} className="rounded-lg bg-navy px-3 py-1.5 text-xs font-semibold text-white hover:bg-navy/90 transition">Add</button>
                  <button onClick={() => setShowAddCat(false)} className="rounded-lg border border-black/15 px-3 py-1.5 text-xs font-medium text-navy/60 hover:bg-gray-50 transition">Cancel</button>
                </div>
              </div>
            )}

            <div className="rounded-xl overflow-hidden border border-black/8 bg-white shadow-sm">
              {catMeta.map((cat, idx) => (
                <div key={cat.id} className={`group flex items-center border-b border-black/5 last:border-0 transition-all ${selectedCat === cat.id ? "bg-amber" : "hover:bg-gray-50"}`}>
                  {editingCatId === cat.id ? (
                    <div className="flex flex-1 items-center gap-1 px-2 py-2">
                      <input
                        value={editingCatName}
                        onChange={(e) => setEditingCatName(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEditCat()}
                        autoFocus
                        className="flex-1 rounded border border-amber/60 px-2 py-1 text-xs text-navy focus:outline-none min-w-0"
                      />
                      <button onClick={saveEditCat} className="shrink-0 rounded bg-navy px-2 py-1 text-xs font-semibold text-white">OK</button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedCat(cat.id)}
                      className={`flex-1 text-left px-4 py-3 text-sm font-medium ${selectedCat === cat.id ? "text-navy-dark font-semibold" : "text-navy/70"}`}
                    >
                      {cat.name}
                      <span className="ml-1 text-xs opacity-50">({content[selectedPkg]?.[cat.id]?.length ?? 0})</span>
                    </button>
                  )}
                  {editingCatId !== cat.id && (
                    <div className="flex items-center gap-1 pr-2 opacity-0 group-hover:opacity-100 transition">
                      <button onClick={() => moveCategory(cat.id, -1)} disabled={idx === 0} className="rounded p-1 hover:bg-amber/20 text-navy/40 hover:text-navy disabled:opacity-20 disabled:hover:bg-transparent" title="Move up">
                        <ChevronUp className="h-3 w-3" />
                      </button>
                      <button onClick={() => moveCategory(cat.id, 1)} disabled={idx === catMeta.length - 1} className="rounded p-1 hover:bg-amber/20 text-navy/40 hover:text-navy disabled:opacity-20 disabled:hover:bg-transparent" title="Move down">
                        <ChevronDown className="h-3 w-3" />
                      </button>
                      <button onClick={() => startEditCat(cat)} className="rounded p-1 hover:bg-amber/20 text-navy/40 hover:text-navy" title="Rename">
                        <Pencil className="h-3 w-3" />
                      </button>
                      <button onClick={() => deleteCategory(cat.id)} className="rounded p-1 hover:bg-red-50 text-navy/40 hover:text-red-500" title="Delete">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* ── Item editor ── */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-navy/40">Editing</p>
                <h2 className="text-lg font-bold text-navy">
                  {currentPkg?.name ?? "—"} Package — {currentCat?.name ?? "—"}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={copyToAllPackages} title="Copy every item from this package into all the other packages" className="flex items-center gap-2 rounded-lg border border-navy/20 px-4 py-2 text-sm font-semibold text-navy hover:bg-navy/5 transition">
                  <Copy className="h-4 w-4" /> Copy to all packages
                </button>
                <button onClick={addItem} className="flex items-center gap-2 rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-navy-dark hover:bg-amber-light transition">
                  <Plus className="h-4 w-4" /> Add Item
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-black/8 shadow-sm overflow-hidden">
              {currentItems.length === 0 && (
                <p className="text-navy/40 text-sm text-center py-10">No items yet. Click &quot;Add Item&quot; to start.</p>
              )}
              {currentItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-black/5 last:border-0 group hover:bg-gray-50 transition">
                  <CheckCircle2 className="h-4 w-4 text-amber shrink-0" />
                  <input
                    value={item}
                    onChange={(e) => updateItem(i, e.target.value)}
                    className="flex-1 bg-transparent text-sm text-navy focus:outline-none focus:bg-amber/5 rounded px-1 py-0.5"
                  />
                  <button onClick={() => removeItem(i)} className="opacity-0 group-hover:opacity-100 transition rounded-md p-1 text-red-400 hover:text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="px-4 py-3 bg-gray-50 border-t border-black/5">
                <button onClick={addItem} className="flex items-center gap-2 text-sm text-navy/40 hover:text-amber transition font-medium">
                  <Plus className="h-4 w-4" /> Add another item
                </button>
              </div>
            </div>

            <p className="mt-3 text-xs text-navy/40">
              Tip: Click any item to edit. Hover to delete. Press <strong>Save</strong> to keep changes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
