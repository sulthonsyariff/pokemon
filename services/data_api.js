import axios from 'axios';

const rootAPI = 'https://pokeapi.co/api/v2';

export async function getListPokemon() {
  const axiosResponse = await axios.get(`${rootAPI}/pokemon`);
  const { data } = axiosResponse;
  return data;
}

export async function getDetailPokemon(name) {
  const axiosResponse = await axios.get(`${rootAPI}/pokemon/${name}`);
  const { data } = axiosResponse;
  return data;
}

export async function getEvolutionPokemon(name) {
  const axiosResponse = await axios.get(`${rootAPI}/evolution-chain/${name}`);
  const { data } = axiosResponse;
  return data;
}