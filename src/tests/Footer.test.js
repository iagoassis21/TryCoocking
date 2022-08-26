import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import userEvent from '@testing-library/user-event'

describe('Footer', () => {
    it('Testa a navegação do botão de comidas no Footer', ()=>{
        renderWithRouter(<App />)
        const emailInput = screen.getByRole('textbox');
        const passInput = screen.getByPlaceholderText(/insira sua senha\.\.\./i);
        const loginBtn = screen.getByRole('button', {  name: /enter/i});
        expect(loginBtn).toHaveProperty('disabled', true);
        userEvent.type(emailInput, 'iagoD@vascao.com');
        userEvent.type(passInput, '1234567');
        expect(loginBtn).toHaveProperty('disabled', false);
        userEvent.click(loginBtn);
        const footerFoods = screen.getByTestId('food-bottom-btn')
        userEvent.click(footerFoods);
    })
    it('Testa a navegação do botão de drinks no Footer', ()=>{
        renderWithRouter(<App />)
        const emailInput = screen.getByRole('textbox');
        const passInput = screen.getByPlaceholderText(/insira sua senha\.\.\./i);
        const loginBtn = screen.getByRole('button', {  name: /enter/i});
        expect(loginBtn).toHaveProperty('disabled', true);
        userEvent.type(emailInput, 'iagoD@vascao.com');
        userEvent.type(passInput, '1234567');
        expect(loginBtn).toHaveProperty('disabled', false);
        userEvent.click(loginBtn);
        const footerDrinks = screen.getByTestId('drinks-bottom-btn')
        userEvent.click(footerDrinks);
    })
})