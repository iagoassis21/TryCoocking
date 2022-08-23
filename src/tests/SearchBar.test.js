import React from 'react';
import { screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('testing the Search Bar component', () => {
  delete global.window.location;
  global.window = Object.create(window);

  global.window.location = {
    pathname: '/foods',
  };

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
})