import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipeCard from '../components/RecipeCard';

function MainPage({ pageType }) {
  const [loading, setLoading] = useState(true);
  const [recipesToDisplay, setRecipesToDisplay] = useState([]);

  useEffect(() => {
    const getApiResponse = async (searchType) => {
      const foodsEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const drinksEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const maxAmount = 12;
      let fetchApi = [];
      if (searchType === 'foods') fetchApi = await fetch(foodsEndPoint);
      if (searchType === 'drinks') fetchApi = await fetch(drinksEndPoint);
      const json = await fetchApi.json();
      if (searchType === 'foods') setRecipesToDisplay(json.meals.slice(0, maxAmount));
      if (searchType === 'drinks') setRecipesToDisplay(json.drinks.slice(0, maxAmount));
      setLoading(false);
    };
    getApiResponse(pageType);
  }, []);

  return (
    <div className="screen-size">
      {loading
        ? <p>Loading...</p>
        : (
          <>
            {console.log(recipesToDisplay)}
            {recipesToDisplay.map((recipe, index) => (
              <RecipeCard
                key={ `recipe${index}` }
                cardInfo={ { recipe, index, pageType } }
              />
            ))}
          </>
        )}
    </div>
  );
}

MainPage.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default MainPage;
