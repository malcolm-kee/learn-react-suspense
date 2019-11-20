import React from 'react';
import { Button } from '../components/button';
import Pokemons from '../components/pokemons';
import { Toolbar } from '../components/toolbar';

let lastLoadedPage = 1;

export function HomePage() {
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
      <Toolbar>
        {page !== 1 && <Button onClick={loadPrev}>Previous</Button>}
        <Button onClick={loadNext}>Next</Button>
      </Toolbar>
      <main>
        <div className="container">
          <Pokemons page={page} />
        </div>
      </main>
    </div>
  );
}
