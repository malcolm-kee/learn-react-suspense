import { Pokedex } from 'pokeapi-js-wrapper';
import { fetchJson } from './lib/ajax';

const pokedex = new Pokedex();

export const getPokemons = ({ limit = 10, page = 1 } = {}) =>
  fetchJson(`https://pokemon-json.herokuapp.com/api/pokemons`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });

export const getPokemonDetails = id =>
  fetchJson(`https://pokemon-json.herokuapp.com/api/pokedex/${id}`);

export const getAbilities = id => pokedex.getPokemonByName(id);

/**
 *
 * @param {string} name
 */
export const getType = name => pokedex.getTypeByName(name && name.toLowerCase());
