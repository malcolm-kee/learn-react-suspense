import React from 'react';
import './App.css';
import { Button } from './components/button';
import { DadJoke } from './components/dad-joke';
import { getPokemonResource } from './components/pokemon.data';
import { getFetchResource } from './lib/ajax';

const Pokemon = React.lazy(() => import('./components/pokemon'));
const PokemonToday = React.lazy(() => import('./components/pokemon-today'));

const getJokeResource = () => getFetchResource('https://icanhazdadjoke.com/');

function App() {
  const [jokeResource, setJokeResource] = React.useState(() => getJokeResource());
  const [pokemonId, setPokemonId] = React.useState(0);
  const [pokemonResource, setPokemonResource] = React.useState(null);
  const loadNextPokemon = () => {
    setPokemonResource(getPokemonResource(pokemonId + 1));
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: `0 auto`,
            maxWidth: 1200
          }}
        >
          <React.Suspense fallback={<span>Loading...</span>}>
            {pokemonResource && <Pokemon resource={pokemonResource} />}
          </React.Suspense>
          <React.Suspense fallback={<span>Loading...</span>}>
            {pokemonId > 0 && <PokemonToday id={250 - pokemonId} />}
          </React.Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
