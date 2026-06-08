import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { phases } from "../data";

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getWeekStart(date = new Date()) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatDate(d) {
  return d.toISOString().split("T")[0];
}

export default function WorkoutLog() {
  const { user } = useAuth();
  const [log, setLog] = useState({});
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [syncing, setSyncing] = useState(true);

  // Real-time Firestore listener
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setLog(snap.data().workoutLog || {});
      }
      setSyncing(false);
    });
    return unsub;
  }, [user]);

  const saveLog = async (newLog) => {
    if (!user) return;
    setLog(newLog);
    await setDoc(doc(db, "users", user.uid), { workoutLog: newLog }, { merge: true });
  };

  const today = formatDate(new Date());
  const weekStart = getWeekStart();
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return formatDate(d);
  });

  const phase = phases.find(p => p.id === selectedPhase);
  const totalLogged = Object.keys(log).length;
  const weekLogged = weekDates.filter(d => log[d]).length;

  const toggleDay = async (dateStr, workout) => {
    const next = { ...log };
    if (next[dateStr]) {
      delete next[dateStr];
    } else {
      next[dateStr] = { ...workout, completedAt: new Date().toISOString() };
    }
    await saveLog(next);
  };

  const streak = (() => {
    let count = 0;
    const d = new Date();
    while (true) {
      const key = formatDate(d);
      if (log[key]) { count++; d.setDate(d.getDate() - 1); }
      else break;
    }
    return count;
  })();

  if (syncing) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "200px" }}>
        <div style={{ color: "#c8a96e", fontSize: "11px", letterSpacing: "2px" }}>SYNCING…</div>
      </div>
    );
  }

  return (
    <div>
      {/* Stats row */}
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

      {/* This week mini-calendar */}
      <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px", marginBottom: "16px" }}>
        <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "10px" }}>This Week</div>
        <div style={{ display: "flex", gap: "4px" }}>
          {weekDates.map((date, i) => {
            const isToday = date === today;
            const done = !!log[date];
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

      {/* Phase selector */}
      <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
        {phases.map(p => (
          <button key={p.id} onClick={() => setSelectedPhase(p.id)} style={{
            flex: 1, background: selectedPhase === p.id ? `${p.color}20` : "#16161f",
            border: `1px solid ${selectedPhase === p.id ? p.color : "#2a2a3a"}`,
            borderRadius: "8px", padding: "8px 4px", color: selectedPhase === p.id ? p.color : "#8a8799",
            fontSize: "11px", cursor: "pointer",
          }}>{p.label}</button>
        ))}
      </div>

      {/* Log workouts */}
      <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: "#8a8799", marginBottom: "10px" }}>Log Today's Workout</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {phase.days.map((d, i) => {
          const dateForDay = weekDates[weekDays.indexOf(d.day)];
          const done = !!log[dateForDay];
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
                  color: done ? "#0f0f14" : "#8a8799", fontSize: "12px", fontWeight: done ? 700 : 400,
                  transition: "all 0.15s", cursor: "pointer",
                }}>
                  {done ? "Done ✓" : "Log"}
                </button>
              </div>
              {done && log[dateForDay]?.note && (
                <div style={{ padding: "0 14px 10px", fontSize: "12px", color: "#8a8799", fontStyle: "italic" }}>
                  "{log[dateForDay].note}"
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "14px", padding: "14px 16px", background: "rgba(200,169,110,0.05)", border: "1px solid rgba(200,169,110,0.15)", borderRadius: "10px", fontSize: "12px", color: "#8a8799", lineHeight: "1.6", fontStyle: "italic" }}>
        Tap "Log" to mark a workout complete. Your streak and weekly progress sync across all your devices.
      </div>
    </div>
  );
}
