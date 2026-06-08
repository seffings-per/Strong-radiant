import { useState } from "react";
import { phases } from "../data";

export default function PlanTab() {
  const [activePhase, setActivePhase] = useState(1);
  const [expandedDay, setExpandedDay] = useState(null);
  const phase = phases.find(p => p.id === activePhase);

  return (
    <div>
      {/* Stats */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px", flexWrap: "wrap" }}>
        {[["210 lbs","Start"],["5′9″","Height"],["−20 lbs","Goal"],["16 wks","Timeline"]].map(([val, lbl]) => (
          <div key={lbl} style={{ flex: 1, minWidth: "70px", background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "8px", padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontSize: "16px", color: "#e8d5a3", fontWeight: 600 }}>{val}</div>
            <div style={{ fontSize: "9px", color: "#8a8799", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Phase Selector */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
        {phases.map(p => (
          <button key={p.id} onClick={() => { setActivePhase(p.id); setExpandedDay(null); }} style={{
            background: activePhase === p.id ? "rgba(200,169,110,0.08)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${activePhase === p.id ? p.color + "80" : "#2a2a3a"}`,
            borderRadius: "10px", padding: "12px 16px", textAlign: "left", color: "#e8e4dc",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <div>
              <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: p.color, marginBottom: "2px" }}>{p.label} · {p.duration}</div>
              <div style={{ fontSize: "15px", color: "#e8d5a3" }}>{p.theme}</div>
              <div style={{ fontSize: "11px", color: "#8a8799", fontStyle: "italic", marginTop: "2px" }}>{p.tagline}</div>
            </div>
            {activePhase === p.id && <div style={{ color: p.color, fontSize: "20px", flexShrink: 0 }}>●</div>}
          </button>
        ))}
      </div>

      {/* Day Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
        {phase.days.map((d, i) => (
          <div key={i} onClick={() => setExpandedDay(expandedDay === i ? null : i)} style={{
            background: expandedDay === i ? "rgba(200,169,110,0.06)" : "#16161f",
            border: `1px solid ${expandedDay === i ? phase.color + "60" : "#2a2a3a"}`,
            borderRadius: "10px", padding: "14px 16px", cursor: "pointer",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>{d.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799" }}>{d.day}</div>
                <div style={{ fontSize: "14px", color: "#e8d5a3", marginTop: "2px" }}>{d.focus}</div>
              </div>
              <span style={{ color: "#8a8799", transform: expandedDay === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", fontSize: "18px" }}>›</span>
            </div>
            {expandedDay === i && (
              <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #2a2a3a", color: "#8a8799", fontSize: "13px", lineHeight: "1.7", fontStyle: "italic" }}>
                {d.detail}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: "14px 16px", background: "rgba(95,191,176,0.05)", border: "1px solid rgba(95,191,176,0.2)", borderRadius: "10px", fontSize: "13px", color: "#8a8799", lineHeight: "1.7" }}>
        <span style={{ color: "#5fbfb0", fontWeight: 600 }}>💡 Phase note: </span>{phase.note}
      </div>
    </div>
  );
}
