import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { ErrorBoundary } from './components/error-boundary';
import { LoadingIndicator } from './components/loading-indicator';
import { PokemonDetailsPage } from './pages/pokemon-details';
import { PokemonList } from './pages/pokemon-list';
import { PokemonTypePage } from './pages/pokemon-type';

const App = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingIndicator />}>
        <Switch>
          <Route path="/" exact>
            <PokemonList />
          </Route>
          <Route path="/pokemon/:id">
            <PokemonDetailsPage />
          </Route>
          <Route path="/type/:name">
            <PokemonTypePage />
          </Route>
        </Switch>
      </React.Suspense>
    </ErrorBoundary>
  </BrowserRouter>
);

export default App;
