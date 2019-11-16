import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { LoadingIndicator } from './components/loading-indicator';
import { PokemonDetails } from './pages/pokemon-details';
import { PokemonList } from './pages/pokemon-list';
import { PokemonType } from './pages/pokemon-type';

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<LoadingIndicator />}>
        <Switch>
          <Route path="/" exact>
            <PokemonList />
          </Route>
          <Route path="/pokemon/:id">
            <PokemonDetails />
          </Route>
          <Route path="/type/:name">
            <PokemonType />
          </Route>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
