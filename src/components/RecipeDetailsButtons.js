import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function RecipeDetailsButtons() {
  const {
    recipeId,
    pageType,
    finishedRecipe,
  } = useContext(Context);

  const history = useHistory();

  return (
    <div>
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

      { !finishedRecipe && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-button"
          onClick={ () => history.push(`/${pageType}/${recipeId}/in-progress`) }
          // disabled={ checkRecipeStatus() }
        >
          Start Recipe
        </button>
      )}
    </div>
  );
}

export default RecipeDetailsButtons;
