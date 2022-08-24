import React, { useContext } from 'react';
import Context from '../context/Context';

function RecipeDetailsCard() {
  const {
    recipeTitle,
    recipeImage,
    recipeCategory,
    recipeInstructions,
    recipeVideo,
    recipeAlcohol,
    ingredientList,
  } = useContext(Context);

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

export default RecipeDetailsCard;
