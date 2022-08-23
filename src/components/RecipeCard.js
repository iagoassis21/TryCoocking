import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ cardInfo }) {
  const { index, recipe, pageType } = cardInfo;

  const imgSrc = () => {
    if (pageType === 'foods') return recipe.strMealThumb;
    return recipe.strDrinkThumb;
  };
  const recipeName = () => {
    if (pageType === 'foods') return recipe.strMeal;
    return recipe.strDrink;
  };
  const recipeUlr = () => {
    if (pageType === 'foods') return `${pageType}/${recipe.idMeal}`;
    return `${pageType}/${recipe.idDrink}`;
  };

  return (
    <Link
      data-testid={ `${index}-recipe-card` }
      to={ recipeUlr() }
    >
      <h2 data-testid={ `${index}-card-name` }>{ recipeName() }</h2>
      <img
        src={ imgSrc() }
        data-testid={ `${index}-card-img` }
        alt="Recipe."
        className="small-img"
      />
    </Link>
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
