import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/DoneRecipes.css';

export default function DoneRecipes() {
  return (
    <div className="done-recipes-container">
      <Header title="Done Recipes" icons={ { profile: true, search: false } } />
      {/* MOCK */}
      <div className="done-recipes-buttons">
        <button type="button">All</button>
        <button type="button">Food</button>
        <button type="button">Drinks</button>
      </div>
      <div className="done-recipes-card">
        <img
          src="https://www.themealdb.com/images/media/meals/cuio7s1555492979.jpg"
          alt="Mock"
          className="recipe-image"
        />
        <div className="recipe-info">
          <div className="recipe-info-header">
            <p className="recipe-proprieties">Kenyan - BBQ,Meat</p>
            <img src={ shareIcon } alt="Mock" />
          </div>
          <h2>Mbuzi Choma (Roasted Goat)</h2>
          <p>Streetfood, Onthego</p>
          <p>29/08/2022</p>
        </div>
      </div>
      <div className="done-recipes-card">
        <img
          src="https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg"
          alt="Mock"
          className="recipe-image"
        />
        <div className="recipe-info">
          <div className="recipe-info-header">
            <p className="recipe-proprieties">Alcoholic</p>
            <img src={ shareIcon } alt="Mock" />
          </div>
          <h2>Kir</h2>
          <p>31/08/2022</p>
        </div>
      </div>
      <div className="done-recipes-card">
        <img
          src="https://www.themealdb.com/images/media/meals/cuio7s1555492979.jpg"
          alt="Mock"
          className="recipe-image"
        />
        <div className="recipe-info">
          <div className="recipe-info-header">
            <p className="recipe-proprieties">Kenyan - BBQ,Meat</p>
            <img src={ shareIcon } alt="Mock" />
          </div>
          <h2>Mbuzi Choma (Roasted Goat)</h2>
          <p>Streetfood, Onthego</p>
          <p>30/08/2022</p>
        </div>
      </div>
      <div className="done-recipes-card">
        <img
          src="https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg"
          alt="Mock"
          className="recipe-image"
        />
        <div className="recipe-info">
          <div className="recipe-info-header">
            <p className="recipe-proprieties">Alcoholic</p>
            <img src={ shareIcon } alt="Mock" />
          </div>
          <h2>Kir</h2>
          <p>28/08/2022</p>
        </div>
      </div>
      {/* END MOCK */}
    </div>
  );
}
