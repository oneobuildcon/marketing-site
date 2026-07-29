"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";

type Mode = "login" | "request" | "reset";

export default function AdminLogin() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [pwd, setPwd] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  async function login() {
    setLoading(true); setError(""); setInfo("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      if (res.ok) { router.push("/admin"); router.refresh(); }
      else setError("Incorrect password");
    } catch { setError("Something went wrong. Try again."); }
    finally { setLoading(false); }
  }

  async function requestOtp() {
    setLoading(true); setError(""); setInfo("");
    try {
      const res = await fetch("/api/admin/forgot", { method: "POST" });
      const d = await res.json();
      if (res.ok) { setInfo(`Code sent to ${d.sentTo || "your email"}. Check inbox (and spam).`); setMode("reset"); }
      else setError(d.error || "Could not send code.");
    } catch { setError("Something went wrong. Try again."); }
    finally { setLoading(false); }
  }

  async function reset() {
    setLoading(true); setError(""); setInfo("");
    if (newPwd.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
    if (newPwd !== confirmPwd) { setError("Passwords don't match."); setLoading(false); return; }
    try {
      const res = await fetch("/api/admin/reset", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: otp, newPassword: newPwd }),
      });
      const d = await res.json();
      if (res.ok) {
        setInfo("Password updated! You can log in now.");
        setMode("login"); setPwd(newPwd); setOtp(""); setNewPwd(""); setConfirmPwd("");
      } else setError(d.error || "Could not reset password.");
    } catch { setError("Something went wrong. Try again."); }
    finally { setLoading(false); }
  }

  const inputCls = "w-full rounded-xl border border-black/15 px-4 py-3 text-navy font-medium focus:outline-none focus:border-amber focus:ring-2 focus:ring-amber/20";
  const labelCls = "block text-xs font-semibold uppercase tracking-widest text-navy/40 mb-1.5";

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="rounded-2xl bg-white shadow-2xl overflow-hidden">
          <div className="bg-navy border-b border-white/10 px-8 py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber/20 mx-auto mb-3"><Lock className="h-6 w-6 text-amber" /></div>
            <h1 className="text-xl font-bold text-white">One O Buildcon</h1>
            <p className="text-white/50 text-sm mt-1">{mode === "login" ? "Admin Panel" : "Password Reset"}</p>
          </div>
          <div className="px-8 py-6 space-y-4">
            {mode === "login" && (
              <>
                <div>
                  <label className={labelCls}>Password</label>
                  <div className="relative">
                    <input type={show ? "text" : "password"} name="admin-passcode" autoComplete="new-password" value={pwd}
                      onChange={(e) => setPwd(e.target.value)} onKeyDown={(e) => e.key === "Enter" && login()}
                      placeholder="Enter admin password" className={`${inputCls} pr-12`} />
                    <button type="button" onClick={() => setShow((s) => !s)} className="absolute inset-y-0 right-0 flex items-center px-3 text-navy/40 hover:text-navy">
                      {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                {info && <p className="text-green-600 text-xs font-medium">{info}</p>}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={login} disabled={loading}
                  className="w-full rounded-xl bg-amber py-3 font-bold text-navy-dark hover:bg-amber-light transition disabled:opacity-60">
                  {loading ? "Signing in…" : "Login →"}
                </motion.button>
                <button onClick={() => { setMode("request"); setError(""); setInfo(""); }} className="w-full text-center text-xs font-medium text-navy/60 hover:text-amber transition">
                  Forgot password?
                </button>
              </>
            )}

            {mode === "request" && (
              <>
                <p className="text-sm text-navy/70">Send a one-time code to your registered email (oneobuildcon@gmail.com).</p>
                {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={requestOtp} disabled={loading}
                  className="w-full rounded-xl bg-amber py-3 font-bold text-navy-dark hover:bg-amber-light transition disabled:opacity-60">
                  {loading ? "Sending…" : "Send OTP →"}
                </motion.button>
                <button onClick={() => { setMode("login"); setError(""); setInfo(""); }} className="w-full text-center text-xs font-medium text-navy/60 hover:text-amber transition">
                  ← Back to login
                </button>
              </>
            )}

            {mode === "reset" && (
              <>
                {info && <p className="text-green-600 text-xs font-medium">{info}</p>}
                <div>
                  <label className={labelCls}>OTP Code</label>
                  <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="6-digit code" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>New Password</label>
                  <input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} placeholder="Min 6 chars" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Confirm Password</label>
                  <input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} onKeyDown={(e) => e.key === "Enter" && reset()} className={inputCls} />
                </div>
                {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={reset} disabled={loading}
                  className="w-full rounded-xl bg-amber py-3 font-bold text-navy-dark hover:bg-amber-light transition disabled:opacity-60">
                  {loading ? "Resetting…" : "Reset Password →"}
                </motion.button>
                <button onClick={() => { setMode("login"); setError(""); setInfo(""); }} className="w-full text-center text-xs font-medium text-navy/60 hover:text-amber transition">
                  ← Back to login
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}
