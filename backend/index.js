
console.log("📦 Backend file loaded successfully");

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Helper: reduce to single digit
function reduceToSingleDigit(num) {
  while (num > 9) {
    num = num.toString().split("").reduce((a, b) => a + Number(b), 0);
  }
  return num;
}

function calculateMoolank(day) {
  return reduceToSingleDigit(day);
}

function calculateBhagyank(dob) {
  const digits = dob.replaceAll("-", "").split("").map(Number);
  return reduceToSingleDigit(digits.reduce((a, b) => a + b));
}

// ---------------------- Moolank Info ------------------------
const moolankInfo = {
  1: "Moolank 1: Strong-willed, ambitious, and a natural leader. Remedy: Be punctual and wear Sunstone bracelet.",
  2: "Moolank 2: Diplomatic, gentle, and considerate. Remedy: Practice Chandra Sadhana, wear Mother of Pearl bracelet.",
  3: "Moolank 3: Creative, communicative, and optimistic. Remedy: Offer turmeric water to banana plant. Wear Citrine bracelet.",
  4: "Moolank 4: Practical, reliable, and hardworking. Remedy: Chant Rahu mantra, wear Black Tourmaline bracelet.",
  5: "Moolank 5: Dynamic, adventurous, and freedom-loving. Remedy: Keep plants nearby, wear Green Aventurine bracelet.",
  6: "Moolank 6: Caring, responsible, and family-oriented. Remedy: Add milk to bath water, wear Opalite bracelet.",
  7: "Moolank 7: Analytical, introspective, and spiritual. Remedy: Meditate daily, wear White Cat’s Eye bracelet.",
  8: "Moolank 8: Ambitious, authoritative, and efficient. Remedy: Visit religious places, wear Amethyst bracelet.",
  9: "Moolank 9: Compassionate, generous, and humanitarian. Remedy: Work on your fitness, wear Bloodstone bracelet."
};

// ---------------------- Bhagyank Info ------------------------
const bhagyankInfo = {
  1: "Bhagyank 1: Leader, independent, and individualistic. Remedy: Maintain routine, wear Sunstone bracelet.",
  2: "Bhagyank 2: Diplomatic, sensitive, and a peacemaker. Remedy: Strengthen Moon energy, wear Pearl/MOP.",
  3: "Bhagyank 3: Creative, expressive, and sociable. Remedy: Pray to Jupiter, wear Yellow Citrine.",
  4: "Bhagyank 4: Practical, disciplined, and hardworking. Remedy: Rahu upay, wear Black Tourmaline.",
  5: "Bhagyank 5: Adventurous, energetic, and freedom-loving. Remedy: Embrace change, wear Aventurine.",
  6: "Bhagyank 6: Nurturing, responsible, and community-oriented. Remedy: Practice balance, wear Opalite.",
  7: "Bhagyank 7: Analytical, introspective, and spiritual. Remedy: Trust intuition, wear Cat’s Eye.",
  8: "Bhagyank 8: Ambitious, efficient, and goal-oriented. Remedy: Saturn upay, wear Amethyst.",
  9: "Bhagyank 9: Compassionate, idealistic, and humanitarian. Remedy: Channel emotions, wear Bloodstone."
};

// ---------------------- Combo Info ------------------------
const comboInfo = {};
function generateComboDescription(m, b) {
  const traits = [
    "Great for leadership roles.",
    "Good emotional balance.",
    "Creative and spiritually inclined.",
    "Needs stability and routine.",
    "Excellent for communication and business.",
    "Family-oriented with social charm.",
    "Good for teaching and education.",
    "Can face professional struggle, but high resilience.",
    "High emotional depth and karmic lessons."
  ];
  return traits[(m + b) % 9];
}

for (let m = 1; m <= 9; m++) {
  for (let b = 1; b <= 9; b++) {
    const key = `${m}_${b}`;
    comboInfo[key] = `Combination of Moolank ${m} and Bhagyank ${b}: ${generateComboDescription(m, b)}`;
  }
}

// ---------------------- Root Route ------------------------
app.get("/", (req, res) => {
  res.send("🔮 Numerology API is running...");
});

// ---------------------- Prediction Route ------------------------
app.post("/api/predict", (req, res) => {
  const { dob } = req.body;

  if (!dob || !dob.includes("-")) {
    return res.status(400).json({ error: "Invalid date format." });
  }

  const day = parseInt(dob.split("-")[2]);
  const moolank = calculateMoolank(day);
  const bhagyank = calculateBhagyank(dob);

  console.log("🔥 BACKEND HIT");
  console.log("DOB:", dob);
  console.log("Moolank:", moolank);
  console.log("Bhagyank:", bhagyank);

  res.json({
    moolank,
    bhagyank,
    moolankInfo: moolankInfo[moolank],
    bhagyankInfo: bhagyankInfo[bhagyank],
    comboInfo: comboInfo[`${moolank}_${bhagyank}`]
  });
});

// ---------------------- Start Server ------------------------
app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
