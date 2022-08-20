import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Context from './Context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [recipes, setRecipes] = useState(false);
  const [comida, setComidaContext] = useState(true);
  const [dataInProgress, setDataInProgress] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const history = useHistory();

  const searchMeals = useCallback(
    async (inputSearch, selectedRadio) => {
      oneCharacterCheck(inputSearch, selectedRadio);
      let apiUrl = '';
      if (selectedRadio === 'ingredient') {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      } else if (selectedRadio === 'name') {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      } else if (selectedRadio === 'first-letter') {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      }
      const getUrl = await fetch(apiUrl);
      const response = await getUrl.json();
      if (response.meals === null) {
        recipesNotFound();
      } else if (response.meals.length === 1) {
        response.meals.map((meal) => history.push(`/foods/${meal.idMeal}`));
      }
      setMeals(response.meals);
      setRecipes(response.meals);
    },
    [history],
  );

  const searchDrinks = useCallback(
    async (inputSearch, selectedRadio) => {
      oneCharacterCheck(inputSearch, selectedRadio);
      let apiUrl = '';
      if (selectedRadio === 'ingredient') {
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      } else if (selectedRadio === 'name') {
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      } else if (selectedRadio === 'first-letter') {
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      }
      const getUrl = await fetch(apiUrl);
      const response = await getUrl.json();
      if (response.drinks === null) {
        recipesNotFound();
      } else if (response.drinks.length === 1) {
        response.drinks.map((drink) => history.push(`/drinks/${drink.idDrink}`));
      }
      setDrinks(response.drinks);
      setRecipes(response.drinks);
    },
    [history],
  );

  const state = {
    email,
    setEmail,
    searchMeals,
    meals,
    searchDrinks,
    drinks,
    recipes,
    setRecipes,
    comida,
    setComidaContext,
    dataInProgress,
    setDataInProgress,
    ingredients,
    setIngredients,
    measures,
    setMeasures,
  };

  return (
    <Context.Provider value="context">
      {children}
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
