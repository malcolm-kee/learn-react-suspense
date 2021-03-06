import React from 'react';
import { abilityResource, pokemonResource } from '../resource/pokemon-resource';
import { EagerImage } from './image';
import styles from './pokemon-details.module.css';
import { Link } from './route-components';

const PokemonDetails = ({ id }) => {
  abilityResource.preload(id);
  const details = pokemonResource.read(id);
  const deferredId = React.useDeferredValue(id, {
    timeoutMs: 5000,
  });

  return (
    <div>
      <div>
        <article className="container">
          <div className={styles.details}>
            <div>
              <h1>
                {details.name.english} ({details.name.japanese}/{details.name.chinese})
              </h1>
              <EagerImage src={details.image} alt="" className={styles.img} />
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
          <PokemonMoves pokemonId={deferredId} outdated={deferredId !== id} />
        </article>
      </div>
    </div>
  );
};

export default PokemonDetails;

const PokemonMoves = ({ pokemonId, outdated }) => {
  const { moves } = abilityResource.read(pokemonId);
  return (
    <div className={outdated ? 'faded' : undefined}>
      <h2>Moves</h2>
      <ul className={styles.moves}>
        {moves.map(({ move }, index) => (
          <li key={index}>{move.name}</li>
        ))}
      </ul>
    </div>
  );
};
