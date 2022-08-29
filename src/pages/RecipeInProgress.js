import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { drinkRecipeList, mealRecipeList } from '../helpers/fetchRecipeListApi';
import '../App.css';
import setIngredientLocalStorage from '../helpers/localStorageIngredients';
import FavoriteButton from '../components/FavoriteButton';
import FinishRecipeButton from '../components/FinishRecipeButton';
import shareIcon from '../images/shareIcon.svg';
import '../styles/RecipeInProgress.css';

const copy = require('clipboard-copy');

function RecipeInProgress({ drink }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [ingredient, setCheckedIngredient] = useState([]);
  const [shareRecipe, setShareRecipe] = useState('');

  const type = drink ? 'Drink' : 'Meal';
  const url = drink ? 'drinks' : 'foods';

  useEffect(() => {
    if (drink) {
      const getDrinkRecipeList = async () => {
        const results = await drinkRecipeList(id);
        const getArrDrinks = results.drinks[0];
        setRecipe(getArrDrinks);
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
      const getArrMeals = results.meals[0];
      setRecipe(getArrMeals);
    };
    getMealRecipeList();
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      return localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }));
    }
    const getCheckedMeals = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // if (getCheckedMeals.meals[id]) {
    //   setCheckedIngredient();
    // }
    setCheckedIngredient([
      ...(getCheckedMeals?.meals?.[id] || []),
    ]);
  }, []);

  const handleCheckIngredient = (e) => {
    if (ingredient.includes(e.target.id)) {
      const filterCheckedIngredient = ingredient
        .filter((markedIngredient) => markedIngredient !== e.target.id);
      setIngredientLocalStorage(drink, { [id]: filterCheckedIngredient });
      return setCheckedIngredient(filterCheckedIngredient);
    }
    setCheckedIngredient([...ingredient, e.target.id]);
    const objIngredientLocalStorage = { [id]: [...ingredient, e.target.id] };
    setIngredientLocalStorage(drink, objIngredientLocalStorage);
  };

  const recipeIngredients = Object.keys(recipe)
    .filter((key) => key.includes('strIngredient') && (recipe[key]))
    .map((item) => recipe[item]).map((validIngredient) => (
      <label
        htmlFor={ validIngredient }
        key={ validIngredient }
        className={ ingredient.includes(validIngredient)
          ? 'used-ingredient'
          : '' }
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
  const handleDisableBtn = () => {
    const checkFinishedIngredients = ingredient.length !== recipeIngredients.length;
    return checkFinishedIngredients;
  };
  const clipBoardCopy = (
    <span>Link copied!</span>
  );
  if (Object.keys(recipe).length === 0) return <p>Loading...</p>;
  return (
    <div>
      <header className="recipe-inprogress-header">
        <img
          src={ recipe[`str${type}Thumb`] }
          data-testid="recipe-photo"
          alt="Foto da receita"
          width="150"
        />
        <div className="recipe-title">
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          <h2 data-testid="recipe-title">{recipe[`str${type}`]}</h2>
        </div>
      </header>
      <div className="recipe-inprogress-utils">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => {
            setShareRecipe(true);
            copy(`http://localhost:3000/${url}/${id}`);
          } }
        >
          <img src={ shareIcon } alt="Share icon." />
        </button>
        {
          shareRecipe ? clipBoardCopy : ''
        }
        <FavoriteButton
          recipeObj={ recipe }
          isDrink={ drink }
        />
      </div>
      <p
        data-testid="instructions"
        className="recipe-inprogress-instructions"
      >
        {recipe.strInstructions}
      </p>
      <ul className="recipe-inprogress-list">
        {
          recipeIngredients.map((ingredients, index) => (
            <li
              data-testid={ `${index}-ingredient-step` }
              key={ index }
            >
              {ingredients}
            </li>
          ))
        }
      </ul>
      <FinishRecipeButton
        recipeObj={ recipe }
        isDrink={ drink }
        doneIngredients={ handleDisableBtn() }
      />
    </div>
  );
}

RecipeInProgress.propTypes = {
  drink: PropTypes.bool.isRequired,
};

export default RecipeInProgress;
