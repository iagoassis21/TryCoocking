import React, { useContext } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipesFilterButtons from '../components/RecipesFilterButtons';
import Context from '../context/Context';

function Recipes() {
  const {
    pageType,
    displayRecipes,
    recipeloading,
  } = useContext(Context);

  return (
    <div className="screen-size">
      <RecipesFilterButtons pageType={ pageType } />
      {recipeloading
        ? <h2>Loading...</h2>
        : (
          displayRecipes.map((recipe, index) => (
            <RecipeCard
              key={ `recipe${index}` }
              cardInfo={ { recipe, index, pageType } }
            />
          )))}
    </div>
  );
}

export default Recipes;
