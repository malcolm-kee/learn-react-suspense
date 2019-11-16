import { getPokemonDetails } from '../pokemon.service';

const pokemonMap = new Map();

export const pokemonResource = {
  preload: id => {
    if (!pokemonMap.has(id)) {
      const data = [null, null, null];
      const promise = getPokemonDetails(id)
        .then(details => {
          data[1] = 'success';
          data[2] = details;
        })
        .catch(err => {
          data[1] = 'error';
          data[2] = err;
        });
      data[0] = promise;
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

    const data = [null, null, null];
    const promise = getPokemonDetails(id)
      .then(details => {
        data[1] = 'success';
        data[2] = details;
      })
      .catch(err => {
        data[1] = 'error';
        data[2] = err;
      });
    data[0] = promise;
    pokemonMap.set(id, data);
    throw promise;
  },
};
