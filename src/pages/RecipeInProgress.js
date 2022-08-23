import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { drinkRecipeList, mealRecipeList } from '../helpers/fetchRecipeListApi';

function RecipeInProgress({ drink = false }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    if (drink) {
      const getRecipeList = async () => {
        const results = await drinkRecipeList(id);
        setRecipe(results.drinks[0]);
      };

      return getRecipeList();
    }
    const getRecipeList = async () => {
      const results = await mealRecipeList(id);
      setRecipe(results.meals[0]);
    };

    getRecipeList();
  }, []);

  const recipeIngredients = Object.keys(recipe || {})
    .filter((key) => key.includes('strIngredient') && (recipe[key]))
    .map((item) => recipe[item]);

  const drinkRecipe = (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        data-testid="recipe-photo"
        alt="Foto da receita"
        width="150"
      />
      <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share Recipe

      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite Recipe

      </button>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe

      </button>
    </div>
  );
  const mealRecipe = (
    <div>
      <img
        src={ recipe.strMealThumb }
        data-testid="recipe-photo"
        alt="Foto da receita"
        width="150"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Share Recipe
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite Recipe
      </button>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Finish Recipe

      </button>
    </div>
  );
  return (
    <div>
      {
        drink ? mealRecipe : drinkRecipe
      }

      {
        recipeIngredients.map((ingredients, index) => (
          <p
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            {ingredients}
          </p>
        ))
      }
    </div>
  );
}

RecipeInProgress.propTypes = {
  drink: PropTypes.bool.isRequired,
};

export default RecipeInProgress;
