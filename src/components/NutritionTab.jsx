const tips = [
  { icon: "🥚", text: "Front-load protein — aim for 35–40g at breakfast to reduce cravings all day" },
  { icon: "💧", text: "Drink 80–100 oz of water daily — dehydration mimics hunger and worsens joint pain" },
  { icon: "🥗", text: "Fill half your plate with vegetables at lunch and dinner — volume without calories" },
  { icon: "🫐", text: "Anti-inflammatory foods help arthritis: berries, fatty fish, olive oil, leafy greens, walnuts" },
  { icon: "⏰", text: "Eat within 30–60 min after strength sessions to support muscle recovery" },
  { icon: "🚫", text: "Minimize ultra-processed foods and alcohol — both drive inflammation and stall fat loss" },
];

export default function NutritionTab() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
        {[
          { label: "Daily Calories", value: "1,700–1,900", note: "Moderate deficit from ~2,400 TDEE for ~0.75–1 lb/week loss", color: "#d4788a", icon: "🔥" },
          { label: "Daily Protein", value: "130–155g", note: "~0.7g per lb of goal weight — preserves muscle while losing fat", color: "#5fbfb0", icon: "💪" },
        ].map(n => (
          <div key={n.label} style={{ background: "#16161f", border: `1px solid ${n.color}40`, borderRadius: "12px", padding: "18px 14px" }}>
            <div style={{ fontSize: "20px", marginBottom: "8px" }}>{n.icon}</div>
            <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "6px" }}>{n.label}</div>
            <div style={{ fontSize: "22px", color: n.color, fontWeight: 600, marginBottom: "8px" }}>{n.value}</div>
            <div style={{ fontSize: "11px", color: "#8a8799", lineHeight: "1.6", fontStyle: "italic" }}>{n.note}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#c8a96e", marginBottom: "10px" }}>Daily Habits</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "16px" }}>
        {tips.map((t, i) => (
          <div key={i} style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "12px 14px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "16px", flexShrink: 0 }}>{t.icon}</span>
            <span style={{ fontSize: "13px", color: "#8a8799", lineHeight: "1.6" }}>{t.text}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: "16px", background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: "10px", fontSize: "13px", color: "#8a8799", lineHeight: "1.8" }}>
        <div style={{ color: "#c8a96e", fontSize: "13px", marginBottom: "8px" }}>The math</div>
        At 5′9″ and 210 lbs your estimated TDEE is ~2,350–2,450 cal/day. Eating 1,700–1,900 creates a ~500–700 cal daily deficit — roughly <strong style={{ color: "#e8d5a3" }}>0.75–1 lb/week</strong> of fat loss without triggering starvation mode. Combined with strength training, you preserve muscle, which keeps metabolism elevated. Do not go below 1,600 calories on workout days.
      </div>
    </div>
  );
}
