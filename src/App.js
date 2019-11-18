import React from 'react';
import './App.css';
import { ErrorBoundary } from './components/error-boundary';
import { Header } from './components/header';
import { LoadingIndicator } from './components/loading-indicator';
import { Route, Router, Switch } from './components/route-components';
import { HomePage } from './pages/home-page';
import { PokemonPage } from './pages/pokemon-page';
import { TypePage } from './pages/type-page';

const App = () => (
  <Router>
    <Header />
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
  </Router>
);

export default App;
