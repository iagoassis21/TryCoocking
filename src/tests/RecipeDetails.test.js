import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Tests of RecipesDetails component.', () => {
  delete global.window.location;
  global.window = Object.create(window);

  global.window.location = {
    pathname: '/foods',
  };

  it('Should display an load when the component is open.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods/52785');
    expect(screen.getByRole('heading', { level: 1})).toBeDefined();
  });

  // it('', () => {
  // });
})