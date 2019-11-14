import { getFetchResource } from '../lib/ajax';

export const getPokemonResource = id =>
  getFetchResource(`https://pokemon-json.herokuapp.com/api/pokedex/${id}`);

export const getPokemonsResource = ({ page = 1, limit = 20 } = {}) =>
  getFetchResource(`https://pokemon-json.herokuapp.com/api/pokemons`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });
