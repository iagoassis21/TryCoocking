import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouter from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event'


describe('testing the Header component', () => {
  it('should test if the pieces of header are in the document', () => {
    renderWithRouter(<Header title="Header"/>);
    const expectedTitle = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(expectedTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });
  it('should test the profile button', () => {
    const { history } = renderWithRouter(<Header title="Header"/>);
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/profile');
  })
  it('should test the search button', () => {
    renderWithRouter(<Header title="Header"/>);
    const searchBtn = screen.getByTestId('search-top-btn');
    expect(screen.queryByTestId('search-input')).toBeNull();
    userEvent.click(searchBtn);
    expect(screen.queryByTestId('search-input')).toBeInTheDocument();
  })
})
