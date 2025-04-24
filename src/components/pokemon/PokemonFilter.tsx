import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { fetchPokemonTypes } from '../../services/api';

interface PokemonFilterProps {
  onFilter: (name: string, type: string) => void;
}

const PokemonFilter: React.FC<PokemonFilterProps> = ({ onFilter }) => {
  const [name, setName] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  useEffect(() => {
    const loadTypes = async () => {
      try {
        const typesList = await fetchPokemonTypes();
        setTypes(typesList);
      } catch (error) {
        console.error('Failed to load Pokémon types:', error);
      }
    };
    
    loadTypes();
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(name, selectedType);
  };
  
  const handleReset = () => {
    setName('');
    setSelectedType('');
    onFilter('', '');
  };
  
  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search Pokémon by name..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          {/* Toggle Filter Button (Mobile Only) */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleFilters}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <Filter size={18} />
              <span>{isFiltersOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>
          
          {/* Filter Options */}
          <div className={`flex flex-col md:flex-row gap-4 ${isFiltersOpen ? 'block' : 'hidden md:flex'}`}>
            {/* Type Select */}
            <div className="w-full md:w-48">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
              >
                Apply
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                <X size={18} className="md:hidden" />
                <span className="hidden md:inline">Reset</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PokemonFilter;