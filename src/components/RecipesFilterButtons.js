import React, { useContext } from 'react';
import Context from '../context/Context';

function RecipesFilterButtons() {
  const {
    allFilters,
    filterRecipes,
    setDisplayRecipes,
    allRecipes,
  } = useContext(Context);

  return (
    <div>
      {allFilters.length > 0 && allFilters.map(({ strCategory }) => (
        <button
          data-testid={ `${strCategory}-category-filter` }
          type="button"
          key={ strCategory }
          onClick={ () => filterRecipes(strCategory) }
        >
          { strCategory }
        </button>
      ))}
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={ () => setDisplayRecipes(allRecipes) }
      >
        All
      </button>
    </div>
  );
}

export default RecipesFilterButtons;
