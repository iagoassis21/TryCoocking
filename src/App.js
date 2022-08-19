import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="screen-size">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" />
        <Route path="/drinks" />
        <Route path="/foods/{id-da-receita}" />
        <Route path="/drinks/{id-da-receita}" />
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
