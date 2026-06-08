import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { phases } from "../data";

const WATER_GOAL = 12;
const PROTEIN_GOAL = 150;

const PROTEIN_FOODS = [
  { name: "Chicken or Salmon", portion: "4 oz", grams: 30 },
  { name: "Shrimp", portion: "4 oz", grams: 20 },
  { name: "Egg", portion: "1 egg", grams: 8 },
  { name: "Tuna", portion: "½ can", grams: 12 },
  { name: "Parmesan", portion: "1 oz", grams: 10 },
  { name: "Greek Yogurt / Cottage Cheese", portion: "½ cup", grams: 12 },
  { name: "Edamame / Black Beans", portion: "½ cup", grams: 8 },
  { name: "Chickpeas", portion: "½ cup", grams: 10 },
];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getWeekStart(date = new Date()) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(d) { return d.toISOString().split("T")[0]; }

export default function WorkoutLog() {
  const { user } = useAuth();
  const [workoutLog, setWorkoutLog] = useState({});
  const [waterLog, setWaterLog] = useState({});
  const [proteinLog, setProteinLog] = useState({});
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [syncing, setSyncing] = useState(true);

  // Slider local state (save to Firestore on release)
  const [proteinDraft, setProteinDraft] = useState(null);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setWorkoutLog(data.workoutLog || {});
        setWaterLog(data.waterLog || {});
        setProteinLog(data.proteinLog || {});
      }
      setSyncing(false);
    });
    return unsub;
  }, [user]);

  const today = formatDate(new Date());
  const weekStart = getWeekStart();
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return formatDate(d);
  });

  const phase = phases.find(p => p.id === selectedPhase);
  const totalLogged = Object.keys(workoutLog).length;
  const weekLogged = weekDates.filter(d => workoutLog[d]).length;

  const todayWater = waterLog[today] || 0;
  const todayProtein = proteinDraft !== null ? proteinDraft : (proteinLog[today] || 0);

  // ── Workout toggle ──
  const toggleDay = async (dateStr, workout) => {
    const next = { ...workoutLog };
    if (next[dateStr]) { delete next[dateStr]; }
    else { next[dateStr] = { ...workout, completedAt: new Date().toISOString() }; }
    setWorkoutLog(next);
    await setDoc(doc(db, "users", user.uid), { workoutLog: next }, { merge: true });
  };

  // ── Water toggle ──
  const toggleWater = async (idx) => {
    const current = waterLog[today] || 0;
    const newVal = idx < current ? idx : idx + 1;
    const newLog = { ...waterLog, [today]: newVal };
    setWaterLog(newLog);
    await setDoc(doc(db, "users", user.uid), { waterLog: newLog }, { merge: true });
  };

  // ── Protein save (on slider release) ──
  const saveProtein = async (grams) => {
    const clamped = Math.min(PROTEIN_GOAL, Math.max(0, grams));
    const newLog = { ...proteinLog, [today]: clamped };
    setProteinLog(newLog);
    setProteinDraft(null);
    await setDoc(doc(db, "users", user.uid), { proteinLog: newLog }, { merge: true });
  };

  // ── Protein add/subtract ──
  const addProtein = async (delta) => {
    const current = proteinLog[today] || 0;
    await saveProtein(current + delta);
  };

  const streak = (() => {
    let count = 0;
    const d = new Date();
    while (true) {
      const key = formatDate(d);
      if (workoutLog[key]) { count++; d.setDate(d.getDate() - 1); } else break;
    }
    return count;
  })();

  const proteinPct = Math.min(1, todayProtein / PROTEIN_GOAL);
  const proteinColor = proteinPct >= 1 ? "#5fbfb0" : proteinPct >= 0.6 ? "#c8a96e" : "#9b8ec4";

  if (syncing) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
        <div style={{ color: "#c8a96e", fontSize: "11px", letterSpacing: "2px" }}>SYNCING…</div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Stats row ── */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {[
          { val: streak, label: "Day Streak", color: "#c8a96e", icon: "🔥" },
          { val: weekLogged, label: "This Week", color: "#5fbfb0", icon: "📅" },
          { val: totalLogged, label: "Total Done", color: "#9b8ec4", icon: "✦" },
        ].map(s => (
          <div key={s.label} style={{ flex: 1, background: "#16161f", border: `1px solid ${s.color}30`, borderRadius: "10px", padding: "12px 8px", textAlign: "center" }}>
            <div style={{ fontSize: "9px", marginBottom: "4px" }}>{s.icon}</div>
            <div style={{ fontSize: "22px", color: s.color, fontWeight: 600 }}>{s.val}</div>
            <div style={{ fontSize: "9px", color: "#8a8799", letterSpacing: "1px", textTransform: "uppercase", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── TODAY label ── */}
      <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "10px" }}>Today's Trackers</div>

      {/* ── Water ── */}
      <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px", marginBottom: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div style={{ fontSize: "13px", color: "#e8d5a3" }}>💧 Water</div>
          <div style={{ fontSize: "12px", color: todayWater >= WATER_GOAL ? "#5fbfb0" : "#8a8799" }}>
            {todayWater}/{WATER_GOAL} glasses
            {todayWater >= WATER_GOAL && <span style={{ marginLeft: "6px" }}>✓</span>}
          </div>
        </div>
        <div style={{ display: "flex", gap: "6px", justifyContent: "space-between" }}>
          {Array.from({ length: WATER_GOAL }, (_, i) => {
            const filled = i < todayWater;
            return (
              <button
                key={i}
                onClick={() => toggleWater(i)}
                style={{
                  flex: 1, height: "38px", borderRadius: "7px",
                  background: filled ? "rgba(95,191,176,0.2)" : "#0f0f14",
                  border: `1.5px solid ${filled ? "#5fbfb0" : "#2a2a3a"}`,
                  fontSize: "16px", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.12s",
                }}
              >
                {filled ? "💧" : <span style={{ color: "#2a2a3a", fontSize: "12px" }}>○</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Protein ── */}
      <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div style={{ fontSize: "13px", color: "#e8d5a3" }}>🥩 Protein</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "3px" }}>
            <span style={{ fontSize: "22px", color: proteinColor, fontWeight: 600, lineHeight: 1 }}>{todayProtein}</span>
            <span style={{ fontSize: "11px", color: "#8a8799" }}>/ {PROTEIN_GOAL}g</span>
            {todayProtein >= PROTEIN_GOAL && <span style={{ marginLeft: "4px", color: "#5fbfb0", fontSize: "12px" }}>✓</span>}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: "6px", background: "#2a2a3a", borderRadius: "3px", overflow: "hidden", marginBottom: "10px" }}>
          <div style={{
            height: "100%", borderRadius: "3px",
            width: `${proteinPct * 100}%`,
            background: `linear-gradient(90deg, #9b8ec4, ${proteinColor})`,
            transition: "width 0.1s",
          }} />
        </div>

        {/* Slider row with ± buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <button onClick={() => addProtein(-1)} style={{
            width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
            background: "#0f0f14", border: "1px solid #3a3a4a",
            color: "#8a8799", fontSize: "18px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>−</button>
          <input
            type="range" min="0" max={PROTEIN_GOAL} step="1"
            value={todayProtein}
            onChange={e => setProteinDraft(parseInt(e.target.value))}
            onMouseUp={e => saveProtein(parseInt(e.target.value))}
            onTouchEnd={e => saveProtein(parseInt(e.target.value))}
            style={{ flex: 1, cursor: "pointer", accentColor: proteinColor, height: "20px" }}
          />
          <button onClick={() => addProtein(1)} style={{
            width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
            background: "#0f0f14", border: "1px solid #3a3a4a",
            color: "#c8a96e", fontSize: "18px", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>+</button>
        </div>

        {/* Quick-add food buttons */}
        <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: "#4a4a5a", marginBottom: "8px" }}>Quick add</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
          {PROTEIN_FOODS.map(food => (
            <button key={food.name} onClick={() => addProtein(food.grams)} style={{
              background: "#0f0f14", border: "1px solid #2a2a3a", borderRadius: "8px",
              padding: "8px 10px", textAlign: "left", cursor: "pointer",
              display: "flex", flexDirection: "column", gap: "2px",
            }}>
              <span style={{ fontSize: "10px", color: "#8a8799", lineHeight: 1.3 }}>{food.name}</span>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "10px", color: "#4a4a5a" }}>{food.portion}</span>
                <span style={{ fontSize: "12px", color: proteinColor, fontWeight: 600 }}>+{food.grams}g</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── This week mini-calendar ── */}
      <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px", marginBottom: "16px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "10px" }}>This Week</div>
        <div style={{ display: "flex", gap: "4px" }}>
          {weekDates.map((date, i) => {
            const isToday = date === today;
            const done = !!workoutLog[date];
            const isPast = date <= today;
            return (
              <div key={date} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ fontSize: "9px", color: "#8a8799", marginBottom: "4px" }}>{weekDays[i].slice(0, 1)}</div>
                <div style={{
                  width: "100%", aspectRatio: "1", borderRadius: "6px",
                  background: done ? "#c8a96e20" : isToday ? "#2a2a3a" : "none",
                  border: isToday ? "1.5px solid #c8a96e" : done ? "1.5px solid #c8a96e60" : "1px solid #2a2a3a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px",
                }}>
                  {done ? "✓" : isPast ? "·" : ""}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Phase selector ── */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
        {phases.map(p => (
          <button key={p.id} onClick={() => setSelectedPhase(p.id)} style={{
            flex: 1, background: selectedPhase === p.id ? `${p.color}20` : "#16161f",
            border: `1px solid ${selectedPhase === p.id ? p.color : "#2a2a3a"}`,
            borderRadius: "8px", padding: "8px 4px",
            color: selectedPhase === p.id ? p.color : "#8a8799",
            fontSize: "11px", cursor: "pointer",
          }}>{p.label}</button>
        ))}
      </div>

      {/* ── Log workouts ── */}
      <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "10px" }}>Log Today's Workout</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {phase.days.map((d, i) => {
          const dateForDay = weekDates[weekDays.indexOf(d.day)];
          const done = !!workoutLog[dateForDay];
          const workout = { phase: phase.id, phaseLabel: phase.label, phaseColor: phase.color, day: d.day, focus: d.focus, icon: d.icon };
          return (
            <div key={i} style={{ background: "#16161f", border: `1px solid ${done ? phase.color + "60" : "#2a2a3a"}`, borderRadius: "10px", overflow: "hidden" }}>
              <div style={{ padding: "12px 14px", display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={{ fontSize: "18px" }}>{d.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "9px", color: "#8a8799", letterSpacing: "1px", textTransform: "uppercase" }}>{d.day}</div>
                  <div style={{ fontSize: "13px", color: "#e8d5a3" }}>{d.focus}</div>
                </div>
                <button onClick={() => toggleDay(dateForDay || today, workout)} style={{
                  background: done ? phase.color : "none",
                  border: `1.5px solid ${done ? phase.color : "#3a3a4a"}`,
                  borderRadius: "6px", padding: "6px 12px",
                  color: done ? "#0f0f14" : "#8a8799",
                  fontSize: "12px", fontWeight: done ? 700 : 400,
                  transition: "all 0.15s", cursor: "pointer",
                }}>
                  {done ? "Done ✓" : "Log"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "14px", padding: "14px 16px", background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: "10px", fontSize: "12px", color: "#8a8799", lineHeight: "1.6", fontStyle: "italic" }}>
        Water and protein reset each day. Workout streak and weekly progress sync across all your devices.
      </div>
    </div>
  );
}
