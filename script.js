function calculate() {

  let weight = parseFloat(document.getElementById("weight").value);
  let height = parseFloat(document.getElementById("height").value);
  let age = parseFloat(document.getElementById("age").value);
  let goal = document.getElementById("goal").value;
  let budget = parseFloat(document.getElementById("budget").value);

  // BMR
  let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  let calories = bmr;

  if (goal === "gain") calories += 300;
  if (goal === "loss") calories -= 300;

  let protein = weight * 2;
  let fat = weight * 0.8;
  let carbs = (calories - (protein * 4 + fat * 9)) / 4;

  // Indian food database (price + macros)
  let foods = [
    {name: "Soya Chunks 100g", protein: 52, carbs: 33, fat: 0.5, cost: 20},
    {name: "Eggs (4)", protein: 24, carbs: 2, fat: 20, cost: 25},
    {name: "Rice 100g", protein: 2.5, carbs: 28, fat: 0.3, cost: 10},
    {name: "Paneer 100g", protein: 18, carbs: 3, fat: 20, cost: 40},
    {name: "Dal 100g", protein: 9, carbs: 20, fat: 1, cost: 15},
    {name: "Chicken 100g", protein: 27, carbs: 0, fat: 3, cost: 60}
  ];

  let dietPlan = "";
  let totalCost = 0;

  for (let food of foods) {
    if (totalCost + food.cost <= budget) {
      dietPlan += food.name + " (₹" + food.cost + ")<br>";
      totalCost += food.cost;
    }
  }

  document.getElementById("result").innerHTML = `
    <h2>Calories: ${calories.toFixed(0)}</h2>
    <p>Protein: ${protein.toFixed(0)}g</p>
    <p>Carbs: ${carbs.toFixed(0)}g</p>
    <p>Fat: ${fat.toFixed(0)}g</p>

    <h3>🍽 Diet Plan (₹${budget})</h3>
    ${dietPlan}
  `;
}

function trackProgress() {
  let current = parseFloat(document.getElementById("currentWeight").value);
  let target = parseFloat(document.getElementById("targetWeight").value);

  let progress = ((current - target) / current) * 100;

  document.getElementById("progressResult").innerText =
    "Progress: " + progress.toFixed(1) + "% towards goal";
}
