import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from './FavoriteButton';

function RecipeDetailsButtons({ buttonsInfo }) {
  const [copiedMessageTimer, setCopiedMessageTimer] = useState(0);

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

  const handleCopy = () => {
    const fiveSeconds = 5;
    setCopiedMessageTimer(fiveSeconds);
    copy(window.location.href);
  };

  useEffect(() => {
    if (!copiedMessageTimer) return;
    const aSecond = 1000;
    const cooldown = setInterval(() => setCopiedMessageTimer(copiedMessageTimer - 1),
      aSecond);
    return () => clearInterval(cooldown);
  }, [copiedMessageTimer]);

  return (
    <>
      <div className="recipe-details-utils">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => handleCopy() }
        >
          <img src={ shareIcon } alt="Share icon." />
        </button>
        <FavoriteButton
          recipeObj={ currRecipe }
          isDrink={ detailsPageType === 'drinks' }
        />
      </div>
      { !checkFinished() && (
        <div className="start-recipe-btn-container">
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-button"
            onClick={ () => history.push(`/${detailsPageType}/${recipeId}/in-progress`) }
          >
            <p>{startedRecipe()}</p>
          </button>
        </div>
      )}

      { copiedMessageTimer > 0 && (
        <p className="copied-message">Link copied!</p>
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
