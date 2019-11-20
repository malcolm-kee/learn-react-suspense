import React from 'react';
import './App.css';
import { Header } from './components/header';
import { Route, Router, Switch } from './components/route-components';
import { HomePage } from './pages/home-page';
import { PokemonPage } from './pages/pokemon-page';
import { TypePage } from './pages/type-page';

const App = () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/pokemon/:id">
        <PokemonPage />
      </Route>
      <Route path="/type/:name">
        <TypePage />
      </Route>
      <Route path="/" exact>
        <HomePage />
      </Route>
    </Switch>
  </Router>
);

export default App;
