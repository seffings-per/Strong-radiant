import { kneeTips, safeExercises } from "../data";

export default function KneeTab() {
  return (
    <div>
      <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#d4788a", marginBottom: "12px" }}>Protecting Your Knees</div>

      <div style={{ display: "flex", flexDirection: "column", gap: "7px", marginBottom: "18px" }}>
        {kneeTips.map((tip, i) => (
          <div key={i} style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "13px 14px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: "rgba(212,120,138,0.15)", border: "1px solid rgba(212,120,138,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#d4788a", flexShrink: 0, marginTop: "1px" }}>{i + 1}</div>
            <span style={{ fontSize: "13px", color: "#8a8799", lineHeight: "1.65" }}>{tip}</span>
          </div>
        ))}
      </div>

      <div style={{ background: "#16161f", border: "1px solid rgba(155,142,196,0.3)", borderRadius: "12px", padding: "16px", marginBottom: "16px" }}>
        <div style={{ color: "#9b8ec4", fontSize: "13px", marginBottom: "12px" }}>✦ Safe Exercises for Arthritic Knees</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {safeExercises.map(ex => (
            <div key={ex} style={{ fontSize: "12px", color: "#8a8799", padding: "7px 10px", background: "rgba(155,142,196,0.05)", borderRadius: "6px", border: "1px solid rgba(155,142,196,0.1)" }}>
              ✓ {ex}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: "10px", padding: "14px 16px", fontSize: "13px", color: "#8a8799", lineHeight: "1.7" }}>
        <div style={{ color: "#c8a96e", marginBottom: "6px", fontSize: "13px" }}>When to rest vs. push through</div>
        <strong style={{ color: "#e8d5a3" }}>Sharp or stabbing pain</strong> → stop immediately. <strong style={{ color: "#e8d5a3" }}>Dull ache after a workout</strong> → normal, ice and rest. <strong style={{ color: "#e8d5a3" }}>Stiffness that warms up</strong> → keep moving gently. When in doubt, substitute rowing or upper body work and protect the joint.
      </div>
    </div>
  );
}
