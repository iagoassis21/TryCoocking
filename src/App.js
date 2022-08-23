import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Recipes from './pages/Recipes';
import RecipesProvider from './context/RecipesProvider';

function App() {
  return (
    <div className="screen-size">
      <Switch>
        <Route exact path="/" />

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
        <Route exact path="/foods/:id-da-receita/in-progress" />
        <Route exact path="/drinks/:id-da-receita/in-progress" />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;