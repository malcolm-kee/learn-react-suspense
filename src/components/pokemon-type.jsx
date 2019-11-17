import React from 'react';
import { Link } from 'react-router-dom';
import { pokemonTypeResource } from '../resource/pokemon-resource';

const PokemonType = ({ name }) => {
  const details = pokemonTypeResource.read(name);

  return (
    <div className="container">
      <h1>{name}</h1>
      {details && (
        <div className="equal-cols">
          <div>
            <h2>Pokemons</h2>
            <ul>
              {details.pokemon.map(({ pokemon }) => {
                const matches = pokemon.url.match(/\/(\d+)\/$/);

                return (
                  <li key={pokemon.url}>
                    {matches ? (
                      <Link to={`/pokemon/${matches[1]}`}>{pokemon.name}</Link>
                    ) : (
                      pokemon.name
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>Moves</h2>
            <ul>
              {details.moves.map(move => (
                <li key={move.url}>{move.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonType;
