import React from 'react';
import { imageResource } from '../resource/image-resource';
import { pokemonPageResource } from '../resource/pokemon-resource';
import { EagerSuspenseList } from './eager-suspense-list';
import { EagerImage } from './image';
import { PokemonCardSkeleton } from './pokemon-card-skeleton';
import styles from './pokemons.module.css';
import { Link } from './route-components';

const Pokemons = ({ page }) => {
  const pokemons = pokemonPageResource.read(page);

  pokemons.forEach(pokemon => {
    imageResource.preload(pokemon.thumbnail);
  });

  return (
    <div className={styles.grid}>
      <EagerSuspenseList
        data={pokemons}
        keyProp="id"
        eagerItemCount={8}
        renderItem={pokemon => <Pokemon pokemon={pokemon} key={pokemon.id} />}
        fallback={<PokemonCardSkeleton />}
      />
    </div>
  );
};

const Pokemon = ({ pokemon }) => (
  <Link
    to={`/pokemon/${pokemon.id}`}
    className={styles.link}
    transitioningClass={styles.linkSelected}
  >
    <article className={styles.card}>
      <h1>
        #{pokemon.id}: {pokemon.name}
      </h1>
      <EagerImage src={pokemon.thumbnail} alt="" />
    </article>
  </Link>
);

export default Pokemons;
