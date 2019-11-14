import React from "react";

const Pokemons = ({ resource }) => {
  const pokemons = resource.read();

  return (
    <div className="grid">
      {pokemons.map(pokemon => (
        <article className="pokemon-card" key={pokemon.id}>
          <h1>{pokemon.name}</h1>
          <img alt="" src={pokemon.thumbnail} />
        </article>
      ))}
    </div>
  );
};

export default Pokemons;
