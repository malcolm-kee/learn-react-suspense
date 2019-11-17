import { Pokedex } from 'pokeapi-js-wrapper';
import { fetchJson } from './lib/ajax';

const pokedex = new Pokedex();

type PokemonBasic = {
  id: number;
  name: string;
  sprite: string;
  thumbnail: string;
};

export const getPokemons = ({ limit = 10, page = 1 } = {}): Promise<PokemonBasic[]> =>
  fetchJson(`https://pokemon-json.herokuapp.com/api/pokemons`, {
    params: {
      _page: page,
      _limit: limit,
    },
  });

const wait = (ms: number) => new Promise(fulfill => setTimeout(() => fulfill(), ms));

type PokemonDetails = {
  id: number;
  name: {
    english: string;
    japanese: string;
    chinese: string;
  };
  type: string[];
  base: {
    HP: number;
    Attack: number;
    Defense: number;
    'Sp. Attack': number;
    'Sp. Defense': number;
    Speed: number;
  };
  description?: string;
  image: string;
  sprite: string;
  thumbnail: string;
};

export const getPokemonDetails = (id: string | number): Promise<PokemonDetails> =>
  fetchJson(`https://pokemon-json.herokuapp.com/api/pokedex/${id}`);

// export const getAbilities = id => pokedex.getPokemonByName(id);
export const getAbilities = (id: string | number) =>
  wait(Math.random() * 2000).then(() => pokedex.getPokemonByName(id));

export const getType = (name: string) => pokedex.getTypeByName(name && name.toLowerCase());
