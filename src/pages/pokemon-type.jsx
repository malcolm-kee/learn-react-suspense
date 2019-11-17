import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/header';
import { LoadingIndicator } from '../components/loading-indicator';

const PokemonType = React.lazy(() => import('../components/pokemon-type'));

export const PokemonTypePage = () => {
  const { name } = useParams();

  return (
    <div>
      <Header />
      <React.Suspense fallback={<LoadingIndicator />}>
        <PokemonType name={name} />
      </React.Suspense>
    </div>
  );
};
