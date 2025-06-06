'use client';

import { useState } from 'react';

interface SearchBarProps {
  onSearch: (name: string) => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter Pokémon name (e.g., pikachu, charizard)..."
            className="w-full px-8 py-5 text-xl text-gray-800 bg-white rounded-full border-4 border-yellow-400 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-200 shadow-2xl transition-all duration-300 placeholder-gray-500"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
            disabled={loading}
          />
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
            <span className="text-2xl">🔍</span>
          </div>
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="absolute right-2 top-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 border-2 border-yellow-400 shadow-lg transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Searching...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                <span>Search</span>
                <span>⚡</span>
              </span>
            )}
          </button>
        </div>
      </form>
      
      {/* Search Tips */}
      <div className="mt-4 text-center">
        <p className="text-white/80 text-sm drop-shadow-lg" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          💡 Try searching: pikachu, charizard, blastoise, venusaur, gyarados
        </p>
      </div>
    </div>
  );
}