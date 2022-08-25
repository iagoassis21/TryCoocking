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
    <nav data-testid="footer" className="footer">
      <button type="button" onClick={ () => changePage('foods') }>
        <img src={ mealIcon } alt={ mealIcon } data-testid="food-bottom-btn" />
      </button>
      <button type="button" onClick={ () => changePage('drinks') }>
        <img src={ drinkIcon } alt={ drinkIcon } data-testid="drinks-bottom-btn" />
      </button>
    </nav>
  );
}
export default Footer;
