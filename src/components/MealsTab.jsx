import { useState } from "react";
import { mealPlan } from "../data";

const mealColors = { Breakfast: "#c8a96e", Lunch: "#5fbfb0", Snack: "#9b8ec4", Dinner: "#d4788a" };

export default function MealsTab() {
  const [activeDay, setActiveDay] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const day = mealPlan.days[activeDay];

  const totalCals = day.meals.reduce((s, m) => s + m.cals, 0);
  const totalProtein = day.meals.reduce((s, m) => s + m.protein, 0);

  return (
    <div>
      {/* Day picker */}
      <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px", marginBottom: "14px", scrollbarWidth: "none" }}>
        {mealPlan.days.map((d, i) => (
          <button key={i} onClick={() => { setActiveDay(i); setExpanded(null); }} style={{
            flexShrink: 0,
            background: activeDay === i ? "rgba(200,169,110,0.15)" : "#16161f",
            border: `1px solid ${activeDay === i ? "#c8a96e" : "#2a2a3a"}`,
            borderRadius: "8px", padding: "8px 14px",
            color: activeDay === i ? "#e8d5a3" : "#8a8799",
            fontSize: "12px", letterSpacing: "0.5px",
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
        {day.meals.map((meal, i) => (
          <div key={i} onClick={() => setExpanded(expanded === i ? null : i)} style={{
            background: expanded === i ? "rgba(200,169,110,0.05)" : "#16161f",
            border: `1px solid ${expanded === i ? mealColors[meal.type] + "60" : "#2a2a3a"}`,
            borderRadius: "10px", padding: "14px 16px", cursor: "pointer",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
              <div style={{ flexShrink: 0, marginTop: "2px" }}>
                <div style={{ fontSize: "9px", letterSpacing: "1.5px", textTransform: "uppercase", color: mealColors[meal.type], marginBottom: "3px" }}>{meal.type}</div>
                <div style={{ fontSize: "13px", color: "#e8d5a3" }}>{meal.name}</div>
              </div>
              <div style={{ marginLeft: "auto", textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: "12px", color: "#d4788a" }}>{meal.cals} cal</div>
                <div style={{ fontSize: "11px", color: "#5fbfb0" }}>{meal.protein}g protein</div>
              </div>
            </div>
            {expanded === i && (
              <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #2a2a3a" }}>
                {meal.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: "8px", alignItems: "center", padding: "5px 0", borderBottom: j < meal.items.length - 1 ? "1px solid #1e1e28" : "none" }}>
                    <span style={{ color: mealColors[meal.type], fontSize: "10px" }}>◆</span>
                    <span style={{ fontSize: "13px", color: "#8a8799" }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
