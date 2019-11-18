import React from 'react';
import { Link } from 'react-router-dom';
import { imageResource } from '../resource/image-resource';
import { pokemonPageResource } from '../resource/pokemon-resource';
import { EagerImage } from './image';
import { PokemonCardSkeleton } from './pokemon-card-skeleton';
import styles from './pokemons.module.css';

const Pokemons = ({ page }) => {
  const pokemons = pokemonPageResource.read(page);

  pokemons.forEach(pokemon => {
    imageResource.preload(pokemon.thumbnail);
  });

  return (
    <div className={styles.grid}>
      <React.SuspenseList revealOrder="forwards">
        {pokemons.map(pokemon => (
          <React.Suspense fallback={<PokemonCardSkeleton />} key={pokemon.id}>
            <Link to={`/pokemon/${pokemon.id}`} className={styles.link}>
              <article className={styles.card}>
                <h1>
                  #{pokemon.id}: {pokemon.name}
                </h1>
                <EagerImage src={pokemon.thumbnail} alt="" />
              </article>
            </Link>
          </React.Suspense>
        ))}
      </React.SuspenseList>
    </div>
  );
};

export default Pokemons;
