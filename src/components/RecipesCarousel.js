import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Context from '../context/Context';

function RecipesCarousel() {
  const {
    pageType,
    recommendations,
    changePage,
  } = useContext(Context);

  const firstItemSet = 0;
  const secondItemSet = 2;
  const thirdItemSet = 4;

  const getRecommendationsNameKey = (index) => {
    if (pageType === 'foods') return recommendations[index].strDrink;
    return recommendations[index].strMeal;
  };

  const recommendationsImgKey = (index) => {
    if (pageType === 'foods') return recommendations[index].strDrinkThumb;
    return recommendations[index].strMealThumb;
  };

  const recipeUlr = (recipe) => {
    if (pageType === 'foods') return `/drinks/${recipe.idDrink}`;
    return `/foods/${recipe.idMeal}`;
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

export default RecipesCarousel;
