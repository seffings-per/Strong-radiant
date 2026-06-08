export const palette = {
  bg: "#0f0f14",
  card: "#16161f",
  cardBorder: "#2a2a3a",
  accent: "#c8a96e",
  accentSoft: "#e8d5a3",
  teal: "#5fbfb0",
  rose: "#d4788a",
  lavender: "#9b8ec4",
  text: "#e8e4dc",
  muted: "#8a8799",
};

export const phases = [
  {
    id: 1, label: "Phase 1", duration: "Weeks 1–4", theme: "Foundation",
    tagline: "Build the habit. Wake up the body.", color: "#5fbfb0",
    note: "Every workout is 15 minutes. The goal isn't intensity — it's consistency. Showing up daily builds the neurological habit. Don't push hard; just don't skip.",
    days: [
      { day: "Monday", focus: "Strength — Upper Body", icon: "💪", detail: "Free weights. 3 rounds: bicep curls, shoulder press, bent-over row, chest press on floor. Light weight, 10–12 reps each." },
      { day: "Tuesday", focus: "Low-Impact Cardio", icon: "🚶", detail: "Treadmill walk at comfortable pace, slight incline (1–2%). 15 minutes steady. Focus on posture." },
      { day: "Wednesday", focus: "Rest or Gentle Stretch", icon: "🌿", detail: "Optional: 10 min seated or standing stretch. Hip circles, shoulder rolls, calf raises, gentle spinal twist in a chair." },
      { day: "Thursday", focus: "Strength — Lower Body (Knee-Safe)", icon: "🏋️", detail: "Seated leg lifts, standing side leg raises, glute bridges (lying flat — no knee stress), wall sits (partial). 3 rounds, 12 reps." },
      { day: "Friday", focus: "Rowing Machine", icon: "🚣", detail: "15 minutes easy rowing. Focus on form: drive with legs, lean back slightly, pull to lower chest. Keep it conversational pace." },
      { day: "Saturday", focus: "Pilates-Inspired Core", icon: "✨", detail: "Standing Pilates focus. Hundred (standing), standing leg circles, pelvic tilts (lying), dead bug, heel slides. No child's pose, minimal kneeling." },
      { day: "Sunday", focus: "Full Rest", icon: "🌙", detail: "Intentional rest. Hydrate well. Light walking if you feel like it — nothing scheduled." },
    ],
  },
  {
    id: 2, label: "Phase 2", duration: "Weeks 5–10", theme: "Build",
    tagline: "Add resistance. Extend cardio. Feel the shift.", color: "#9b8ec4",
    note: "Sessions grow to 20–25 minutes. You'll start to feel actual strength gains and notice your endurance improving. Add weight when 12 reps feels easy.",
    days: [
      { day: "Monday", focus: "Strength — Upper Body + Core", icon: "💪", detail: "Add tricep kickbacks and lateral raises. Increase weight slightly. Add 2 sets of dead bug or standing oblique crunches. 25 min total." },
      { day: "Tuesday", focus: "Treadmill Intervals", icon: "🚶", detail: "20 min: 3 min walk / 1 min brisk walk, repeat. No running — just a meaningful pace increase. Heart rate challenge." },
      { day: "Wednesday", focus: "Yoga — Standing & Chair", icon: "🧘", detail: "Warrior I & II, Tree pose, Standing Forward Fold (bent knees), Chair pose, Goddess. Use a chair for balance. No floor kneeling required." },
      { day: "Thursday", focus: "Strength — Lower Body", icon: "🏋️", detail: "Add resistance band to glute bridges. Introduce Romanian deadlifts with dumbbells (hip hinge, knee-friendly). 3–4 rounds." },
      { day: "Friday", focus: "Rowing — Moderate Push", icon: "🚣", detail: "20 min. Add 2 short effort bursts (30 sec hard, 90 sec easy). Great for metabolism and total body endurance." },
      { day: "Saturday", focus: "Full Body Circuit", icon: "⚡", detail: "6 exercises, 40 sec on / 20 sec rest. Dumbbell swing, standing march, bent-over row, lateral step, shoulder press, glute bridge. 3 rounds." },
      { day: "Sunday", focus: "Rest + Mobility", icon: "🌙", detail: "Seated hip opener, figure-four stretch in a chair, gentle neck and shoulder release. 10 min if desired." },
    ],
  },
  {
    id: 3, label: "Phase 3", duration: "Weeks 11–16", theme: "Momentum",
    tagline: "Toning, strength gains, and visible change.", color: "#d4788a",
    note: "This is where visible change happens. Protein is essential now — hit your daily target. Strength and toning accelerate when nutrition and training align.",
    days: [
      { day: "Monday", focus: "Strength — Push Day", icon: "💪", detail: "Floor chest press, shoulder press, tricep extensions, Arnold press. Heavier weight, 8–10 reps. 4 rounds. 25–30 min." },
      { day: "Tuesday", focus: "Cardio + Intervals", icon: "🚶", detail: "25 min treadmill: 5 min warm-up, 15 min intervals (2 min moderate / 1 min brisk), 5 min cool-down." },
      { day: "Wednesday", focus: "Pilates Flow", icon: "✨", detail: "30 min standing Pilates. Plié squats, standing oblique work, Pilates stance heel raises, supine work on mat (no kneeling). Leg pull front standing variation." },
      { day: "Thursday", focus: "Strength — Pull + Hinge", icon: "🏋️", detail: "Dumbbell rows, Romanian deadlifts, lat pulldown (band), reverse fly. 4 rounds, 10 reps. Strong back = strong posture." },
      { day: "Friday", focus: "Rowing — Endurance", icon: "🚣", detail: "25–30 min steady row. Target a pace you can maintain. Track distance and try to beat it each week." },
      { day: "Saturday", focus: "Yoga + Strength Hybrid", icon: "🧘", detail: "Warrior flow, chair pose hold, standing balance, then finish with dumbbell work: curls, press, lateral raise. 30 min total." },
      { day: "Sunday", focus: "Full Rest", icon: "🌙", detail: "Rest is where strength is built. Eat well, sleep, hydrate." },
    ],
  },
];

export const kneeTips = [
  "Always warm up the knees with 3–5 min of gentle walking before any lower body work",
  "Never lock out knees during exercises — keep a soft bend",
  "Glute bridges are your best friend — all the lower body benefit, zero knee compression",
  "Romanian deadlifts are safer than squats because the knee bend is minimal",
  "When walking on the treadmill, avoid steep downhill — it stresses the knee joint more than uphill",
  "Rowing distributes force through hips and glutes — generally very knee-friendly",
  "If a yoga pose causes knee pinching, use a rolled towel behind the knee or skip it",
  "Ice knees for 10 min after workouts if there's any swelling or heat",
];

export const safeExercises = [
  "Glute bridges","Romanian deadlifts","Seated leg extensions",
  "Standing side leg raises","Clamshells (lying)","Wall sits (partial)",
  "Treadmill walking","Rowing machine","Seated upper body work",
  "Standing Pilates","Chair yoga","Water walking (if accessible)",
];

export const mealPlan = {
  calories: "1,700–1,900",
  protein: "130–155g",
  days: [
    {
      day: "Monday",
      meals: [
        { type: "Breakfast", name: "Greek Yogurt Power Bowl", cals: 420, protein: 38, items: ["1 cup plain 2% Greek yogurt","¼ cup blueberries","2 tbsp almond butter","1 tbsp chia seeds","Drizzle of honey"] },
        { type: "Lunch", name: "Chicken & Veggie Mason Jar Salad", cals: 490, protein: 42, items: ["5 oz grilled chicken breast","2 cups mixed greens","½ cup chickpeas","½ cup cucumber & tomato","2 tbsp olive oil & lemon dressing"] },
        { type: "Snack", name: "Cottage Cheese & Fruit", cals: 180, protein: 20, items: ["¾ cup low-fat cottage cheese","½ cup sliced strawberries"] },
        { type: "Dinner", name: "Salmon with Roasted Vegetables", cals: 540, protein: 44, items: ["6 oz salmon fillet","1 cup roasted broccoli & zucchini","½ cup wild rice","1 tsp olive oil","Lemon & herbs"] },
      ]
    },
    {
      day: "Tuesday",
      meals: [
        { type: "Breakfast", name: "Egg & Veggie Scramble", cals: 380, protein: 34, items: ["3 whole eggs","1 cup spinach","¼ cup diced bell pepper","1 oz feta cheese","1 slice Ezekiel toast"] },
        { type: "Lunch", name: "Turkey Lettuce Wrap Plate", cals: 430, protein: 40, items: ["5 oz ground turkey (seasoned)","Romaine lettuce wraps","½ avocado","Salsa & Greek yogurt (as sour cream)","Side of cherry tomatoes"] },
        { type: "Snack", name: "Protein Shake", cals: 200, protein: 25, items: ["1 scoop whey or plant protein","1 cup unsweetened almond milk","½ banana","Ice"] },
        { type: "Dinner", name: "Sheet Pan Chicken Thighs", cals: 510, protein: 45, items: ["6 oz skinless chicken thigh","1 cup roasted sweet potato","1 cup green beans","1 tbsp olive oil","Garlic & rosemary"] },
      ]
    },
    {
      day: "Wednesday",
      meals: [
        { type: "Breakfast", name: "Overnight Oats", cals: 410, protein: 28, items: ["½ cup rolled oats","1 cup unsweetened almond milk","1 scoop protein powder","1 tbsp flaxseed","½ cup raspberries"] },
        { type: "Lunch", name: "Tuna Stuffed Avocado", cals: 450, protein: 38, items: ["1 can albacore tuna (5 oz drained)","1 whole avocado","1 tbsp olive oil mayo","Celery & red onion","Side salad with olive oil"] },
        { type: "Snack", name: "Hard Boiled Eggs & Veggies", cals: 160, protein: 14, items: ["2 hard boiled eggs","Sliced cucumber & bell pepper"] },
        { type: "Dinner", name: "Shrimp Stir-Fry", cals: 490, protein: 42, items: ["6 oz shrimp","2 cups bok choy & snap peas","½ cup brown rice","Coconut aminos & ginger sauce","1 tsp sesame oil"] },
      ]
    },
    {
      day: "Thursday",
      meals: [
        { type: "Breakfast", name: "Smoked Salmon Plate", cals: 390, protein: 36, items: ["3 oz smoked salmon","2 eggs (poached or scrambled)","1 cup arugula","1 tbsp capers","1 Wasa crispbread"] },
        { type: "Lunch", name: "Lentil & Chicken Soup", cals: 460, protein: 40, items: ["4 oz chicken breast (shredded)","½ cup green lentils","1 cup low-sodium broth","Carrots, celery, spinach","Cumin & turmeric (anti-inflammatory)"] },
        { type: "Snack", name: "Apple & Almond Butter", cals: 200, protein: 7, items: ["1 medium apple","2 tbsp almond butter"] },
        { type: "Dinner", name: "Beef & Broccoli Bowl", cals: 520, protein: 46, items: ["5 oz lean ground beef or sirloin","2 cups broccoli","½ cup cauliflower rice","Coconut aminos & garlic","1 tsp olive oil"] },
      ]
    },
    {
      day: "Friday",
      meals: [
        { type: "Breakfast", name: "Protein Pancakes", cals: 400, protein: 32, items: ["½ cup oat flour","1 scoop protein powder","2 eggs","½ cup unsweetened almond milk","Top with berries (no syrup)"] },
        { type: "Lunch", name: "Big Anti-Inflammatory Salad", cals: 470, protein: 38, items: ["5 oz grilled chicken","2 cups kale","¼ cup walnuts","½ cup blueberries","2 tbsp olive oil & apple cider vinegar dressing"] },
        { type: "Snack", name: "Edamame", cals: 150, protein: 12, items: ["1 cup shelled edamame","Pinch of sea salt"] },
        { type: "Dinner", name: "Baked Cod with Sweet Potato", cals: 510, protein: 44, items: ["6 oz cod fillet","1 medium sweet potato (baked)","1 cup asparagus","Lemon, olive oil, dill","Side of sauerkraut (gut health)"] },
      ]
    },
    {
      day: "Saturday",
      meals: [
        { type: "Breakfast", name: "Weekend Veggie Omelette", cals: 430, protein: 36, items: ["3 eggs + 2 egg whites","Mushrooms, spinach, onion","1 oz goat cheese","1 slice sourdough toast","Side of sliced tomato"] },
        { type: "Lunch", name: "Grain Bowl", cals: 490, protein: 36, items: ["½ cup farro or quinoa","4 oz chickpeas (roasted)","Roasted beets & arugula","2 oz feta","Tahini lemon dressing"] },
        { type: "Snack", name: "Bone Broth + String Cheese", cals: 130, protein: 14, items: ["1 cup bone broth","1 string cheese"] },
        { type: "Dinner", name: "Salmon Tacos", cals: 530, protein: 42, items: ["5 oz salmon","2 corn tortillas","Shredded cabbage","Greek yogurt crema","Avocado slices & lime"] },
      ]
    },
    {
      day: "Sunday",
      meals: [
        { type: "Breakfast", name: "Smoothie Bowl", cals: 400, protein: 30, items: ["1 scoop protein powder","1 cup frozen mixed berries","½ banana","1 cup spinach","Top: granola, chia seeds, coconut flakes"] },
        { type: "Lunch", name: "Chicken & Sweet Potato Meal Prep Bowl", cals: 480, protein: 44, items: ["6 oz roasted chicken breast","1 cup roasted sweet potato","1 cup steamed broccoli","1 tbsp olive oil","Herbs & lemon"] },
        { type: "Snack", name: "Cottage Cheese & Walnuts", cals: 200, protein: 18, items: ["¾ cup cottage cheese","¼ cup walnuts","Cinnamon"] },
        { type: "Dinner", name: "Turkey Meatballs & Zucchini Noodles", cals: 490, protein: 44, items: ["5 oz turkey meatballs (baked)","2 cups zucchini noodles","½ cup marinara (low sugar)","1 tbsp parmesan","Fresh basil"] },
      ]
    },
  ]
};

export const groceryList = {
  categories: [
    {
      name: "Proteins",
      icon: "🥩",
      color: "#d4788a",
      items: [
        "Chicken breast (2 lbs)", "Chicken thighs, skinless (1 lb)", "Salmon fillets (1.5 lbs)",
        "Albacore tuna, canned (3 cans)", "Shrimp, frozen (1 lb)", "Cod fillets (1 lb)",
        "Ground turkey (1 lb)", "Lean ground beef or sirloin (1 lb)", "Smoked salmon (4 oz)",
        "Eggs, large (2 dozen)", "Plain Greek yogurt, 2% (32 oz)", "Cottage cheese, low-fat (16 oz)",
        "Whey or plant protein powder (1 container)", "String cheese (1 pack)", "Edamame, frozen (1 bag)",
      ]
    },
    {
      name: "Vegetables",
      icon: "🥦",
      color: "#5fbfb0",
      items: [
        "Baby spinach (10 oz bag)", "Kale (1 bunch)", "Arugula (5 oz)", "Romaine lettuce (1 head)",
        "Mixed greens (5 oz)", "Broccoli (2 heads)", "Zucchini (3)", "Bok choy (1 head)",
        "Snap peas (1 bag)", "Asparagus (1 bunch)", "Green beans (1 lb)", "Sweet potatoes (4)",
        "Bell peppers, assorted (4)", "Mushrooms (8 oz)", "Cucumber (2)", "Cherry tomatoes (1 pint)",
        "Tomatoes (3)", "Celery (1 bunch)", "Red onion (2)", "Garlic (1 head)",
        "Beets, pre-roasted (1 pack)", "Cauliflower rice, frozen (1 bag)", "Sauerkraut (1 jar)",
      ]
    },
    {
      name: "Fruits",
      icon: "🫐",
      color: "#9b8ec4",
      items: [
        "Blueberries (1 pint)", "Raspberries (1 pint)", "Strawberries (1 lb)",
        "Frozen mixed berries (2 bags)", "Bananas (1 bunch)", "Apples (4)",
        "Avocados (4)", "Lemons (4)", "Limes (2)",
      ]
    },
    {
      name: "Grains & Pantry",
      icon: "🌾",
      color: "#c8a96e",
      items: [
        "Rolled oats (1 container)", "Oat flour (1 bag)", "Wild rice (1 bag)",
        "Brown rice (1 bag)", "Farro or quinoa (1 bag)", "Corn tortillas (1 pack)",
        "Ezekiel bread (1 loaf)", "Sourdough bread (1 loaf)", "Wasa crispbread",
        "Green lentils (1 bag)", "Chickpeas, canned (2 cans)", "Low-sodium chicken broth (32 oz)",
        "Marinara sauce, low-sugar (1 jar)", "Coconut aminos (1 bottle)", "Olive oil (1 bottle)",
        "Sesame oil (small bottle)", "Almond butter (1 jar)", "Tahini (1 jar)",
        "Chia seeds", "Flaxseed", "Walnuts (1 bag)", "Bone broth (1 quart)",
      ]
    },
    {
      name: "Dairy & Refrigerated",
      icon: "🧀",
      color: "#e8d5a3",
      items: [
        "Unsweetened almond milk (half gallon)", "Feta cheese (4 oz)", "Goat cheese (4 oz)",
        "Parmesan (small wedge)", "Olive oil mayo (small jar)", "Capers (1 small jar)",
      ]
    },
    {
      name: "Herbs & Spices",
      icon: "🌿",
      color: "#5fbfb0",
      items: [
        "Cumin", "Turmeric", "Garlic powder", "Rosemary (fresh or dried)",
        "Dill (fresh or dried)", "Ginger (fresh or ground)", "Cinnamon",
        "Sea salt", "Black pepper", "Red pepper flakes",
      ]
    },
  ]
};
