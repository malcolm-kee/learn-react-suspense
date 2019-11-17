import React from 'react';
import { Link } from 'react-router-dom';
import { getType } from '../pokemon.service';
import { LoadingIndicator } from './loading-indicator';

const PokemonType = ({ name }) => {
  const [status, setStatus] = React.useState('idle');
  const [details, setDetails] = React.useState(null);

  React.useEffect(() => {
    let isCurrent = true;

    setStatus('loading');
    getType(name)
      .then(typeDetails => {
        if (isCurrent) {
          setDetails(typeDetails);
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
  }, [name]);

  return (
    <div className="container">
      <h1>{name}</h1>
      {status === 'loading' && <LoadingIndicator />}
      {status === 'error' && <p>Something goes wrong. Page cannot be loaded at the moment.</p>}
      {details && (
        <div className="equal-cols">
          <div>
            <h2>Pokemons</h2>
            <ul>
              {details.pokemon.map(({ pokemon }) => {
                const matches = pokemon.url.match(/\/(\d+)\/$/);

                return (
                  <li key={pokemon.url}>
                    {matches ? (
                      <Link to={`/pokemon/${matches[1]}`}>{pokemon.name}</Link>
                    ) : (
                      pokemon.name
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h2>Moves</h2>
            <ul>
              {details.moves.map(move => (
                <li key={move.url}>{move.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonType;
