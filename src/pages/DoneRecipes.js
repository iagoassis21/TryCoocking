import React from 'react';
import Header from '../components/Header';

const mockItem = [{
  index: '0',
  thumb: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  recipeName: 'Corba',
  category: 'Side',
  date: '23/08/2022',
  tagName: 'Pasta',
}];

function DoneRecipes() {
  const { index, thumb, recipeName, category, date, tagName } = mockItem[0];
  return (
    <div>
      <Header title="Done Recipes" icons={ { profile: true, search: false } } />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>

      <img src={ thumb } alt={ recipeName } data-testid={ `${index}-horizontal-image` } />
      <h4 data-testid={ `${index}-horizontal-top-text` }>
        Categoria:
        {' '}
        {category}
      </h4>
      <h4 data-testid={ `${index}-horizontal-name` }>
        Nome Receita:
        {' '}
        {recipeName}
      </h4>
      <h4 data-testid={ `${index}-horizontal-done-date` }>
        Data:
        {' '}
        {date}
      </h4>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
      >
        Compartilhar
      </button>
      <h4 data-testid={ `${index}-${tagName}-horizontal-tag` }>
        Tags:
        {' '}
        {tagName}
      </h4>

    </div>
  );
}

export default DoneRecipes;
