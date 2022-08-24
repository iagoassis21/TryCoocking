import React, { useContext } from 'react';
import Context from '../context/Context';
import RecipeDetailsCard from '../components/RecipeDetailsCard';
import RecipesCarousel from '../components/RecipesCarousel';
import RecipeDetailsButtons from '../components/RecipeDetailsButtons';

function RecipeDetails() {
  const {
    loading,
  } = useContext(Context);

  return (
    <div>
      { loading
        ? <h1>Loading...</h1>
        : (
          <div>
            <RecipeDetailsCard />
            <RecipesCarousel />
            <RecipeDetailsButtons />
          </div>
        )}
    </div>
  );
}

export default RecipeDetails;
