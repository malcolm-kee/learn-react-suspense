import { getFetchResource } from '../lib/ajax';

export const getPokemonResource = id =>
  getFetchResource(`https://pokemon-json.herokuapp.com/api/pokedex/${id}`);
