import React from 'react';
import { Button } from '../components/button';
import { Header } from '../components/header';
import { LoadingIndicator } from '../components/loading-indicator';
import { getPokemonsResource } from '../components/pokemon.data';
// import { getPokemons } from '../pokemon.service';

// const PokemonToday = React.lazy(() => import('../components/pokemon-today'));
const Pokemons = React.lazy(() => import('../components/pokemons'));

export function PokemonList() {
  const [page, setPage] = React.useState(0);
  const [pokemonsRes, setPokemonsRes] = React.useState(null);
  const loadNext = () => {
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
      <Header>
        <Button onClick={loadNext}>Next</Button>
      </Header>
      <main>
        <div className="container">
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
