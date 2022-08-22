import React from 'react';
import { screen } from '@testing-library/react';
import Header from '../components/Header';
import renderWithRouter from '../helpers/renderWithRouter';


describe('testing the Header component', () => {
  it('should test if the pieces of header are in the document', () => {
    renderWithRouter(<Header title="Header"/>);
    const expectedTitle = screen.getByTestId('page-title');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    expect(expectedTitle).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });
})
