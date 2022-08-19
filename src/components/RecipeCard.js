import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ cardInfo }) {
  const { index, recipe, pageType } = cardInfo;
  const imgSrc = () => {
    if (pageType === 'foods') return recipe.strMealThumb;
    if (pageType === 'drinks') return recipe.strDrinkThumb;
  };
  const recipeName = () => {
    if (pageType === 'foods') return recipe.strMeal;
    if (pageType === 'drinks') return recipe.strDrink;
  };

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h2 data-testid={ `${index}-card-name` }>{ recipeName() }</h2>
      <img
        src={ imgSrc() }
        data-testid={ `${index}-card-img` }
        alt="Recipe."
        className="main-page-recipe-img"
      />
    </div>
  );
}

RecipeCard.propTypes = {
  cardInfo: PropTypes.shape({
    index: PropTypes.number.isRequired,
    pageType: PropTypes.string.isRequired,
    recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default RecipeCard;
