import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, Menu, X, Home, List } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-primary-500 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 relative">
              <div className="absolute inset-0 bg-white rounded-full border-4 border-black flex items-center justify-center">
                <div className="w-4 h-4 bg-white border-2 border-black rounded-full"></div>
              </div>
            </div>
            <span className="text-xl font-bold">Pokédex</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`flex items-center space-x-1 hover:text-accent-300 transition-colors ${isActive('/') ? 'font-bold' : ''}`}>
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/pokemon" className={`flex items-center space-x-1 hover:text-accent-300 transition-colors ${isActive('/pokemon') ? 'font-bold' : ''}`}>
              <List size={20} />
              <span>Pokémon</span>
            </Link>
            <Link to="/favorites" className={`flex items-center space-x-1 hover:text-accent-300 transition-colors ${isActive('/favorites') ? 'font-bold' : ''}`}>
              <Heart size={20} />
              <span>Favorites</span>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4">
              <Link to="/" 
                className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-primary-600 transition-colors ${isActive('/') ? 'bg-primary-600 font-bold' : ''}`}
                onClick={toggleMenu}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              <Link to="/pokemon" 
                className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-primary-600 transition-colors ${isActive('/pokemon') ? 'bg-primary-600 font-bold' : ''}`}
                onClick={toggleMenu}
              >
                <List size={20} />
                <span>Pokémon</span>
              </Link>
              <Link to="/favorites" 
                className={`flex items-center space-x-2 py-2 px-4 rounded hover:bg-primary-600 transition-colors ${isActive('/favorites') ? 'bg-primary-600 font-bold' : ''}`}
                onClick={toggleMenu}
              >
                <Heart size={20} />
                <span>Favorites</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;