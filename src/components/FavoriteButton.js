import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteButton({ recipeObj, isDrink }) {
  const [favoritedRecipe, setFavoritedRecipe] = useState(false);

  const {
    strArea,
    idDrink,
    strDrink,
    strAlcoholic,
    strCategory,
    strDrinkThumb,
    strMeal,
    idMeal,
    strMealThumb,
  } = recipeObj;

  const favoriteShape = {
    id: isDrink ? idDrink : idMeal,
    type: isDrink ? 'drink' : 'food',
    nationality: strArea || '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic || '',
    name: isDrink ? strDrink : strMeal,
    image: isDrink ? strDrinkThumb : strMealThumb,
  };

  const deleteFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = JSON.stringify(favorites
      .filter((fav) => fav.id !== idDrink && fav.id !== idMeal));
    localStorage.setItem('favoriteRecipes', newFavorites);
  };

  const checkFavorited = () => {
    const favoritedRecipes = localStorage.getItem('favoriteRecipes');
    if (favoritedRecipes !== null) {
      const alreadyFavorited = JSON.parse(favoritedRecipes)
        .find((recipe) => recipe.id === idDrink || recipe.id === idMeal);
      if (alreadyFavorited) {
        setFavoritedRecipe(true);
      } else {
        setFavoritedRecipe(false);
      }
    }
  };

  const handleFavorite = (favorited) => {
    if (favorited) {
      deleteFavorite();
    } else if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteShape]));
    } else {
      const oldData = localStorage.getItem('favoriteRecipes');
      const recuperedData = JSON.parse(oldData);
      const newArray = [...recuperedData, favoriteShape];
      localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    }
    checkFavorited();
  };

  useEffect(() => {
    checkFavorited();
  }, []);

  return (
    <div>
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
    </div>
  );
}

FavoriteButton.propTypes = {
  recipeObj: PropTypes.shape({
    strCategory: PropTypes.string.isRequired,
    idMeal: PropTypes.string,
    strArea: PropTypes.string,
    idDrink: PropTypes.string,
    strDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
  isDrink: PropTypes.bool.isRequired,
};

export default FavoriteButton;
