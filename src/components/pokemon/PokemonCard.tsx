import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Pokemon } from '../../types/pokemon';
import { usePokemon } from '../../context/PokemonContext';
import TypeBadge from './TypeBadge';

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const { toggleFavorite, isFavorite } = usePokemon();
  const favorite = isFavorite(pokemon.id);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(pokemon);
  };

  // Get the official artwork or fallback to front_default
  const imageUrl = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;
  
  // Capitalize the first letter of the name
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative pt-4 px-4 pb-2 bg-gray-100">
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 p-1 rounded-full z-10 transition-colors ${
              favorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart fill={favorite ? "currentColor" : "none"} size={20} />
          </button>
          
          <div className="flex justify-center">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt={formattedName}
                className="h-32 w-32 object-contain transform transition-transform duration-300 hover:scale-110"
              />
            ) : (
              <div className="h-32 w-32 flex items-center justify-center bg-gray-200 rounded-full">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">{formattedName}</h3>
            <span className="text-sm font-medium text-gray-500">#{pokemon.id.toString().padStart(3, '0')}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {pokemon.types.map(typeInfo => (
              <TypeBadge key={typeInfo.type.name} type={typeInfo.type.name} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;