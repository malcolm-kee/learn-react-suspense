import { getPokemonDetails } from '../pokemon.service';

const pokemonMap = new Map();

export const pokemonResource = {
  preload: id => {
    if (!pokemonMap.has(id)) {
      const data = [
        getPokemonDetails(id)
          .then(details => {
            data.push('success', details);
          })
          .catch(err => {
            data.push('error', err);
          }),
      ];
      pokemonMap.set(id, data);
    }
  },
  read: id => {
    if (pokemonMap.has(id)) {
      const [promise, status, result] = pokemonMap.get(id);
      if (status === 'success') {
        return result;
      }
      if (status === 'error') {
        throw result;
      }
      throw promise;
    }

    const data = [
      getPokemonDetails(id)
        .then(details => {
          data.push('success', details);
        })
        .catch(err => {
          data.push('error', err);
        }),
    ];
    pokemonMap.set(id, data);
    throw data[0];
  },
};
