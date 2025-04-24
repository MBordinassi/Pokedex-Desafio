import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`${sizeClasses[size]} relative`}>
        {/* Pokeball spinner */}
        <div className={`absolute inset-0 rounded-full bg-primary-500 border-2 border-black animate-spin-slow`}>
          <div className="absolute top-0 left-0 right-0 bottom-1/2 rounded-t-full bg-primary-500 border-b-2 border-black"></div>
          <div className="absolute top-1/2 left-0 right-0 bottom-0 rounded-b-full bg-white"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1/4 h-1/4 bg-white border-2 border-black rounded-full"></div>
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;