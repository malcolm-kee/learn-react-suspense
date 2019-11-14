import React from 'react';
import './App.css';
import { Button } from './components/button';
import {
  // getPokemonResource,
  getPokemonsResource,
} from './components/pokemon.data';
import { LoadingIndicator } from './components/loading-indicator';

// const Pokemon = React.lazy(() => import("./components/pokemon"));
// const PokemonToday = React.lazy(() => import("./components/pokemon-today"));
const Pokemons = React.lazy(() => import('./components/pokemons'));

function App() {
  const [pokemonId, setPokemonId] = React.useState(0);
  // const [pokemonResource, setPokemonResource] = React.useState(null);
  const [pokemonsRes, setPokemonsRes] = React.useState(null);
  const loadNextPokemon = () => {
    // setPokemonResource(getPokemonResource(pokemonId + 1));
    setPokemonId(prevId => prevId + 1);
    setPokemonsRes(
      getPokemonsResource({
        page: pokemonId + 1,
      })
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Learn React Suspense</h1>
        <div style={{ padding: 8 }}>
          <Button onClick={loadNextPokemon}>Next</Button>
        </div>
      </header>
      <main>
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 1200,
            position: 'relative',
          }}
        >
          {pokemonsRes && (
            <React.Suspense fallback={<LoadingIndicator />}>
              <Pokemons resource={pokemonsRes} />
            </React.Suspense>
          )}
          {/* <React.Suspense fallback={<span>Loading...</span>}>
            {pokemonResource && <Pokemon resource={pokemonResource} />}
          </React.Suspense>
          <React.Suspense fallback={<span>Loading...</span>}>
            {pokemonId > 0 && <PokemonToday id={250 - pokemonId} />}
          </React.Suspense> */}
        </div>
      </main>
    </div>
  );
}

export default App;
