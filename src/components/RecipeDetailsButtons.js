import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

function RecipeDetailsButtons() {
  const {
    recipeId,
    pageType,
    finishedRecipe,
    startedRecipe,
  } = useContext(Context);

  const history = useHistory();

  const startRecipeText = startedRecipe() ? 'Continue Recipe' : 'Start Recipe';

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
        >
          { startRecipeText }
        </button>
      )}
    </div>
  );
}

export default RecipeDetailsButtons;
