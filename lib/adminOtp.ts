import crypto from 'crypto';

// In-memory OTP store: fine for a single-admin site. OTPs expire after 10 min.
type Entry = { code: string; expiresAt: number; attempts: number };
const store = new Map<string, Entry>();
const KEY = 'admin';

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function saveOtp(code: string) {
  store.set(KEY, { code, expiresAt: Date.now() + 10 * 60 * 1000, attempts: 0 });
}

export function verifyOtp(code: string): { ok: boolean; reason?: string } {
  const e = store.get(KEY);
  if (!e) return { ok: false, reason: 'No code requested. Please request a new code.' };
  if (Date.now() > e.expiresAt) { store.delete(KEY); return { ok: false, reason: 'Code expired. Request a new one.' }; }
  if (e.attempts >= 5) { store.delete(KEY); return { ok: false, reason: 'Too many attempts. Request a new code.' }; }
  e.attempts += 1;
  if (e.code !== String(code).trim()) return { ok: false, reason: 'Invalid code.' };
  store.delete(KEY);
  return { ok: true };
}

export function hashPassword(pw: string): string {
  return crypto.createHash('sha256').update(String(pw).trim()).digest('hex');
}
