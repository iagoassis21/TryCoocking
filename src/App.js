import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipesProvider from './context/RecipesProvider';
import RecipeDetailsProvider from './context/RecipeDetailsProvider';

function App() {
  return (
    <div className="screen-size">
      <Switch>
        <Route exact path="/foods">
          <RecipesProvider>
            <Recipes />
          </RecipesProvider>
        </Route>

        <Route exact path="/drinks">
          <RecipesProvider>
            <Recipes />
          </RecipesProvider>
        </Route>

        <Route path="/foods/:recipeId">
          <RecipeDetailsProvider>
            <RecipeDetails />
          </RecipeDetailsProvider>
        </Route>

        <Route path="/drinks/:recipeId">
          <RecipeDetailsProvider>
            <RecipeDetails />
          </RecipeDetailsProvider>
        </Route>

        <Route path="/foods/{id-da-receita}/in-progress" />
        <Route path="/drinks/{id-da-receita}/in-progress" />
        <Route path="/profile" />
        <Route path="/done-recipes" />
        <Route path="/favorite-recipes" />
      </Switch>
    </div>
  );
}

export default App;
