import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
import { mealPlan } from "../data";

const mealColors = { Breakfast: "#c8a96e", Lunch: "#5fbfb0", Snack: "#9b8ec4", Dinner: "#d4788a" };

export default function MealsTab() {
  const { user } = useAuth();
  const [activeDay, setActiveDay] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [overrides, setOverrides] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [draft, setDraft] = useState({ name: "", cals: "", protein: "" });

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) setOverrides(snap.data().mealOverrides || {});
    });
    return unsub;
  }, [user]);

  const day = mealPlan.days[activeDay];

  const getMeal = (meal) => {
    const key = `${day.day}-${meal.type}`;
    const o = overrides[key];
    return o ? { ...meal, name: o.name ?? meal.name, cals: o.cals ?? meal.cals, protein: o.protein ?? meal.protein } : meal;
  };

  const startEdit = (meal, e) => {
    e.stopPropagation();
    const key = `${day.day}-${meal.type}`;
    const m = getMeal(meal);
    setEditingKey(key);
    setDraft({ name: m.name, cals: String(m.cals), protein: String(m.protein) });
    setExpanded(null);
  };

  const saveEdit = async (e) => {
    e.stopPropagation();
    if (!editingKey || !user) return;
    const newOverrides = {
      ...overrides,
      [editingKey]: {
        name: draft.name,
        cals: parseInt(draft.cals) || 0,
        protein: parseInt(draft.protein) || 0,
      },
    };
    setOverrides(newOverrides);
    setEditingKey(null);
    await setDoc(doc(db, "users", user.uid), { mealOverrides: newOverrides }, { merge: true });
  };

  const resetMeal = async (meal, e) => {
    e.stopPropagation();
    const key = `${day.day}-${meal.type}`;
    const newOverrides = { ...overrides };
    delete newOverrides[key];
    setOverrides(newOverrides);
    setEditingKey(null);
    await setDoc(doc(db, "users", user.uid), { mealOverrides: newOverrides }, { merge: true });
  };

  const cancelEdit = (e) => { e.stopPropagation(); setEditingKey(null); };

  const totalCals = day.meals.reduce((s, m) => s + getMeal(m).cals, 0);
  const totalProtein = day.meals.reduce((s, m) => s + getMeal(m).protein, 0);

  return (
    <div>
      {/* Day picker */}
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px", marginBottom: "14px", scrollbarWidth: "none" }}>
        {mealPlan.days.map((d, i) => (
          <button key={i} onClick={() => { setActiveDay(i); setExpanded(null); setEditingKey(null); }} style={{
            flexShrink: 0,
            background: activeDay === i ? "rgba(200,169,110,0.15)" : "#16161f",
            border: `1px solid ${activeDay === i ? "#c8a96e" : "#2a2a3a"}`,
            borderRadius: "8px", padding: "8px 14px",
            color: activeDay === i ? "#e8d5a3" : "#8a8799",
            fontSize: "12px", letterSpacing: "0.5px", cursor: "pointer",
          }}>{d.day.slice(0, 3)}</button>
        ))}
      </div>

      {/* Daily totals */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
        <div style={{ flex: 1, background: "#16161f", border: "1px solid rgba(212,120,138,0.3)", borderRadius: "8px", padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#d4788a", fontWeight: 600 }}>{totalCals.toLocaleString()}</div>
          <div style={{ fontSize: "9px", color: "#8a8799", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>calories</div>
        </div>
        <div style={{ flex: 1, background: "#16161f", border: "1px solid rgba(95,191,176,0.3)", borderRadius: "8px", padding: "10px 12px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", color: "#5fbfb0", fontWeight: 600 }}>{totalProtein}g</div>
          <div style={{ fontSize: "9px", color: "#8a8799", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "2px" }}>protein</div>
        </div>
      </div>

      {/* Meals */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {day.meals.map((rawMeal, i) => {
          const meal = getMeal(rawMeal);
          const key = `${day.day}-${rawMeal.type}`;
          const isEditing = editingKey === key;
          const isOverridden = !!overrides[key];
          const color = mealColors[rawMeal.type];

          return (
            <div key={i} style={{
              background: expanded === i ? "rgba(200,169,110,0.05)" : "#16161f",
              border: `1px solid ${expanded === i ? color + "60" : "#2a2a3a"}`,
              borderRadius: "10px", padding: "14px 16px",
              cursor: isEditing ? "default" : "pointer",
            }}
              onClick={() => !isEditing && setExpanded(expanded === i ? null : i)}
            >
              {isEditing ? (
                /* ── Edit mode ── */
                <div onClick={e => e.stopPropagation()}>
                  <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color, marginBottom: "10px" }}>{rawMeal.type}</div>
                  <input
                    value={draft.name}
                    onChange={e => setDraft(d => ({ ...d, name: e.target.value }))}
                    placeholder="Meal name"
                    style={{ width: "100%", background: "#0f0f14", border: "1px solid #3a3a4a", borderRadius: "8px", padding: "8px 12px", color: "#e8d5a3", fontSize: "14px", outline: "none", boxSizing: "border-box", marginBottom: "8px" }}
                  />
                  <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "9px", color: "#8a8799", marginBottom: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>Calories</div>
                      <input
                        type="number" value={draft.cals}
                        onChange={e => setDraft(d => ({ ...d, cals: e.target.value }))}
                        style={{ width: "100%", background: "#0f0f14", border: "1px solid #3a3a4a", borderRadius: "8px", padding: "8px 12px", color: "#d4788a", fontSize: "16px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "9px", color: "#8a8799", marginBottom: "4px", letterSpacing: "1px", textTransform: "uppercase" }}>Protein (g)</div>
                      <input
                        type="number" value={draft.protein}
                        onChange={e => setDraft(d => ({ ...d, protein: e.target.value }))}
                        style={{ width: "100%", background: "#0f0f14", border: "1px solid #3a3a4a", borderRadius: "8px", padding: "8px 12px", color: "#5fbfb0", fontSize: "16px", outline: "none", boxSizing: "border-box" }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={saveEdit} style={{ flex: 1, background: "rgba(200,169,110,0.15)", border: "1px solid #c8a96e", borderRadius: "8px", padding: "9px", color: "#e8d5a3", fontSize: "13px", cursor: "pointer" }}>Save</button>
                    <button onClick={cancelEdit} style={{ flex: 1, background: "none", border: "1px solid #2a2a3a", borderRadius: "8px", padding: "9px", color: "#8a8799", fontSize: "13px", cursor: "pointer" }}>Cancel</button>
                    {isOverridden && <button onClick={e => resetMeal(rawMeal, e)} style={{ background: "none", border: "1px solid #2a2a3a", borderRadius: "8px", padding: "9px 12px", color: "#4a4a5a", fontSize: "11px", cursor: "pointer" }}>Reset</button>}
                  </div>
                </div>
              ) : (
                /* ── View mode ── */
                <>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color, marginBottom: "3px" }}>
                        {rawMeal.type}
                        {!isOverridden && <span style={{ marginLeft: "6px", color: "#3a3a4a", fontStyle: "italic", letterSpacing: "0.5px", textTransform: "none", fontSize: "9px" }}>suggestion</span>}
                      </div>
                      <div style={{ fontSize: "13px", color: isOverridden ? "#e8d5a3" : "#6a6a7a", fontStyle: isOverridden ? "normal" : "italic", display: "flex", alignItems: "center", gap: "6px" }}>
                        {meal.name}
                        {isOverridden && <span style={{ fontSize: "8px", color: color, letterSpacing: "1px", textTransform: "uppercase", background: `${color}15`, borderRadius: "4px", padding: "1px 5px" }}>yours</span>}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "12px", color: isOverridden ? "#d4788a" : "#4a4a5a" }}>{meal.cals} cal</div>
                        <div style={{ fontSize: "11px", color: isOverridden ? "#5fbfb0" : "#4a4a5a" }}>{meal.protein}g protein</div>
                      </div>
                      <button onClick={e => startEdit(rawMeal, e)} style={{
                        background: isOverridden ? "none" : "rgba(200,169,110,0.08)",
                        border: `1px solid ${isOverridden ? "#2a2a3a" : "#c8a96e60"}`,
                        borderRadius: "8px", padding: "6px 10px",
                        color: isOverridden ? "#4a4a5a" : "#c8a96e",
                        fontSize: "11px", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: "4px",
                      }}>
                        <span>✎</span>
                        <span>{isOverridden ? "" : "edit"}</span>
                      </button>
                    </div>
                  </div>
                  {!isOverridden && !expanded && (
                    <div style={{ fontSize: "10px", color: "#3a3a4a", marginTop: "6px", fontStyle: "italic" }}>tap ✎ to make it yours</div>
                  )}

                  {expanded === i && (
                    <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #2a2a3a" }}>
                      {rawMeal.items.map((item, j) => (
                        <div key={j} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "5px 0", borderBottom: j < rawMeal.items.length - 1 ? "1px solid #1e1e28" : "none" }}>
                          <span style={{ color, fontSize: "10px" }}>◆</span>
                          <span style={{ fontSize: "13px", color: "#8a8799" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
