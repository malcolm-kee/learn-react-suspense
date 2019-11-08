import React from 'react';
import { LazyImage } from './image';

const Pokemon = ({ resource }) => {
  const pokemon = resource.read();
  return (
    <article className="pokemon-card suspense">
      <h1>{pokemon.name.english}</h1>
      <div>
        <LazyImage src={pokemon.image} alt="" className="pokemon-image" />
      </div>
      <ul>
        {pokemon.type.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </article>
  );
};

export default Pokemon;
