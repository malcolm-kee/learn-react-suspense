import React from 'react';
import { Button } from '../components/button';
import { Header } from '../components/header';
import { LoadingIndicator } from '../components/loading-indicator';
const Pokemons = React.lazy(() => import('../components/pokemons-today'));

let lastLoadedPage = 1;

export function PokemonList() {
  const [page, setPage] = React.useState(lastLoadedPage);
  const loadNext = () => {
    setPage(prevPage => prevPage + 1);
  };
  const loadPrev = () => {
    setPage(prevPage => prevPage - 1);
  };

  React.useEffect(() => {
    lastLoadedPage = page;
  }, [page]);

  return (
    <div className="App">
      <Header>
        {page !== 1 && <Button onClick={loadPrev}>Previous</Button>}
        <Button onClick={loadNext}>Next</Button>
      </Header>
      <main>
        <div className="container">
          <React.Suspense fallback={<LoadingIndicator />}>
            <Pokemons page={page} />
          </React.Suspense>
        </div>
      </main>
    </div>
  );
}
