import React from "react";
import { getPokemonDetails } from "../pokemon.service";

const PokemonToday = ({ id }) => {
  const [pokemon, setPokemon] = React.useState(null);
  React.useEffect(() => {
    getPokemonDetails(id).then(setPokemon);
  }, [id]);

  return pokemon ? (
    <article className="pokemon-card">
      <h1>{pokemon.name.english}</h1>
      <div>
        <img src={pokemon.image} alt="" className="pokemon-image" />
      </div>
      <ul>
        {pokemon.type.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </article>
  ) : (
    <span>Loading...</span>
  );
};

export default PokemonToday;
