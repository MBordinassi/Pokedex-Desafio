import React from 'react';
import { Pokemon } from '../../types/pokemon';
import PokemonCard from './PokemonCard';
import LoadingSpinner from '../ui/LoadingSpinner';

interface PokemonListProps {
  pokemons: Pokemon[];
  isLoading: boolean;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, isLoading }) => {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No Pokémon found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;