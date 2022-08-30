import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

describe.only('Tests of RecipesInProgress component.', () => {
Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => {},
    },
  });

  it('Teste da funcionalidade de favoritar', async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal)
    })
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52785/in-progress');
    await waitFor(()=> expect(fetch).toBeCalled())
    expect(screen.getByRole('heading', { level: 1})).toBeInTheDocument();
    userEvent.click(screen.getByTestId('favorite-btn'))
    userEvent.click(screen.getByTestId('favorite-btn'))
    userEvent.click(screen.getByTestId('share-btn'))
  });

  it('Teste da funcionalidade de salvar os ingredientes de comidas', async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal)
    })
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52785/in-progress');
    await waitFor(()=> expect(fetch).toBeCalled())
    expect(screen.getByRole('heading', { level: 1})).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox', {
        name: /penne/i
      }))
      userEvent.click(screen.getByRole('checkbox', {
        name: /penne/i
    }))
    userEvent.click(screen.getByTestId('favorite-btn'))
    userEvent.click(screen.getByTestId('favorite-btn'))
    userEvent.click(screen.getByTestId('share-btn'))
  });
  it('Teste da funcionalidade de salvar os ingredientes de bebidas e iniciar localStorage pela rota de Drinks', async () => {
    localStorage.removeItem('inProgressRecipes')
    jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn()
        .mockResolvedValue(oneDrink)
    })
    const { history } = renderWithRouter(<App />);
    history.push('/foods')
    userEvent.click(screen.getByTestId('drinks-bottom-btn'))
    history.push('/drinks/178319/in-progress');
    await waitFor(()=> expect(fetch).toBeCalled())
    expect(screen.getByRole('heading', { level: 1})).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox', {
        name: /hpnotiq/i
      }))
    userEvent.click(screen.getByRole('checkbox', {
        name: /hpnotiq/i
      }))
      userEvent.click(screen.getByTestId('favorite-btn'))
      userEvent.click(screen.getByTestId('favorite-btn'))
      userEvent.click(screen.getByTestId('share-btn'))
  });
  it('Teste da funcionalidade de salvar os ingredientes de bebidas', async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
        json: jest.fn()
        .mockResolvedValue(oneDrink)
    })
    const { history } = renderWithRouter(<App />);
    history.push('/foods')
    userEvent.click(screen.getByTestId('drinks-bottom-btn'))
    history.push('/drinks/178319/in-progress');
    await waitFor(()=> expect(fetch).toBeCalled())
    expect(screen.getByRole('heading', { level: 1})).toBeInTheDocument();

    userEvent.click(screen.getByRole('checkbox', {
        name: /hpnotiq/i
      }))
    userEvent.click(screen.getByRole('checkbox', {
        name: /hpnotiq/i
      }))
      userEvent.click(screen.getByTestId('favorite-btn'))
      userEvent.click(screen.getByTestId('favorite-btn'))
      userEvent.click(screen.getByTestId('share-btn'))
  });
});
