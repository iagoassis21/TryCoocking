import React from 'react';
import '../App.css';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer() {
  const history = useHistory();
  const changePage = (newPathname) => {
    history.push(newPathname);
    window.location.reload();
  };

  return (
    <nav data-testid="footer" className="main-footer">
      <button
        type="button"
        onClick={ () => changePage('foods') }
        className="footer-button"
      >
        <img src={ mealIcon } alt={ mealIcon } data-testid="food-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => changePage('drinks') }
        className="footer-button"
      >
        <img src={ drinkIcon } alt={ drinkIcon } data-testid="drinks-bottom-btn" />
      </button>
    </nav>
  );
}
export default Footer;
