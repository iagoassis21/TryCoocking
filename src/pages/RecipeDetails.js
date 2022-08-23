import React, { useContext } from 'react';
import Context from '../context/Context';
import RecipeDetailsCard from '../components/RecipeDetailsCard';

function RecipeDetails() {
  const {
    loading,
  } = useContext(Context);
  return (
    <div>
      { loading
        ? <h1>Loading...</h1>
        : <RecipeDetailsCard /> }
    </div>
  );
}

export default RecipeDetails;
