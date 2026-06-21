"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

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
              <label className="block text-xs font-semibold uppercase tracking-widest text-navy/40 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  name="admin-passcode"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && login()}
                  placeholder="Enter admin password"
                  className="w-full rounded-xl border border-black/15 px-4 py-3 pr-12 text-navy font-medium focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-navy/40 hover:text-navy"
                >
                  {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={login}
              disabled={loading}
              className="w-full rounded-xl bg-amber py-3 font-bold text-navy-dark hover:bg-amber-light transition disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Login →"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
