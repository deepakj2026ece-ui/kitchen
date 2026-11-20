// Starter pantry items
let pantry = [
  { name: "Eggs", urgency: "Use Soon" },
  { name: "Spinach", urgency: "Expiring Today" },
  { name: "Tomato", urgency: "Fresh" },
  { name: "Rice", urgency: "Fresh" }
];

// Built-in recipe database
const recipes = [
  { name: "Spinach & Tomato Omelette", ingredients: ["eggs", "spinach", "tomato"] },
  { name: "Veggie Fried Rice", ingredients: ["rice", "eggs", "spinach", "carrot"] },
  { name: "Tomato Rice Bowl", ingredients: ["rice", "tomato", "onion"] },
  { name: "Garlic Butter Pasta", ingredients: ["pasta", "garlic", "butter"] },
  { name: "Green Shakshuka", ingredients: ["eggs", "spinach", "tomato", "onion"] }
];

const pantryForm = document.getElementById("pantry-form");
const pantryList = document.getElementById("pantry-list");
const recipeList = document.getElementById("recipe-list");

function renderApp() {
  renderPantry();
  renderRecipes();
}

function renderPantry() {
  pantryList.innerHTML = "";
  pantry.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "pantry-item";
    li.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <span class="badge ${item.urgency}">${item.urgency}</span>
      </div>
      <button class="delete-btn" onclick="removeItem(${index})">Remove</button>
    `;
    pantryList.appendChild(li);
  });
}

function renderRecipes() {
  recipeList.innerHTML = "";
  const availableNames = pantry.map(item => item.name.toLowerCase().trim());

  const scoredRecipes = recipes.map(recipe => {
    const matched = recipe.ingredients.filter(ing => availableNames.includes(ing));
    const missing = recipe.ingredients.filter(ing => !availableNames.includes(ing));
    const matchPercent = Math.round((matched.length / recipe.ingredients.length) * 100);
    return { ...recipe, matched, missing, matchPercent };
  });

  // Sort by highest ingredient match first
  scoredRecipes.sort((a, b) => b.matchPercent - a.matchPercent);

  scoredRecipes.forEach(recipe => {
    const div = document.createElement("div");
    div.className = "recipe-card";
    div.innerHTML = `
      <div class="recipe-header">
        <strong>${recipe.name}</strong>
        <span class="match-score">${recipe.matchPercent}% Match</span>
      </div>
      <p class="ingredients-text">
        <strong>Have:</strong> ${recipe.matched.length ? recipe.matched.join(", ") : "None"} <br/>
        <strong>Missing:</strong> ${recipe.missing.length ? recipe.missing.join(", ") : "All ready!"}
      </p>
    `;
    recipeList.appendChild(div);
  });
}

pantryForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("item-name");
  const urgencyInput = document.getElementById("item-urgency");

  pantry.push({
    name: nameInput.value.trim(),
    urgency: urgencyInput.value
  });

  nameInput.value = "";
  renderApp();
});

function removeItem(index) {
  pantry.splice(index, 1);
  renderApp();
}

// Initial render
renderApp();
