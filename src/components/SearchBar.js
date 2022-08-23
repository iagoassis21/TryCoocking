import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Context from '../context/Context';
import getRecipes from '../helpers/getRecipes';

export default function SearchBar() {
  const { setDisplayRecipes, searchValue } = useContext(Context);
  const [type, setType] = useState('');
  const { location: { pathname } } = useHistory();

  const verifyAlert = () => {
    if (type === 'first-letter' && searchValue.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const setSearch = async () => {
    verifyAlert();
    const recipes = await getRecipes(type, searchValue, pathname);
    if (recipes) setDisplayRecipes(recipes);
    else setDisplayRecipes([]);
  };

  return (
    <form>
      <label htmlFor="ingredient">
        <input
          data-testid="ingredient-search-radio"
          type="radio"
          name="search-section"
          id="ingredient"
          onChange={ (e) => setType(e.target.id) }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          data-testid="name-search-radio"
          type="radio"
          name="search-section"
          id="name"
          onChange={ (e) => setType(e.target.id) }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          data-testid="first-letter-search-radio"
          type="radio"
          name="search-section"
          id="first-letter"
          onChange={ (e) => setType(e.target.id) }
        />
        First letter
      </label>
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ () => setSearch() }
        disabled={ !(searchValue && type) }
      >
        Search
      </button>
    </form>
  );
}
