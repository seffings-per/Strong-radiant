import { useState } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function AuthScreen() {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const googleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (e) {
      setError(e.message.replace("Firebase: ", "").replace(/\s*\(.*\)\.?/, "").trim());
      setLoading(false);
    }
  };

  const emailAuth = async () => {
    if (!email || !password) return;
    setError("");
    setLoading(true);
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (e) {
      setError(e.message.replace("Firebase: ", "").replace(/\s*\(.*\)\.?/, "").trim());
      setLoading(false);
    }
  };

  return (
    <div style={{
      height: "100dvh",
      background: "#0f0f14",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      {/* Subtle background glow */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 30% 40%, rgba(95,191,176,0.05) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(212,120,138,0.05) 0%, transparent 60%)", pointerEvents: "none" }} />

      {/* Branding */}
      <div style={{ textAlign: "center", marginBottom: "36px", position: "relative" }}>
        <div style={{ fontSize: "32px", color: "#e8d5a3", letterSpacing: "4px", textTransform: "uppercase" }}>Trine</div>
        <div style={{ fontSize: "12px", color: "#8a8799", letterSpacing: "2px", marginTop: "6px" }}>move. water. nourish.</div>
      </div>

      {/* Card */}
      <div style={{ width: "100%", maxWidth: "360px", background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "14px", padding: "24px", position: "relative" }}>

        {/* Mode toggle */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
          {[["signin", "Sign In"], ["signup", "Create Account"]].map(([id, label]) => (
            <button key={id} onClick={() => { setMode(id); setError(""); }} style={{
              flex: 1, padding: "9px", borderRadius: "8px", fontSize: "12px", cursor: "pointer",
              background: mode === id ? "rgba(200,169,110,0.1)" : "none",
              border: `1px solid ${mode === id ? "#c8a96e" : "#2a2a3a"}`,
              color: mode === id ? "#e8d5a3" : "#8a8799",
            }}>{label}</button>
          ))}
        </div>

        {/* Google */}
        <button onClick={googleSignIn} disabled={loading} style={{
          width: "100%", padding: "12px", borderRadius: "10px", marginBottom: "16px", cursor: "pointer",
          background: "rgba(255,255,255,0.04)", border: "1px solid #3a3a4a",
          color: "#e8e4dc", fontSize: "14px",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
        }}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Continue with Google
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ flex: 1, height: "1px", background: "#2a2a3a" }} />
          <span style={{ fontSize: "11px", color: "#8a8799" }}>or</span>
          <div style={{ flex: 1, height: "1px", background: "#2a2a3a" }} />
        </div>

        {/* Email / password */}
        <input
          type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: "100%", padding: "11px 14px", marginBottom: "10px", borderRadius: "8px",
            background: "#0f0f14", border: "1px solid #3a3a4a", color: "#e8d5a3",
            fontSize: "14px", outline: "none", boxSizing: "border-box",
          }}
        />
        <input
          type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && emailAuth()}
          style={{
            width: "100%", padding: "11px 14px", marginBottom: "16px", borderRadius: "8px",
            background: "#0f0f14", border: "1px solid #3a3a4a", color: "#e8d5a3",
            fontSize: "14px", outline: "none", boxSizing: "border-box",
          }}
        />

        {error && (
          <div style={{ fontSize: "12px", color: "#d4788a", marginBottom: "12px", textAlign: "center", lineHeight: "1.5" }}>
            {error}
          </div>
        )}

        <button
          onClick={emailAuth}
          disabled={loading || !email || !password}
          style={{
            width: "100%", padding: "12px", borderRadius: "10px", cursor: email && password ? "pointer" : "default",
            background: email && password ? "rgba(200,169,110,0.15)" : "rgba(200,169,110,0.04)",
            border: `1px solid ${email && password ? "#c8a96e" : "#3a3a4a"}`,
            color: email && password ? "#e8d5a3" : "#8a8799", fontSize: "14px",
          }}
        >
          {loading ? "…" : mode === "signin" ? "Sign In" : "Create Account"}
        </button>
      </div>
    </div>
  );
}
