import axios from 'axios';

const rootAPI = 'https://pokeapi.co/api/v2';

export async function getListPokemon(offset, limit) {
  const axiosResponse = await axios.get(`${rootAPI}/pokemon?offset=${offset}&limit=${limit}`);
  const { data } = axiosResponse;
  return data;
}

export async function getDetailPokemon(name) {
  const axiosResponse = await axios.get(`${rootAPI}/pokemon/${name}`);
  const { data } = axiosResponse;
  return data;
}

export async function getSpeciesPokemon(name) {
  const axiosResponse = await axios.get(`${rootAPI}/pokemon-species/${name}`);
  const { data } = axiosResponse;
  return data;
}

export async function getEvolutionPokemon(url) {
  const axiosResponse = await axios.get(url);
  const { data } = axiosResponse;
  return data;
}