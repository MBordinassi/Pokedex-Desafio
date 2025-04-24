import React from 'react';
import { Heart } from 'lucide-react';
import { Pokemon } from '../../types/pokemon';
import { usePokemon } from '../../context/PokemonContext';
import TypeBadge from './TypeBadge';
import StatBar from '../ui/StatBar';

interface PokemonDetailProps {
  pokemon: Pokemon;
}

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  const { toggleFavorite, isFavorite } = usePokemon();
  const favorite = isFavorite(pokemon.id);
  
  // Format height (convert to meters) and weight (convert to kg)
  const heightInMeters = pokemon.height / 10;
  const weightInKg = pokemon.weight / 10;
  
  // Get image URLs
  const mainImage = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;
  const frontDefault = pokemon.sprites.front_default;
  const backDefault = pokemon.sprites.back_default;
  const frontShiny = pokemon.sprites.front_shiny;
  const backShiny = pokemon.sprites.back_shiny;
  
  // Format Pokemon ID for display
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  
  // Capitalize Pokemon name
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  const handleFavoriteClick = () => {
    toggleFavorite(pokemon);
  };

  // Calculate max stat value for relative scaling
  const maxStatValue = Math.max(...pokemon.stats.map(stat => stat.base_stat), 100);
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header with name, ID, and favorite button */}
      <div className="bg-primary-500 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{formattedName}</h1>
          <p className="text-white/80">{formattedId}</p>
        </div>
        <button 
          onClick={handleFavoriteClick}
          className={`p-2 rounded-full transition-colors ${
            favorite ? 'bg-white/20 text-red-400' : 'text-white hover:bg-white/10'
          }`}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart fill={favorite ? "currentColor" : "none"} size={24} />
        </button>
      </div>
      
      {/* Main content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Image and basic info */}
          <div className="md:col-span-1">
            <div className="bg-gray-100 rounded-lg p-6 flex justify-center items-center mb-4">
              {mainImage ? (
                <img 
                  src={mainImage} 
                  alt={formattedName} 
                  className="w-full max-w-[250px] h-auto"
                />
              ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-200 rounded">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {/* Types */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Types</h3>
                <div className="flex gap-2">
                  {pokemon.types.map(typeInfo => (
                    <TypeBadge key={typeInfo.type.name} type={typeInfo.type.name} size="lg" />
                  ))}
                </div>
              </div>
              
              {/* Physical attributes */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Height</h3>
                  <p className="text-lg font-medium">{heightInMeters} m</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Weight</h3>
                  <p className="text-lg font-medium">{weightInKg} kg</p>
                </div>
              </div>
              
              {/* Sprites */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Sprites</h3>
                <div className="grid grid-cols-4 gap-2">
                  {frontDefault && (
                    <img src={frontDefault} alt="Front Default" className="bg-gray-100 rounded p-1" />
                  )}
                  {backDefault && (
                    <img src={backDefault} alt="Back Default" className="bg-gray-100 rounded p-1" />
                  )}
                  {frontShiny && (
                    <img src={frontShiny} alt="Front Shiny" className="bg-gray-100 rounded p-1" />
                  )}
                  {backShiny && (
                    <img src={backShiny} alt="Back Shiny" className="bg-gray-100 rounded p-1" />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Stats and Abilities */}
          <div className="md:col-span-2">
            {/* Stats */}
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Base Stats</h2>
              <div className="space-y-3">
                {pokemon.stats.map(stat => {
                  // Format stat name (e.g., "special-attack" -> "Special Attack")
                  const statName = stat.stat.name
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  
                  return (
                    <StatBar
                      key={stat.stat.name}
                      label={statName}
                      value={stat.base_stat}
                      maxValue={maxStatValue}
                    />
                  );
                })}
              </div>
            </div>
            
            {/* Abilities */}
            <div>
              <h2 className="text-xl font-bold mb-4">Abilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pokemon.abilities.map(abilityInfo => {
                  // Format ability name (e.g., "overgrow" -> "Overgrow")
                  const abilityName = abilityInfo.ability.name
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                  
                  return (
                    <div key={abilityInfo.ability.name} className="bg-gray-100 rounded-lg p-4">
                      <h3 className="font-medium">{abilityName}</h3>
                      {abilityInfo.is_hidden && (
                        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded">Hidden</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;