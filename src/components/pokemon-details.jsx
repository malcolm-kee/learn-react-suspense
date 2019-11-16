import React from 'react';
import { Link } from 'react-router-dom';
import { pokemonResource, abilityResource } from '../resource/pokemon-resource';
import { LazyImage } from './image';
import './pokemon-details.css';

export const PokemonDetails = ({ id }) => {
  const details = pokemonResource.read(id);
  // const deferredId = React.useDeferredValue(id, {
  //   timeoutMs: 2000
  // })
  const deferredId = React.useDeferredValue(id, {
    timeoutMs: 5000,
  });

  const { moves } = abilityResource.read(deferredId);

  // const [isLoading, setIsLoading] = React.useState(false);
  // const [{ details, moves }, setDetails] = React.useState({
  //   details: null,
  //   moves: [],
  // });

  // React.useEffect(() => {
  //   setIsLoading(true);
  //   Promise.all([getPokemonDetails(id), getAbilities(id)])
  //     .then(([details, { moves }]) =>
  //       setDetails({
  //         details,
  //         moves,
  //       })
  //     )
  //     .then(() => setIsLoading(false));
  // }, [id]);

  return (
    <div>
      <div>
        <article className="container pokemon-details">
          <div>
            <h1>
              {details.name.english} ({details.name.japanese}/{details.name.chinese})
            </h1>
            <LazyImage src={details.image} alt="" />
            <ul>
              {details.type.map(t => (
                <li key={t}>
                  <Link to={`/type/${t}`}>{t}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={deferredId !== id ? 'faded' : undefined}>
            <h2>Moves</h2>
            <ul className="move-list">
              {moves.map(({ move }, index) => (
                <li key={index}>{move.name}</li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
};
