const tabs = [
  { id: "plan", icon: "🗓", label: "Plan" },
  { id: "nutrition", icon: "🔥", label: "Nutrition" },
  { id: "meals", icon: "🍽", label: "Meals" },
  { id: "log", icon: "✅", label: "Log" },
  { id: "progress", icon: "📈", label: "Progress" },
];

export default function NavBar({ activeTab, setActiveTab }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: "#16161f", borderTop: "1px solid #2a2a3a",
      display: "flex", paddingBottom: "env(safe-area-inset-bottom)", zIndex: 100,
      overflowX: "auto", scrollbarWidth: "none",
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
          flex: "0 0 auto", minWidth: "52px",
          background: "none", border: "none", padding: "10px 6px 8px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "3px",
          color: activeTab === t.id ? "#c8a96e" : "#8a8799",
          borderTop: activeTab === t.id ? "2px solid #c8a96e" : "2px solid transparent",
          transition: "color 0.15s",
        }}>
          <span style={{ fontSize: "17px" }}>{t.icon}</span>
          <span style={{ fontSize: "8px", letterSpacing: "0.3px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}
