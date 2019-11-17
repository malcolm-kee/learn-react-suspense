import React from 'react';
import { Link } from 'react-router-dom';
import { imageResource } from '../resource/image-resource';
import { pokemonPageResource } from '../resource/pokemon-resource';
import { LazyImage } from './image';
import { LoadingIndicator } from './loading-indicator';
import styles from './pokemons.module.css';

const Pokemons = ({ page }) => {
  const pokemons = pokemonPageResource.read(page);
  React.useEffect(() => {
    pokemons.forEach(pokemon => {
      imageResource.preload(pokemon.thumbnail);
    });
  }, [pokemons]);

  return (
    <div className={styles.grid}>
      <React.SuspenseList revealOrder="forwards" tail="collapsed">
        {pokemons.map(pokemon => (
          <React.Suspense fallback={<LoadingIndicator />}>
            <Link to={`/pokemon/${pokemon.id}`} className={styles.link} key={pokemon.id}>
              <article className={styles.card}>
                <h1>{pokemon.name}</h1>
                <LazyImage src={pokemon.thumbnail} alt="" />
              </article>
            </Link>
          </React.Suspense>
        ))}
      </React.SuspenseList>
    </div>
  );
};

export default Pokemons;
