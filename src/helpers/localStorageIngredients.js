const xincaraclabin = (drink, object) => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    return localStorage.setItem('inProgressRecipes',
      JSON.stringify({ cocktails: {}, meals: {} }));
  }
  const readRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (drink) {
    const setNewDrinkIngredients = { ...readRecipes, cocktails: { ...object } };
    return localStorage.setItem('inProgressRecipes',
      JSON.stringify(setNewDrinkIngredients));
  }
  const setNewMealsIngredients = { ...readRecipes, meals: { ...object } };
  return localStorage.setItem('inProgressRecipes',
    JSON.stringify(setNewMealsIngredients));
};

export default xincaraclabin;
