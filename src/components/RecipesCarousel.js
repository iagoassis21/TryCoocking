import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router-dom';

function RecipesCarousel({ carouselInfo }) {
  const history = useHistory();

  const {
    detailsPageType,
    recommendations,
  } = carouselInfo;

  const firstItemSet = 0;
  const secondItemSet = 2;
  const thirdItemSet = 4;

  const getRecommendationsNameKey = (index) => {
    if (detailsPageType === 'foods') return recommendations[index].strDrink;
    return recommendations[index].strMeal;
  };

  const recommendationsImgKey = (index) => {
    if (detailsPageType === 'foods') return recommendations[index].strDrinkThumb;
    return recommendations[index].strMealThumb;
  };

  const recipeUlr = (recipe) => {
    if (detailsPageType === 'foods') return `/drinks/${recipe.idDrink}`;
    return `/foods/${recipe.idMeal}`;
  };

  const changePage = (newPathname) => {
    history.push(newPathname);
    window.location.reload();
  };

  const carouselItem = (index) => (
    <Carousel.Item>
      <div>
        <button
          type="button"
          onClick={ () => changePage(recipeUlr(recommendations[index])) }
          data-testid={ `${index}-recomendation-card` }
        >
          <h3 data-testid={ `${index}-recomendation-title` }>
            { getRecommendationsNameKey(index) }
          </h3>
          <img
            src={ recommendationsImgKey(index) }
            alt="Recommended recipe"
            className="small-img"
          />
        </button>
        <button
          type="button"
          onClick={ () => changePage(recipeUlr(recommendations[index + 1])) }
          data-testid={ `${index + 1}-recomendation-card` }
        >
          <h3 data-testid={ `${index + 1}-recomendation-title` }>
            { getRecommendationsNameKey(index + 1) }
          </h3>
          <img
            src={ recommendationsImgKey(index + 1) }
            alt="Recommended recipe"
            className="small-img"
          />
        </button>
      </div>
    </Carousel.Item>
  );

  return (
    <div>
      <h3>Receitas recomendadas</h3>
      {recommendations.length && (

        <Carousel
          className="Carousel"
        >
          {carouselItem(firstItemSet)}
          {carouselItem(secondItemSet)}
          {carouselItem(thirdItemSet)}
        </Carousel>
      )}
    </div>
  );
}

RecipesCarousel.propTypes = {
  carouselInfo: PropTypes.shape({
    detailsPageType: PropTypes.string.isRequired,
    recommendations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default RecipesCarousel;
