import React, { useState, useEffect } from 'react';
import Recipes from '../pages/Recipes';
import Context from './Context';
import fetchRecipesApi from '../helpers/fetchRecipesApi';

function RecipesProvider() {
  const pageType = window.location.pathname.substring(1);
  const [loading, setLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);
  const [allFilters, setAllFilters] = useState([]);
  const [displayRecipes, setDisplayRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const resultsAmount = 12;
      const choosedType = `${pageType}Recipes`;
      const apiResults = await fetchRecipesApi(pageType, choosedType, resultsAmount);
      setAllRecipes(apiResults);
      setDisplayRecipes(apiResults);
    };
    getRecipes();
  }, []);

  useEffect(() => {
    const getFilters = async () => {
      const resultsAmount = 5;
      const choosedType = `${pageType}Filters`;
      const apiResults = await fetchRecipesApi(pageType, choosedType, resultsAmount);
      setAllFilters(apiResults);
    };
    getFilters();
  }, []);

  useEffect(() => {
    const stopLoading = () => {
      if (allRecipes.length > 0 && allFilters.length > 0) setLoading(false);
    };
    stopLoading();
  }, [allRecipes, allFilters]);

  const filterRecipes = async (foodFilter) => {
    const resultsAmount = 12;
    const choosedType = `${pageType}Specific`;
    const apiResults = await
    fetchRecipesApi(pageType, choosedType, resultsAmount, foodFilter);
    setDisplayRecipes(apiResults);
  };

  const providerValue = {
    pageType,
    displayRecipes,
    setAllRecipes,
    allFilters,
    setAllFilters,
    filterRecipes,
    setDisplayRecipes,
    allRecipes,
  };

  return (
    <Context.Provider value={ providerValue }>
      {loading
        ? <h1>Loading...</h1>
        : <Recipes /> }
    </Context.Provider>
  );
}

export default RecipesProvider;
