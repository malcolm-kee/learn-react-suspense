import React from 'react';
import PokemonType from '../components/pokemon-type';
import { useParams } from '../components/route-components';

export const TypePage = () => {
  const { name } = useParams();

  return (
    <div>
      <PokemonType name={name} />
    </div>
  );
};
