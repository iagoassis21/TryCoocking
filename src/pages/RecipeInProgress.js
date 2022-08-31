import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { drinkRecipeList, mealRecipeList } from '../helpers/fetchRecipeListApi';
import '../styles/RecipeInProgress.css';
import setIngredientLocalStorage from '../helpers/localStorageIngredients';
import UtilButtons from '../components/UtilButtons';
import FinishRecipeButton from '../components/FinishRecipeButton';

const drinkTypes = (drink) => {
  const type = drink ? 'Drink' : 'Meal';
  const url = drink ? 'drinks' : 'foods';
  const apiType = drink ? 'cocktails' : 'meals';
  return { type, url, apiType };
};

function RecipeInProgress({ drink }) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [ingredient, setCheckedIngredient] = useState([]);

  const { type, url, apiType } = drinkTypes(drink);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
      localStorage.setItem('inProgressRecipes',
        JSON.stringify({ cocktails: {}, meals: {} }));
    }
    const getChecked = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (drink) {
      const getDrinkRecipeList = async () => {
        const results = await drinkRecipeList(id);
        const getArrDrinks = results.drinks[0];
        setRecipe(getArrDrinks);
      };
      getDrinkRecipeList();
    } else {
      const getMealRecipeList = async () => {
        const results = await mealRecipeList(id);
        const getArrMeals = results.meals[0];
        setRecipe(getArrMeals);
      };
      getMealRecipeList();
    }
    setCheckedIngredient(getChecked[apiType][id] || []);
    // eslint-disable-next-line
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
        key={ validIngredient }
        htmlFor={ validIngredient }
        className={ ingredient.includes(validIngredient)
          ? 'used-ingredient'
          : 'unused-ingredient' }
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
  const bodyRecipe = (
    <>
      <div className="recipe-inprogress-header">
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
      </div>
      <UtilButtons
        recipeObj={ recipe }
        isDrink={ drink }
        copyText={ `http://localhost:3000/${url}/${id}` }
      />
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
        className=".finish-recipe-button"
        recipeObj={ recipe }
        isDrink={ drink }
        doneIngredients={ handleDisableBtn() }
      />
    </>
  );
  return (
    <div className="recipe-inprogress-container">
      {
        Object.keys(recipe).length === 0 ? <div className="loading" /> : bodyRecipe
      }
    </div>
  );
}

RecipeInProgress.propTypes = {
  drink: PropTypes.bool.isRequired,
};

export default RecipeInProgress;
