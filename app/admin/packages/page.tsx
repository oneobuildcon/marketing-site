"use client";

import { useState, useEffect } from "react";
import {
  packages,
  categories,
  defaultPackageContent,
  PackageContent,
  PackageId,
  CategoryId,
} from "@/data/packagesData";
import { Lock, Save, RotateCcw, Plus, Trash2, Copy, CheckCircle2, LogOut, Pencil } from "lucide-react";

const ADMIN_PASSWORD = "oneo2024";
const STORAGE_KEY = "oneo_packages_content";
const SESSION_KEY = "oneo_admin_session";

export default function AdminPackages() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [wrongPw, setWrongPw] = useState(false);
  const [content, setContent] = useState<PackageContent>(defaultPackageContent);
  const [selectedPkg, setSelectedPkg] = useState<PackageId>("basic");
  const [selectedCat, setSelectedCat] = useState<CategoryId>("designs");
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [editingPkg, setEditingPkg] = useState<{ id: PackageId; field: "name" | "price" } | null>(null);
  const [pkgMeta, setPkgMeta] = useState(packages.map((p) => ({ ...p })));

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setContent(JSON.parse(stored)); } catch { /* ignore */ }
    }
    const storedMeta = localStorage.getItem("oneo_packages_meta");
    if (storedMeta) {
      try { setPkgMeta(JSON.parse(storedMeta)); } catch { /* ignore */ }
    }
  }, []);

  function login() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setWrongPw(false);
    } else {
      setWrongPw(true);
    }
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPassword("");
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    localStorage.setItem("oneo_packages_meta", JSON.stringify(pkgMeta));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function reset() {
    if (!confirm("Reset all changes to default? This cannot be undone.")) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("oneo_packages_meta");
    setContent(defaultPackageContent);
    setPkgMeta(packages.map((p) => ({ ...p })));
  }

  function updateItem(index: number, value: string) {
    const updated = { ...content };
    const items = [...updated[selectedPkg][selectedCat]];
    items[index] = value;
    updated[selectedPkg] = { ...updated[selectedPkg], [selectedCat]: items };
    setContent(updated);
  }

  function addItem() {
    const updated = { ...content };
    const items = [...updated[selectedPkg][selectedCat], "New item"];
    updated[selectedPkg] = { ...updated[selectedPkg], [selectedCat]: items };
    setContent(updated);
  }

  function removeItem(index: number) {
    const updated = { ...content };
    const items = [...updated[selectedPkg][selectedCat]];
    items.splice(index, 1);
    updated[selectedPkg] = { ...updated[selectedPkg], [selectedCat]: items };
    setContent(updated);
  }

  function copyExport() {
    const exportData = JSON.stringify({ content, pkgMeta }, null, 2);
    navigator.clipboard.writeText(exportData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  function updatePkgMeta(id: PackageId, field: "name" | "price", value: string) {
    setPkgMeta((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
  }

  const currentItems = content[selectedPkg][selectedCat];
  const currentPkg = pkgMeta.find((p) => p.id === selectedPkg)!;

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
          <button
            onClick={login}
            className="mt-4 w-full rounded-lg bg-navy py-3 text-sm font-semibold text-white hover:bg-navy/90 transition"
          >
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
            <button
              onClick={() => setShowExport(!showExport)}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
            >
              <Copy className="h-4 w-4" /> Export
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10 transition"
            >
              <RotateCcw className="h-4 w-4" /> Reset
            </button>
            <button
              onClick={save}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${saved ? "bg-green-500 text-white" : "bg-amber text-navy-dark hover:bg-amber-light"}`}
            >
              {saved ? <><CheckCircle2 className="h-4 w-4" /> Saved!</> : <><Save className="h-4 w-4" /> Save</>}
            </button>
            <button onClick={logout} className="flex items-center gap-1 text-white/50 hover:text-white transition text-sm">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Export panel */}
      {showExport && (
        <div className="bg-navy-dark border-b border-white/10 px-6 py-4">
          <div className="mx-auto max-w-7xl">
            <p className="text-white/80 text-sm mb-2 font-medium">Copy the JSON below and send it to your developer to apply changes to the live site permanently:</p>
            <div className="relative">
              <pre className="bg-black/40 text-green-400 text-xs rounded-lg p-4 overflow-auto max-h-40 font-mono">
                {JSON.stringify({ content, pkgMeta }, null, 2)}
              </pre>
              <button
                onClick={copyExport}
                className={`absolute top-2 right-2 rounded-md px-3 py-1 text-xs font-semibold transition ${copied ? "bg-green-500 text-white" : "bg-amber text-navy-dark hover:bg-amber-light"}`}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Package selector */}
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-navy/40 mb-3">Select Package to Edit</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {pkgMeta.map((pkg) => (
              <div key={pkg.id} className="relative group">
                <button
                  onClick={() => setSelectedPkg(pkg.id as PackageId)}
                  className={`w-full rounded-xl px-3 py-3 text-center transition-all border ${
                    selectedPkg === pkg.id
                      ? "bg-navy text-white border-navy shadow-lg"
                      : "bg-white text-navy border-black/10 hover:border-amber/50 hover:shadow-sm"
                  }`}
                >
                  <p className="font-bold text-sm">{pkg.name}</p>
                  <p className="text-xs mt-0.5 opacity-70">₹{pkg.price}/sqft</p>
                </button>
                <button
                  onClick={() => setEditingPkg({ id: pkg.id as PackageId, field: "name" })}
                  className="absolute -top-1.5 -right-1.5 hidden group-hover:flex h-5 w-5 items-center justify-center rounded-full bg-amber shadow"
                >
                  <Pencil className="h-3 w-3 text-navy-dark" />
                </button>
              </div>
            ))}
          </div>

          {/* Inline package meta editor */}
          {editingPkg && (
            <div className="mt-3 rounded-xl bg-white border border-amber/40 p-4 flex flex-wrap gap-4 items-end shadow-sm">
              <div>
                <p className="text-xs font-semibold text-navy/50 mb-1">Package Name</p>
                <input
                  value={pkgMeta.find((p) => p.id === editingPkg.id)?.name ?? ""}
                  onChange={(e) => updatePkgMeta(editingPkg.id, "name", e.target.value)}
                  className="rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber w-40"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-navy/50 mb-1">Price (₹/sqft)</p>
                <input
                  value={pkgMeta.find((p) => p.id === editingPkg.id)?.price ?? ""}
                  onChange={(e) => updatePkgMeta(editingPkg.id, "price", e.target.value)}
                  className="rounded-lg border border-black/15 px-3 py-2 text-sm text-navy focus:outline-none focus:border-amber w-32"
                  placeholder="e.g. 1,549"
                />
              </div>
              <button
                onClick={() => setEditingPkg(null)}
                className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy/90 transition"
              >
                Done
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category sidebar */}
          <aside className="lg:w-56 shrink-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-navy/40 mb-3">Category</p>
            <div className="rounded-xl overflow-hidden border border-black/8 bg-white shadow-sm">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCat(cat.id as CategoryId)}
                  className={`w-full text-left px-4 py-3 text-sm font-medium border-b border-black/5 last:border-0 transition-all ${
                    selectedCat === cat.id
                      ? "bg-amber text-navy-dark font-semibold"
                      : "text-navy/70 hover:bg-gray-50"
                  }`}
                >
                  {cat.name}
                  <span className="ml-1 text-xs opacity-50">({content[selectedPkg][cat.id as CategoryId].length})</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Item editor */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-navy/40">Editing</p>
                <h2 className="text-lg font-bold text-navy">
                  {currentPkg.name} Package — {categories.find((c) => c.id === selectedCat)?.name}
                </h2>
              </div>
              <button
                onClick={addItem}
                className="flex items-center gap-2 rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-navy-dark hover:bg-amber-light transition"
              >
                <Plus className="h-4 w-4" /> Add Item
              </button>
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
                  <button
                    onClick={() => removeItem(i)}
                    className="opacity-0 group-hover:opacity-100 transition rounded-md p-1 text-red-400 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <div className="px-4 py-3 bg-gray-50 border-t border-black/5">
                <button
                  onClick={addItem}
                  className="flex items-center gap-2 text-sm text-navy/40 hover:text-amber transition font-medium"
                >
                  <Plus className="h-4 w-4" /> Add another item
                </button>
              </div>
            </div>

            <p className="mt-3 text-xs text-navy/40">
              Tip: Click on any item text to edit it directly. Hover to reveal the delete button. Press <strong>Save</strong> to keep your changes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
