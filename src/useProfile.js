import { useState, useEffect } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./AuthContext";

export const DEFAULT_PROFILE = {
  weight: 150,
  heightFt: 5,
  heightIn: 5,
  age: 35,
  goal: "lose",
};

// Mifflin-St Jeor (female) + lightly active multiplier
export function calcNutrition(profile) {
  const { weight, heightFt, heightIn, age, goal } = profile;

  const totalInches = (heightFt || 5) * 12 + (heightIn || 5);
  const heightCm = totalInches * 2.54;
  const weightKg = (weight || 150) * 0.453592;
  const ageNum = age || 35;

  // BMR for women (Mifflin-St Jeor)
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161;

  // Lightly active (exercises 1-3 days/week) → ×1.375
  // Moderately active (3-5 days/week) → ×1.55
  // Using 1.375 as conservative base since the 16-week plan builds up
  const tdee = Math.round(bmr * 1.375);

  let calMin, calMax, proteinMin, proteinMax, outcome;

  if (goal === "lose") {
    // 500–700 cal deficit = ~0.75–1 lb/week loss
    calMin = Math.max(1200, Math.round(tdee - 700));
    calMax = Math.max(1300, Math.round(tdee - 500));
    proteinMin = Math.round(weight * 0.7);
    proteinMax = Math.round(weight * 0.75);
    outcome = "~0.75–1 lb/week loss";
  } else if (goal === "gain") {
    // 500–700 cal surplus = ~0.75–1 lb/week gain
    calMin = Math.round(tdee + 500);
    calMax = Math.round(tdee + 700);
    proteinMin = Math.round(weight * 0.75);
    proteinMax = Math.round(weight * 0.85);
    outcome = "~0.75–1 lb/week gain";
  } else {
    // Maintain: ±100 of TDEE
    calMin = Math.round(tdee - 100);
    calMax = Math.round(tdee + 100);
    proteinMin = Math.round(weight * 0.6);
    proteinMax = Math.round(weight * 0.7);
    outcome = "weight maintenance";
  }

  const heightStr = `${heightFt || 5}′${heightIn ?? 5}″`;

  return {
    tdee,
    calRange: `${calMin.toLocaleString()}–${calMax.toLocaleString()}`,
    calMin,
    calMax,
    proteinRange: `${proteinMin}–${proteinMax}g`,
    proteinMin,
    proteinMax,
    outcome,
    heightStr,
  };
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const ref = doc(db, "users", user.uid);
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setProfile(snap.data().profile || DEFAULT_PROFILE);
      } else {
        setProfile({ ...DEFAULT_PROFILE });
      }
      setLoading(false);
    });
    return unsub;
  }, [user]);

  const saveProfile = async (newProfile) => {
    if (!user) return;
    setProfile(newProfile);
    await setDoc(doc(db, "users", user.uid), { profile: newProfile }, { merge: true });
  };

  return { profile: profile || DEFAULT_PROFILE, loading, saveProfile };
}
