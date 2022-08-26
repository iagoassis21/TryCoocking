import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const shareButton = ({ id, type }) => {
  const URL = `localhost:3000/${type}/${id}`;
  copy(URL);

  alert('Link Copied!');
};

export const mapItensFood = (element) => (
  <div key={ element.id }>
    <Link to={ `foods/${element.id}` }>
      <img
        src={ element.image }
        alt=""
        data-testid={ `${element.id}-horizontal-image` }
        className="main-page-recipe-img"
      />
    </Link>

    <h4
      data-testid={ `data-testid="${element.id}-horizontal-top-text"` }
    >
      { element.category }
    </h4>

    <Link to={ `foods/${element.id}` }>
      <h2
        data-testid={ `data-testid="${element.id}-horizontal-name"` }
      >
        { element.name }
      </h2>
    </Link>

    <h4
      data-testid={ `data-testid="${element.id}-horizontal-done-date"` }
    >
      { element.doneDate }
    </h4>

    <button
      type="button"
      onClick={ () => shareButton(element) }
      data-testid={ `${element.id}-horizontal-share-btn` }
    >
      <img src={ shareIcon } alt="share-button" />
    </button>

    <h4
      data-testid={
        `data-testid=${element.id}-${element.tags}-horizontal-tag"`
      }
    >
      { element.tags }
    </h4>
  </div>
);

export const mapItensDrinks = (element) => (
  <div key={ element.id }>
    <Link to={ `drinks/${element.id}` }>
      <img
        src={ element.image }
        alt=""
        data-testid={ `${element.id}-horizontal-image` }
        className="main-page-recipe-img"
      />
      <h2
        data-testid={ `data-testid="${element.id}-horizontal-name"` }
      >
        { element.name }
      </h2>
    </Link>
    <h4
      data-testid={ `data-testid="${element.alcoholicOrNot}-alcoholic-or-not"` }
    >
      { element.alcoholicOrNot }
    </h4>
    <h4
      data-testid={ `data-testid="${element.id}-horizontal-done-date"` }
    >
      { element.doneDate }
    </h4>

    <button
      type="button"
      onClick={ () => shareButton(element) }
      data-testid={ `${element.id}-horizontal-share-btn` }
    >
      <img src={ shareIcon } alt="share-button" />
    </button>

  </div>
);
