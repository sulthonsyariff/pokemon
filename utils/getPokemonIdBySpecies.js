import constantPokemon from '../contants/pokemon.json';

export default function getPokemonIdBySpecies(speciesName) {
  let result;
  let pokemon = constantPokemon.results;
  for (let i = 0; i < pokemon.length; i++) {
    if (pokemon[i].name === speciesName) {
      result = i + 1;
      break
    }
  }

  return result;
}
