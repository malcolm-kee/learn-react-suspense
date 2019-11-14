import React from 'react';
import { imageResource } from '../resource/image-resource';
import { LazyImage } from './image';
import { LoadingIndicator } from './loading-indicator';

const Pokemons = ({ resource }) => {
  const pokemons = resource.read();
  React.useEffect(() => {
    imageResource.preload(pokemons.map(p => p.thumbnail));
  }, [pokemons]);

  return (
    <div className="grid">
      <React.SuspenseList revealOrder="forwards">
        {pokemons.map(pokemon => (
          <React.Suspense fallback={<LoadingIndicator />}>
            <article className="pokemon-card" key={pokemon.id}>
              <h1>{pokemon.name}</h1>
              <LazyImage src={pokemon.thumbnail} alt="" />
            </article>
          </React.Suspense>
        ))}
      </React.SuspenseList>
    </div>
  );
};

export default Pokemons;
