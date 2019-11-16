import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { PokemonList } from './pages/pokemon-list';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <PokemonList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
