import React from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes() {
  return (
    <div>
      <Header title="Favorite Recipes" icons={ { profile: true, search: false } } />
    </div>
  );
}
