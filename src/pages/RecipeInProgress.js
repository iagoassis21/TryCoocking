import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { drinkRecipeList, mealRecipeList } from '../helpers/fetchRecipeListApi';
import '../App.css';
import xincaraclabin from '../helpers/localStorageIngredients';

const copy = require('clipboard-copy');

function RecipeInProgress({ drink = false }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [ingredient, setCheckedIngredient] = useState([]);
  const [shareRecipe, setShareRecipe] = useState('');
  const history = useHistory();

  useEffect(() => {
    if (drink) {
      const getDrinkRecipeList = async () => {
        const results = await drinkRecipeList(id);
        setRecipe(results.drinks[0]);
      };
      getDrinkRecipeList();
      if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
        return localStorage.setItem('inProgressRecipes',
          JSON.stringify({ cocktails: {}, meals: {} }));
      }
      const getCheckedDrinks = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (getCheckedDrinks.cocktails[id]) {
        setCheckedIngredient(getCheckedDrinks.cocktails[id]);
      }
      return;
    }

    const getMealRecipeList = async () => {
      const results = await mealRecipeList(id);
      setRecipe(results.meals[0]);
    };
    getMealRecipeList();
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      return localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }));
    }
    const getCheckedMeals = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getCheckedMeals.meals[id]) {
      setCheckedIngredient(getCheckedMeals.meals[id]);
    }
  }, []);

  const handleCheckIngredient = (e) => {
    if (ingredient.includes(e.target.id)) {
      const dullen = ingredient
        .filter((markedIngredient) => markedIngredient !== e.target.id);
      xincaraclabin(drink, { [id]: dullen });
      return setCheckedIngredient(dullen);
    }
    setCheckedIngredient([...ingredient, e.target.id]);
    const beckenjhonsons = { [id]: [...ingredient, e.target.id] };
    xincaraclabin(drink, beckenjhonsons);
  };
  const recipeIngredients = Object.keys(recipe || {})
    .filter((key) => key.includes('strIngredient') && (recipe[key]))
    .map((item) => recipe[item]).map((validIngredient) => (
      <label
        htmlFor={ validIngredient }
        key={ validIngredient }
        className={ ingredient.includes(validIngredient) ? 'usedIngredient' : null }
      >
        <input
          id={ validIngredient }
          type="checkbox"
          onChange={ (e) => handleCheckIngredient(e) }
          checked={ ingredient.includes(validIngredient) }
        />
        {validIngredient}
      </label>
    ));

  // const checkFavorited = () => {
  //   const favoritedRecipes = localStorage.getItem('favoriteRecipes');
  //   if (favoritedRecipes === null) return false;
  //   const alreadyFavorited = JSON.parse(favoritedRecipes)
  //     .find((recipe) => recipe.id === recipeId);
  //   if (alreadyFavorited) {
  //     setFavoritedRecipe(true);
  //   } else {
  //     setFavoritedRecipe(false);
  //   }
  // };

  // const deleteFavorite = () => {
  //   const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  //   const newFavorites = JSON.stringify(favorites.filter((fav) => fav.id !== recipeId));
  //   localStorage.setItem('favoriteRecipes', newFavorites);
  // };

  // const handleFavorite = (favorited) => {
  //   if (favorited) {
  //     deleteFavorite();
  //   } else {
  //     const removeLastLetter = -1;
  //     const recipeToFavorite = {
  //       id: recipeId,
  //       type: pageType.slice(0, removeLastLetter),
  //       nationality: recipeArea || '',
  //       category: recipeCategory || '',
  //       alcoholicOrNot: recipeAlcohol || '',
  //       name: recipeTitle,
  //       image: recipeImage,
  //     };
  //     if (localStorage.getItem('favoriteRecipes') === null) {
  //       localStorage.setItem('favoriteRecipes', JSON.stringify([recipeToFavorite]));
  //     } else {
  //       const oldData = localStorage.getItem('favoriteRecipes');
  //       const recuperedData = JSON.parse(oldData);
  //       const newArray = [...recuperedData, recipeToFavorite];
  //       localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
  //     }
  //   }
  //   checkFavorited();
  // };

  const clipBoardCopy = (
    <span>Link copied!</span>
  );

  const drinkRecipe = (
    <div>
      <img
        src={ recipe.strDrinkThumb }
        data-testid="recipe-photo"
        alt="Foto da receita"
        width="150"
      />
      <h1 data-testid="recipe-title">{recipe.strDrink}</h1>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          setShareRecipe(true);
          copy(`http://localhost:3000/drinks/${id}`);
        } }
      >
        Share Recipe
      </button>
      {
        shareRecipe ? clipBoardCopy : ''
      }
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite Recipe
      </button>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ ingredient.length !== recipeIngredients.length }
        onClick={ () => { history.push('/done-recipes'); } }
      >
        Finish Recipe
      </button>
    </div>
  );
  const mealRecipe = (
    <div>
      <img
        src={ recipe.strMealThumb }
        data-testid="recipe-photo"
        alt="Foto da receita"
        width="150"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          setShareRecipe(true);
          copy(`http://localhost:3000/foods/${id}`);
        } }
      >
        Share Recipe
      </button>
      {
        shareRecipe ? clipBoardCopy : ''
      }
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorite Recipe
      </button>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ ingredient.length !== recipeIngredients.length }
        onClick={ () => { history.push('/done-recipes'); } }
      >
        Finish Recipe
      </button>
    </div>
  );
  return (
    <div>

      {
        drink ? drinkRecipe : mealRecipe
      }
      {
        recipeIngredients.map((ingredients, index) => (
          <p
            data-testid={ `${index}-ingredient-step` }
            key={ index }
          >
            {ingredients}
          </p>
        ))
      }
    </div>
  );
}

RecipeInProgress.propTypes = {
  drink: PropTypes.bool.isRequired,
};

export default RecipeInProgress;
