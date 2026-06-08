export const exercises = {

  // ─── UPPER BODY STRENGTH ───────────────────────────────────────────────

  bicepCurl: {
    name: "Bicep Curl",
    icon: "💪",
    muscles: "Biceps, forearms",
    equipment: "Dumbbells",
    muscleColor: "#c8a96e",
    steps: [
      "Stand tall, feet hip-width apart, a dumbbell in each hand",
      "Arms hang at your sides, palms facing forward",
      "Keeping elbows pinned to your sides, curl both weights up toward your shoulders",
      "Squeeze at the top for 1 second, then lower slowly over 3 counts"
    ],
    cues: [
      "Elbows stay glued to your ribs — no swinging",
      "Lower just as slowly as you lift — that's where the work happens",
      "Wrists stay neutral (don't bend them back)"
    ]
  },

  shoulderPress: {
    name: "Shoulder Press",
    icon: "🏋️",
    muscles: "Shoulders (deltoids), triceps, upper traps",
    equipment: "Dumbbells",
    muscleColor: "#c8a96e",
    steps: [
      "Hold dumbbells at shoulder height, palms facing forward, elbows at 90°",
      "Press both weights straight overhead until arms are nearly straight",
      "Don't lock out elbows — keep a soft bend at the top",
      "Lower back to shoulder height with control"
    ],
    cues: [
      "Keep your core tight — don't arch your lower back to push",
      "Press straight up, not forward",
      "Breathe out as you press up, in as you lower"
    ]
  },

  bentOverRow: {
    name: "Bent-Over Row",
    icon: "↕️",
    muscles: "Upper back (lats, rhomboids), rear shoulders, biceps",
    equipment: "Dumbbells",
    muscleColor: "#5fbfb0",
    steps: [
      "Stand with feet hip-width, hinge forward at the hips about 45° — back flat, not rounded",
      "Let dumbbells hang straight down from your shoulders",
      "Pull both weights toward your lower ribs, leading with your elbows",
      "Squeeze shoulder blades together at the top, then lower slowly"
    ],
    cues: [
      "Keep your back flat — imagine balancing a book on it",
      "Pull to the hips, not to the chest — elbows stay close to body",
      "Don't jerk or use momentum — slow and controlled"
    ]
  },

  chestPress: {
    name: "Chest Press (Floor)",
    icon: "⬆️",
    muscles: "Chest (pectorals), triceps, front shoulders",
    equipment: "Dumbbells, mat",
    muscleColor: "#c8a96e",
    steps: [
      "Lie on your back on the floor, knees bent, feet flat",
      "Hold dumbbells at chest level, elbows at about 45° from your body",
      "Press both weights up until arms are straight over your chest",
      "Lower until your elbows touch the floor, pause, then press again"
    ],
    cues: [
      "Floor limits range of motion safely — elbows touching floor is your stop point",
      "Don't let weights drift apart — keep them over your chest",
      "Press on the exhale, lower on the inhale"
    ]
  },

  tricepKickback: {
    name: "Tricep Kickback",
    icon: "↩️",
    muscles: "Triceps (back of upper arm)",
    equipment: "Dumbbells",
    muscleColor: "#d4788a",
    steps: [
      "Hinge forward at hips, back flat, holding dumbbells with palms facing in",
      "Bend elbows to 90°, upper arms parallel to the floor",
      "Extend your forearms back until arms are straight, squeezing the tricep",
      "Slowly return to 90° and repeat"
    ],
    cues: [
      "Upper arm stays still and parallel to floor — only the forearm moves",
      "Squeeze hard at full extension before returning",
      "Light weights work best here — form over load"
    ]
  },

  lateralRaise: {
    name: "Lateral Raise",
    icon: "↔️",
    muscles: "Side deltoids (shoulders)",
    equipment: "Dumbbells",
    muscleColor: "#c8a96e",
    steps: [
      "Stand tall, dumbbells at your sides with a slight bend in your elbows",
      "Raise both arms out to the sides until parallel to the floor (like a T shape)",
      "Lead with your elbows, not your hands",
      "Lower slowly back to your sides over 3 counts"
    ],
    cues: [
      "Thumbs stay slightly lower than pinkies (like pouring a pitcher)",
      "Don't shrug your shoulders — they should stay down and relaxed",
      "Go lighter than you think — this is a small muscle"
    ]
  },

  tricepExtension: {
    name: "Tricep Extension",
    icon: "🔼",
    muscles: "Triceps (back of upper arm)",
    equipment: "One dumbbell",
    muscleColor: "#d4788a",
    steps: [
      "Hold one dumbbell in both hands overhead, arms straight",
      "Keeping upper arms close to your head, bend elbows to lower the weight behind your head",
      "Stop when forearms are parallel to the floor (or as low as comfortable)",
      "Press back up to the start, squeezing triceps"
    ],
    cues: [
      "Upper arms stay pointed at the ceiling — only the forearms move",
      "Keep elbows from flaring out to the sides",
      "Move slowly — this stretch position can feel intense"
    ]
  },

  arnoldPress: {
    name: "Arnold Press",
    icon: "🔄",
    muscles: "All three deltoid heads, triceps",
    equipment: "Dumbbells",
    muscleColor: "#c8a96e",
    steps: [
      "Start with dumbbells at shoulder height, palms facing you (like a bicep curl end position)",
      "As you press up, rotate your palms forward so they face away at the top",
      "At the top, arms are overhead with palms facing out",
      "Reverse the rotation as you lower back to the start"
    ],
    cues: [
      "The rotation is the whole point — move smoothly, don't jerk",
      "Keep core tight throughout; don't arch your back",
      "Full range of motion matters more than heavy weight here"
    ]
  },

  // ─── BACK & PULLING ───────────────────────────────────────────────────

  dumbbellRow: {
    name: "Dumbbell Row",
    icon: "🎯",
    muscles: "Lats, rhomboids, rear shoulder, biceps",
    equipment: "Dumbbell, sturdy chair or bench",
    muscleColor: "#5fbfb0",
    steps: [
      "Place one hand and the same-side knee on a chair for support",
      "Hold a dumbbell in the other hand, arm hanging straight down",
      "Pull the dumbbell up to your hip/lower ribs, elbow grazing your side",
      "Lower fully and repeat, then switch sides"
    ],
    cues: [
      "Keep your back flat and parallel to the floor",
      "Think: 'elbow to hip' not 'hand to shoulder'",
      "Full stretch at the bottom — feel the lat lengthen"
    ]
  },

  latPulldown: {
    name: "Lat Pulldown (Band)",
    icon: "⬇️",
    muscles: "Lats (outer back), biceps, rear shoulder",
    equipment: "Resistance band anchored overhead",
    muscleColor: "#5fbfb0",
    steps: [
      "Anchor a resistance band overhead (door frame, high bar, or hold arms overhead)",
      "Grab both ends, arms wide, palms facing away",
      "Pull elbows down and in toward your hips, squeezing shoulder blades together",
      "Slowly return arms overhead — feel the stretch in your back"
    ],
    cues: [
      "Think 'elbows to back pockets' as you pull",
      "Don't lean back excessively — this is a back exercise, not a lean",
      "The slow return is just as important as the pull"
    ]
  },

  reverseFly: {
    name: "Reverse Fly",
    icon: "🦅",
    muscles: "Rear deltoids, rhomboids, mid-trap",
    equipment: "Dumbbells",
    muscleColor: "#5fbfb0",
    steps: [
      "Hinge forward at the hips about 45°, back flat, dumbbells hanging down",
      "With a soft bend in your elbows, raise both arms out to the sides",
      "Lift until arms are parallel to the floor — think 'open the wings'",
      "Slowly lower back down, feeling the rear shoulder and back"
    ],
    cues: [
      "This is a small muscle — use lighter weight than you'd expect",
      "Squeeze shoulder blades together at the top",
      "Don't use momentum — slow is everything here"
    ]
  },

  // ─── LOWER BODY ───────────────────────────────────────────────────────

  seatedLegLift: {
    name: "Seated Leg Lift",
    icon: "🦵",
    muscles: "Hip flexors, quads — zero knee compression",
    equipment: "Chair",
    muscleColor: "#9b8ec4",
    steps: [
      "Sit tall in a sturdy chair, feet flat on the floor",
      "Tighten your core and slowly lift one leg, straightening the knee",
      "Hold the leg extended for 2–3 seconds, then lower slowly",
      "Alternate legs or complete all reps on one side first"
    ],
    cues: [
      "Sit up straight — don't let your back round as you lift",
      "Keep the working leg's thigh pressed down (don't let the hip pop up)",
      "Point toes slightly for an extra quad squeeze"
    ]
  },

  sideLegsRaise: {
    name: "Standing Side Leg Raise",
    icon: "↗️",
    muscles: "Hip abductors (outer hip/glutes), core stability",
    equipment: "Optional: wall or chair for balance",
    muscleColor: "#9b8ec4",
    steps: [
      "Stand tall, feet together, hand on wall for balance if needed",
      "Keeping your leg straight and toes forward (not turned out), lift to the side",
      "Raise to about hip height — don't lean to compensate",
      "Lower slowly, tap the floor, and lift again"
    ],
    cues: [
      "Keep your hips level — no side-tilting to get the leg higher",
      "Slow the lowering phase — that's where the glute works hardest",
      "Toes face forward, not up toward the ceiling"
    ]
  },

  gluteBridge: {
    name: "Glute Bridge",
    icon: "🌉",
    muscles: "Glutes, hamstrings — knee-safe, all the lower body benefit",
    equipment: "Mat (optional resistance band above knees)",
    muscleColor: "#9b8ec4",
    steps: [
      "Lie on your back, knees bent, feet flat on the floor hip-width apart",
      "Press through your heels and squeeze your glutes to lift your hips",
      "Rise until your body forms a straight line from knees to shoulders",
      "Hold at the top for 2 seconds, then lower slowly — don't let hips drop all the way"
    ],
    cues: [
      "Drive through heels, not your toes",
      "Squeeze glutes hard at the top — this is the whole point",
      "Don't over-arch your lower back; tuck the tailbone slightly"
    ]
  },

  wallSit: {
    name: "Wall Sit (Partial)",
    icon: "🧱",
    muscles: "Quads, glutes, hamstrings — isometric hold",
    equipment: "Flat wall",
    muscleColor: "#9b8ec4",
    steps: [
      "Stand with your back flat against the wall, feet 2 feet out from the wall",
      "Slide down until knees are at a comfortable angle — stop before 90° if needed",
      "Hold the position, keeping back flat against the wall throughout",
      "Hold for 20–45 seconds, working up to longer holds over time"
    ],
    cues: [
      "Stop at whatever angle is pain-free in your knees — even 30° counts",
      "Keep weight in your heels, not your toes",
      "Back stays flat against the wall at all times"
    ]
  },

  romanianDeadlift: {
    name: "Romanian Deadlift",
    icon: "🔽",
    muscles: "Hamstrings, glutes, lower back — minimal knee bend",
    equipment: "Dumbbells",
    muscleColor: "#9b8ec4",
    steps: [
      "Stand holding dumbbells in front of your thighs, feet hip-width",
      "Hinge forward at the hips, pushing them back, letting weights slide down your legs",
      "Keep the weights close to your legs the whole way down — don't let them drift forward",
      "Lower until you feel a strong hamstring stretch (usually mid-shin), then drive hips forward to stand"
    ],
    cues: [
      "This is a hip hinge, not a squat — minimal knee bend",
      "Back stays flat and neutral — don't round",
      "Feel the stretch in the back of your legs — that's your depth cue"
    ]
  },

  // ─── PILATES ─────────────────────────────────────────────────────────

  standingHundred: {
    name: "Standing Hundred",
    icon: "✨",
    muscles: "Deep core (transverse abdominis), breath control",
    equipment: "None",
    muscleColor: "#d4788a",
    steps: [
      "Stand tall with feet together in Pilates stance (heels together, toes slightly apart)",
      "Reach arms forward and slightly down at hip height, palms down",
      "Engage your core by pulling the navel gently toward your spine",
      "Pump arms up and down in small, controlled pulses — 5 pumps inhale, 5 pumps exhale — for 100 pumps total"
    ],
    cues: [
      "The pumps are tiny — about 4 inches up and down",
      "Keep shoulders down and away from your ears",
      "Breathe in a rhythm: sniff-sniff-sniff-sniff-sniff, out-2-3-4-5"
    ]
  },

  legCircle: {
    name: "Standing Leg Circle",
    icon: "⭕",
    muscles: "Hip flexors, hip rotators, core stability",
    equipment: "Wall or chair for balance",
    muscleColor: "#d4788a",
    steps: [
      "Stand tall, one hand on a wall for balance",
      "Lift the outer leg slightly off the floor, keeping it straight",
      "Draw a smooth circle in the air with your foot — forward, out, back, and in",
      "Complete reps in one direction, then reverse; repeat on the other leg"
    ],
    cues: [
      "Keep your standing hip still — don't let it shift or tilt",
      "The circle comes from the hip joint, not the knee",
      "Keep the working leg below hip height for control"
    ]
  },

  pelvicTilt: {
    name: "Pelvic Tilt",
    icon: "↪️",
    muscles: "Deep core, lower abs, lumbar stabilizers",
    equipment: "Mat",
    muscleColor: "#d4788a",
    steps: [
      "Lie on your back, knees bent, feet flat. Relax your lower back — there should be a small gap between floor and spine",
      "Breathe in to prepare. Breathe out and gently tilt your pelvis: flatten your lower back against the floor by tightening lower abs",
      "Hold the flattened position for 3 seconds while breathing normally",
      "Release and let the natural curve return. Repeat."
    ],
    cues: [
      "This is a small, internal movement — you're not lifting your hips",
      "Think of it as 'zipping up' your lower belly",
      "Don't hold your breath — breathe through the hold"
    ]
  },

  deadBug: {
    name: "Dead Bug",
    icon: "🐛",
    muscles: "Deep core, anti-rotation stability",
    equipment: "Mat",
    muscleColor: "#d4788a",
    steps: [
      "Lie on your back, arms reaching straight to the ceiling, knees bent at 90° above your hips (like a dead bug)",
      "Press your lower back firmly into the floor and keep it there",
      "Slowly extend your right arm overhead and left leg toward the floor simultaneously",
      "Stop before your back arches — return, and repeat with opposite arm and leg"
    ],
    cues: [
      "Back stays FLAT on the floor throughout — the moment it peels up, you've gone too far",
      "Move slowly — speed is the enemy here",
      "Breathe out as you extend, in as you return"
    ]
  },

  heelSlides: {
    name: "Heel Slides",
    icon: "↔️",
    muscles: "Deep core, hip flexors — gentle and very knee-safe",
    equipment: "Mat (socks on floor work great)",
    muscleColor: "#d4788a",
    steps: [
      "Lie on your back, knees bent, feet flat. Engage your core to flatten your lower back slightly",
      "Keeping the core engaged, slowly slide one heel away from you, straightening the leg",
      "Slide it back to the start before the back arches — that's your range",
      "Alternate legs, keeping the lower back still the whole time"
    ],
    cues: [
      "The back must stay flat — reduce range of motion if it lifts",
      "Move in slow motion — this is core control, not a leg exercise",
      "Socks on a hardwood floor make the slide buttery smooth"
    ]
  },

  standingOblique: {
    name: "Standing Oblique Crunch",
    icon: "↕️",
    muscles: "Obliques (side abs), hip abductors",
    equipment: "None (optional: dumbbell)",
    muscleColor: "#d4788a",
    steps: [
      "Stand with feet hip-width, hands behind your head or arms overhead",
      "Lift your right knee toward your right elbow while side-crunching down to meet it",
      "Return to standing and repeat on the same side, then switch",
      "Keep it controlled — no flinging the knee up"
    ],
    cues: [
      "The crunch should come from your side, not just your hip flexor",
      "Keep your standing hip from popping out to the side",
      "Slow down the lowering of the leg for extra oblique work"
    ]
  },

  plieSquat: {
    name: "Plié Squat",
    icon: "🩰",
    muscles: "Inner thighs (adductors), glutes, quads",
    equipment: "Optional: one dumbbell held in center",
    muscleColor: "#d4788a",
    steps: [
      "Stand with feet wider than hip-width, toes turned out at 45°",
      "Keeping your torso upright, bend your knees and lower straight down (not forward)",
      "Knees track over your second toe — don't let them cave inward",
      "Press through heels to stand, squeezing inner thighs together at the top"
    ],
    cues: [
      "Knees track in line with toes — same direction, not caving in",
      "Keep your chest up; don't lean forward as you lower",
      "Squeeze the inner thighs and glutes as you rise"
    ]
  },

  heelRaises: {
    name: "Pilates Heel Raises",
    icon: "👣",
    muscles: "Calves (gastrocnemius, soleus), ankle stability",
    equipment: "Wall or barre for balance",
    muscleColor: "#d4788a",
    steps: [
      "Stand in Pilates stance (heels together, toes slightly apart), fingertips on a wall",
      "Engage your core and press through the balls of your feet to rise onto your toes",
      "Hold at the top for 2 counts, feeling the calves work",
      "Lower slowly over 3 counts — don't let heels thud down"
    ],
    cues: [
      "Rise evenly on both feet — don't roll to the outer or inner edge",
      "The slow lower is more beneficial than the rise",
      "Keep knees soft, not locked, throughout"
    ]
  },

  // ─── YOGA ─────────────────────────────────────────────────────────────

  warriorI: {
    name: "Warrior I",
    icon: "⚔️",
    muscles: "Hip flexors, quads, shoulders, chest opener",
    equipment: "Chair nearby for balance if needed",
    muscleColor: "#5fbfb0",
    steps: [
      "Step one foot forward into a lunge, front knee over ankle, back leg extended (or slightly bent)",
      "Turn your back foot out to about 45°, trying to square your hips toward the front",
      "Raise both arms overhead, palms facing each other, reaching tall",
      "Hold for 5–8 breaths, then switch sides"
    ],
    cues: [
      "Front knee stays over the ankle — don't let it drift past your toes",
      "Square your hips as much as possible toward the front wall",
      "Shoulders stay relaxed — don't scrunch them toward your ears"
    ]
  },

  warriorII: {
    name: "Warrior II",
    icon: "🗡️",
    muscles: "Inner thighs, quads, hip openers, shoulder endurance",
    equipment: "Chair nearby for balance if needed",
    muscleColor: "#5fbfb0",
    steps: [
      "Step feet wide apart (roughly 3–4 feet). Turn right foot out 90°, left foot in slightly",
      "Bend the right knee over the right ankle, keeping it from collapsing inward",
      "Open arms wide to the sides at shoulder height, gaze over the front hand",
      "Hold for 5–8 breaths — feel the hips open wide. Switch sides."
    ],
    cues: [
      "Front knee tracks directly over the second toe — don't let it buckle in",
      "Arms stay at shoulder height — fight the temptation to let them droop",
      "Torso stays upright, not leaning over the front leg"
    ]
  },

  treePose: {
    name: "Tree Pose",
    icon: "🌳",
    muscles: "Balance, ankle stability, hip opener, core",
    equipment: "Wall for support if needed",
    muscleColor: "#5fbfb0",
    steps: [
      "Stand on one foot, touching the wall with a fingertip if needed",
      "Bring the sole of the other foot to your inner ankle, inner calf, or inner thigh (never the knee)",
      "Once balanced, bring hands to heart center or raise overhead",
      "Hold for 5–10 breaths, then switch sides"
    ],
    cues: [
      "Never press foot into the knee joint — ankle, calf, or thigh only",
      "Standing foot presses evenly — don't let the arch collapse",
      "Gaze at one fixed point to help with balance"
    ]
  },

  forwardFold: {
    name: "Standing Forward Fold",
    icon: "🙇",
    muscles: "Hamstrings, calves, lower back release",
    equipment: "None (blocks or chair if very tight)",
    muscleColor: "#5fbfb0",
    steps: [
      "Stand with feet hip-width, knees generously bent (especially with tight hamstrings)",
      "Hinge from the hips and fold forward, letting your torso hang toward the floor",
      "Let your head and neck completely relax — nod yes and no slowly",
      "Hold for 5–10 breaths, breathing into your lower back; slowly roll up to stand"
    ],
    cues: [
      "Bent knees are not cheating — they protect your lower back",
      "Let gravity do the work; don't force yourself deeper",
      "Roll up slowly, head coming up last, to avoid a head rush"
    ]
  },

  chairPose: {
    name: "Chair Pose",
    icon: "🪑",
    muscles: "Quads, glutes, core, shoulder endurance",
    equipment: "Wall for support if needed",
    muscleColor: "#5fbfb0",
    steps: [
      "Stand with feet together or hip-width, toes forward",
      "Bend knees and sit back like you're lowering onto a chair behind you",
      "Raise arms overhead (or to shoulder height if shoulders are tight)",
      "Hold for 5–8 breaths, keeping weight in heels and chest lifted"
    ],
    cues: [
      "You should be able to see your toes — knees aren't hiding them",
      "Sit back and down, not forward and down",
      "Keep your chest lifted — don't collapse into a hunch"
    ]
  },

  goddess: {
    name: "Goddess Pose",
    icon: "🌺",
    muscles: "Inner thighs, hip opener, quads, pelvic floor",
    equipment: "None",
    muscleColor: "#5fbfb0",
    steps: [
      "Stand with feet wide apart, toes pointed out at 45°",
      "Bend knees deeply over your toes, lowering into a wide squat",
      "Bring arms out at shoulder height, elbows bent at 90° pointing up (cactus arms)",
      "Hold and breathe — rock gently side to side if it helps open the hips"
    ],
    cues: [
      "Knees track over toes — don't let them cave inward",
      "Tailbone points straight down — don't stick your bottom out or tuck under",
      "Feel the inner thighs working to hold the wide stance"
    ]
  },

  standingBalance: {
    name: "Standing Balance",
    icon: "⚖️",
    muscles: "Ankle stability, core, hip stabilizers",
    equipment: "Wall or chair nearby",
    muscleColor: "#5fbfb0",
    steps: [
      "Stand on one foot, foot pressing evenly into the floor",
      "Lift the other foot — hold it near the ankle, or extend it forward slightly",
      "Find a fixed gaze point (called a drishti) and breathe",
      "Hold 20–30 seconds, then switch. Progress to eyes closed for an extra challenge."
    ],
    cues: [
      "Standing foot stays active — spread toes and press all four corners down",
      "A tiny wobble is normal and good — it means your stabilizers are working",
      "Touch the wall if needed — balance is a skill that builds over time"
    ]
  },

  // ─── CIRCUIT / FULL BODY ───────────────────────────────────────────────

  dumbbellSwing: {
    name: "Dumbbell Swing",
    icon: "🔄",
    muscles: "Glutes, hamstrings, shoulders, core — full body",
    equipment: "One dumbbell (held with both hands)",
    muscleColor: "#c8a96e",
    steps: [
      "Stand feet shoulder-width, hold one dumbbell with both hands, arms hanging",
      "Hinge at the hips (like an RDL), swing the dumbbell back between your legs",
      "Explosively drive your hips forward to stand — this momentum swings the weight up",
      "Let it swing to shoulder height, then hinge back as it drops. The hips drive it, not your arms."
    ],
    cues: [
      "This is a hip hinge, not a squat — push your hips back, not your knees forward",
      "Arms just guide the weight — the power comes from snapping the hips",
      "Protect your lower back by keeping it neutral (don't round)"
    ]
  },

  standingMarch: {
    name: "Standing March",
    icon: "🚶",
    muscles: "Hip flexors, core, glute stability",
    equipment: "None",
    muscleColor: "#c8a96e",
    steps: [
      "Stand tall, arms at your sides or held at 90° like a runner",
      "Lift one knee to hip height while swinging the opposite arm forward",
      "Lower with control and immediately lift the other knee",
      "March in place with a steady rhythm, keeping your core engaged"
    ],
    cues: [
      "Lift knees to at least hip height for the full hip flexor benefit",
      "Keep your torso still — don't rock side to side",
      "Land softly — think heel-toe, not stomp"
    ]
  },

  lateralStep: {
    name: "Lateral Step",
    icon: "↔️",
    muscles: "Hip abductors, outer glutes, inner thighs, balance",
    equipment: "Optional: resistance band above ankles",
    muscleColor: "#c8a96e",
    steps: [
      "Stand with feet together, slight bend in knees, core engaged",
      "Step one foot out to the side about 2 feet, then bring the other foot in to meet it",
      "Take 4–6 steps in one direction, then reverse",
      "With a band, the resistance makes every step a serious hip abductor challenge"
    ],
    cues: [
      "Keep a constant slight squat throughout — don't stand up between steps",
      "Step and together, don't cross your feet",
      "Keep toes pointing forward, not out to the sides"
    ]
  },

};
