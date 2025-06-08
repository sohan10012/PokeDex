'use client';

import { useState } from 'react';
import PokemonCard from './components/PokemonCard';
import EvolutionCard from './components/EvolutionCard';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  base_experience: number;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  species: {
    url: string;
  };
}

interface Evolution {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  height: number;
  weight: number;
  base_experience: number;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  min_level?: number;
  stage: number;
}

// Search Bar Component
function SearchBar({ onSearch, loading }: { onSearch: (name: string) => void; loading: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="relative">
        <div 
          className="bg-gradient-to-r from-yellow-400 to-yellow-300 p-1 shadow-lg transform -skew-x-12"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(255, 193, 7, 0.6))',
          }}
        >
          <div className="bg-white transform skew-x-12 flex items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter Pokémon name..."
              className="px-6 py-3 w-80 text-gray-800 placeholder-gray-500 border-none outline-none font-semibold text-lg bg-transparent"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => onSearch(searchTerm)}
              disabled={loading || !searchTerm.trim()}
              className="px-6 py-3 text-white font-bold hover:text-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? '⚡' : '🔍'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main App Component
export default function Home() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPokemonDetails = async (name: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!response.ok) throw new Error('Pokemon not found');
    return await response.json();
  };

  const searchPokemon = async (name: string) => {
    if (!name.trim()) return;
    
    setLoading(true);
    setError('');
    setPokemon(null);
    setEvolutions([]);

    try {
      const pokemonData = await fetchPokemonDetails(name);
      setPokemon(pokemonData);

      try {
        const speciesRes = await fetch(pokemonData.species.url);
        const speciesData = await speciesRes.json();
        
        const evolutionRes = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionRes.json();
        
        const evolutionChain = [];
        let current = evolutionData.chain;
        let stage = 1;
        
        try {
          const firstStageData = await fetchPokemonDetails(current.species.name);
          evolutionChain.push({
            ...firstStageData,
            min_level: null,
            stage: stage
          });
        } catch (e) {
          console.log('First stage fetch failed');
        }
        
        if (current.evolves_to.length > 0) {
          stage++;
          for (const evolution of current.evolves_to) {
            try {
              const secondStageData = await fetchPokemonDetails(evolution.species.name);
              evolutionChain.push({
                ...secondStageData,
                min_level: evolution.evolution_details[0]?.min_level || null,
                stage: stage
              });
              
              if (evolution.evolves_to.length > 0) {
                stage++;
                for (const thirdEvo of evolution.evolves_to) {
                  try {
                    const thirdStageData = await fetchPokemonDetails(thirdEvo.species.name);
                    evolutionChain.push({
                      ...thirdStageData,
                      min_level: thirdEvo.evolution_details[0]?.min_level || null,
                      stage: stage
                    });
                  } catch (e) {
                    console.log('Third evolution fetch failed');
                  }
                }
              }
            } catch (e) {
              console.log('Evolution fetch failed');
            }
          }
        }
        
        const otherEvolutions = evolutionChain.filter(evo => evo.name !== pokemonData.name);
        setEvolutions(otherEvolutions);
      } catch (e) {
        console.log('Evolution chain fetch failed');
      }
    } catch (err) {
      setError('Pokémon not found. Please try another name.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-x-hidden">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Navbar */}
      <nav className="relative bg-gradient-to-r from-red-600 via-red-500 to-red-600 shadow-2xl border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full border-2 border-gray-800"></div>
              </div>
              <h1 
                className="text-xl sm:text-4xl font-bold text-yellow-300 drop-shadow-2xl tracking-wider"
                style={{ 
                  fontFamily: 'Impact, Arial Black, sans-serif',
                  textShadow: '3px 3px 0px #1e40af, -1px -1px 0px #1e40af, 1px -1px 0px #1e40af, -1px 1px 0px #1e40af'
                }}
              >
                POKÉDEX
              </h1>
            </div>
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full shadow-lg border-2 border-white"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Search Section */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg">
            Search for any Pokémon
          </h2>
          <SearchBar onSearch={searchPokemon} loading={loading} />
          {error && (
            <div className="mt-4 sm:mt-6 inline-block bg-red-100 border-2 border-red-300 rounded-lg px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
              <p className="text-red-700 font-semibold text-sm sm:text-base">{error}</p>
            </div>
          )}
        </div>

        {/* Welcome Section - Only show when no Pokemon is searched and not loading */}
        {!pokemon && !loading && (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl">
                Welcome to the
                <span className="text-yellow-300"> Ultimate Pokédex</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Discover the world of Pokémon! Search for any Pokémon to explore their stats, 
                types, abilities, and complete evolution chains.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-6xl mb-4 text-center">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Smart Search</h3>
                <p className="text-gray-200 text-center leading-relaxed">
                  Find any Pokémon by name instantly. Our search covers all generations 
                  and provides detailed information at your fingertips.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-6xl mb-4 text-center">📊</div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Detailed Stats</h3>
                <p className="text-gray-200 text-center leading-relaxed">
                  Explore comprehensive stats including type advantages, base stats, 
                  height, weight, and battle experience points.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="text-6xl mb-4 text-center">🔄</div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Evolution Chain</h3>
                <p className="text-gray-200 text-center leading-relaxed">
                  Discover complete evolution paths with evolution requirements 
                  and see how your Pokémon transforms through each stage.
                </p>
              </div>
            </div>

            {/* Popular Pokemon Suggestions */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-8 text-center">
                Popular Pokémon to Try
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { name: 'Pikachu', emoji: '⚡' },
                  { name: 'Charizard', emoji: '🔥' },
                  { name: 'Blastoise', emoji: '💧' },
                  { name: 'Venusaur', emoji: '🌿' },
                  { name: 'Mewtwo', emoji: '🧠' },
                  { name: 'Dragonite', emoji: '🐉' },
                  { name: 'Lucario', emoji: '⚔️' },
                  { name: 'Garchomp', emoji: '🦈' },
                  { name: 'Rayquaza', emoji: '🌪️' },
                  { name: 'Arceus', emoji: '✨' },
                  { name: 'Greninja', emoji: '🥷' },
                  { name: 'Eevee', emoji: '🦊' }
                ].map((pokemon, index) => (
                  <button
                    key={index}
                    onClick={() => searchPokemon(pokemon.name)}
                    className="bg-white/20 hover:bg-white/30 rounded-xl p-4 text-center transition-all duration-300 hover:scale-105 border border-white/30 group"
                  >
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {pokemon.emoji}
                    </div>
                    <div className="text-white font-semibold text-sm">
                      {pokemon.name}
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-gray-300 text-center mt-6 text-sm">
                Click on any Pokémon above to start exploring, or use the search bar!
              </p>
            </div>

            {/* Fun Facts Section */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-300/30">
                <h3 className="text-2xl font-bold text-white mb-6">
                  🌟 Did You Know?
                </h3>
                <div className="grid md:grid-cols-2 gap-6 text-gray-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎮</span>
                    <span>There are over 900 unique Pokémon species</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏆</span>
                    <span>18 different Pokémon types with unique abilities</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌍</span>
                    <span>Pokémon span across 9 generations of games</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">⭐</span>
                    <span>Each Pokémon has unique stats and evolution paths</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-yellow-400 border-t-transparent shadow-lg mb-4"></div>
            <p className="text-white text-xl font-semibold drop-shadow-lg">Searching for Pokémon...</p>
          </div>
        )}

        {/* Pokemon Display */}
        {pokemon && !loading && (
          <div className="space-y-8">
            {/* Main Pokemon Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Pokemon Card */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <div className="w-full max-w-sm  p-1 rounded-md shadow-2xl">
                  <PokemonCard pokemon={pokemon} />
                </div>
              </div>

              {/* Pokemon Details */}
              <div className="lg:col-span-2 flex items-center">
                <div 
                  className="w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-4 sm:p-6 border-4 border-yellow-400 shadow-2xl"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center flex items-center justify-center gap-2">
                    ⚔️ {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} Details ⚔️
                  </h2>
                  
                  {/* Base Stats */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-yellow-300 mb-2 sm:mb-3">Base Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pokemon.stats.map((stat, index) => (
                        <div key={index} className="bg-gray-700/50 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-white text-sm font-semibold">
                              {stat.stat.name.split('-').map(word => 
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </span>
                            <span className="text-yellow-300 font-bold text-sm">{stat.base_stat}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-yellow-400 to-yellow-300 h-2 rounded-full"
                              style={{ width: `${Math.min((stat.base_stat / 150) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Physical Characteristics */}
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-bold text-yellow-300 mb-2 sm:mb-3">Physical Characteristics</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                        <div className="text-yellow-300 text-xs font-bold mb-1">Height</div>
                        <div className="text-white font-bold text-base sm:text-lg">{(pokemon.height / 10).toFixed(1)}m</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                        <div className="text-yellow-300 text-xs font-bold mb-1">Weight</div>
                        <div className="text-white font-bold text-base sm:text-lg">{(pokemon.weight / 10).toFixed(1)}kg</div>
                      </div>
                      <div className="bg-gray-700/50 rounded-lg p-3 text-center">
                        <div className="text-yellow-300 text-xs font-bold mb-1">Base EXP</div>
                        <div className="text-white font-bold text-base sm:text-lg">{pokemon.base_experience}</div>
                      </div>
                    </div>
                  </div>

                  {/* Total Power */}
                  <div className="bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-lg p-3 text-center">
                    <div className="text-gray-800 text-sm mb-1">Total Power</div>
                    <div className="text-gray-900 font-bold text-lg sm:text-xl">
                      {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Evolution Chain Section */}
            <div 
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 border-4 border-yellow-400 shadow-2xl"
            >
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 sm:mb-6 text-center flex items-center justify-center gap-2">
                🔄 Evolution Chain 🔄
              </h2>
              <p className="text-gray-200 text-center mb-6 sm:mb-8 text-sm max-w-2xl mx-auto px-4">
                Discover the evolutionary journey of {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}. 
                Each stage represents a transformation in its growth and power.
              </p>
              {evolutions.length > 0 ? (
                <div className="flex justify-center">
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    {evolutions.map((evolution) => (
                      <div 
                        key={evolution.id}
                        onClick={() => searchPokemon(evolution.name)}
                        className="cursor-pointer transform hover:scale-105 transition-all duration-300"
                      >
                        <div className="w-full max-w-sm bg-gradient-to-r from-yellow-400 to-yellow-300 p-1 rounded-md shadow-2xl">
                          <EvolutionCard pokemon={evolution} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center py-8 sm:py-12">
                  <div className="text-center">
                    <div className="text-4xl sm:text-6xl mb-4">🚫</div>
                    <p className="text-white text-lg sm:text-xl font-semibold drop-shadow-lg">
                      No evolution data available
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative mt-8 py-4 border-t-2 border-yellow-400/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left Pokeball */}
            <div className="w-8 h-8 opacity-50">
              <div className="w-full h-full bg-red-500 rounded-full relative border-2 border-white">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 border border-gray-300" />
              </div>
            </div>

            {/* Username and Social Links */}
            <div className="flex flex-col items-center">
              <div className="text-yellow-400 font-bold text-lg mb-2">
                @sohan10012
              </div>
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/sohan10012" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/sohan10012" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Pokeball */}
            <div className="w-8 h-8 opacity-50">
              <div className="w-full h-full bg-red-500 rounded-full relative border-2 border-white">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-1/2" />
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 border border-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}