"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Phone, Package, MapPin, Calendar, LogOut } from "lucide-react";

type Lead = {
  name: string;
  phone: string;
  package: string;
  rate: number;
  config: string;
  ground: string;
  totalArea: number;
  totalCost: number;
  gst: boolean;
  location: string;
  date: string;
};

const PASSWORD = "oneo2024";

function formatINR(num: number) {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return `₹${num.toLocaleString("en-IN")}`;
}

export default function AdminLeads() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    if (sessionStorage.getItem("oneo_admin_session") === "yes") setAuthed(true);
    const stored = localStorage.getItem("oneo_leads");
    if (stored) setLeads(JSON.parse(stored));
  }, []);

  function login() {
    if (pwd === PASSWORD) {
      sessionStorage.setItem("oneo_admin_session", "yes");
      setAuthed(true);
    } else {
      alert("Incorrect password");
    }
  }

  if (!authed) {
    return (
      <main className="min-h-screen bg-navy flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-navy mb-6">Admin — Leads</h1>
          <input type="password" value={pwd} onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            placeholder="Enter password" className="w-full rounded-xl border border-black/15 px-4 py-3 text-navy mb-4 focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20" />
          <button onClick={login} className="w-full rounded-xl bg-amber py-3 font-bold text-navy-dark">Login</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-navy px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber">Admin Panel</p>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2 mt-0.5">
            <Users className="h-5 w-5 text-amber" /> Leads ({leads.length})
          </h1>
        </div>
        <button onClick={() => { sessionStorage.removeItem("oneo_admin_session"); setAuthed(false); }}
          className="flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-white/70 hover:text-white transition text-sm">
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {leads.length === 0 ? (
          <div className="rounded-2xl bg-white border border-black/8 p-12 text-center">
            <Users className="h-12 w-12 text-navy/20 mx-auto mb-3" />
            <p className="text-navy/40 font-medium">No leads yet. Leads will appear here after someone downloads a quotation.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {[...leads].reverse().map((lead, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl bg-white border border-black/8 shadow-sm p-5 hover:shadow-md hover:border-amber/30 transition-all">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-navy text-lg">{lead.name}</h3>
                    <a href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-green-600 font-medium hover:underline mt-0.5">
                      <Phone className="h-3.5 w-3.5" /> {lead.phone}
                    </a>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-amber">{formatINR(lead.totalCost)}</p>
                    <p className="text-xs text-navy/40">{lead.gst ? "incl. GST" : "excl. GST"}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="flex items-center gap-1 rounded-lg bg-amber/10 px-3 py-1.5 font-semibold text-amber">
                    <Package className="h-3 w-3" /> {lead.package} — ₹{lead.rate}/sqft
                  </span>
                  <span className="rounded-lg bg-navy/5 px-3 py-1.5 font-medium text-navy/60">
                    {lead.config} · {lead.ground} · {lead.totalArea.toLocaleString()} sqft
                  </span>
                  {lead.location && (
                    <span className="flex items-center gap-1 rounded-lg bg-navy/5 px-3 py-1.5 font-medium text-navy/60">
                      <MapPin className="h-3 w-3" /> {lead.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1 rounded-lg bg-navy/5 px-3 py-1.5 font-medium text-navy/60 ml-auto">
                    <Calendar className="h-3 w-3" /> {lead.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
