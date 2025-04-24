import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Pokemon, PokemonListResponse } from '../types/pokemon';
import { fetchPokemons, fetchPokemonById, toggleFavoritePokemon, fetchFavorites } from '../services/api';

interface PokemonContextType {
  pokemons: Pokemon[];
  favorites: Pokemon[];
  isLoading: boolean;
  error: string | null;
  fetchAllPokemons: (page?: number) => Promise<void>;
  getPokemonById: (id: string) => Promise<Pokemon | null>;
  toggleFavorite: (pokemon: Pokemon) => Promise<void>;
  isFavorite: (id: number) => boolean;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchAllPokemons = async (page = 1) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: PokemonListResponse = await fetchPokemons(page);
      setPokemons(response.results);
      setTotalPages(Math.ceil(response.count / 20)); // Assuming 20 per page
      setCurrentPage(page);
    } catch (err) {
      setError('Failed to fetch Pokémon data. Please try again later.');
      console.error('Error fetching pokemons:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getFavorites = async () => {
    setIsLoading(true);
    try {
      const favs = await fetchFavorites();
      setFavorites(favs);
    } catch (err) {
      console.error('Error fetching favorites:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getPokemonById = async (id: string): Promise<Pokemon | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const pokemon = await fetchPokemonById(id);
      return pokemon;
    } catch (err) {
      setError('Failed to fetch Pokémon details. Please try again later.');
      console.error('Error fetching pokemon details:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async (pokemon: Pokemon) => {
    try {
      await toggleFavoritePokemon(pokemon.id);
      await getFavorites(); // Refresh favorites
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const isFavorite = (id: number): boolean => {
    return favorites.some(fav => fav.id === id);
  };

  useEffect(() => {
    fetchAllPokemons();
    getFavorites();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        favorites,
        isLoading,
        error,
        fetchAllPokemons,
        getPokemonById,
        toggleFavorite,
        isFavorite,
        currentPage,
        totalPages,
        setCurrentPage
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }
  return context;
};