import React from 'react';
import Header from '../components/Header';

export default function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" icons={ { profile: true, search: false } } />
    </div>
  );
}
