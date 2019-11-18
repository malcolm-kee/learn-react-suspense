import React from 'react';
import { Link } from 'react-router-dom';
import { getAbilities, getPokemonDetails } from '../pokemon.service';
import { LoadingIndicator } from './loading-indicator';
import styles from './pokemon-details.module.css';

const PokemonDetails = ({ id }) => {
  const [status, setStatus] = React.useState('idle');
  const [details, setDetails] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      let isCurrent = true;
      setStatus('loading');
      getPokemonDetails(id)
        .then(result => {
          if (isCurrent) {
            setDetails(result);
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
  }, [id]);

  return (
    <div>
      <div>
        <article className="container">
          {status === 'loading' && <LoadingIndicator />}
          {status === 'error' && (
            <div>
              <h1>Sorry, something goes wrong.</h1>
              <p>Page cannot be loaded at the moment. Try again later.</p>
            </div>
          )}
          {details && (
            <div className={styles.details}>
              <div>
                <h1>
                  {details.name.english} ({details.name.japanese}/{details.name.chinese})
                </h1>
                <img src={details.image} alt="" className={styles.img} />
                <ul>
                  {details.type.map(t => (
                    <li key={t}>
                      <Link to={`/type/${t}`}>{t}</Link>
                    </li>
                  ))}
                </ul>
                {details.description && <p>{details.description}</p>}
              </div>
              <div>
                <table className={styles.stats}>
                  <tbody>
                    {Object.entries(details.base).map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <PokemonMoves pokemonId={id} />
        </article>
      </div>
    </div>
  );
};

export default PokemonDetails;

const PokemonMoves = ({ pokemonId }) => {
  const [status, setStatus] = React.useState('idle');
  const [stats, setStats] = React.useState(null);
  React.useEffect(() => {
    if (pokemonId) {
      let isCurrent = true;
      setStatus('loading');
      getAbilities(pokemonId)
        .then(result => {
          if (isCurrent) {
            setStats(result);
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
  }, [pokemonId]);

  return (
    <div className={status === 'loading' ? 'faded' : undefined}>
      <h2>Moves</h2>
      {status === 'error' && <p>Something goes wrong.</p>}
      {stats && (
        <ul className={styles.moves}>
          {stats.moves.map(({ move }, index) => (
            <li key={index}>{move.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
