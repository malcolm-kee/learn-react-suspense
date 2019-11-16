import { getPokemonDetails, getAbilities } from '../pokemon.service';
import { createResource } from './create-resource';

export const pokemonResource = createResource(getPokemonDetails);
export const abilityResource = createResource(getAbilities);
