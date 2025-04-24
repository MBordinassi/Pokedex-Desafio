import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { usePokemon } from '../context/PokemonContext';
import PokemonDetail from '../components/pokemon/PokemonDetail';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const PokemonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPokemonById, isLoading, error } = usePokemon();
  const [pokemon, setPokemon] = useState(null);
  
  useEffect(() => {
    const loadPokemon = async () => {
      if (id) {
        const data = await getPokemonById(id);
        setPokemon(data);
      }
    };
    
    loadPokemon();
  }, [id, getPokemonById]);
  
  if (isLoading) {
    return <LoadingSpinner size="lg" />;
  }
  
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{error}</p>
        <Link 
          to="/pokemon" 
          className="inline-flex items-center mt-4 text-red-700 hover:text-red-800"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Pokémon List
        </Link>
      </div>
    );
  }
  
  if (!pokemon) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600 mb-4">Pokémon not found</p>
        <Link 
          to="/pokemon" 
          className="inline-flex items-center text-primary-500 hover:text-primary-600"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Pokémon List
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link 
          to="/pokemon" 
          className="inline-flex items-center text-gray-600 hover:text-primary-500 transition-colors"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back to Pokémon List
        </Link>
      </div>
      
      <PokemonDetail pokemon={pokemon} />
    </div>
  );
};

export default PokemonDetailPage;