import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import RecipesProvider from './context/RecipesProvider';
import Login from './components/Login';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <div className="screen-size">
      <Switch>
        <Route exact path="/" component={ Login } />
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

        <Route exact path="/foods/:id-da-receita" />
        <Route exact path="/drinks/:id-da-receita" />
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
    </div>
  );
}

export default App;
