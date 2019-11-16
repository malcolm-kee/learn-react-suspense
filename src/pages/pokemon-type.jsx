import React from 'react';
import { useParams } from 'react-router-dom';
import { getType } from '../pokemon.service';
import { LoadingIndicator } from '../components/loading-indicator';

export const PokemonType = () => {
  const { name } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [details, setDetails] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    getType(name).then(typeDetails => {
      setDetails(typeDetails);
      setIsLoading(false);
    });
  }, [name]);

  return (
    <div>
      <div className="container">
        <h1>{name}</h1>
        {isLoading && <LoadingIndicator />}
        {details && (
          <div className="equal-cols">
            <div>
              <h2>Pokemons</h2>
              <ul>
                {details.pokemon.map(({ pokemon }) => (
                  <li key={pokemon.url}>{pokemon.name}</li>
                ))}
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
    </div>
  );
};
