import React from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

const transform = (tags) => {
  const arrTags = tags.toString().split(',');
  console.log(arrTags);
  return arrTags;
};

export const mapItensFood = (element, index, setShowCopy) => (
  <div key={ element.id } className="done-recipes-card">
    <Link to={ `foods/${element.id}` }>
      <img
        src={ element.image }
        alt=""
        data-testid={ `${index}-horizontal-image` }
        className="recipe-image"
      />
    </Link>

    <h4
      data-testid={ `${index}-horizontal-top-text` }
    >
      { `${element.nationality} - ${element.category}` }
    </h4>

    <Link to={ `foods/${element.id}` }>
      <h2
        data-testid={ `${index}-horizontal-name` }
      >
        { element.name }
      </h2>
    </Link>

    <h4
      data-testid={ `${index}-horizontal-done-date` }
    >
      { element.doneDate }
    </h4>

    {
      element.tags !== undefined ? (
        transform(element.tags).map((tag) => (
          <h4
            key={ tag }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}

          </h4>
        ))
      ) : null
    }

    <button
      type="button"
      onClick={ () => {
        copy(`http://localhost:3000/foods/${element.id}`);
        setShowCopy(true);
      } }
    >

      <img
        src={ shareIcon }
        alt="share-button"
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </button>

  </div>
);

export const mapItensDrinks = (element, index, setShowCopy) => (
  <div key={ element.id } div className="done-recipes-card">
    <Link to={ `drinks/${element.id}` }>
      <img
        src={ element.image }
        alt=""
        data-testid={ `${index}-horizontal-image` }
        className="recipe-image"
      />
    </Link>

    <h4
      data-testid={ `${index}-horizontal-top-text` }
    >
      { element.alcoholicOrNot }
    </h4>

    <Link to={ `drinks/${element.id}` }>
      <h2
        data-testid={ `${index}-horizontal-name` }
      >
        { element.name }
      </h2>
    </Link>

    <h4
      data-testid={ `${index}-horizontal-done-date` }
    >
      { element.doneDate }
    </h4>

    <button
      type="button"
      onClick={ () => {
        copy(`http://localhost:3000/drinks/${element.id}`);
        setShowCopy(true);
      } }
    >
      <img
        src={ shareIcon }
        alt="share-button"
        data-testid={ `${index}-horizontal-share-btn` }
      />
    </button>

  </div>
);
