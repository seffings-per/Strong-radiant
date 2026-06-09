import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";

function formatDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
function displayDate(str) {
  const d = new Date(str + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

const GOAL_WATER = 12;

export default function ProgressTab() {
  const { user } = useAuth();
  const [weightLog, setWeightLog] = useState({});
  const [waterLog, setWaterLog] = useState({});
  const [weightInput, setWeightInput] = useState("");
  const [activeSection, setActiveSection] = useState("weight");
  const [syncing, setSyncing] = useState(true);

  // Real-time Firestore listener
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setWeightLog(data.weightLog || {});
        setWaterLog(data.waterLog || {});
      }
      setSyncing(false);
    });
    return unsub;
  }, [user]);

  const saveWeightLog = async (newLog) => {
    if (!user) return;
    setWeightLog(newLog);
    await setDoc(doc(db, "users", user.uid), { weightLog: newLog }, { merge: true });
  };

  const saveWaterLog = async (newLog) => {
    if (!user) return;
    setWaterLog(newLog);
    await setDoc(doc(db, "users", user.uid), { waterLog: newLog }, { merge: true });
  };

  const today = formatDate();
  const todayWater = waterLog[today] || 0;

  const logWeight = async () => {
    const w = parseFloat(weightInput);
    if (!w || w < 50 || w > 500) return;
    await saveWeightLog({ ...weightLog, [today]: w });
    setWeightInput("");
  };

  const addWater = async (amt) => {
    const newVal = Math.max(0, (waterLog[today] || 0) + amt);
    await saveWaterLog({ ...waterLog, [today]: newVal });
  };

  // Weight chart data — last 12 entries
  const weightEntries = Object.entries(weightLog).sort((a, b) => a[0].localeCompare(b[0])).slice(-12);
  const startWeight = 210;
  const goalWeight = 190;
  const currentWeight = weightEntries.length ? weightEntries[weightEntries.length - 1][1] : startWeight;
  const lostSoFar = startWeight - currentWeight;
  const toGo = currentWeight - goalWeight;

  // Mini chart
  const chartH = 100;
  const chartW = 300;
  const allWeights = [startWeight, ...weightEntries.map(e => e[1])];
  const minW = Math.min(...allWeights) - 2;
  const maxW = Math.max(...allWeights) + 2;
  const range = maxW - minW || 1;

  const points = weightEntries.map((entry, i) => {
    const x = weightEntries.length === 1 ? chartW / 2 : (i / (weightEntries.length - 1)) * chartW;
    const y = chartH - ((entry[1] - minW) / range) * chartH;
    return { x, y, date: entry[0], val: entry[1] };
  });

  const svgPath = points.length > 1
    ? "M " + points.map(p => `${p.x},${p.y}`).join(" L ")
    : null;

  // Water chart — last 7 days
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = formatDate(d);
    return { key, label: d.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 1), val: waterLog[key] || 0 };
  });

  if (syncing) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
        <div style={{ color: "#c8a96e", fontSize: "11px", letterSpacing: "2px" }}>SYNCING…</div>
      </div>
    );
  }

  return (
    <div>
      {/* Section toggle */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {[["weight", "⚖️", "Weight"], ["water", "💧", "Water"]].map(([id, icon, label]) => (
          <button key={id} onClick={() => setActiveSection(id)} style={{
            flex: 1, background: activeSection === id ? "rgba(200,169,110,0.1)" : "#16161f",
            border: `1px solid ${activeSection === id ? "#c8a96e" : "#2a2a3a"}`,
            borderRadius: "10px", padding: "12px", color: activeSection === id ? "#e8d5a3" : "#8a8799",
            fontSize: "13px", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          }}><span>{icon}</span><span>{label}</span></button>
        ))}
      </div>

      {/* ── WEIGHT SECTION ── */}
      {activeSection === "weight" && (
        <>
          {/* Summary cards */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
            {[
              { label: "Current", val: currentWeight === startWeight && !weightEntries.length ? "—" : `${currentWeight} lbs`, color: "#e8d5a3" },
              { label: "Lost", val: lostSoFar > 0 ? `${lostSoFar.toFixed(1)} lbs` : "—", color: "#5fbfb0" },
              { label: "To Goal", val: toGo > 0 ? `${toGo.toFixed(1)} lbs` : "🎉", color: "#d4788a" },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "12px 8px", textAlign: "center" }}>
                <div style={{ fontSize: "16px", color: s.color, fontWeight: 600 }}>{s.val}</div>
                <div style={{ fontSize: "9px", color: "#8a8799", letterSpacing: "1px", textTransform: "uppercase", marginTop: "3px" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Goal progress bar */}
          <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px", marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#8a8799", marginBottom: "8px" }}>
              <span>Start: 210 lbs</span><span>Goal: 190 lbs</span>
            </div>
            <div style={{ height: "6px", background: "#2a2a3a", borderRadius: "3px" }}>
              <div style={{
                height: "100%", borderRadius: "3px",
                width: `${Math.min(100, Math.max(0, (lostSoFar / 20) * 100))}%`,
                background: "linear-gradient(90deg, #5fbfb0, #c8a96e)",
                transition: "width 0.5s",
              }} />
            </div>
            <div style={{ fontSize: "11px", color: "#c8a96e", marginTop: "6px", textAlign: "right" }}>
              {Math.min(100, Math.max(0, Math.round((lostSoFar / 20) * 100)))}% to goal
            </div>
          </div>

          {/* Log weight input */}
          <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px", marginBottom: "14px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "10px" }}>Log Today's Weight</div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="number" value={weightInput}
                onChange={e => setWeightInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && logWeight()}
                placeholder="e.g. 208.5"
                style={{
                  flex: 1, background: "#0f0f14", border: "1px solid #3a3a4a", borderRadius: "8px",
                  padding: "10px 14px", color: "#e8d5a3", fontSize: "16px", outline: "none",
                  fontFamily: "Georgia, serif",
                }}
              />
              <span style={{ color: "#8a8799", fontSize: "13px" }}>lbs</span>
              <button onClick={logWeight} style={{
                background: "#c8a96e20", border: "1px solid #c8a96e60", borderRadius: "8px",
                padding: "10px 16px", color: "#c8a96e", fontSize: "13px", cursor: "pointer",
              }}>Save</button>
            </div>
            {weightLog[today] && (
              <div style={{ marginTop: "8px", fontSize: "12px", color: "#5fbfb0" }}>✓ Today logged: {weightLog[today]} lbs</div>
            )}
          </div>

          {/* Chart */}
          {points.length >= 2 && (
            <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px", marginBottom: "14px" }}>
              <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "10px" }}>Weight Trend</div>
              <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", height: "auto", overflow: "visible" }}>
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5fbfb0" />
                    <stop offset="100%" stopColor="#c8a96e" />
                  </linearGradient>
                  <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c8a96e" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#c8a96e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d={`${svgPath} L ${points[points.length - 1].x},${chartH} L ${points[0].x},${chartH} Z`} fill="url(#fillGrad)" />
                <path d={svgPath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {points.map((p, i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r="4" fill="#c8a96e" />
                    {(i === 0 || i === points.length - 1) && (
                      <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="9" fill="#8a8799">{p.val}</text>
                    )}
                  </g>
                ))}
              </svg>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                {[points[0], points[points.length - 1]].map((p, i) => (
                  <span key={i} style={{ fontSize: "10px", color: "#8a8799" }}>{displayDate(p.date)}</span>
                ))}
              </div>
            </div>
          )}

          {/* History list */}
          {weightEntries.length > 0 && (
            <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #2a2a3a", fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799" }}>History</div>
              {[...weightEntries].reverse().slice(0, 8).map(([date, val]) => (
                <div key={date} style={{ padding: "10px 16px", borderBottom: "1px solid #1e1e28", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#8a8799" }}>{displayDate(date)}</span>
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "#e8d5a3" }}>{val} lbs</span>
                    <button onClick={() => {
                      const n = { ...weightLog };
                      delete n[date];
                      saveWeightLog(n);
                    }} style={{ background: "none", border: "none", color: "#3a3a4a", fontSize: "16px", lineHeight: 1, cursor: "pointer" }}>×</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── WATER SECTION ── */}
      {activeSection === "water" && (
        <>
          {/* Today's water */}
          <div style={{ background: "#16161f", border: "1px solid rgba(95,191,176,0.3)", borderRadius: "12px", padding: "20px 16px", marginBottom: "14px", textAlign: "center" }}>
            <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "10px" }}>Today's Intake</div>
            <div style={{ fontSize: "48px", color: "#5fbfb0", fontWeight: 600, lineHeight: 1 }}>{todayWater}</div>
            <div style={{ fontSize: "13px", color: "#8a8799", marginTop: "4px" }}>glasses of 8 oz <span style={{ color: "#5fbfb0" }}>({todayWater * 8} oz)</span></div>
            <div style={{ marginTop: "12px", height: "6px", background: "#2a2a3a", borderRadius: "3px" }}>
              <div style={{ height: "100%", borderRadius: "3px", width: `${Math.min(100, (todayWater / GOAL_WATER) * 100)}%`, background: "linear-gradient(90deg, #5fbfb0, #9b8ec4)", transition: "width 0.4s" }} />
            </div>
            <div style={{ fontSize: "11px", color: "#8a8799", marginTop: "6px" }}>Goal: {GOAL_WATER} glasses (80 oz)</div>
          </div>

          {/* Glasses grid */}
          <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "16px", marginBottom: "14px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "12px" }}>Tap to track</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
              {Array.from({ length: GOAL_WATER }, (_, i) => (
                <button key={i} onClick={() => addWater(i < todayWater ? -1 : 1)} style={{
                  width: "44px", height: "54px", borderRadius: "8px",
                  background: i < todayWater ? "rgba(95,191,176,0.2)" : "#0f0f14",
                  border: `1.5px solid ${i < todayWater ? "#5fbfb0" : "#2a2a3a"}`,
                  fontSize: "22px", cursor: "pointer", transition: "all 0.15s",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {i < todayWater ? "💧" : "○"}
                </button>
              ))}
            </div>
          </div>

          {/* Quick add */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
            {[1, 2, 3].map(n => (
              <button key={n} onClick={() => addWater(n)} style={{
                flex: 1, background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "8px",
                padding: "10px", color: "#5fbfb0", fontSize: "13px", cursor: "pointer",
              }}>+{n} glass{n > 1 ? "es" : ""}</button>
            ))}
            <button onClick={() => addWater(-1)} style={{
              flex: 1, background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "8px",
              padding: "10px", color: "#8a8799", fontSize: "13px", cursor: "pointer",
            }}>−1</button>
          </div>

          {/* 7-day bar chart */}
          <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px" }}>
            <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "12px" }}>Last 7 Days</div>
            <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", height: "70px" }}>
              {last7.map((d) => {
                const pct = Math.min(1, d.val / GOAL_WATER);
                const met = d.val >= GOAL_WATER;
                return (
                  <div key={d.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%", justifyContent: "flex-end" }}>
                    <div style={{
                      width: "100%", height: `${Math.max(4, pct * 60)}px`,
                      background: met ? "linear-gradient(180deg, #5fbfb0, #9b8ec4)" : "#2a2a3a",
                      borderRadius: "4px 4px 2px 2px", transition: "height 0.3s",
                    }} />
                    <span style={{ fontSize: "9px", color: d.key === today ? "#c8a96e" : "#8a8799" }}>{d.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
