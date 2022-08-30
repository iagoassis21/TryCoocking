import React from 'react';
import Header from '../components/Header';
import '../styles/FavoriteRecipes.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteRecipes() {
  return (
    <div className="favorite-recipes-container">
      <Header title="Favorite Recipes" icons={ { profile: true, search: false } } />
      {/* MOCK */}
      <div className="favorite-recipes-buttons">
        <button type="button">All</button>
        <button type="button">Food</button>
        <button type="button">Drinks</button>
      </div>

      <div className="favorite-recipes-card">
        <img
          src="https://www.themealdb.com/images/media/meals/cuio7s1555492979.jpg"
          alt="Mock"
          className="recipe-image"
        />
        <div className="recipe-info">
          <p>Kenyan - BBQ,Meat</p>
          <h2>Mbuzi Choma (Roasted Goat)</h2>
          <div className="util-buttons">
            <img src={ shareIcon } alt="Mock" />
            <img src={ whiteHeartIcon } alt="Mock" />
          </div>
        </div>
      </div>

      <div className="favorite-recipes-card">
        <img
          src="https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg"
          alt="Mock"
          className="recipe-image"
        />
        <div className="recipe-info">
          <p>Alcoholic</p>
          <h2>Kir</h2>
          <div className="util-buttons">
            <img src={ shareIcon } alt="Mock" />
            <img src={ whiteHeartIcon } alt="Mock" />
          </div>
        </div>
      </div>

      <div className="favorite-recipes-card">
        <img
          src="https://www.themealdb.com/images/media/meals/cuio7s1555492979.jpg"
          alt="Mock"
          className="recipe-image"
        />
        <div className="recipe-info">
          <p>Kenyan - BBQ,Meat</p>
          <h2>Mbuzi Choma (Roasted Goat)</h2>
          <div className="util-buttons">
            <img src={ shareIcon } alt="Mock" />
            <img src={ whiteHeartIcon } alt="Mock" />
          </div>
        </div>
      </div>

      <div className="favorite-recipes-card">
        <img
          src="https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg"
          alt="Mock"
          className="recipe-image"
        />
        <div className="recipe-info">
          <p>Alcoholic</p>
          <h2>Kir</h2>
          <div className="util-buttons">
            <img src={ shareIcon } alt="Mock" />
            <img src={ whiteHeartIcon } alt="Mock" />
          </div>
        </div>
      </div>
      {/* END MOCK */}
    </div>
  );
}
