import React, { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';
import '../styles/FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [filter, setFilter] = useState('all');

  const applyFilter = () => (filter === 'all'
    ? favorites
    : favorites.filter(({ type }) => type === filter));

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);

  const filteredFavorites = applyFilter();

  return (
    <div className="favorite-recipes-container">
      <Header title="Favorite Recipes" icons={ { profile: true, search: false } } />
      <div className="favorite-recipes-buttons">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFilter('all') }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => setFilter('food') }
        >
          Foods
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>

      {
        filteredFavorites && filteredFavorites.map((f, idx) => (<FavoriteCard
          key={ f.name }
          idx={ idx }
          setFavorites={ setFavorites }
          { ...f }
        />))
      }
    </div>
  );
}
