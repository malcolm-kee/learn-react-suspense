import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { ErrorBoundary } from './components/error-boundary';
import { LoadingIndicator } from './components/loading-indicator';
import { HomePage } from './pages/home-page';
import { PokemonPage } from './pages/pokemon-page';
import { TypePage } from './pages/type-page';

const App = () => (
  <BrowserRouter>
    <ErrorBoundary>
      <React.Suspense fallback={<LoadingIndicator />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/pokemon/:id">
            <PokemonPage />
          </Route>
          <Route path="/type/:name">
            <TypePage />
          </Route>
        </Switch>
      </React.Suspense>
    </ErrorBoundary>
  </BrowserRouter>
);

export default App;
