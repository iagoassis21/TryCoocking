import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard({ index, recipe, type }) {
  const imgSrc = () => {
    if (type === 'foods') return recipe.strMealThumb;
    return recipe.strDrinkThumb;
  };
  const recipeName = () => {
    if (type === 'foods') return recipe.strMeal;
    return recipe.strDrink;
  };
  const recipeUlr = () => {
    if (type === 'foods') return `/${type}/${recipe.idMeal}`;
    return `/${type}/${recipe.idDrink}`;
  };

  return (
    <Link
      data-testid={ `${index}-recipe-card` }
      to={ recipeUlr() }
      className="recipe-card"
    >
      <h2
        data-testid={ `${index}-card-name` }
        className="card-title"
      >
        { recipeName() }
      </h2>
      <img
        src={ imgSrc() }
        data-testid={ `${index}-card-img` }
        alt="Recipe."
        className="card-image"
      />
    </Link>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default RecipeCard;
