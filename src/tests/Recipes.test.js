import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Recipes from '../pages/Recipes';
import App from '../App';
import RecipesProvider from '../context/RecipesProvider';

describe('Tests of Recipes component.', () => {
  it('Should display five different food buttons filters.', async () => {
    // renderWithRouter(<RecipesProvider><Recipes pagePath="foods" /></RecipesProvider>);
    renderWithRouter(<Recipes pagePath="foods" />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /beef/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /breakfast/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /chicken/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /dessert/i })).toBeDefined();
      expect(screen.getByRole('button', {  name: /goat/i })).toBeDefined();
    });
  });
  
  it('Should display 12 different food recipes.', async () => {
    renderWithRouter(<Recipes pagePath="foods" />);
    await waitFor(() => {
      const allFoodRecipes = screen.getAllByAltText('Recipe.');
      expect(allFoodRecipes).toHaveLength(12);
    });
  });

  it('Should be possible to click the food filter buttons.', async () => {
    renderWithRouter(<Recipes pagePath="foods" />);
    await waitFor(() => {
      const firstFilterButton = screen.getByRole('button', { name: 'Beef' });
      expect(screen.getByRole('heading', { name: /corba/i }));
      userEvent.click(firstFilterButton);
    });
    await waitFor(() => {
      const allFilterButton = screen.getByRole('button', { name: 'All' });
      expect(screen.getByRole('heading', {  name: /beef and mustard pie/i })).toBeDefined();
      userEvent.click(allFilterButton);
    });
  });

  it('Should toggle the filter when it\'s clicked.', async () => {
    renderWithRouter(<Recipes pagePath="foods" />);
    await waitFor(() => {
      const filterButton = screen.getByRole('button', { name: 'Beef' });
      const firstResult = screen.getAllByRole('heading', { level: 2 })[0];
      expect(firstResult).toHaveTextContent('Corba');
      userEvent.click(filterButton);
    });
    await waitFor(() => {
      const filterButton = screen.getByRole('button', { name: 'Beef' });
      const firstResult = screen.getAllByRole('heading', { level: 2 })[0];
      expect(firstResult).toHaveTextContent('Beef and Mustard Pie');
      userEvent.click(filterButton);
    });
    await waitFor(() => {
      const firstResult = screen.getAllByRole('heading', { level: 2 })[0];
      expect(firstResult).toHaveTextContent('Corba');
    });
  });

  it('Should redirect to "drinks/recipeId" when an recipe in clicked.', async () => {
    renderWithRouter(<Recipes pagePath="drinks" />);
    await waitFor(() => {
      const expectedHref = 'http://localhost/drinks/15997';
      const firstLink = screen.getAllByRole('link')[0];
      expect(firstLink).toHaveProperty('href', expectedHref)
    });
  });
  
  it('Should display five different drink buttons filters.', async () => {
    renderWithRouter(<Recipes pagePath="drinks" />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /ordinary drink/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /cocktail/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /shake/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /Other\/Unknown/i })).toBeDefined();
      expect(screen.getByRole('button', { name: /cocoa/i })).toBeDefined();
    });
  });

  it('Should display 12 different drink recipes.', async () => {
    renderWithRouter(<Recipes pagePath="drinks" />);
    await waitFor(() => {
      const allDrinksRecipes = screen.getAllByAltText('Recipe.');
      expect(allDrinksRecipes).toHaveLength(12);
    });
  });

  it('Should be possible to click the drink filter buttons.', async () => {
    renderWithRouter(<Recipes pagePath="drinks" />);
    await waitFor(() => {
      const firstFilterButton = screen.getByRole('button', { name: /ordinary drink/i });
      expect(screen.getByRole('heading', { name: /gg/i }));
      userEvent.click(firstFilterButton);
      screen.debug()
    });
    await waitFor(() => {
      const allFilterButton = screen.getByRole('button', { name: /all/i });
      expect(screen.getByRole('heading', {  name: /3\-mile long island iced tea/i})).toBeDefined();
      userEvent.click(allFilterButton);
    });
  })
});
