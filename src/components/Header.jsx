export default function Header({ user, onSignOut }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0f0f14 0%, #1a1625 60%, #0f1419 100%)",
      borderBottom: "1px solid #2a2a3a",
      padding: "16px 20px 14px",
      textAlign: "center",
      position: "relative",
      flexShrink: 0,
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 50%, rgba(95,191,176,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(212,120,138,0.07) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ fontSize: "22px", color: "#e8d5a3", letterSpacing: "3px", textTransform: "uppercase" }}>Trine</div>
      <div style={{ fontSize: "11px", color: "#8a8799", letterSpacing: "2px", marginTop: "4px" }}>move. water. nourish.</div>

      {/* User avatar + sign out */}
      {user && onSignOut && (
        <button onClick={onSignOut} title="Sign out" style={{
          position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
          background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
        }}>
          {user.photoURL ? (
            <img src={user.photoURL} alt="" style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #3a3a4a" }} />
          ) : (
            <div style={{
              width: "28px", height: "28px", borderRadius: "50%",
              background: "#2a2a3a", border: "1.5px solid #3a3a4a",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "12px", color: "#c8a96e",
            }}>
              {user.email?.[0]?.toUpperCase() ?? "?"}
            </div>
          )}
          <span style={{ fontSize: "8px", color: "#4a4a5a", letterSpacing: "0.5px" }}>sign out</span>
        </button>
      )}
    </div>
  );
}
