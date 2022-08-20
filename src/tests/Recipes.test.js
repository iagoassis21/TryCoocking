import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecipesProvider from '../context/RecipesProvider';
import userEvent from '@testing-library/user-event';

describe('Tests of Recipes component.', () => {
  let newPathname = '';
  delete global.window.location;
  global.window = Object.create(window);

  global.window.location = {
    pathname: '/foods',
  };

  // Testes seguintes usam o pathname "/foods" 
  it('Should display five different food buttons filters.', async () => {
    render(<RecipesProvider />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Beef' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Breakfast' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Chicken' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Dessert' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Goat' })).toBeDefined();
    });
  })
  
  it('Should display 12 different food recipes.', async () => {
    render(<RecipesProvider />);
    await waitFor(() => {
      const allFoodRecipes = screen.getAllByAltText('Recipe.');
      expect(allFoodRecipes).toHaveLength(12);
    });
  })

    
  it('Should be possible to click the food filter buttons.', async () => {
    render(<RecipesProvider />);
    await waitFor(() => {
      const filterButton = screen.getByRole('button', { name: 'Beef' });
      userEvent.click(filterButton);
    });
  })

  // Testes seguintes usam o pathname "/drinks" 
  it('Should display five different drink buttons filters.', async () => {
    global.window.location = {
      pathname: '/drinks',
    };
    render(<RecipesProvider />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Ordinary Drink' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Cocktail' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Shake' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Other/Unknown' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Cocoa' })).toBeDefined();
    });
  })

  it('Should display 12 different drink recipes.', async () => {
    render(<RecipesProvider />);
    await waitFor(() => {
      const allFoodRecipes = screen.getAllByAltText('Recipe.');
      expect(allFoodRecipes).toHaveLength(12);
    });
  })

  it('Should be possible to click the drink filter buttons.', async () => {
    render(<RecipesProvider />);
    await waitFor(() => {
      const filterButton = screen.getByRole('button', { name: 'Ordinary Drink' });
      userEvent.click(filterButton);
    });
  })
})