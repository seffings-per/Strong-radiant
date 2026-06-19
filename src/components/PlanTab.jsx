import { useState } from "react";
import { workoutPlan } from "../data";
import { exercises as exerciseLib } from "../exerciseLibrary";
import { useProfile, calcNutrition } from "../useProfile";

const GOALS = [
  { id: "lose",     label: "Lose",     color: "#5fbfb0" },
  { id: "maintain", label: "Maintain", color: "#c8a96e" },
  { id: "gain",     label: "Gain",     color: "#9b8ec4" },
];

function ProgressionTable({ progression, muscleColor }) {
  if (!progression) return null;
  const signal = progression.find(r => r.signal);
  return (
    <div style={{ marginTop: "12px" }}>
      <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#8a8799", marginBottom: "8px" }}>
        10-week progression
      </div>
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px", padding: "0 2px" }}>
        <div style={{ fontSize: "9px", color: "#4a4a5a", width: "52px", flexShrink: 0 }}>WEEK</div>
        <div style={{ fontSize: "9px", color: "#4a4a5a", flex: 1 }}>WEIGHT</div>
        <div style={{ fontSize: "9px", color: "#4a4a5a", width: "36px", textAlign: "right" }}>REPS</div>
        <div style={{ fontSize: "9px", color: "#4a4a5a", width: "44px", textAlign: "right" }}>SETS</div>
      </div>
      {progression.map((row, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "center", gap: "4px", padding: "7px 10px",
          marginBottom: "3px", borderRadius: "7px",
          background: i === 0 ? `${muscleColor}10` : "rgba(255,255,255,0.02)",
          border: `1px solid ${i === 0 ? muscleColor + "30" : "#1e1e2e"}`,
        }}>
          <div style={{ fontSize: "10px", color: "#c8a96e", fontWeight: 700, width: "52px", flexShrink: 0 }}>
            {row.weeks}
          </div>
          <div style={{ fontSize: "11px", color: "#8a8799", flex: 1 }}>{row.weight}</div>
          <div style={{ fontSize: "11px", color: "#e8d5a3", width: "36px", textAlign: "right" }}>{row.reps}</div>
          <div style={{
            fontSize: "10px", color: "#4a4a5a", background: "#12121a",
            borderRadius: "4px", padding: "2px 5px", width: "44px", textAlign: "center", flexShrink: 0,
          }}>{row.sets}</div>
        </div>
      ))}
      {signal && (
        <div style={{
          fontSize: "11px", color: "#8a8799", fontStyle: "italic", marginTop: "8px",
          padding: "9px 12px", background: "rgba(200,169,110,0.05)",
          borderRadius: "7px", border: "1px solid rgba(200,169,110,0.15)", lineHeight: "1.6",
        }}>
          💡 {signal.signal}
        </div>
      )}
    </div>
  );
}

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
          <div style={{
            fontSize: "10px", color: "#8a8799", background: "rgba(255,255,255,0.04)",
            border: "1px solid #2a2a3a", borderRadius: "6px", padding: "3px 8px",
            whiteSpace: "nowrap", flexShrink: 0,
          }}>
            {ex.equipment}
          </div>
        )}
      </div>

      {/* Steps */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#8a8799", marginBottom: "7px" }}>How to do it</div>
        {ex.steps.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "7px", alignItems: "flex-start" }}>
            <div style={{
              width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
              background: `${ex.muscleColor}20`, border: `1px solid ${ex.muscleColor}50`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "9px", color: ex.muscleColor, fontWeight: 700,
            }}>{i + 1}</div>
            <span style={{ fontSize: "12px", color: "#8a8799", lineHeight: "1.65", paddingTop: "1px" }}>{step}</span>
          </div>
        ))}
      </div>

      {/* Cues */}
      <div style={{ background: `${ex.muscleColor}08`, border: `1px solid ${ex.muscleColor}20`, borderRadius: "8px", padding: "10px 12px", marginBottom: ex.progression ? "0" : "0" }}>
        <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: ex.muscleColor, marginBottom: "7px" }}>Form cues</div>
        {ex.cues.map((cue, i) => (
          <div key={i} style={{ display: "flex", gap: "8px", marginBottom: i < ex.cues.length - 1 ? "5px" : 0 }}>
            <span style={{ color: ex.muscleColor, fontSize: "10px", marginTop: "2px", flexShrink: 0 }}>◆</span>
            <span style={{ fontSize: "12px", color: "#8a8799", lineHeight: "1.6" }}>{cue}</span>
          </div>
        ))}
      </div>

      {/* Progression table */}
      <ProgressionTable progression={ex.progression} muscleColor={ex.muscleColor} />
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
  const [activeType, setActiveType] = useState("arms");
  const [expandedEx, setExpandedEx] = useState(null);
  const [showCardio, setShowCardio] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(null);

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
  const daySection = workoutPlan[activeType];

  return (
    <div>
      {/* ── Profile stats ── */}
      <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px", marginBottom: "14px" }}>
        {!editing ? (
          <>
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

            <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
              {[
                { val: "10 wks", lbl: "Timeline", set: true },
                { val: profile.weight ? `${profile.weight} lbs` : "add weight", lbl: "Weight", set: !!profile.weight },
                { val: profile.heightFt != null ? `${profile.heightFt}′${profile.heightIn ?? 0}″` : "add height", lbl: "Height", set: profile.heightFt != null },
                { val: profile.age ? `${profile.age} yrs` : "add age", lbl: "Age", set: !!profile.age },
              ].map(({ val, lbl, set }) => (
                <button key={lbl} onClick={startEdit} style={{
                  flex: 1, background: set ? "#0f0f14" : "rgba(200,169,110,0.04)",
                  border: set ? "1px solid #2a2a3a" : "1px dashed #c8a96e50",
                  borderRadius: "8px", padding: "10px 4px", textAlign: "center",
                  cursor: lbl === "Timeline" ? "default" : "pointer",
                }}>
                  <div style={{ fontSize: "13px", color: set ? "#e8d5a3" : "#5a5a6a", fontWeight: set ? 600 : 400, fontStyle: set ? "normal" : "italic" }}>{val}</div>
                  <div style={{ fontSize: "9px", color: set ? "#8a8799" : "#4a4a5a", letterSpacing: "1px", textTransform: "uppercase", marginTop: "2px" }}>{lbl}</div>
                </button>
              ))}
            </div>

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

      {/* ── Plan header ── */}
      <div style={{ marginBottom: "12px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#c8a96e", marginBottom: "3px" }}>
          {workoutPlan.name}
        </div>
        <div style={{ fontSize: "11px", color: "#8a8799" }}>{workoutPlan.equipment}</div>
      </div>

      {/* ── 7-day schedule strip ── */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "14px" }}>
        {workoutPlan.schedule.map((d, i) => {
          const isArms = d.type === "arms";
          const isLegs = d.type === "legs";
          const isRest = d.type === "rest";
          const color = isArms ? "#c8a96e" : isLegs ? "#9b8ec4" : "#3a3a4a";
          return (
            <button
              key={i}
              onClick={() => { if (!isRest) { setActiveType(d.type); setExpandedEx(null); } }}
              style={{
                flex: 1, background: activeType === d.type && !isRest ? `${color}15` : "#16161f",
                border: `1px solid ${activeType === d.type && !isRest ? color + "60" : "#2a2a3a"}`,
                borderRadius: "8px", padding: "8px 2px", textAlign: "center",
                cursor: isRest ? "default" : "pointer",
              }}
            >
              <div style={{ fontSize: "14px", marginBottom: "3px" }}>{d.icon}</div>
              <div style={{ fontSize: "9px", color: isRest ? "#3a3a4a" : color, letterSpacing: "0.5px" }}>{d.short}</div>
            </button>
          );
        })}
      </div>

      {/* ── Arms / Legs toggle ── */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "14px" }}>
        {[
          { type: "arms", label: "💪 Arms Day", color: "#c8a96e" },
          { type: "legs", label: "🦵 Legs Day", color: "#9b8ec4" },
        ].map(t => (
          <button key={t.type} onClick={() => { setActiveType(t.type); setExpandedEx(null); }} style={{
            flex: 1, padding: "11px 8px", borderRadius: "10px", fontSize: "13px", cursor: "pointer",
            background: activeType === t.type ? `${t.color}18` : "rgba(255,255,255,0.02)",
            border: `1px solid ${activeType === t.type ? t.color : "#2a2a3a"}`,
            color: activeType === t.type ? t.color : "#8a8799",
            fontWeight: activeType === t.type ? 600 : 400,
            transition: "all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── Day detail note ── */}
      <div style={{ fontSize: "12px", color: "#8a8799", fontStyle: "italic", marginBottom: "12px", lineHeight: "1.6", padding: "0 2px" }}>
        {daySection.detail}
      </div>

      {/* ── Exercise list ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "16px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#4a4a5a", marginBottom: "4px" }}>
          Tap any exercise to see steps, form cues &amp; progression →
        </div>
        {daySection.exercises.map(exKey => (
          <ExerciseChip
            key={exKey}
            exKey={exKey}
            isOpen={expandedEx === exKey}
            onToggle={() => setExpandedEx(expandedEx === exKey ? null : exKey)}
          />
        ))}
      </div>

      {/* ── Optional Cardio ── */}
      <button onClick={() => setShowCardio(v => !v)} style={{
        width: "100%", background: showCardio ? "rgba(95,191,176,0.08)" : "#16161f",
        border: `1px solid ${showCardio ? "#5fbfb040" : "#2a2a3a"}`,
        borderRadius: "10px", padding: "13px 16px", marginBottom: "8px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        cursor: "pointer",
      }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#5fbfb0", marginBottom: "2px" }}>Optional Add-on</div>
          <div style={{ fontSize: "14px", color: "#e8d5a3" }}>🚣 Cardio Progression</div>
        </div>
        <span style={{ color: "#5fbfb0", fontSize: "18px" }}>{showCardio ? "▲" : "▼"}</span>
      </button>

      {showCardio && (
        <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px", marginBottom: "8px" }}>
          <div style={{ fontSize: "12px", color: "#8a8799", fontStyle: "italic", lineHeight: "1.6", marginBottom: "14px" }}>
            {workoutPlan.cardio.note}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {[
              { label: "🚣 Rowing", key: "rowing", color: "#5fbfb0" },
              { label: "🚶 Treadmill", key: "treadmill", color: "#9b8ec4" },
            ].map(({ label, key, color }) => (
              <div key={key}>
                <div style={{ fontSize: "11px", color, letterSpacing: "0.5px", marginBottom: "8px" }}>{label}</div>
                {workoutPlan.cardio[key].map((row, i) => (
                  <div key={i} style={{
                    padding: "6px 8px", marginBottom: "3px", borderRadius: "6px",
                    background: "rgba(255,255,255,0.02)", border: "1px solid #1e1e2e",
                  }}>
                    <div style={{ fontSize: "9px", color: "#c8a96e", marginBottom: "2px" }}>Wk {row.weeks}</div>
                    <div style={{ fontSize: "11px", color: "#8a8799" }}>{row.duration}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "12px", fontSize: "11px", color: "#8a8799", fontStyle: "italic", padding: "9px 12px", background: "rgba(200,169,110,0.05)", borderRadius: "7px", border: "1px solid rgba(200,169,110,0.15)", lineHeight: "1.6" }}>
            💡 {workoutPlan.cardio.signal}
          </div>
        </div>
      )}

      {/* ── Progression Rules ── */}
      <button onClick={() => setShowRules(v => !v)} style={{
        width: "100%", background: showRules ? "rgba(200,169,110,0.06)" : "#16161f",
        border: `1px solid ${showRules ? "#c8a96e40" : "#2a2a3a"}`,
        borderRadius: "10px", padding: "13px 16px", marginBottom: "8px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        cursor: "pointer",
      }}>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#c8a96e", marginBottom: "2px" }}>How to Level Up</div>
          <div style={{ fontSize: "14px", color: "#e8d5a3" }}>📈 Progression Rules</div>
        </div>
        <span style={{ color: "#c8a96e", fontSize: "18px" }}>{showRules ? "▲" : "▼"}</span>
      </button>

      {showRules && (
        <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px", marginBottom: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
            {workoutPlan.progressionRules.map((r, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", padding: "10px 12px", background: "#0f0f14", borderRadius: "8px", border: "1px solid #2a2a3a" }}>
                <div style={{ fontSize: "13px", color: "#c8a96e", fontWeight: 600, minWidth: "130px", lineHeight: "1.5" }}>{r.rule}</div>
                <div style={{ fontSize: "12px", color: "#8a8799", lineHeight: "1.6" }}>{r.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "8px" }}>The big picture</div>
          {workoutPlan.bigPicture.map((row, i) => (
            <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "6px" }}>
              <div style={{ fontSize: "10px", color: "#c8a96e", fontWeight: 700, width: "52px", flexShrink: 0, paddingTop: "1px" }}>Wk {row.weeks}</div>
              <div style={{ fontSize: "12px", color: "#8a8799", lineHeight: "1.6" }}>{row.focus}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
