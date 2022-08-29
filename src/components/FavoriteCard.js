import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteCard(data) {
  const { id, idx, image, name, type, category,
    nationality, alcoholicOrNot, setFavorites } = data;
  const [linkCopied, setLinkCopied] = useState(false);

  const createDescription = () => {
    if (type === 'drink') return <span>{ alcoholicOrNot }</span>;
    return (
      <>
        <span>{nationality}</span>
        {' - '}
        <span>{category}</span>
      </>);
  };
  const disfavorItem = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filtered = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    setFavorites(filtered);
  };

  const copyItem = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setLinkCopied(true);
  };

  return (
    <div>
      <Link to={ `/${type}s/${id}` }>
        <img
          data-testid={ `${idx}-horizontal-image` }
          src={ image }
          alt={ name }
          style={ { width: '200px' } }
        />
      </Link>
      <Link to={ `/${type}s/${id}` }>
        <span data-testid={ `${idx}-horizontal-name` }>{ name }</span>
      </Link>
      <p data-testid={ `${idx}-horizontal-top-text` }>
        { createDescription() }
      </p>
      <button
        type="button"
        onClick={ disfavorItem }
      >
        <img
          data-testid={ `${idx}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="black-heart"
        />
      </button>
      <button
        type="button"
        onClick={ copyItem }
      >
        <img
          data-testid={ `${idx}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share-icon"
        />
      </button>
      {
        linkCopied && <span>Link copied!</span>
      }
    </div>
  );
}
