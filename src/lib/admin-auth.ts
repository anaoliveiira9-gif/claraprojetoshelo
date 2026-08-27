/**
 * Minimal, dependency-free admin auth: a single shared password (env var)
 * plus an HMAC-signed, expiring session cookie. No database, no user
 * accounts — this gate is for one owner, not a multi-user system.
 *
 * Edge-compatible on purpose (uses Web Crypto + btoa, not Node's `crypto`
 * or `Buffer`) so it works both in `middleware.ts` (edge runtime) and in
 * server actions (node runtime).
 *
 * Required environment variables (set in Vercel project settings, never
 * committed): `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` (any long random
 * string, unrelated to the password). Until both are set, the panel stays
 * fully locked — it fails closed, never open.
 */

export const ADMIN_SESSION_COOKIE = "alumna_admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 12; // 12h

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SESSION_SECRET);
}

function toBase64Url(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes);
  let str = "";
  for (const b of arr) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(message: string): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return toBase64Url(sig);
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/** `expiry.signature` — opaque, verifiable without any server-side store. */
export async function createSessionToken(): Promise<string> {
  const expiry = Date.now() + ADMIN_SESSION_TTL_SECONDS * 1000;
  const signature = await sign(String(expiry));
  return `${expiry}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token || !isAdminConfigured()) return false;
  const [expiryStr, signature] = token.split(".");
  if (!expiryStr || !signature) return false;
  const expiry = Number(expiryStr);
  if (!Number.isFinite(expiry) || expiry < Date.now()) return false;
  const expected = await sign(expiryStr);
  return timingSafeEqual(signature, expected);
}
