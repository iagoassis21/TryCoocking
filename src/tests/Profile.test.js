import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';

const EMAILINPUT = 'email-input';
const PASSWORDINPUT = 'password-input';
const PROFILEIMG = 'profile-top-btn';
const EMAILTEST = 'a@gmail.com';

describe('Teste do componente Profile', () => {
  it('Teste do componente profile', async () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(EMAILINPUT);
    const inputPassword = screen.getByTestId(PASSWORDINPUT);
    const btnEnter = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, EMAILTEST);
    userEvent.type(inputPassword, '1234567');
    expect(btnEnter).toBeEnabled();

    userEvent.click(btnEnter);

    const buttonProfile = screen.getByTestId(PROFILEIMG);
    userEvent.click(buttonProfile);
    expect(localStorage.getItem('user')).not.toBe(null);
    const emailProfile = screen.getByTestId('profile-email');
    expect(emailProfile).toHaveTextContent(EMAILTEST);

    const textProfile = screen.getByTestId('page-title');
    expect(textProfile).toBeInTheDocument();
    const imgProfile = screen.getByTestId(PROFILEIMG);
    expect(imgProfile).toBeInTheDocument();
    expect(emailProfile).toBeInTheDocument();
    const buttonProfileDone = screen.getByTestId('profile-done-btn');
    const buttonProfileFav = screen.getByTestId('profile-favorite-btn');
    const buttonProfileLogout = screen.getByTestId('profile-logout-btn');
    expect(buttonProfileDone).toBeInTheDocument();
    expect(buttonProfileFav).toBeInTheDocument();
    expect(buttonProfileLogout).toBeInTheDocument();

    userEvent.click(buttonProfileDone);
    expect(history.location.pathname).toBe('/done-recipes');
    userEvent.click(screen.getByTestId(PROFILEIMG));

    const profile = await screen.findByText(/profile/i);
    expect(profile).toBeInTheDocument();
    expect(history.location.pathname).toBe('/profile');

    userEvent.click(screen.getByTestId('profile-favorite-btn'));
    expect(history.location.pathname).toBe('/favorite-recipes');

    userEvent.click(screen.getByTestId(PROFILEIMG));
    userEvent.click(screen.getByTestId('profile-logout-btn'));
    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('user')).toBe(null);
    history.push('/profile');
    expect(screen.getByTestId('profile-email')).toHaveTextContent('');
  });
});
