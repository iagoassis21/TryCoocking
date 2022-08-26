import React, { useContext } from 'react';
import RecipesFilterButtons from '../components/RecipesFilterButtons';
import RecipeCard from '../components/RecipeCard';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes() {
  const {
    pageType,
    mainLoading,
    recipeloading,
    displayRecipes,
  } = useContext(Context);

  const pageTitle = () => pageType[0].toUpperCase() + pageType.substring(1);

  return (
    <div className="screen-size">
      <Header title={ pageTitle() } />
      {mainLoading
        ? <h1>Loading...</h1>
        : <RecipesFilterButtons pageType={ pageType } />}
      {recipeloading
        ? <h2>Loading...</h2>
        : (
          displayRecipes.map((recipe, index) => (
            <RecipeCard
              key={ `recipe${index}` }
              recipe={ recipe }
              type={ pageType }
              index={ index }
            />
          )))}
      <Footer />
    </div>
  );
}

export default Recipes;
