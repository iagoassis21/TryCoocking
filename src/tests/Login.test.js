import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event'

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('Test Page - Login', () => {
  test('Inputs and Button', () => {
    renderWithRouter(<App />)
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passInput = screen.getByPlaceholderText(/senha/i);
    const btnEnter = screen.getByRole('button', {name: /Enter/i});

    expect(emailInput).toBeDefined();
    expect(passInput).toBeDefined();
    expect(btnEnter).toBeDefined();
    expect(btnEnter).toBeDisabled();
  });
  test('Type in Inputs', () => {
    renderWithRouter(<App />)
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passInput = screen.getByPlaceholderText(/senha/i);
    const btnEnter = screen.getByRole('button', {name: /Enter/i});

    userEvent.type(emailInput, 'kauan.s.leite@gmail.com')
    userEvent.type(passInput, '1234567')

    expect(btnEnter).toBeEnabled();
  });
    test('Enter in App', () => {
    renderWithRouter(<App />)
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passInput = screen.getByPlaceholderText(/senha/i);
    const btnEnter = screen.getByRole('button', {name: /Enter/i});

    userEvent.type(emailInput, 'kauan.s.leite@gmail.com')
    userEvent.type(passInput, '1234567')
    userEvent.click(btnEnter);

    const userStorage = localStorage.getItem('user');
    const mealsTokenStorage = localStorage.getItem('mealsToken');
    const cocktailsTokenStorage = localStorage.getItem('cocktailsToken');

    expect(userStorage).toBe(JSON.stringify({email: 'kauan.s.leite@gmail.com'}))
    expect(mealsTokenStorage).toBe('1')
    expect(cocktailsTokenStorage).toBe('1')
  });
})