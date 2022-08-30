import React, { useState } from 'react';
import Header from '../components/Header';
import { mapItensFood, mapItensDrinks } from '../helpers/mapItensDone';
import '../styles/DoneRecipes.css';

function DoneRecipes() {
  const [filter, setFilter] = useState();
  const [showCopy, setShowCopy] = useState(false);
  const findNone = 'Nenhuma Receita Concluida!';

  const doneItensLocal = JSON.parse(localStorage.getItem('doneRecipes'));

  const filterButtons = ({ target }) => {
    const { name } = target;
    if (name === 'all') setFilter();
    if (name === 'food') setFilter('food');
    if (name === 'drinks') setFilter('drinks');
  };

  const showItens = (infoFiltro) => {
    if (infoFiltro === undefined) {
      return doneItensLocal !== null ? (
        <div>
          {
            doneItensLocal
              .map((element, index) => (
                element.type === 'food' ? (
                  mapItensFood(element, index, setShowCopy)
                ) : mapItensDrinks(element, index, setShowCopy)))
          }
        </div>
      ) : <h4>{ findNone }</h4>;
    }
    if (infoFiltro === 'food') {
      return doneItensLocal !== null ? (
        <div>
          {
            doneItensLocal
              .filter(
                (element) => (element.type === 'food'),
              )
              .map((element, index) => (
                mapItensFood(element, index, setShowCopy)
              ))
          }
        </div>
      ) : <h4>{ findNone }</h4>;
    }
    if (infoFiltro === 'drinks') {
      return doneItensLocal !== null ? (
        <div>
          {
            doneItensLocal
              .filter(
                (element) => (element.type === 'drink'),
              )
              .map((element, index) => (mapItensDrinks(element, index, setShowCopy)))
          }
        </div>
      ) : <h4>{ findNone }</h4>;
    }
  };

  return (
    <div className="done-recipes-container">
      <Header title="Done Recipes" icons={ { profile: true, search: false } } />
      {/* Filters */}
      <div className="done-recipes-buttons">
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ filterButtons }
        >
          All
        </button>
        <button
          type="button"
          name="food"
          data-testid="filter-by-food-btn"
          onClick={ filterButtons }
        >
          Food
        </button>
        <button
          type="button"
          name="drinks"
          data-testid="filter-by-drink-btn"
          onClick={ filterButtons }
        >
          Drinks
        </button>
      </div>

      {/* Map Itens */}
      {showItens(filter)}

      {
        showCopy ? <h4>Link copied!</h4> : null
      }
    </div>
  );
}

export default DoneRecipes;
