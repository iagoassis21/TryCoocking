import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import RecipeDetailsButtons from '../components/RecipeDetailsButtons';
import RecipesCarousel from '../components/RecipesCarousel';
import fetchRecipesApi, { fetchRecipesById } from '../helpers/fetchRecipesApi';

function RecipeDetails({ pagePath }) {
  const [detailsPageType] = useState(pagePath);
  const [recipeTitle, setRecipeTitle] = useState(undefined);
  const [recipeImage, setRecipeImage] = useState(undefined);
  const [recipeCategory, setRecipeCategory] = useState(undefined);
  const [recipeInstructions, setRecipeInstructions] = useState(undefined);
  const [recipeArea, setRecipeArea] = useState(undefined);
  const [recipeAlcohol, setRecipeAlcohol] = useState(undefined);
  const [recipeVideo, setRecipeVideo] = useState(undefined);
  const [ingredientList, SetIngredientList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState([]);
  const [currRecipe, setCurrRecipe] = useState([]);
  const { recipeId } = useParams();

  useEffect(() => {
    const endLoading = () => {
      if (ingredientList.length) setLoading(false);
    };
    endLoading();
  }, [ingredientList]);

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

  const getRecommendation = async () => {
    const maxAmount = 6;
    const recomType = detailsPageType === 'foods' ? 'drinks' : 'foods';
    const fetchType = `${recomType}Recipes`;
    const recommendationList = await fetchRecipesApi(recomType, fetchType, maxAmount);
    setRecommendations(recommendationList);
  };

  const loadRecipeInfo = async () => {
    const recipeInfo = await fetchRecipesById(detailsPageType, recipeId);
    setCurrRecipe(recipeInfo);
    if (detailsPageType && detailsPageType === 'foods') {
      const maxIngredientsAmount = 20;
      setRecipeTitle(recipeInfo.strMeal);
      setRecipeImage(recipeInfo.strMealThumb);
      setRecipeArea(recipeInfo.strArea);
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

  useEffect(() => {
    const loadPageType = () => {
      if (detailsPageType && recipeId) loadRecipeInfo();
      if (detailsPageType && !recommendations.length) getRecommendation();
    };
    loadPageType();
  }, [detailsPageType, recipeId]);

  return (
    <div>
      { loading
        ? <h1>Loading...</h1>
        : (
          <div>
            <RecipeDetailsCard
              recipeInfo={ {
                recipeTitle,
                recipeImage,
                recipeCategory,
                recipeInstructions,
                recipeVideo,
                recipeAlcohol,
                ingredientList,
              } }
            />
            <RecipesCarousel
              carouselInfo={ {
                detailsPageType,
                recommendations,
              } }
            />
            <RecipeDetailsButtons
              buttonsInfo={ {
                recipeId,
                detailsPageType,
                recipeArea,
                recipeCategory,
                recipeAlcohol,
                recipeTitle,
                recipeImage,
                currRecipe,
              } }
            />
          </div>
        )}
    </div>
  );
}

RecipeDetails.propTypes = {
  pagePath: PropTypes.string.isRequired,
};

export default RecipeDetails;
