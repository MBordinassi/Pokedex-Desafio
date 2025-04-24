import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ChevronLeft } from 'lucide-react';
import { usePokemon } from '../context/PokemonContext';
import PokemonList from '../components/pokemon/PokemonList';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const FavoritesPage: React.FC = () => {
  const { favorites, isLoading } = usePokemon();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Your Favorite Pokémon</h1>
        <Link 
          to="/pokemon" 
          className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to All Pokémon
        </Link>
      </div>
      
      {isLoading ? (
        <LoadingSpinner size="lg" />
      ) : favorites.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Heart size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Favorites Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't added any Pokémon to your favorites yet. Browse the Pokédex and click the heart icon to add favorites.
          </p>
          <Link
            to="/pokemon"
            className="inline-flex items-center justify-center px-5 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
          >
            Explore Pokémon
          </Link>
        </div>
      ) : (
        <PokemonList pokemons={favorites} isLoading={isLoading} />
      )}
    </div>
  );
};

export default FavoritesPage;