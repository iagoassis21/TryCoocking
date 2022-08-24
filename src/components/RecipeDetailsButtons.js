import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetailsButtons() {
  const {
    recipeId,
    pageType,
    finishedRecipe,
    startedRecipe,
    handleCopy,
    copiedMessageTimer,
    handleFavorite,
    favoritedRecipe,
  } = useContext(Context);

  const history = useHistory();

  const startRecipeText = startedRecipe() ? 'Continue Recipe' : 'Start Recipe';

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => handleCopy() }
      >
        <img src={ shareIcon } alt="Share icon." />
      </button>

      <button
        type="button"
        onClick={ () => handleFavorite(favoritedRecipe) }
        src={ favoritedRecipe ? blackHeartIcon : whiteHeartIcon }
      >
        <img
          data-testid="favorite-btn"
          src={ favoritedRecipe ? blackHeartIcon : whiteHeartIcon }
          alt="Favorited icon."
        />
      </button>

      { !finishedRecipe && (
        <div className="start-recipe-btn-container">
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-button"
            onClick={ () => history.push(`/${pageType}/${recipeId}/in-progress`) }
          >
            { startRecipeText }
          </button>
        </div>
      )}

      { copiedMessageTimer > 0 && (
        <p className="copied-message">Link copied!</p>
      )}
    </div>
  );
}

export default RecipeDetailsButtons;
