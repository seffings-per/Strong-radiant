import { useProfile, calcNutrition } from "../useProfile";

const GOAL_TIPS = {
  lose:     "cutting calories below your maintenance level to burn stored fat",
  maintain: "eating at your maintenance level to keep your current weight stable",
  gain:     "eating above your maintenance level to support muscle and weight gain",
};

const tips = [
  { icon: "🥚", text: "Front-load protein — aim for 35–40g at breakfast to reduce cravings all day" },
  { icon: "💧", text: "Drink 80–100 oz of water daily — dehydration mimics hunger and worsens joint pain" },
  { icon: "🥗", text: "Fill half your plate with vegetables at lunch and dinner — volume without calories" },
  { icon: "🫐", text: "Anti-inflammatory foods help arthritis: berries, fatty fish, olive oil, and leafy greens" },
  { icon: "⏰", text: "Eat within 30–60 min after strength sessions to support muscle recovery" },
  { icon: "🚫", text: "Minimize ultra-processed foods and alcohol — both drive inflammation and stall progress" },
];

const GOAL_COLORS = { lose: "#5fbfb0", maintain: "#c8a96e", gain: "#9b8ec4" };

export default function NutritionTab() {
  const { profile, loading } = useProfile();

  if (loading || !profile) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
        <div style={{ color: "#c8a96e", fontSize: "11px", letterSpacing: "2px" }}>LOADING…</div>
      </div>
    );
  }

  const { tdee, calRange, proteinRange, calMin, calMax, proteinMin, outcome, heightStr } = calcNutrition(profile);
  const goalColor = GOAL_COLORS[profile.goal] || "#c8a96e";
  const goalLabel = profile.goal === "lose" ? "Lose Weight" : profile.goal === "gain" ? "Gain Weight" : "Maintain Weight";

  return (
    <div>
      {/* ── Goal banner ── */}
      <div style={{ background: `${goalColor}10`, border: `1px solid ${goalColor}40`, borderRadius: "10px", padding: "11px 16px", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "12px", color: goalColor, letterSpacing: "0.5px" }}>🎯 Goal: <strong>{goalLabel}</strong></div>
        <div style={{ fontSize: "11px", color: "#8a8799" }}>{outcome}</div>
      </div>

      {/* ── Calorie + Protein cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
        {[
          {
            label: "Daily Calories",
            value: calRange,
            note: `~${(calMin + calMax) / 2 | 0} cal/day target for ${outcome}`,
            color: "#d4788a",
            icon: "🔥",
          },
          {
            label: "Daily Protein",
            value: proteinRange,
            note: `~0.7–0.75g per lb — preserves muscle while ${profile.goal === "gain" ? "building" : "losing fat"}`,
            color: "#5fbfb0",
            icon: "💪",
          },
        ].map(n => (
          <div key={n.label} style={{ background: "#16161f", border: `1px solid ${n.color}40`, borderRadius: "12px", padding: "18px 14px" }}>
            <div style={{ fontSize: "20px", marginBottom: "8px" }}>{n.icon}</div>
            <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "6px" }}>{n.label}</div>
            <div style={{ fontSize: "20px", color: n.color, fontWeight: 600, marginBottom: "8px" }}>{n.value}</div>
            <div style={{ fontSize: "11px", color: "#8a8799", lineHeight: "1.6", fontStyle: "italic" }}>{n.note}</div>
          </div>
        ))}
      </div>

      {/* ── Daily habits ── */}
      <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#c8a96e", marginBottom: "10px" }}>Daily Habits</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "16px" }}>
        {tips.map((t, i) => (
          <div key={i} style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "12px 14px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <span style={{ fontSize: "16px", flexShrink: 0 }}>{t.icon}</span>
            <span style={{ fontSize: "13px", color: "#8a8799", lineHeight: "1.6" }}>{t.text}</span>
          </div>
        ))}
      </div>

      {/* ── The math ── */}
      <div style={{ padding: "16px", background: `${goalColor}06`, border: `1px solid ${goalColor}20`, borderRadius: "10px", fontSize: "13px", color: "#8a8799", lineHeight: "1.8" }}>
        <div style={{ color: goalColor, fontSize: "13px", marginBottom: "8px" }}>The math</div>
        At <strong style={{ color: "#e8d5a3" }}>{heightStr}</strong> and <strong style={{ color: "#e8d5a3" }}>{profile.weight} lbs</strong>, your estimated TDEE is <strong style={{ color: "#e8d5a3" }}>~{tdee.toLocaleString()} cal/day</strong>. You are {GOAL_TIPS[profile.goal]}. Eating <strong style={{ color: "#e8d5a3" }}>{calRange} calories</strong> targets <strong style={{ color: goalColor }}>{outcome}</strong>. Hit your protein target of <strong style={{ color: "#e8d5a3" }}>{proteinRange}</strong> every day — it's the most important number on this page{profile.goal === "lose" ? ", especially while cutting" : ""}.
      </div>
    </div>
  );
}
