import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import RecipesCarousel from '../components/RecipesCarousel';

function RecipeDetails() {
  const {
    loading,
    recipeId,
    pageType,
  } = useContext(Context);

  const history = useHistory();

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
              data-testid="share-btn"
            >
              Compartilhar
            </button>

            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favoritar
            </button>

            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-recipe-button"
              onClick={ () => history.push(`/${pageType}/${recipeId}/in-progress`) }
            >
              Start Recipe
            </button>
          </div>
        )}
    </div>
  );
}

export default RecipeDetails;
