import React, { useState } from 'react';
import Header from '../components/Header';
import mockItem from './mockItensDone';
import { mapItensFood, mapItensDrinks } from '../helpers/mapItensDone';

function DoneRecipes() {
  const [filter, setFilter] = useState();
  const findNone = 'Nenhuma Receita Concluida!';

  const filterButtons = ({ target }) => {
    const { name } = target;
    switch (name) {
    case 'all':
      setFilter();
      break;
    case 'food':
      setFilter('food');
      break;
    case 'drinks':
      setFilter('drinks');
      break;
    default:
      break;
    }
  };

  const showItens = (infoFiltro) => {
    if (infoFiltro === undefined) {
      return mockItem.length !== 0 ? (
        <div>
          {
            mockItem
              .map((element) => (
                element.type === 'food' ? (
                  mapItensFood(element)
                ) : mapItensDrinks(element)))
          }
        </div>
      ) : <h4>{ findNone }</h4>;
    }
    if (infoFiltro === 'food') {
      return mockItem.length !== 0 ? (
        <div>
          {
            mockItem
              .filter(
                (element) => (element.type === 'food'),
              )
              .map((element) => (mapItensFood(element)))
          }
        </div>
      ) : <h4>{ findNone }</h4>;
    }
    if (infoFiltro === 'drinks') {
      return mockItem.length !== 0 ? (
        <div>
          {
            mockItem
              .filter(
                (element) => (element.type === 'drinks'),
              )
              .map((element) => mapItensDrinks(element))
          }
        </div>
      ) : <h4>{ findNone }</h4>;
    }
  };

  return (
    <div>
      <Header title="Done Recipes" icons={ { profile: true, search: false } } />
      {/* Filters */}
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

      {/* Map Itens */}
      {showItens(filter)}

    </div>
  );
}

export default DoneRecipes;
