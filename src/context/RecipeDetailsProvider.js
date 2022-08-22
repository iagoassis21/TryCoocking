import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Context from './Context';
import { fetchRecipesById } from '../helpers/fetchRecipesApi';

function RecipeDetailsProvider({ children }) {
  const [pageType, setPageType] = useState(undefined);
  const [currRecipe, setCurrRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const { recipeId } = useParams();

  useEffect(() => {
    const loadPageType = () => {
      const isPageTypeFood = window.location.pathname.includes('food');
      if (isPageTypeFood) {
        setPageType('foods');
      } else {
        setPageType('drinks');
      }
    };
    loadPageType();
  }, []);

  useEffect(() => {
    const getRecipeInfo = async () => {
      if (pageType) {
        setCurrRecipe(await fetchRecipesById(pageType, recipeId));
        setLoading(false);
      }
    };
    getRecipeInfo();
  }, [pageType]);

  const providerValue = {
    loading,
    recipeId,
  };

  return (
    <Context.Provider value={ providerValue }>
      {children}
    </Context.Provider>
  );
}

RecipeDetailsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RecipeDetailsProvider;
