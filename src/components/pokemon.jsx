import React from 'react';

export const Pokemon = ({ resource }) => {
  const pokemon = resource.read();
  return (
    <div>
      <h1>{pokemon.name.english}</h1>
      <div>
        <img src={pokemon.image} alt="" />
      </div>
      <ul>
        {pokemon.type.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemon;
