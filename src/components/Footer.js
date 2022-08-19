import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  return (
    <nav data-testid="footer" className="footer">
      <Link to="/foods">
        <img src={ mealIcon } alt={ mealIcon } data-testid="food-bottom-btn" />
      </Link>
      <Link to="/drinks">
        <img src={ drinkIcon } alt={ drinkIcon } data-testid="drinks-bottom-btn" />
      </Link>
    </nav>
  );
}

export default Footer;
