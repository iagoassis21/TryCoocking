import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import oneDrink from '../../cypress/mocks/oneDrink';
import oneMeal from '../../cypress/mocks/oneMeal';


describe('Page - Done Recipes', () => {
  Object.defineProperty(navigator, "clipboard", {
    value: {
      writeText: () => {},
    },
  });
  test('None Itens Completed', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const msgNoneItem = screen.getByRole('heading', {name: /Nenhuma Receita/i});
    const filterAll = screen.getByRole('button', {name: /All/i});
    const filterFood = screen.getByRole('button', {name: /Food/i});
    const filterDrinks = screen.getByRole('button', {name: /Drinks/i});

    expect(msgNoneItem).toBeInTheDocument();

    userEvent.click(filterAll);
    expect(msgNoneItem).toBeInTheDocument();

    userEvent.click(filterFood);
    expect(msgNoneItem).toBeInTheDocument();

    userEvent.click(filterDrinks);
    expect(msgNoneItem).toBeInTheDocument();
  });
  test('With Drinks', async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn()
      .mockResolvedValue(oneDrink)
    });
    const { history } = renderWithRouter(<App />);
    history.push('/drinks/178319/in-progress');
    
    await waitFor(()=> expect(fetch).toBeCalled())
    expect(screen.getByRole('heading', { level: 2})).toBeInTheDocument();
    const allItens = screen.getAllByRole('checkbox', /ingredient/i);
    expect(allItens.length).toBe(3);
    for (let index = 0; index < allItens.length; index += 1) {
      userEvent.click(allItens[index]);
    }

    const finishBtn = screen.getByRole('button', {name: /Finish/i});
    userEvent.click(finishBtn);
    
    const title = screen.getByRole('heading', {name: /Done Recipes/i});
    const drinkName = screen.getByRole('heading', {name: /Aquamarine/i});
    const alcool = screen.getByText(/Alcoholic/i)
    const year = screen.getByText(/2022/i)
    const copyBtn = screen.getByAltText(/share/i);
    
    expect(title).toBeInTheDocument();
    expect(drinkName).toBeInTheDocument();
    expect(alcool).toBeInTheDocument();
    expect(year).toBeInTheDocument();
    expect(copyBtn).toBeInTheDocument();

    const filterFood = screen.getByRole('button', {name: /Food/i});
    expect(filterFood).toBeInTheDocument();

    userEvent.click(filterFood);

    expect(drinkName).not.toBeInTheDocument();

    const filterDrinks = screen.getByRole('button', {name: /Drinks/i});
    userEvent.click(filterDrinks);

    const drinkNameAfter = screen.getByRole('heading', {name: /Aquamarine/i});

    expect(drinkNameAfter).toBeInTheDocument();

    const shareBtn = screen.getByAltText(/share-button/i);
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);

    const copyLink = screen.getByText(/Link copied!/i)
    expect(copyLink).toBeInTheDocument();
  });
  test('With Foods', async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn()
      .mockResolvedValue(oneMeal)
    });

    const { history } = renderWithRouter(<App />);
    history.push('/foods/53013/in-progress');

    await waitFor(()=> expect(fetch).toBeCalled())
    expect(screen.getByRole('heading', { level: 2})).toBeInTheDocument();
    const itensMeal = screen.getAllByRole('checkbox', /ingredient/i);
    expect(itensMeal.length).toBe(8);

    for (let index = 0; index < itensMeal.length; index += 1) {
      userEvent.click(itensMeal[index]);
    }

    const finishBtn = screen.getByRole('button', {name: /Finish/i});
    userEvent.click(finishBtn);
    
    const title = screen.getByRole('heading', {name: /Done Recipes/i});
    const recipeName = screen.getByRole('heading', {name: /Spicy/i});
    const filterFood = screen.getByRole('button', {name: /Food/i});
    const drinkName = screen.getByRole('heading', {name: /Aquamarine/i});
    
    expect(title).toBeInTheDocument();
    expect(recipeName).toBeInTheDocument();
    expect(filterFood).toBeInTheDocument();

    userEvent.click(filterFood);

    expect(drinkName).not.toBeInTheDocument();

    const filterAll = screen.getByRole('button', {name: /All/i});
    expect(filterAll).toBeInTheDocument();
    userEvent.click(filterAll);

    const recipeNameAll = screen.getByRole('heading', {name: /Spicy/i});
    const drinkNameAll = screen.getByRole('heading', {name: /Aquamarine/i});

    expect(recipeNameAll).toBeInTheDocument();
    expect(drinkNameAll).toBeInTheDocument();
  });
});
