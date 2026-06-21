"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Phone, Mail, MapPin, Calendar, Tag, Loader2, RefreshCw } from "lucide-react";

type Lead = { id: string; created_at: string; data: Record<string, any> };

function val(data: Record<string, any>, ...keys: string[]) {
  for (const k of keys) {
    if (data[k] !== undefined && data[k] !== null && data[k] !== "") return String(data[k]);
  }
  return "";
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/leads");
      if (!res.ok) throw new Error("Failed to load leads");
      setLeads(await res.json());
    } catch (e: any) {
      setError(e.message ?? "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
            <Users className="h-6 w-6 text-amber" /> Leads ({leads.length})
          </h1>
          <p className="text-sm text-navy/50 mt-0.5">
            Enquiries from the cost calculator and contact form.
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-xl border border-black/15 px-4 py-2 text-sm font-medium text-navy hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="flex items-center gap-2 text-navy/50 py-12 justify-center">
          <Loader2 className="h-5 w-5 animate-spin" /> Loading leads…
        </div>
      ) : leads.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/8 p-12 text-center">
          <Users className="h-12 w-12 text-navy/20 mx-auto mb-3" />
          <p className="text-navy/40 font-medium">
            No leads yet. They&apos;ll appear here when someone submits the contact form or downloads a quotation.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {leads.map((lead, i) => {
            const d = lead.data || {};
            const name = val(d, "name") || "Unknown";
            const phone = val(d, "phone");
            const email = val(d, "email");
            const source = val(d, "source");
            const location = val(d, "location");
            const message = val(d, "message");
            const pkg = val(d, "package");
            const date = val(d, "date") || new Date(lead.created_at).toLocaleString("en-IN");
            return (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="rounded-2xl bg-white border border-black/8 shadow-sm p-5 hover:shadow-md hover:border-amber/30 transition-all"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 className="font-bold text-navy text-lg">{name}</h3>
                  {source && (
                    <span className="rounded-lg bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
                      {source}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  {phone && (
                    <a
                      href={`https://wa.me/${phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-1.5 font-semibold text-green-700 hover:underline"
                    >
                      <Phone className="h-3 w-3" /> {phone}
                    </a>
                  )}
                  {email && (
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-1 rounded-lg bg-navy/5 px-3 py-1.5 font-medium text-navy/70 hover:underline"
                    >
                      <Mail className="h-3 w-3" /> {email}
                    </a>
                  )}
                  {pkg && (
                    <span className="flex items-center gap-1 rounded-lg bg-navy/5 px-3 py-1.5 font-medium text-navy/60">
                      <Tag className="h-3 w-3" /> {pkg}
                    </span>
                  )}
                  {location && (
                    <span className="flex items-center gap-1 rounded-lg bg-navy/5 px-3 py-1.5 font-medium text-navy/60">
                      <MapPin className="h-3 w-3" /> {location}
                    </span>
                  )}
                  <span className="flex items-center gap-1 rounded-lg bg-navy/5 px-3 py-1.5 font-medium text-navy/60 ml-auto">
                    <Calendar className="h-3 w-3" /> {date}
                  </span>
                </div>
                {message && <p className="mt-3 text-sm text-navy/70 whitespace-pre-wrap">{message}</p>}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
