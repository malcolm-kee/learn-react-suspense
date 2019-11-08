import React from 'react';
import { fetchJson } from '../lib/ajax';

const PokemonToday = ({ id }) => {
  const [pokemon, setPokemon] = React.useState(null);
  React.useEffect(() => {
    fetchJson(`https://pokemon-json.herokuapp.com/api/pokedex/${id}`).then(setPokemon);
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
