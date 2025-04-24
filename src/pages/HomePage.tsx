import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to the Ultimate <span className="text-primary-500">Pokédex</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore the world of Pokémon with our comprehensive Pokédex. Search, filter, and save your favorite Pokémon.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/pokemon"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Search size={20} className="mr-2" />
            Explore Pokémon
          </Link>
          <Link
            to="/favorites"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg border border-primary-500 hover:bg-primary-50 transition-colors"
          >
            <Heart size={20} className="mr-2" />
            View Favorites
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
            <p className="text-gray-600">
              Easily find Pokémon by name or filter by type to quickly discover exactly what you're looking for.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-primary-500"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Information</h3>
            <p className="text-gray-600">
              View comprehensive details for each Pokémon including types, abilities, stats, and more.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Heart size={24} className="text-primary-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Favorites</h3>
            <p className="text-gray-600">
              Save your favorite Pokémon to quickly access them later and build your ultimate team.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl p-8 my-12">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to catch 'em all?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Start exploring our comprehensive Pokédex and discover all the amazing Pokémon from every generation.
          </p>
          <Link
            to="/pokemon"
            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;