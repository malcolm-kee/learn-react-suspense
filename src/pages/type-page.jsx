import React from 'react';
import { useParams } from '../components/route-components';

const PokemonType = React.lazy(() => import('../components/pokemon-type.suspense'));

export const TypePage = () => {
  const { name } = useParams();

  return (
    <div>
      <PokemonType name={name} />
    </div>
  );
};
