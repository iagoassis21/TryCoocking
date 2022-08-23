const createEndPointForFoods = (type, value) => {
  if (type === 'ingredient') {
    return (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`);
  }
  if (type === 'name') {
    return (`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
  }
  return (`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`);
};

const createEndPointForDrinks = (type, value) => {
  if (type === 'ingredient') {
    return (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`);
  }
  if (type === 'name') {
    return (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
  }
  return (`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`);
};

const getRecipes = async (type, value, path) => {
  try {
    const endpoint = path === '/foods'
      ? createEndPointForFoods(type, value)
      : createEndPointForDrinks(type, value);
    const request = await fetch(endpoint);
    const response = await request.json();
    return path === '/foods' ? response.meals : response.drinks;
  } catch (e) {
    return null;
  }
};

export default getRecipes;
