import { useState } from "react";
import { groceryList } from "../data";

export default function GroceryTab() {
  const [checked, setChecked] = useState({});
  const [collapsed, setCollapsed] = useState({});

  const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleCat = (name) => setCollapsed(prev => ({ ...prev, [name]: !prev[name] }));

  const totalItems = groceryList.categories.reduce((s, c) => s + c.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      {/* Progress */}
      <div style={{ background: "#16161f", border: "1px solid #2a2a3a", borderRadius: "10px", padding: "14px 16px", marginBottom: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <span style={{ fontSize: "12px", color: "#8a8799" }}>Shopping progress</span>
          <span style={{ fontSize: "13px", color: "#c8a96e" }}>{checkedCount}/{totalItems}</span>
        </div>
        <div style={{ height: "4px", background: "#2a2a3a", borderRadius: "2px" }}>
          <div style={{ height: "100%", width: `${(checkedCount / totalItems) * 100}%`, background: "linear-gradient(90deg, #5fbfb0, #c8a96e)", borderRadius: "2px", transition: "width 0.3s" }} />
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {groceryList.categories.map(cat => {
          const isOpen = !collapsed[cat.name];
          const catChecked = cat.items.filter((_, i) => checked[`${cat.name}-${i}`]).length;
          return (
            <div key={cat.name} style={{ background: "#16161f", border: `1px solid ${cat.color}30`, borderRadius: "10px", overflow: "hidden" }}>
              <button onClick={() => toggleCat(cat.name)} style={{
                width: "100%", background: "none", border: "none", padding: "13px 16px",
                display: "flex", alignItems: "center", gap: "10px", color: "#e8e4dc", textAlign: "left",
              }}>
                <span style={{ fontSize: "18px" }}>{cat.icon}</span>
                <span style={{ flex: 1, fontSize: "14px", color: "#e8d5a3" }}>{cat.name}</span>
                <span style={{ fontSize: "11px", color: cat.color }}>{catChecked}/{cat.items.length}</span>
                <span style={{ color: "#8a8799", transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 0.2s", fontSize: "16px" }}>›</span>
              </button>
              {isOpen && (
                <div style={{ borderTop: "1px solid #2a2a3a" }}>
                  {cat.items.map((item, i) => {
                    const key = `${cat.name}-${i}`;
                    const done = checked[key];
                    return (
                      <div key={i} onClick={() => toggle(key)} style={{
                        padding: "11px 16px", display: "flex", gap: "12px", alignItems: "center",
                        borderBottom: i < cat.items.length - 1 ? "1px solid #1e1e28" : "none",
                        cursor: "pointer", background: done ? "rgba(255,255,255,0.02)" : "none",
                      }}>
                        <div style={{
                          width: "18px", height: "18px", borderRadius: "4px", flexShrink: 0,
                          border: `1.5px solid ${done ? cat.color : "#3a3a4a"}`,
                          background: done ? cat.color : "none",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.15s",
                        }}>
                          {done && <span style={{ color: "#0f0f14", fontSize: "11px", fontWeight: 700 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: "13px", color: done ? "#4a4a5a" : "#8a8799", textDecoration: done ? "line-through" : "none", transition: "color 0.15s" }}>{item}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: "14px", textAlign: "center" }}>
        <button onClick={() => setChecked({})} style={{ background: "none", border: "1px solid #2a2a3a", borderRadius: "8px", padding: "10px 20px", color: "#8a8799", fontSize: "12px", letterSpacing: "1px", textTransform: "uppercase" }}>
          Reset List
        </button>
      </div>
    </div>
  );
}
