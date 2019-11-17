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
        className="floating-btn"
        style={{
          position: 'fixed',
          right: 32,
          top: 8,
        }}
        to={`/pokemon/${Number(id) + 1}`}
      >
        Next
      </TransitionLink>
      {id !== '1' && (
        <TransitionLink
          className="floating-btn"
          style={{
            position: 'fixed',
            left: 32,
            top: 8,
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
