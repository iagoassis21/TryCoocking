import React from 'react';
import PropTypes from 'prop-types';

function RecipeDetailsCard({ recipeInfo }) {
  const {
    recipeTitle,
    recipeImage,
    recipeCategory,
    recipeInstructions,
    recipeVideo,
    recipeAlcohol,
    ingredientList,
  } = recipeInfo;

  return (
    <>
      <h2 data-testid="recipe-title">{recipeTitle}</h2>
      <p data-testid="recipe-category">
        {recipeCategory}
        {recipeAlcohol && <span>{` - ${recipeAlcohol}`}</span>}
      </p>
      <img
        src={ recipeImage }
        alt={ recipeTitle }
        data-testid="recipe-photo"
        className="small-img"
      />
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li
            key={ ingredient }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {ingredient}
          </li>))}
      </ul>
      <p data-testid="instructions">{recipeInstructions}</p>
      {recipeVideo && (
        <iframe
          width="360"
          height="200"
          src={ recipeVideo }
          title="YouTube video player"
          frameBorder="0"
          allow={ 'accelerometer; autoplay; clipboard-write;'
          + ' encrypted-media; gyroscope; picture-in-picture' }
          allowFullScreen
          data-testid="video"
        />
      )}
    </>
  );
}

RecipeDetailsCard.propTypes = {
  recipeInfo: PropTypes.shape({
    recipeTitle: PropTypes.string.isRequired,
    recipeImage: PropTypes.string.isRequired,
    recipeCategory: PropTypes.string.isRequired,
    recipeVideo: PropTypes.string,
    recipeAlcohol: PropTypes.string,
    recipeInstructions: PropTypes.string,
    ingredientList: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

export default RecipeDetailsCard;
