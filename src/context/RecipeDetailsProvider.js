import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Context from './Context';
import { fetchRecipesById } from '../helpers/fetchRecipesApi';

function RecipeDetailsProvider({ children }) {
  const [pageType, setPageType] = useState(undefined);
  const [currRecipe, setCurrRecipe] = useState(undefined);
  const [recipeTitle, setRecipeTitle] = useState(undefined);
  const [recipeImage, setRecipeImage] = useState(undefined);
  const [recipeCategory, setRecipeCategory] = useState(undefined);
  const [recipeInstructions, setRecipeInstructions] = useState(undefined);
  const [recipeAlcohol, setRecipeAlcohol] = useState(undefined);
  const [recipeVideo, setRecipeVideo] = useState(undefined);
  const [ingredientList, SetIngredientList] = useState([]);
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
    const endLoading = () => {
      if (ingredientList.length) setLoading(false);
    };
    endLoading();
  }, [ingredientList]);

  useEffect(() => {
    const loadIngredients = () => {
      if (currRecipe) {
        const maxIngredients = 20;
        let allIngredients = [];
        for (let index = 1; index <= maxIngredients; index += 1) {
          const ingredient = `${currRecipe[`strIngredient${index}`]}`;
          const measure = `${currRecipe[`strMeasure${index}`]}`;
          const recipeInfo = `${ingredient} - ${measure}`;
          if (ingredient && ingredient !== 'null' && ingredient !== 'undefined') {
            allIngredients = [...allIngredients, recipeInfo];
          }
        }
        SetIngredientList(allIngredients);
      }
    };
    loadIngredients();
  }, [currRecipe]);

  useEffect(() => {
    const getRecipeInfo = async () => {
      if (pageType) {
        const recipeInfo = await fetchRecipesById(pageType, recipeId);
        if (pageType && pageType === 'foods') {
          setRecipeTitle(recipeInfo.strMeal);
          setRecipeImage(recipeInfo.strMealThumb);
          setRecipeVideo(recipeInfo.strYoutube);
        } else {
          setRecipeTitle(recipeInfo.strDrink);
          setRecipeImage(recipeInfo.strDrinkThumb);
          setRecipeAlcohol(recipeInfo.strAlcoholic);
        }
        setRecipeCategory(recipeInfo.strCategory);
        setRecipeInstructions(recipeInfo.strInstructions);
        setCurrRecipe(recipeInfo);
      }
    };
    getRecipeInfo();
  }, [pageType]);

  const providerValue = {
    loading,
    currRecipe,
    recipeId,
    recipeTitle,
    recipeImage,
    recipeCategory,
    recipeInstructions,
    recipeVideo,
    recipeAlcohol,
    ingredientList,
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
