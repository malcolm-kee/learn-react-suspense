import React from 'react';
import './App.css';
import { Button } from './components/button';
import { DadJoke } from './components/dad-joke';
import { getPokemonResource } from './components/pokemon.data';
import { getFetchResource } from './lib/ajax';

const Pokemon = React.lazy(() => import('./components/pokemon'));

const getJokeResource = () => getFetchResource('https://icanhazdadjoke.com/');

function App() {
  const [jokeResource, setJokeResource] = React.useState(() => getJokeResource());
  const [pokemonId, setPokemonId] = React.useState(1);
  const [pokemonResource, setPokemonResource] = React.useState(null);
  const loadNextPokemon = () => {
    setPokemonResource(getPokemonResource(pokemonId));
    setPokemonId(prevId => prevId + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn React Suspense</h1>
        <Button onClick={() => setJokeResource(getJokeResource())}>Load Next Joke</Button>
        <Button onClick={loadNextPokemon}>Load Next Pokemon</Button>
      </header>
      <main>
        <React.Suspense fallback={<span>Loading...</span>}>
          <DadJoke jokeResource={jokeResource} />
        </React.Suspense>
        <React.Suspense fallback={<span>Loading...</span>}>
          {pokemonResource && <Pokemon resource={pokemonResource} />}
        </React.Suspense>
      </main>
    </div>
  );
}

export default App;
