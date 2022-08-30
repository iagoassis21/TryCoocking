import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import UtilButtons from './UtilButtons';

function RecipeDetailsButtons({ buttonsInfo }) {
  const {
    recipeId,
    detailsPageType,
    currRecipe,
  } = buttonsInfo;

  const history = useHistory();

  const startedRecipe = () => {
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes === null) return 'Start Recipe';
    if (detailsPageType === 'foods') {
      const alreadyStarted = Object.keys(JSON.parse(inProgressRecipes).meals);
      if (alreadyStarted.includes(recipeId)) return 'Continue Recipe';
    }
    const alreadyStarted = Object.keys(JSON.parse(inProgressRecipes).cocktails);
    return (alreadyStarted.includes(recipeId))
      ? 'Continue Recipe'
      : 'Start Recipe';
  };

  const checkFinished = () => {
    const finishedRecipes = localStorage.getItem('doneRecipes');
    if (finishedRecipes === null) return false;
    const alreadyFinished = JSON.parse(finishedRecipes)
      .find((recipe) => recipe.id === recipeId);
    return (alreadyFinished);
  };

  return (
    <>
      <UtilButtons
        recipeObj={ currRecipe }
        isDrink={ detailsPageType === 'drinks' }
        copyText={ window.location.href }
      />
      { !checkFinished() && (
        <div className="start-recipe-btn-container">
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-button"
            onClick={ () => history.push(`/${detailsPageType}/${recipeId}/in-progress`) }
          >
            {startedRecipe()}
          </button>
        </div>
      )}
    </>
  );
}

RecipeDetailsButtons.propTypes = {
  buttonsInfo: PropTypes.shape({
    recipeId: PropTypes.string.isRequired,
    detailsPageType: PropTypes.string.isRequired,
    currRecipe: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default RecipeDetailsButtons;
