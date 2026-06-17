"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Users, Lock, LogOut, Settings } from "lucide-react";

const PASSWORD = "oneo2024";

const adminLinks = [
  { href: "/admin/packages", icon: Package, label: "Manage Packages", desc: "Add, edit or delete construction packages and categories" },
  { href: "/admin/leads", icon: Users, label: "View Leads", desc: "See all verified quotation downloads with contact details" },
];

export default function AdminHome() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("oneo_admin_session") === "yes") setAuthed(true);
  }, []);

  function login() {
    if (pwd === PASSWORD) {
      sessionStorage.setItem("oneo_admin_session", "yes");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-navy flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
          <div className="rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="bg-navy border-b border-white/10 px-8 py-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber/20 mx-auto mb-3">
                <Lock className="h-6 w-6 text-amber" />
              </div>
              <h1 className="text-xl font-bold text-white">One O Buildcon</h1>
              <p className="text-white/50 text-sm mt-1">Admin Panel</p>
            </div>
            <div className="px-8 py-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-navy/40 mb-1.5">Password</label>
                <input
                  type="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && login()}
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-black/15 px-4 py-3 text-navy font-medium focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
                />
              </div>
              {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={login}
                className="w-full rounded-xl bg-amber py-3 font-bold text-navy-dark hover:bg-amber/90 transition"
              >
                Login →
              </motion.button>
            </div>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-navy px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber">One O Buildcon</p>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2 mt-0.5">
            <Settings className="h-5 w-5 text-amber" /> Admin Panel
          </h1>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem("oneo_admin_session"); setAuthed(false); }}
          className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-white/70 hover:text-white transition text-sm"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {adminLinks.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.href} whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Link href={item.href} className="block rounded-2xl bg-white border border-black/8 shadow-sm hover:shadow-lg hover:border-amber/40 transition-all p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber/10 mb-4">
                    <Icon className="h-6 w-6 text-amber" />
                  </div>
                  <h2 className="font-bold text-navy text-lg">{item.label}</h2>
                  <p className="text-navy/50 text-sm mt-1">{item.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
