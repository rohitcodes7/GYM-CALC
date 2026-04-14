function goToResult() {
  document.getElementById("loader").style.display = "flex";

  let data = {
    weight: weight.value,
    height: height.value,
    age: age.value,
    goal: goal.value,
    budget: budget.value
  };

  localStorage.setItem("userData", JSON.stringify(data));

  setTimeout(() => {
    window.location.href = "result.html";
  }, 1000);
}

window.onload = function () {

  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 800);

  if (window.location.pathname.includes("result.html")) {

    let data = JSON.parse(localStorage.getItem("userData"));

    let weight = +data.weight;
    let height = +data.height;
    let age = +data.age;
    let goal = data.goal;
    let budget = +data.budget;

    let bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    let calories = bmr;

    if (goal === "gain") calories += 300;
    if (goal === "loss") calories -= 300;

    let protein = weight * 2;
    let fat = weight * 0.8;
    let carbs = (calories - (protein*4 + fat*9)) / 4;

    cal.innerText = calories.toFixed(0);
    protein.innerText = protein.toFixed(0) + "g";
    carbs.innerText = carbs.toFixed(0) + "g";
    fat.innerText = fat.toFixed(0) + "g";

    // Step animation
    setTimeout(()=>step1.classList.add("show"),300);
    setTimeout(()=>step2.classList.add("show"),800);
    setTimeout(()=>step3.classList.add("show"),1300);
    setTimeout(()=>step4.classList.add("show"),1800);
    setTimeout(()=>dietQuestion.classList.remove("hidden"),2300);

    // Chart
    let ctx = document.getElementById("chart").getContext("2d");

    let dataArr = [protein*4, carbs*4, fat*9];
    let colors = ["#4f46e5","#22c55e","#f59e0b"];

    let total = dataArr.reduce((a,b)=>a+b);

    let start = 0;

    dataArr.forEach((value,i)=>{
      let slice = (value/total)*2*Math.PI;
      ctx.beginPath();
      ctx.moveTo(150,150);
      ctx.arc(150,150,120,start,start+slice);
      ctx.fillStyle = colors[i];
      ctx.fill();
      start += slice;
    });

    // Diet
    window.showDiet = function () {
      let foods = [
        {name:"Soya",cost:20},
        {name:"Eggs",cost:25},
        {name:"Rice",cost:10},
        {name:"Paneer",cost:40},
        {name:"Dal",cost:15},
        {name:"Chicken",cost:60}
      ];

      let totalCost=0, plan="";

      for(let f of foods){
        if(totalCost+f.cost<=budget){
          plan+=f.name+" ₹"+f.cost+"<br>";
          totalCost+=f.cost;
        }
      }

      dietPlan.innerHTML="<h3>Diet Plan</h3>"+plan;
      dietPlan.classList.remove("hidden");
    };
  }
};
