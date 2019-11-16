import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/header';
import { LoadingIndicator } from '../components/loading-indicator';
import { PokemonDetails } from '../components/pokemon-details';
import { TransitionLink } from '../components/transition-link';
import './pokemon-details.css';

export const PokemonDetailsPage = () => {
  const { id } = useParams();

  return (
    <div>
      <Header>
        <TransitionLink to={`/pokemon/${Number(id) + 1}`}>Next</TransitionLink>
      </Header>
      <React.Suspense fallback={<LoadingIndicator />}>
        <PokemonDetails id={id} />
      </React.Suspense>
    </div>
  );
};
