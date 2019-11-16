import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Header } from '../components/header';
import { LazyImage } from '../components/image';
import { pokemonResource } from '../resource/pokemon-resource';
import './pokemon-details.css';

export const PokemonDetails = () => {
  const { id } = useParams();
  const details = pokemonResource.read(id);

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
      <Header>
        <Link to={`/pokemon/${Number(id) + 1}`}>Next</Link>
      </Header>
      {/* {isLoading && <LoadingIndicator />} */}
      {details && (
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
            {/* <div>
              <h2>Moves</h2>
              <ul className="move-list">
                {moves.map(({ move }, index) => (
                  <li key={index}>{move.name}</li>
                ))}
              </ul>
            </div> */}
          </article>
        </div>
      )}
    </div>
  );
};
