import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('testing the Search Bar component', () => {
  it('should test the alert of first letter filter', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    const firstLetterRadio = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstLetterRadio);
    const execSearch = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'cc');
    userEvent.click(execSearch);
    expect(window.alert).toBeCalled();
  });
  it('should test if have no recipes', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    await screen.findByTestId('0-recipe-card')
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameSearchRadio);
    const execSearch = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'no recipes was finded');
    userEvent.click(execSearch);
    await waitForElementToBeRemoved(() => screen.getByTestId('0-recipe-card'))
    expect(window.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.');
  })
  it('should test the alert if recipes have length 12', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const expectedCard = await screen.findByTestId('11-recipe-card');
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameSearchRadio);
    const execSearch = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearch);
    const unexpectedCard = screen.queryByTestId('12-recipe-card');
    expect(expectedCard).toBeInTheDocument();
    expect(unexpectedCard).toBeNull();
  });
  it('should test the function which redirects in case of one element', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchInput = screen.getByTestId('search-input');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    userEvent.click(nameSearchRadio);
    const execSearch = screen.getByTestId('exec-search-btn');
    userEvent.type(searchInput, 'Corba');
    userEvent.click(execSearch);
    await waitForElementToBeRemoved(() => screen.getByTestId('page-title'))
    const { location: { pathname } } = history;
    expect(pathname).toBe('/foods/52977');
  });
})