import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesFilterButtons from '../components/RecipesFilterButtons';
import RecipeCard from '../components/RecipeCard';
import Context from '../context/Context';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

function Recipes({ pagePath }) {
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

  const pageTitle = () => (
    pageType[0] ? pageType[0].toUpperCase() + pageType.substring(1) : 'Foods'
  );

  return (
    <>
      <Header title={ pageTitle() } />
      <div className="recipes-container">
        <SearchBar />
        {mainLoading
          ? <h1>Loading...</h1>
          : <RecipesFilterButtons />}
        <div className="recipe-cards-container">
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
        </div>
        <Footer />
      </div>
    </>
  );
}

Recipes.propTypes = {
  pagePath: PropTypes.string.isRequired,
};

export default Recipes;
