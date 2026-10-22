// Cognito Hosted UI login (authorization code + PKCE). Tokens live in localStorage.
const DOMAIN = import.meta.env.VITE_COGNITO_DOMAIN ?? "";
const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID ?? "";
const KEY = "ibby-bio-game:auth";
const VERIFIER = "ibby-bio-game:pkce";

export interface AuthTokens { id_token: string; access_token: string; refresh_token?: string; expires_at: number; }

export const authEnabled = () => Boolean(DOMAIN && CLIENT_ID);
const redirectUri = () => `${window.location.origin}/`;

function b64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = ""; bytes.forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function login(signup = false): Promise<void> {
  const verifier = b64url(crypto.getRandomValues(new Uint8Array(32)));
  sessionStorage.setItem(VERIFIER, verifier);
  const challenge = b64url(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier)));
  const p = new URLSearchParams({ client_id: CLIENT_ID, response_type: "code", scope: "openid email", redirect_uri: redirectUri(), code_challenge_method: "S256", code_challenge: challenge });
  window.location.assign(`${DOMAIN}/${signup ? "signup" : "oauth2/authorize"}?${p}`);
}

export function logout(): void {
  localStorage.removeItem(KEY);
  const p = new URLSearchParams({ client_id: CLIENT_ID, logout_uri: redirectUri() });
  window.location.assign(`${DOMAIN}/logout?${p}`);
}

async function tokenRequest(body: Record<string, string>): Promise<AuthTokens> {
  const r = await fetch(`${DOMAIN}/oauth2/token`, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ client_id: CLIENT_ID, ...body }) });
  if (!r.ok) throw new Error(`token ${r.status}`);
  const j = await r.json();
  const t: AuthTokens = { id_token: j.id_token, access_token: j.access_token, refresh_token: j.refresh_token ?? body.refresh_token, expires_at: Date.now() + j.expires_in * 1000 };
  localStorage.setItem(KEY, JSON.stringify(t));
  return t;
}

/** Call once at startup: completes the redirect from the hosted UI if ?code= is present. */
export async function handleRedirect(): Promise<void> {
  if (!authEnabled()) return;
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const verifier = sessionStorage.getItem(VERIFIER);
  if (!code || !verifier) return;
  sessionStorage.removeItem(VERIFIER);
  url.searchParams.delete("code"); url.searchParams.delete("state");
  window.history.replaceState({}, "", url.pathname + url.search);
  await tokenRequest({ grant_type: "authorization_code", code, redirect_uri: redirectUri(), code_verifier: verifier });
}

export async function getIdToken(): Promise<string | null> {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  let t = JSON.parse(raw) as AuthTokens;
  if (Date.now() > t.expires_at - 60_000) {
    if (!t.refresh_token) return null;
    try { t = await tokenRequest({ grant_type: "refresh_token", refresh_token: t.refresh_token }); } catch { localStorage.removeItem(KEY); return null; }
  }
  return t.id_token;
}

export function currentEmail(): string | null {
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(atob((JSON.parse(raw) as AuthTokens).id_token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))).email ?? null; } catch { return null; }
}
