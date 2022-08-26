import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Recipes from '../pages/Recipes';
import App from '../App';

describe('Tests of Recipes component.', () => {
  // delete global.window.location;
  // global.window = Object.create(window);

  // global.window.location = {
  //   pathname: '/foods',
  // };

  // Testes seguintes usam o pathname "/foods" 
  it('Should display five different food buttons filters.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {
      expect(screen.findByRole('button', { name: 'Beef' })).toBeDefined();
      expect(screen.findByRole('button', { name: 'Breakfast' })).toBeDefined();
      expect(screen.findByRole('button', { name: 'Chicken' })).toBeDefined();
      expect(screen.findByRole('button', { name: 'Dessert' })).toBeDefined();
      expect(screen.findByRole('button', { name: 'Goat' })).toBeDefined();
    });
  })
  
  it.only('Should display 12 different food recipes.', async () => {
    const { history } = renderWithRouter(<Recipes pagePath="drinks" />);
    history.push('/drinks');
    await waitFor(() => {
      // const allFoodRecipes = screen.getByTestId('11-card-img');
      // expect(allFoodRecipes).toBeDefined();
      expect(screen.findByText('Corba')).toBeDefined();
      screen.debug()
    });
  })

  it('Should be possible to click the food filter buttons.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {
      const firstFilterButton = screen.getByRole('button', { name: 'Beef' });
      const allFilterButton = screen.getByRole('button', { name: 'All' });
      userEvent.click(firstFilterButton);
      userEvent.click(allFilterButton);
    });
  })

  it('Should toggle the filter when it\'s clicked.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
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
  })

  it('Should redirect to "drinks/recipeId" when an recipe in clicked.', async () => {
    // Testes seguintes usam o pathname "/drinks" 
    global.window.location = {
      pathname: '/drinks',
    };
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {
      const expectedHref = 'http://localhost/drinks/15997';
      const firstLink = screen.getAllByRole('link')[0];
      expect(firstLink).toHaveProperty('href', expectedHref)
    });
  })
  
  it('Should display five different drink buttons filters.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Ordinary Drink' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Cocktail' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Shake' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Other/Unknown' })).toBeDefined();
      expect(screen.getByRole('button', { name: 'Cocoa' })).toBeDefined();
    });
  })

  it('Should display 12 different drink recipes.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {
      const allFoodRecipes = screen.getAllByAltText('Recipe.');
      expect(allFoodRecipes).toHaveLength(12);
    });
  })

  it('Should be possible to click the drink filter buttons.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await waitFor(() => {
      const filterButton = screen.getByRole('button', { name: 'Ordinary Drink' });
      userEvent.click(filterButton);
    });
  })
});
