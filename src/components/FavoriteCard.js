import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteCard(data) {
  const { id, idx, image, name, type, category,
    nationality, alcoholicOrNot, setFavorites } = data;
  const { copiedMessageTimer, setCopiedMessageTimer } = useContext(Context);

  const createDescription = () => {
    if (type === 'drink') return <p>{ alcoholicOrNot }</p>;
    return (<p>{`${nationality} - ${category}`}</p>);
  };
  const disfavorItem = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filtered = favorites.filter((favorite) => favorite.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
    setFavorites(filtered);
  };

  const copyItem = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    const twoSeconds = 2;
    setCopiedMessageTimer(twoSeconds);
  };

  return (
    <div className="favorite-recipes-card">
      <Link to={ `/${type}s/${id}` }>
        <img
          data-testid={ `${idx}-horizontal-image` }
          src={ image }
          alt={ name }
          className="recipe-image"
        />
      </Link>
      <div className="recipe-info">
        <Link to={ `/${type}s/${id}` }>
          <h2 data-testid={ `${idx}-horizontal-name` }>{ name }</h2>
        </Link>
        <p data-testid={ `${idx}-horizontal-top-text` }>
          { createDescription() }
        </p>
        <div className="util-buttons">
          <button
            type="button"
            onClick={ disfavorItem }
          >
            <img
              className="favorite-btn"
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
        </div>
        <p
          className={ `copied-message ${copiedMessageTimer > 0
            ? ''
            : 'hidden'
          }` }
        >
          Link copied!
        </p>
      </div>
    </div>
  );
}
