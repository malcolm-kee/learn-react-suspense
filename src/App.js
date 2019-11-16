import React from 'react';
import './App.css';
import { Button } from './components/button';
import { getPokemonsResource } from './components/pokemon.data';
import { LoadingIndicator } from './components/loading-indicator';
// import { getPokemons } from './pokemon.service';

// const PokemonToday = React.lazy(() => import('./components/pokemon-today'));
const Pokemons = React.lazy(() => import('./components/pokemons'));

function App() {
  const [page, setPage] = React.useState(0);
  const [pokemonsRes, setPokemonsRes] = React.useState(null);
  const loadNextPokemon = () => {
    setPage(prevPage => prevPage + 1);
    setPokemonsRes(
      getPokemonsResource({
        page: page + 1,
      })
    );
  };

  // const [isLoading, setIsLoading] = React.useState(false);
  // const [pokemons, setPokemons] = React.useState([]);

  // React.useEffect(() => {
  //   if (page) {
  //     setIsLoading(true);
  //     getPokemons({
  //       limit: 30,
  //       page: page + 10,
  //     }).then(pokemons => {
  //       setPokemons(pokemons);
  //       setIsLoading(false);
  //     });
  //   }
  // }, [page]);

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
          {/* <div className="grid">
            <React.Suspense fallback={<LoadingIndicator />}>
              {page && isLoading ? <LoadingIndicator /> : null}
              {pokemons.map(pokemon => (
                <PokemonToday pokemon={pokemon} key={pokemon.id} />
              ))}
            </React.Suspense>
          </div> */}
        </div>
      </main>
    </div>
  );
}

export default App;
