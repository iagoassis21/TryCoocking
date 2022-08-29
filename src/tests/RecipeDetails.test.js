import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests of RecipesDetails component.', () => {
  delete global.window.location;
  global.window = Object.create(window);
  global.window.location = {
    reload: jest.fn(),
    pathname: '/foods',
  };

  it('Should display an load when the component is open.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52785');
    expect(screen.getByRole('heading', { level: 1})).toBeDefined();
  });

  it('Should display the Day fry details page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52785');
    await waitFor(() => {
      const foodTitle = screen.getByRole('heading', { level: 2 });
      expect(foodTitle).toHaveTextContent('Dal fry');
    });
  });

  it('Should exist a toggle favorite button.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52785');
    await waitFor(() => {
      const favButton = screen.getByTestId('favorite-btn');
      expect(favButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
      userEvent.click(favButton);
      expect(favButton).toHaveAttribute('src', 'blackHeartIcon.svg');
      userEvent.click(favButton);
      expect(favButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
    });
  });

  it('Should already be favorited when the page load.', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify([{id: '52977'}]))
    history.push('/foods/52977');
    await waitFor(() => {
      const favButton = screen.getByTestId('favorite-btn');
      expect(favButton).toHaveAttribute('src', 'blackHeartIcon.svg');
      userEvent.click(favButton);
      expect(favButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
    });
  });

  it('Should keep old favorited recipes on storage.', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify([{id: '52977'}]))
    history.push('/foods/52785');
    await waitFor(() => {
      expect(localStorage.getItem('favoriteRecipes')).not.toBeNull();
      const favButton = screen.getByTestId('favorite-btn');
      expect(favButton).toHaveAttribute('src', 'whiteHeartIcon.svg');
      userEvent.click(favButton);
      expect(favButton).toHaveAttribute('src', 'blackHeartIcon.svg');
    });
  });

  it('Should keep track of the done recipes.', async () => {
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('doneRecipes', JSON.stringify([{id: '52977'}]))
    history.push('/foods/52785');
    await waitFor(() => {
      expect(localStorage.getItem('doneRecipes')).not.toBeNull();
    });
  });

  it('Should change the start button text when a recipe is started.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52785');
    await waitFor(() => {
      const startButton = screen.getByRole('button', { name: 'Start Recipe' });
      userEvent.click(startButton);
    });
    await waitFor(() => {
      const ingredientButton = screen.getByText('Toor dal');
      userEvent.click(ingredientButton);
    });
    history.push('/foods/52785');
    await waitFor(() => {
      const continueButton = screen.getByRole('button', { name: 'Continue Recipe' });
      userEvent.click(continueButton);
    });
  });
  
  it('Should display the GG details page', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/15997');
    await waitFor(() => {
      const foodTitle = screen.getByRole('heading', { level: 2 });
      expect(foodTitle).toHaveTextContent('GG');
    });
  });
  
    it('Should be possible to click the drink recommendation cards.', async () => {
      delete global.window.location;
      global.window = Object.create(window);
      global.window.location = {
        pathname: '/drinks/15997',
        reload: jest.fn(),
      };
      const { history } = renderWithRouter(<App />);
      history.push('/foods/52977');
      await waitFor(() => {
        const ggCard = screen.getByTestId('0-recomendation-card');
        const a1Card = screen.getByTestId('1-recomendation-card');
        userEvent.click(ggCard);
        expect(window.location.reload).toHaveBeenCalled();
        userEvent.click(a1Card);
        expect(window.location.reload).toHaveBeenCalled();
      });
    });
  
  it('Should be possible to click the food recommendation cards.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/15997');
    await waitFor(() => {
      const corbaCard = screen.getByTestId('0-recomendation-card'); 
      const burekCard = screen.getByTestId('1-recomendation-card'); 
      userEvent.click(corbaCard);
      expect(window.location.reload).toHaveBeenCalled();
      userEvent.click(burekCard);
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
