import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import Context from './Context';
import fetchRecipesApi, { fetchRecipesById } from '../helpers/fetchRecipesApi';

function RecipeDetailsProvider({ children }) {
  const [pageType, setPageType] = useState(undefined);
  const [recipeTitle, setRecipeTitle] = useState(undefined);
  const [recipeImage, setRecipeImage] = useState(undefined);
  const [recipeCategory, setRecipeCategory] = useState(undefined);
  const [recipeInstructions, setRecipeInstructions] = useState(undefined);
  const [recipeAlcohol, setRecipeAlcohol] = useState(undefined);
  const [recipeVideo, setRecipeVideo] = useState(undefined);
  const [ingredientList, SetIngredientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const history = useHistory();
  const { recipeId } = useParams();

  const loadIngredients = (recipeInfo, maxAmount) => {
    const maxIngredients = maxAmount;
    let allIngredients = [];
    for (let index = 1; index <= maxIngredients; index += 1) {
      const ingredient = `${recipeInfo[`strIngredient${index}`]}`;
      const measure = `${recipeInfo[`strMeasure${index}`]}`;
      const recipeText = `${ingredient} - ${measure}`;
      if (ingredient !== 'null' && ingredient !== '' && measure !== 'null') {
        allIngredients = [...allIngredients, recipeText];
      }
      if (ingredient !== 'null' && measure === 'null') {
        allIngredients = [...allIngredients, ingredient];
      }
    }
    SetIngredientList(allIngredients);
  };

  const loadRecipeInfo = async () => {
    const recipeInfo = await fetchRecipesById(pageType, recipeId);
    if (pageType && pageType === 'foods') {
      const maxIngredientsAmount = 20;
      setRecipeTitle(recipeInfo.strMeal);
      setRecipeImage(recipeInfo.strMealThumb);
      setRecipeVideo(recipeInfo.strYoutube.replace('watch?v=', 'embed/'));
      loadIngredients(recipeInfo, maxIngredientsAmount);
    } else {
      const maxIngredientsAmount = 15;
      setRecipeTitle(recipeInfo.strDrink);
      setRecipeImage(recipeInfo.strDrinkThumb);
      setRecipeAlcohol(recipeInfo.strAlcoholic);
      loadIngredients(recipeInfo, maxIngredientsAmount);
    }
    setRecipeCategory(recipeInfo.strCategory);
    setRecipeInstructions(recipeInfo.strInstructions);
  };

  const getRecommendation = async () => {
    const maxAmount = 6;
    const recomType = pageType === 'foods' ? 'drinks' : 'foods';
    const fetchType = `${recomType}Recipes`;
    const recommendationList = await fetchRecipesApi(recomType, fetchType, maxAmount);
    setRecommendations(recommendationList);
  };

  useEffect(() => {
    const loadPageType = () => {
      if (!pageType) {
        const isPageTypeFood = window.location.pathname.includes('food');
        if (isPageTypeFood) {
          setPageType('foods');
        } else {
          setPageType('drinks');
        }
      }
      if (pageType && recipeId) loadRecipeInfo();
      if (pageType && !recommendations.length) getRecommendation();
    };
    loadPageType();
  }, [pageType, recipeId]);

  useEffect(() => {
    const endLoading = () => {
      if (ingredientList.length) setLoading(false);
    };
    endLoading();
  }, [ingredientList]);

  const changePage = (newPathname) => {
    history.push(newPathname);
    window.location.reload();
  };

  const providerValue = {
    loading,
    pageType,
    recipeId,
    recipeTitle,
    recipeImage,
    recipeCategory,
    recipeInstructions,
    recipeVideo,
    recipeAlcohol,
    ingredientList,
    recommendations,
    changePage,
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
