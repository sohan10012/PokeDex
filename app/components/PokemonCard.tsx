'use client';

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
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      fire: 'bg-red-500',
      water: 'bg-blue-500',
      grass: 'bg-green-500',
      electric: 'bg-yellow-500',
      psychic: 'bg-pink-500',
      ice: 'bg-cyan-400',
      dragon: 'bg-purple-600',
      dark: 'bg-gray-800',
      fairy: 'bg-pink-300',
      fighting: 'bg-red-700',
      poison: 'bg-purple-500',
      ground: 'bg-yellow-600',
      flying: 'bg-indigo-400',
      bug: 'bg-green-400',
      rock: 'bg-yellow-800',
      ghost: 'bg-purple-700',
      steel: 'bg-gray-500',
      normal: 'bg-gray-400'
    };
    return colors[type] || 'bg-gray-400';
  };

  const getRarityColor = (baseExp: number) => {
    if (baseExp < 100) return 'text-gray-700';
    if (baseExp < 200) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatValue = (statName: string) => {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  return (
    <div className="bg-gradient-to-b from-yellow-200 to-yellow-100 rounded-xl p-6 shadow-2xl border-4 border-yellow-400 max-w-sm mx-auto relative">
      {/* ID in top-left corner */}
      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
        #{pokemon.id.toString().padStart(3, '0')}
      </div>

      {/* Pokemon Name */}
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800 capitalize mt-8" style={{ fontFamily: 'Tahoma, sans-serif' }}>
        {pokemon.name}
      </h2>

      {/* Type Badges */}
      <div className="flex justify-center gap-2 mb-4">
        {pokemon.types.map((type, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded-full text-white font-bold text-sm ${getTypeColor(type.type.name)} shadow-lg`}
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            {type.type.name.toUpperCase()}
          </span>
        ))}
      </div>

      {/* Pokemon Image */}
      <div className="flex justify-center mb-4 bg-white rounded-lg p-4 border-2 border-gray-300 shadow-inner">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 object-contain"
        />
      </div>

      {/* Pokemon Name with Rarity Color */}
      <h3 className={`text-xl font-bold text-center mb-4 capitalize ${getRarityColor(pokemon.base_experience)} drop-shadow-sm`} style={{ fontFamily: 'Tahoma, sans-serif' }}>
        {pokemon.name}
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-white/70 rounded-lg p-3 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">Height:</span>
          <span className="ml-1 text-gray-800">{pokemon.height / 10}m</span>
        </div>
        <div className="bg-white/70 rounded-lg p-3 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">Weight:</span>
          <span className="ml-1 text-gray-800">{pokemon.weight / 10}kg</span>
        </div>
        <div className="bg-white/70 rounded-lg p-3 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">HP:</span>
          <span className="ml-1 text-gray-800">{getStatValue('hp')}</span>
        </div>
        <div className="bg-white/70 rounded-lg p-3 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">Attack:</span>
          <span className="ml-1 text-gray-800">{getStatValue('attack')}</span>
        </div>
        <div className="bg-white/70 rounded-lg p-3 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">Speed:</span>
          <span className="ml-1 text-gray-800">{getStatValue('speed')}</span>
        </div>
        <div className="bg-white/70 rounded-lg p-3 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">Exp:</span>
          <span className="ml-1 text-gray-800">{pokemon.base_experience}</span>
        </div>
      </div>
    </div>
  );
}