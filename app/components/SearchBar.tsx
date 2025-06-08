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
    <div className="w-full max-w-[280px] sm:max-w-2xl mx-1 sm:mx-4 px-1 sm:px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter Pokémon name..."
            className="w-full px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-xl text-gray-800 bg-white rounded-full border-2 sm:border-4 border-yellow-400 focus:border-red-500 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-red-200 shadow-xl sm:shadow-2xl transition-all duration-300 placeholder-gray-500"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
            disabled={loading}
          />
          <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
            <span className="text-lg sm:text-2xl">🔍</span>
          </div>
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="absolute right-1 sm:right-2 top-1 sm:top-2 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-colors border-l-2 border-blue-200 px-3 sm:px-6 py-1.5 sm:py-3 rounded-full text-xs sm:text-base"
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            {loading ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="animate-spin rounded-full h-2.5 w-2.5 sm:h-4 sm:w-4 border-2 border-white border-t-transparent"></div>
                <span>Searching...</span>
              </div>
            ) : (
              <span>🔍</span>
            )}
          </button>
        </div>
      </form>
      
      {/* Search Tips */}
      <div className="mt-2 sm:mt-4 text-center">
        <p className="text-white/80 text-[10px] sm:text-sm drop-shadow-lg" style={{ fontFamily: 'Tahoma, sans-serif' }}>
          💡 Try: pikachu, charizard, blastoise
        </p>
      </div>
    </div>
  );
}