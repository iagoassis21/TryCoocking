// pageType: "foods" ou "drinks", dependendo da URL
// fetchType: ${pageType} + "Recipes" ou "Filters", dependendo do component
// resultsAmount: Tamanho máximo do array retornado
// specificFilter: String de botões de filtros específicos
const fetchRecipesApi = async (pageType, fetchType, resultsAmount, specificFilter) => {
  const foodsRecipes = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinksRecipes = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const foodsFilter = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksFilter = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const foodsSpecific = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${specificFilter}`;
  const drinksSpecific = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${specificFilter}`;
  const maxAmount = resultsAmount;

  let choosedEndPoint = '';
  if (fetchType === 'foodsRecipes') choosedEndPoint = foodsRecipes;
  if (fetchType === 'drinksRecipes') choosedEndPoint = drinksRecipes;
  if (fetchType === 'foodsFilters') choosedEndPoint = foodsFilter;
  if (fetchType === 'drinksFilters') choosedEndPoint = drinksFilter;
  if (fetchType === 'foodsSpecific') choosedEndPoint = foodsSpecific;
  if (fetchType === 'drinksSpecific') choosedEndPoint = drinksSpecific;

  const fetchApi = await fetch(choosedEndPoint);
  const json = await fetchApi.json();

  if (pageType === 'foods') return json.meals.slice(0, maxAmount);
  return json.drinks.slice(0, maxAmount);
};

// pageType: "foods" ou "drinks", dependendo da URL
// recipeId: chave "idMeal" / "idDrink", da resposta do endpoint foodsRecipes / drinksRecipes
export async function fetchRecipesById(pageType, recipeId) {
  const foodsById = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
  const drinksById = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

  let choosedEndPoint = '';
  if (pageType === 'foods') choosedEndPoint = foodsById;
  if (pageType === 'drinks') choosedEndPoint = drinksById;

  const fetchApi = await fetch(choosedEndPoint);
  const json = await fetchApi.json();

  if (pageType === 'foods') return json.meals[0];
  return json.drinks[0];
}

export default fetchRecipesApi;
