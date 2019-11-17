import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/header';
import { LoadingIndicator } from '../components/loading-indicator';
import { TransitionLink } from '../components/transition-link';

const PokemonDetails = React.lazy(() => import('../components/pokemon-details-today'));

export const PokemonDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <Header />
      <TransitionLink
        style={{
          position: 'fixed',
          display: 'block',
          padding: 8,
          right: 32,
          top: 8,
          zIndex: 1,
          backgroundColor: '#efefef',
        }}
        to={`/pokemon/${Number(id) + 1}`}
      >
        Next
      </TransitionLink>
      {id !== '1' && (
        <TransitionLink
          style={{
            position: 'fixed',
            display: 'block',
            padding: 8,
            left: 32,
            top: 8,
            zIndex: 1,
            backgroundColor: '#efefef',
          }}
          to={`/pokemon/${Number(id) - 1}`}
        >
          Previous
        </TransitionLink>
      )}
      <React.Suspense fallback={<LoadingIndicator />}>
        <PokemonDetails id={id} />
      </React.Suspense>
    </div>
  );
};
