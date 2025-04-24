import axios from 'axios';
import { Pokemon, PokemonListResponse, PokemonFilter } from '../types/pokemon';

// Base URL for our Django backend
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchPokemons = async (page = 1, filters: PokemonFilter = {}): Promise<PokemonListResponse> => {
  let url = `/pokemon/?page=${page}`;
  
  if (filters.name) {
    url += `&name=${filters.name}`;
  }
  
  if (filters.type) {
    url += `&type=${filters.type}`;
  }
  
  const response = await api.get(url);
  return response.data;
};

export const fetchPokemonById = async (id: string): Promise<Pokemon> => {
  const response = await api.get(`/pokemon/${id}/`);
  return response.data;
};

export const fetchPokemonTypes = async (): Promise<string[]> => {
  const response = await api.get('/pokemon/types/');
  return response.data.types;
};

export const toggleFavoritePokemon = async (pokemonId: number): Promise<void> => {
  await api.post(`/pokemon/${pokemonId}/favorite/`);
};

export const fetchFavorites = async (): Promise<Pokemon[]> => {
  const response = await api.get('/pokemon/favorites/');
  return response.data.results;
};

export default api;