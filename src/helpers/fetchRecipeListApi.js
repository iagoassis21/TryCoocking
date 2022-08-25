export const mealRecipeList = async (recipeId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
};

export const drinkRecipeList = async (recipeId) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const response = await fetch(url);
  const result = await response.json();
  return result;
};
