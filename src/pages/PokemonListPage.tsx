import React, { useState, useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import PokemonList from '../components/pokemon/PokemonList';
import PokemonFilter from '../components/pokemon/PokemonFilter';
import Pagination from '../components/ui/Pagination';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const PokemonListPage: React.FC = () => {
  const { pokemons, isLoading, error, fetchAllPokemons, currentPage, totalPages, setCurrentPage } = usePokemon();
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  const handleFilter = (name: string, type: string) => {
    setNameFilter(name);
    setTypeFilter(type);
    setCurrentPage(1); // Reset to first page on filter change
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  useEffect(() => {
    fetchAllPokemons(currentPage);
  }, [currentPage, nameFilter, typeFilter]);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Pokémon Directory</h1>
      </div>
      
      <PokemonFilter onFilter={handleFilter} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {isLoading ? (
        <LoadingSpinner size="lg" />
      ) : (
        <>
          <PokemonList pokemons={pokemons} isLoading={isLoading} />
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default PokemonListPage;