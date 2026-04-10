function calculate() {
  let weight = document.getElementById("weight").value;
  let height = document.getElementById("height").value;
  let age = document.getElementById("age").value;
  let goal = document.getElementById("goal").value;

  if (!weight || !height || !age) {
    alert("Please fill all fields!");
    return;
  }

  // BMR Formula (Mifflin-St Jeor)
  let calories = (10 * weight) + (6.25 * height) - (5 * age) + 5;

  // Adjust based on goal
  if (goal === "bulk") calories += 300;
  if (goal === "cut") calories -= 300;

  // Macros
  let protein = weight * 2; // grams
  let fats = weight * 0.8; // grams
  let carbs = (calories - (protein * 4 + fats * 9)) / 4;

  document.getElementById("result").innerHTML = `
    🔥 Calories: ${Math.round(calories)} kcal <br>
    🥩 Protein: ${Math.round(protein)} g <br>
    🍞 Carbs: ${Math.round(carbs)} g <br>
    🥑 Fats: ${Math.round(fats)} g
  `;
}
