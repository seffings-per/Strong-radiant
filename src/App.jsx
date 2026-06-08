import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { AuthProvider, useAuth } from "./AuthContext";
import AuthScreen from "./components/AuthScreen";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import PlanTab from "./components/PlanTab";
import NutritionTab from "./components/NutritionTab";
import MealsTab from "./components/MealsTab";
import GroceryTab from "./components/GroceryTab";
import KneeTab from "./components/KneeTab";
import WorkoutLog from "./components/WorkoutLog";
import ProgressTab from "./components/ProgressTab";

function AppInner() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("plan");

  // Still checking auth state
  if (user === undefined) {
    return (
      <div style={{ height: "100dvh", background: "#0f0f14", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "#c8a96e", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase" }}>Loading…</div>
      </div>
    );
  }

  // Not signed in
  if (!user) return <AuthScreen />;

  const renderTab = () => {
    switch (activeTab) {
      case "plan":      return <PlanTab />;
      case "nutrition": return <NutritionTab />;
      case "meals":     return <MealsTab />;
      case "grocery":   return <GroceryTab />;
      case "log":       return <WorkoutLog />;
      case "progress":  return <ProgressTab />;
      case "knees":     return <KneeTab />;
      default:          return <PlanTab />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100dvh", background: "#0f0f14", overflow: "hidden" }}>
      <Header user={user} onSignOut={() => signOut(auth)} />
      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "16px 16px 90px" }}>
          {renderTab()}
        </div>
      </div>
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
