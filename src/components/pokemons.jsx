import React from 'react';
import { getPokemons } from '../pokemon.service';
import { LoadingIndicator } from './loading-indicator';
import styles from './pokemons.module.css';
import { Link } from './route-components';

const PokemonsToday = ({ page }) => {
  const [status, setStatus] = React.useState('idle');
  const [pokemons, setPokemons] = React.useState([]);

  React.useEffect(() => {
    if (page) {
      let isCurrent = true;

      setStatus('loading');
      getPokemons({
        limit: 20,
        page: page,
      })
        .then(pokemons => {
          if (isCurrent) {
            setPokemons(pokemons);
            setStatus('idle');
          }
        })
        .catch(err => {
          if (isCurrent) {
            setStatus('error');
            console.error(err);
          }
        });

      return () => {
        isCurrent = false;
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
            <h1>
              #{pokemon.id}: {pokemon.name}
            </h1>
            <img src={pokemon.thumbnail} alt="" />
          </article>
        </Link>
      ))}
    </div>
  );
};

export default PokemonsToday;
