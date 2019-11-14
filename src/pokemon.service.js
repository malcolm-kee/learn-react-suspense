import { fetchJson } from "./lib/ajax";

export const getPokemons = ({ limit = 10, page = 1 } = {}) =>
  fetchJson(`https://pokemon-json.herokuapp.com/api/pokemons`, {
    params: {
      _page: page,
      _limit: limit
    }
  });

export const getPokemonDetails = id =>
  fetchJson(`https://pokemon-json.herokuapp.com/api/pokedex/${id}`);
