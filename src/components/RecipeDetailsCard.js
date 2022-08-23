import React, { useContext } from 'react';
import Context from '../context/Context';

function RecipeDetailsCard() {
  const {
    // currRecipe,
    recipeTitle,
    recipeImage,
    recipeCategory,
    recipeInstructions,
    // recipeVideo,
    recipeAlcohol,
    ingredientList,
  } = useContext(Context);
  return (
    <div>
      <h2 data-testid="recipe-title">{recipeTitle}</h2>
      <p data-testid="recipe-category">{recipeCategory}</p>
      {recipeAlcohol && <p>{recipeAlcohol}</p>}
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
    </div>
  );
}

export default RecipeDetailsCard;
