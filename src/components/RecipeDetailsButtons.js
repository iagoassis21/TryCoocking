import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetailsButtons({ buttonsInfo }) {
  const [copiedMessageTimer, setCopiedMessageTimer] = useState(0);
  const [favoritedRecipe, setFavoritedRecipe] = useState(false);

  const {
    recipeId,
    detailsPageType,
    recipeArea,
    recipeCategory,
    recipeAlcohol,
    recipeTitle,
    recipeImage,
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

  const deleteFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = JSON.stringify(favorites.filter((fav) => fav.id !== recipeId));
    localStorage.setItem('favoriteRecipes', newFavorites);
  };

  const checkFavorited = () => {
    const favoritedRecipes = localStorage.getItem('favoriteRecipes');
    if (favoritedRecipes === null) return false;
    const alreadyFavorited = JSON.parse(favoritedRecipes)
      .find((recipe) => recipe.id === recipeId);
    if (alreadyFavorited) {
      setFavoritedRecipe(true);
    } else {
      setFavoritedRecipe(false);
    }
  };

  const handleFavorite = (favorited) => {
    if (favorited) {
      deleteFavorite();
    } else {
      const removeLastLetter = -1;
      const recipeToFavorite = {
        id: recipeId,
        type: detailsPageType.slice(0, removeLastLetter),
        nationality: recipeArea || '',
        category: recipeCategory || '',
        alcoholicOrNot: recipeAlcohol || '',
        name: recipeTitle,
        image: recipeImage,
      };
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([recipeToFavorite]));
      } else {
        const oldData = localStorage.getItem('favoriteRecipes');
        const recuperedData = JSON.parse(oldData);
        const newArray = [...recuperedData, recipeToFavorite];
        localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
      }
    }
    checkFavorited();
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

  useEffect(() => {
    checkFavorited();
  }, []);

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
      >
        <img
          data-testid="favorite-btn"
          src={ favoritedRecipe ? blackHeartIcon : whiteHeartIcon }
          alt="Favorited icon."
        />
      </button>
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
    </div>
  );
}

RecipeDetailsButtons.propTypes = {
  buttonsInfo: PropTypes.shape({
    recipeId: PropTypes.string.isRequired,
    detailsPageType: PropTypes.string.isRequired,
    recipeCategory: PropTypes.string.isRequired,
    recipeTitle: PropTypes.string.isRequired,
    recipeImage: PropTypes.string.isRequired,
    recipeArea: PropTypes.string,
    recipeAlcohol: PropTypes.string,
  }).isRequired,
};

export default RecipeDetailsButtons;
