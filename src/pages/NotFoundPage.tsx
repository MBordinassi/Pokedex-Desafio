import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-24 h-24 mb-6">
        <img src="/pokeball.svg" alt="Pokeball" className="w-full h-auto opacity-50" />
      </div>
      <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
      <p className="text-gray-600 max-w-md mb-8">
        Oops! It seems like the Pokémon you're looking for has fled into the tall grass. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
      >
        <Home size={20} className="mr-2" />
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;