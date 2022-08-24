import React, { useContext } from 'react';
import Context from '../context/Context';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import RecipesCarousel from '../components/RecipesCarousel';

function RecipeDetails() {
  const {
    loading,
  } = useContext(Context);
  return (
    <div>
      { loading
        ? <h1>Loading...</h1>
        : (
          <div>
            <RecipeDetailsCard />
            <RecipesCarousel />
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-button"
            >
              Start Recipe
            </button>
          </div>
        )}
    </div>
  );
}

export default RecipeDetails;
