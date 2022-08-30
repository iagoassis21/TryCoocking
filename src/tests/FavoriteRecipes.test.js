import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event'
import FavoriteRecipes from '../pages/FavoriteRecipes';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot:  'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  }
];

  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => {},
    },
  });

  beforeEach(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  });

describe('testing the FavoriteRecipes page', () => {
  it('should test the filter buttons', () => {
    renderWithRouter(<FavoriteRecipes/>);
    const btnFilterByAll = screen.getByTestId('filter-by-all-btn');
    const btnFilterByFood = screen.getByTestId('filter-by-food-btn')
    const btnFilterByDrink = screen.getByTestId('filter-by-drink-btn')
    userEvent.click(btnFilterByAll);
    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    userEvent.click(btnFilterByFood);
    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    userEvent.click(btnFilterByDrink);
    expect(screen.queryByText('Spicy Arrabiata Penne')).toBeNull();
  });
  it('should test favoriteButton and shareButton', () => {
    renderWithRouter(<FavoriteRecipes/>);
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
    userEvent.click(shareBtn);
    expect(screen.getByText('Link copied!')).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    expect(screen.queryByText('Spicy Arrabiata Penne')).toBeNull();
  });
  it('should test the localStorage.getItem', () => {
    renderWithRouter(<FavoriteRecipes/>);
    expect(screen.getByText('Alcoholic')).toBeInTheDocument();
  });
})
