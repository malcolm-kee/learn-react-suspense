import React from 'react';
import { Link } from 'react-router-dom';
import { getPokemons } from '../pokemon.service';
import { LoadingIndicator } from './loading-indicator';
import styles from './pokemons.module.css';

const PokemonsToday = ({ page }) => {
  const [status, setStatus] = React.useState('idle');
  const [pokemons, setPokemons] = React.useState([]);

  React.useEffect(() => {
    if (page) {
      let isLatest = true;

      setStatus('loading');
      getPokemons({
        limit: 20,
        page: page,
      })
        .then(pokemons => {
          if (isLatest) {
            setPokemons(pokemons);
            setStatus('idle');
          }
        })
        .catch(err => {
          if (isLatest) {
            setStatus('error');
            console.error(err);
          }
        });

      return () => {
        isLatest = false;
      };
    }
  }, [page]);

  return (
    <div className={styles.grid}>
      {status === 'loading' && <LoadingIndicator />}
      {status === 'error' && (
        <div>
          <h1>Sorry, something goes wrong.</h1>
          <p>Try again later.</p>
        </div>
      )}
      {pokemons.map(pokemon => (
        <Link to={`/pokemon/${pokemon.id}`} className={styles.link} key={pokemon.id}>
          <article className={styles.card}>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.thumbnail} alt="" />
          </article>
        </Link>
      ))}
    </div>
  );
};

export default PokemonsToday;
