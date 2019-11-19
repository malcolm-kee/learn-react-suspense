import React from 'react';
import { Link, useParams } from '../components/route-components';
import styles from './pokemon-page.module.css';

const PokemonDetails = React.lazy(() =>
  import('../components/pokemon-details')
);

export const PokemonPage = () => {
  const { id } = useParams();

  return (
    <div>
      <Link
        to={`/pokemon/${Number(id) + 1}`}
        className="floating-btn"
        style={{
          position: 'fixed',
          right: 32,
          top: 8,
        }}
        transitioningClass={styles.busyBtn}
      >
        >
      </Link>
      {id !== '1' && (
        <Link
          to={`/pokemon/${Number(id) - 1}`}
          className="floating-btn"
          style={{
            position: 'fixed',
            left: 32,
            top: 8,
          }}
          transitioningClass={styles.busyBtn}
        >
          {'<'}
        </Link>
      )}
      <PokemonDetails id={id} />
    </div>
  );
};
