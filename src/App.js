import React from 'react';
import './App.css';
import './styles/Global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import Login from './pages/Login';
import RecipeInProgress from './pages/RecipeInProgress';
import RecipeDetails from './pages/RecipeDetails';
import Profile from './pages/Profile';

function App() {
  return (
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
      <Route
        exact
        path="/foods/:recipeId"
        component={ () => <RecipeDetails pagePath="foods" /> }
      />
      <Route
        exact
        path="/drinks/:recipeId"
        component={ () => <RecipeDetails pagePath="drinks" /> }
      />
      <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
      <Route
        exact
        path="/drinks/:id/in-progress"
        render={ () => <RecipeInProgress drink /> }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
