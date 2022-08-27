import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import Login from './components/Login';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/foods"
          component={ () => <Recipes pagePath="foods" /> }
        />
        <Route
          exact
          path="/drinks"
          component={ () => <Recipes pagePath="drinks" /> }
        />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/foods/:recipeId" component={ RecipeDetails } />
        <Route exact path="/drinks/:recipeId" component={ RecipeDetails } />
        <Route
          exact
          path="/foods/:id/in-progress"
          render={ () => <RecipeInProgress drink={ false } /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ () => <RecipeInProgress drink /> }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
