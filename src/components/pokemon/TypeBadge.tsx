import React from 'react';

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, size = 'md' }) => {
  // Map of Pokémon types to colors
  const typeColors: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-orange-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-300',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-lime-500',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-700',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };

  // Size classes for the badge
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  // Get the color class for the type, defaulting to gray if not found
  const colorClass = typeColors[type.toLowerCase()] || 'bg-gray-400';
  
  return (
    <span 
      className={`${colorClass} ${sizeClasses[size]} text-white font-medium rounded-full inline-block`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  );
};

export default TypeBadge;