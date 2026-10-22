import { useState } from "react";
import { authEnabled, currentEmail, login, logout } from "./auth";

/** Small fixed bar: sign in / sign up, or the signed-in email + sign out. */
export default function AuthBar() {
  const [email] = useState(currentEmail());
  if (!authEnabled()) return null;
  const s: React.CSSProperties = { position: "fixed", top: 8, right: 8, zIndex: 1000, fontSize: 13, display: "flex", gap: 6, alignItems: "center", background: "rgba(255,255,255,.9)", padding: "4px 8px", borderRadius: 8 };
  return email ? (
    <div style={s}><span>{email}</span><button onClick={logout}>Salir</button></div>
  ) : (
    <div style={s}><button onClick={() => login(false)}>Entrar</button><button onClick={() => login(true)}>Crear cuenta</button></div>
  );
}
