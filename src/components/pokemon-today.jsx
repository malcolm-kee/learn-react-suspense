import React from 'react';

const PokemonToday = ({ pokemon }) => {
  return (
    <article className="pokemon-card">
      <h1>{pokemon.name}</h1>
      <div>
        <img src={pokemon.thumbnail} alt="" className="pokemon-image" />
      </div>
    </article>
  );
};

export default PokemonToday;
