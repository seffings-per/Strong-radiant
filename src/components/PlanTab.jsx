import { useState } from "react";
import { phases } from "../data";
import { exercises as exerciseLib } from "../exerciseLibrary";
import { useProfile, calcNutrition } from "../useProfile";

const GOALS = [
  { id: "lose",     label: "Lose",     color: "#5fbfb0" },
  { id: "maintain", label: "Maintain", color: "#c8a96e" },
  { id: "gain",     label: "Gain",     color: "#9b8ec4" },
];

function ExerciseCard({ exKey }) {
  const ex = exerciseLib[exKey];
  if (!ex) return null;
  return (
    <div style={{ background: "#0f0f14", border: `1px solid ${ex.muscleColor}30`, borderRadius: "10px", padding: "14px", marginTop: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <span style={{ fontSize: "22px" }}>{ex.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "14px", color: "#e8d5a3", fontWeight: 600 }}>{ex.name}</div>
          <div style={{ fontSize: "11px", color: ex.muscleColor, marginTop: "1px" }}>{ex.muscles}</div>
        </div>
        {ex.equipment && (
          <div style={{ fontSize: "10px", color: "#8a8799", background: "rgba(255,255,255,0.04)", border: "1px solid #2a2a3a", borderRadius: "6px", padding: "3px 8px", whiteSpace: "nowrap", flexShrink: 0 }}>
            {ex.equipment}
          </div>
        )}
      </div>
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#8a8799", marginBottom: "7px" }}>How to do it</div>
        {ex.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
            <div style={{ width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0, background: `${ex.muscleColor}20`, border: `1px solid ${ex.muscleColor}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", color: ex.muscleColor, fontWeight: 700 }}>{i + 1}</div>
            <span style={{ fontSize: "12px", color: "#8a8799", lineHeight: "1.65", paddingTop: "1px" }}>{step}</span>
          </div>
        ))}
      </div>
      <div style={{ background: `${ex.muscleColor}08`, border: `1px solid ${ex.muscleColor}20`, borderRadius: "8px", padding: "10px 12px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: ex.muscleColor, marginBottom: "7px" }}>Form cues</div>
        {ex.cues.map((cue, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: i < ex.cues.length - 1 ? "5px" : 0 }}>
            <span style={{ color: ex.muscleColor, fontSize: "10px", marginTop: "2px", flexShrink: 0 }}>◆</span>
            <span style={{ fontSize: "12px", color: "#8a8799", lineHeight: "1.6" }}>{cue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExerciseChip({ exKey, isOpen, onToggle }) {
  const ex = exerciseLib[exKey];
  if (!ex) return null;
  return (
    <div>
      <button onClick={onToggle} style={{
        width: "100%", background: isOpen ? `${ex.muscleColor}12` : "rgba(255,255,255,0.03)",
        border: `1px solid ${isOpen ? ex.muscleColor + "50" : "#2a2a3a"}`,
        borderRadius: "8px", padding: "9px 12px",
        display: "flex", alignItems: "center", gap: "10px",
        color: isOpen ? "#e8d5a3" : "#8a8799", textAlign: "left", cursor: "pointer", transition: "all 0.15s",
      }}>
        <span style={{ fontSize: "16px" }}>{ex.icon}</span>
        <span style={{ flex: 1, fontSize: "13px" }}>{ex.name}</span>
        <span style={{ fontSize: "10px", color: isOpen ? ex.muscleColor : "#4a4a5a" }}>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && <ExerciseCard exKey={exKey} />}
    </div>
  );
}

export default function PlanTab() {
  const { profile, loading, saveProfile } = useProfile();
  const [activePhase, setActivePhase] = useState(1);
  const [expandedDay, setExpandedDay] = useState(null);
  const [expandedEx, setExpandedEx] = useState(null);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  const phase = phases.find(p => p.id === activePhase);

  const startEdit = () => {
    setDraft({ ...profile });
    setEditing(true);
  };

  const saveEdit = () => {
    if (!draft) return;
    saveProfile({
      ...draft,
      weight: parseFloat(draft.weight) || null,
      heightFt: parseInt(draft.heightFt) ?? null,
      heightIn: parseInt(draft.heightIn) ?? null,
      age: parseInt(draft.age) || null,
      confirmed: !!(draft.weight && draft.heightFt != null && draft.age),
    });
    setEditing(false);
  };

  const goalObj = GOALS.find(g => g.id === profile.goal) || GOALS[0];

  return (
    <div>
      {/* ── Profile stats ── */}
      <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px", marginBottom: "14px" }}>
        {!editing ? (
          <>
            {/* Prompt banner when not yet confirmed */}
            {!profile.confirmed && (
              <button onClick={startEdit} style={{
                width: "100%", background: "rgba(200,169,110,0.08)", border: "1px dashed #c8a96e80",
                borderRadius: "8px", padding: "10px 14px", marginBottom: "12px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: "12px", color: "#c8a96e" }}>👆 Tap to enter your stats</span>
                <span style={{ fontSize: "11px", color: "#8a8799" }}>personalizes your nutrition</span>
              </button>
            )}

            {/* Stats row */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              {[
                { val: "16 wks", lbl: "Timeline", set: true },
                { val: profile.weight ? `${profile.weight} lbs` : "add weight", lbl: "Weight", set: !!profile.weight },
                { val: profile.heightFt != null ? `${profile.heightFt}′${profile.heightIn ?? 0}″` : "add height", lbl: "Height", set: profile.heightFt != null },
                { val: profile.age ? `${profile.age} yrs` : "add age", lbl: "Age", set: !!profile.age },
              ].map(({ val, lbl, set }) => (
                <button key={lbl} onClick={startEdit} style={{
                  flex: 1, background: set ? "#0f0f14" : "rgba(200,169,110,0.04)",
                  border: set ? "1px solid #2a2a3a" : "1px dashed #c8a96e50",
                  borderRadius: "8px", padding: "10px 4px", textAlign: "center", cursor: lbl === "Timeline" ? "default" : "pointer",
                }}>
                  <div style={{ fontSize: "13px", color: set ? "#e8d5a3" : "#5a5a6a", fontWeight: set ? 600 : 400, fontStyle: set ? "normal" : "italic" }}>{val}</div>
                  <div style={{ fontSize: "9px", color: set ? "#8a8799" : "#4a4a5a", letterSpacing: "1px", textTransform: "uppercase", marginTop: "2px" }}>{lbl}</div>
                </button>
              ))}
            </div>

            {/* Goal toggle */}
            <div style={{ display: "flex", gap: "6px", marginBottom: profile.confirmed ? "10px" : "0" }}>
              {GOALS.map(g => (
                <button key={g.id} onClick={() => saveProfile({ ...profile, goal: g.id })} style={{
                  flex: 1, padding: "9px 6px", borderRadius: "8px", fontSize: "12px", cursor: "pointer",
                  background: profile.goal === g.id ? `${g.color}18` : "none",
                  border: `1px solid ${profile.goal === g.id ? g.color : "#2a2a3a"}`,
                  color: profile.goal === g.id ? g.color : "#8a8799",
                  transition: "all 0.15s",
                }}>{g.label}</button>
              ))}
            </div>

            {profile.confirmed && (
              <button onClick={startEdit} style={{ background: "none", border: "none", color: "#4a4a5a", fontSize: "11px", letterSpacing: "0.5px", cursor: "pointer", padding: "8px 0 0" }}>
                ✎ Edit stats
              </button>
            )}
          </>
        ) : (
          /* Edit form */
          <div>
            <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "12px" }}>Your stats</div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "10px", color: "#8a8799", marginBottom: "4px" }}>Weight (lbs)</div>
                <input type="number" value={draft.weight || ""} onChange={e => setDraft(d => ({ ...d, weight: e.target.value }))}
                  placeholder="e.g. 160" style={{ width: "100%", background: "#0f0f14", border: "1px solid #3a3a4a", borderRadius: "8px", padding: "9px 12px", color: "#e8d5a3", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "10px", color: "#8a8799", marginBottom: "4px" }}>Age</div>
                <input type="number" value={draft.age || ""} onChange={e => setDraft(d => ({ ...d, age: e.target.value }))}
                  placeholder="e.g. 35" style={{ width: "100%", background: "#0f0f14", border: "1px solid #3a3a4a", borderRadius: "8px", padding: "9px 12px", color: "#e8d5a3", fontSize: "15px", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "10px", color: "#8a8799", marginBottom: "4px" }}>Height</div>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input type="number" value={draft.heightFt ?? ""} onChange={e => setDraft(d => ({ ...d, heightFt: e.target.value }))}
                  placeholder="5" style={{ flex: 1, background: "#0f0f14", border: "1px solid #3a3a4a", borderRadius: "8px", padding: "9px 12px", color: "#e8d5a3", fontSize: "15px", outline: "none" }} />
                <span style={{ color: "#8a8799", fontSize: "13px" }}>ft</span>
                <input type="number" value={draft.heightIn ?? ""} onChange={e => setDraft(d => ({ ...d, heightIn: e.target.value }))}
                  placeholder="5" style={{ flex: 1, background: "#0f0f14", border: "1px solid #3a3a4a", borderRadius: "8px", padding: "9px 12px", color: "#e8d5a3", fontSize: "15px", outline: "none" }} />
                <span style={{ color: "#8a8799", fontSize: "13px" }}>in</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={saveEdit} style={{ flex: 1, background: "rgba(200,169,110,0.15)", border: "1px solid #c8a96e", borderRadius: "8px", padding: "10px", color: "#e8d5a3", fontSize: "13px", cursor: "pointer" }}>Save</button>
              <button onClick={() => setEditing(false)} style={{ flex: 1, background: "none", border: "1px solid #2a2a3a", borderRadius: "8px", padding: "10px", color: "#8a8799", fontSize: "13px", cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Phase Selector ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
        {phases.map(p => (
          <button key={p.id} onClick={() => { setActivePhase(p.id); setExpandedDay(null); setExpandedEx(null); }} style={{
            background: activePhase === p.id ? "rgba(200,169,110,0.08)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${activePhase === p.id ? p.color + "80" : "#2a2a3a"}`,
            borderRadius: "10px", padding: "12px 16px", textAlign: "left", color: "#e8e4dc",
            display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer",
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

      {/* ── Day Cards ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "14px" }}>
        {phase.days.map((d, i) => (
          <div key={i} style={{
            background: expandedDay === i ? "rgba(200,169,110,0.06)" : "#16161f",
            border: `1px solid ${expandedDay === i ? phase.color + "60" : "#2a2a3a"}`,
            borderRadius: "10px", overflow: "hidden",
          }}>
            <div onClick={() => { setExpandedDay(expandedDay === i ? null : i); setExpandedEx(null); }} style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
              <span style={{ fontSize: "20px" }}>{d.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799" }}>{d.day}</div>
                <div style={{ fontSize: "14px", color: "#e8d5a3", marginTop: "2px" }}>{d.focus}</div>
              </div>
              <span style={{ color: "#8a8799", transform: expandedDay === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", fontSize: "18px" }}>›</span>
            </div>
            {expandedDay === i && (
              <div style={{ padding: "0 16px 16px", borderTop: "1px solid #2a2a3a" }}>
                <div style={{ color: "#8a8799", fontSize: "13px", lineHeight: "1.7", fontStyle: "italic", padding: "12px 0 10px" }}>{d.detail}</div>
                {d.exercises && d.exercises.length > 0 && (
                  <div>
                    <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#4a4a5a", marginBottom: "8px" }}>Tap any exercise to learn how →</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {d.exercises.map(exKey => (
                        <ExerciseChip key={exKey} exKey={exKey} isOpen={expandedEx === exKey} onToggle={() => setExpandedEx(expandedEx === exKey ? null : exKey)} />
                      ))}
                    </div>
                  </div>
                )}
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
