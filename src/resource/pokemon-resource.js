import {
  getAbilities,
  getPokemonDetails,
  getPokemons,
  getType,
} from '../pokemon.service';
import { createResource } from './create-resource';

export const pokemonResource = createResource(getPokemonDetails);
export const abilityResource = createResource(getAbilities, {
  name: 'abilityResource',
});
export const pokemonPageResource = createResource(page =>
  getPokemons({ limit: 16, page })
);
export const pokemonTypeResource = createResource(getType);
