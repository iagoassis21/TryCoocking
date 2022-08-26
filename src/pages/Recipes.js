import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesFilterButtons from '../components/RecipesFilterButtons';
import RecipeCard from '../components/RecipeCard';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes({ pagePath = '/foods' }) {
  const {
    pageType,
    mainLoading,
    recipeloading,
    displayRecipes,
    setPageType,
  } = useContext(Context);

  useEffect(() => {
    setPageType(pagePath);
  }, []);

  const pageTitle = () => pageType[0].toUpperCase() + pageType.substring(1);

  return (
    <div className="screen-size">
      <Header title={ pageTitle() } />
      <p>{pageType}</p>
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

Recipes.propTypes = {
  pagePath: PropTypes.string.isRequired,
};

export default Recipes;
