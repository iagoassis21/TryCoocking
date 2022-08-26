import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Context from './Context';
import fetchRecipesApi from '../helpers/fetchRecipesApi';

function RecipesProvider({ children }) {
  const { pathname } = useLocation();
  const [pageType, setPageType] = useState(pathname.substring(1));
  const [recipeloading, setRecipeloading] = useState(false);
  const [mainLoading, setMainLoading] = useState(true);
  const [allRecipes, setAllRecipes] = useState([]);
  const [allFilters, setAllFilters] = useState([]);
  const [currFilter, setCurrFilter] = useState('');
  const [displayRecipes, setDisplayRecipes] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const getRecipes = async () => {
      if (pageType === 'foods' || pageType === 'drinks') {
        const resultsAmount = 12;
        const choosedType = `${pageType}Recipes`;
        const apiResults = await fetchRecipesApi(pageType, choosedType, resultsAmount);
        setAllRecipes(apiResults);
        setDisplayRecipes(apiResults);
      }
    };
    getRecipes();
  }, [pageType]);
  useEffect(() => {
    const getFilters = async () => {
      if (pageType === 'foods' || pageType === 'drinks') {
        const resultsAmount = 5;
        const choosedType = `${pageType}Filters`;
        const apiResults = await fetchRecipesApi(pageType, choosedType, resultsAmount);
        setAllFilters(apiResults);
      }
    };
    getFilters();
  }, [pageType]);

  useEffect(() => {
    const stopLoading = () => {
      if (allRecipes.length > 0 && allFilters.length > 0) setMainLoading(false);
    };
    stopLoading();
  }, [allRecipes, allFilters]);

  const filterRecipes = async (foodFilter) => {
    setRecipeloading(true);
    if (displayRecipes !== allRecipes && currFilter === foodFilter) {
      setDisplayRecipes(allRecipes);
    } else {
      const resultsAmount = 12;
      const choosedType = `${pageType}Specific`;
      const apiResults = await
      fetchRecipesApi(pageType, choosedType, resultsAmount, foodFilter);
      setDisplayRecipes(apiResults);
      setCurrFilter(foodFilter);
    }
    setRecipeloading(false);
  };

  const providerValue = {
    mainLoading,
    pageType,
    displayRecipes,
    allFilters,
    recipeloading,
    allRecipes,
    searchValue,
    setPageType,
    setAllRecipes,
    setAllFilters,
    filterRecipes,
    setDisplayRecipes,
    setSearchValue,
  };

  return (
    <Context.Provider value={ providerValue }>
      {children}
    </Context.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipesProvider;
