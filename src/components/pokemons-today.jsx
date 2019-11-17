import React from 'react';
import { Link } from 'react-router-dom';
import { getPokemons } from '../pokemon.service';
import { LoadingIndicator } from './loading-indicator';
import styles from './pokemons.module.css';

const PokemonsToday = ({ page }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [pokemons, setPokemons] = React.useState([]);

  React.useEffect(() => {
    if (page) {
      setIsLoading(true);
      getPokemons({
        limit: 20,
        page: page,
      }).then(pokemons => {
        setPokemons(pokemons);
        setIsLoading(false);
      });
    }
  }, [page]);

  return (
    <div className={styles.grid}>
      {isLoading && <LoadingIndicator />}
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
