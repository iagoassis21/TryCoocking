import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import RecipesCarousel from '../components/RecipesCarousel';
import RecipeDetailsButtons from '../components/RecipeDetailsButtons';
import fetchRecipesApi, { fetchRecipesById } from '../helpers/fetchRecipesApi';

function RecipeDetails() {
  const location = useLocation();
  const [detailsPageType, setDetailsPageType] = useState(undefined);
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
      console.log(location.pathname);
      if (location.pathname.includes('/foods')) {
        setDetailsPageType('foods');
      } else {
        setDetailsPageType('drinks');
      }
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
              } }
            />
          </div>
        )}
    </div>
  );
}

export default RecipeDetails;
