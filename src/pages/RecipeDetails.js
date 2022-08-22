import React, { useContext } from 'react';
import Context from '../context/Context';

function RecipeDetails() {
  const {
    loading,
  } = useContext(Context);
  return (
    <div className="screen-size">
      { loading
        ? <h1>Loading...</h1>
        : <p>WIP</p> }
    </div>
  );
}

export default RecipeDetails;
