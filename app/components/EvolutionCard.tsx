'use client';

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

interface EvolutionCardProps {
  pokemon: Evolution;
}

export default function EvolutionCard({ pokemon }: EvolutionCardProps) {
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

  const getStageColor = (stage: number) => {
    const colors = {
      1: 'bg-green-600',
      2: 'bg-blue-600',
      3: 'bg-purple-600'
    };
    return colors[stage as keyof typeof colors] || 'bg-gray-600';
  };

  const getStageName = (stage: number) => {
    const names = {
      1: 'Base Form',
      2: 'Stage 1',
      3: 'Stage 2'
    };
    return names[stage as keyof typeof names] || `Stage ${stage}`;
  };

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-100 rounded-xl p-5 shadow-2xl border-3 border-blue-300 relative">
      {/* ID in top-left corner */}
      <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
        #{pokemon.id.toString().padStart(3, '0')}
      </div>

      {/* Evolution Stage Badge */}
      <div className="text-center mb-3">
        <span className={`${getStageColor(pokemon.stage)} text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg`} style={{ fontFamily: 'Tahoma, sans-serif' }}>
          {getStageName(pokemon.stage)}
        </span>
      </div>

      {/* Pokemon Name */}
      <h3 className="text-lg font-bold text-center mb-3 text-gray-800 capitalize mt-2" style={{ fontFamily: 'Tahoma, sans-serif' }}>
        {pokemon.name}
      </h3>

      {/* Type Badges */}
      <div className="flex justify-center gap-1 mb-3">
        {pokemon.types.map((type, index) => (
          <span
            key={index}
            className={`px-2 py-1 rounded-full text-white font-bold text-xs ${getTypeColor(type.type.name)} shadow-md`}
            style={{ fontFamily: 'Tahoma, sans-serif' }}
          >
            {type.type.name.toUpperCase()}
          </span>
        ))}
      </div>

      {/* Pokemon Image */}
      <div className="flex justify-center mb-3 bg-white rounded-lg p-3 border-2 border-gray-300 shadow-inner">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-20 h-20 object-contain"
        />
      </div>

      {/* Pokemon Name with Rarity Color */}
      <h4 className={`text-md font-bold text-center mb-3 capitalize ${getRarityColor(pokemon.base_experience)} drop-shadow-sm`} style={{ fontFamily: 'Tahoma, sans-serif' }}>
        {pokemon.name}
      </h4>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/70 rounded p-2 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">Height:</span>
          <span className="ml-1 text-gray-800">{pokemon.height / 10}m</span>
        </div>
        <div className="bg-white/70 rounded p-2 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">Weight:</span>
          <span className="ml-1 text-gray-800">{pokemon.weight / 10}kg</span>
        </div>
        <div className="bg-white/70 rounded p-2 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">HP:</span>
          <span className="ml-1 text-gray-800">{getStatValue('hp')}</span>
        </div>
        <div className="bg-white/70 rounded p-2 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">Attack:</span>
          <span className="ml-1 text-gray-800">{getStatValue('attack')}</span>
        </div>
        <div className="bg-white/70 rounded p-2 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">Speed:</span>
          <span className="ml-1 text-gray-800">{getStatValue('speed')}</span>
        </div>
        <div className="bg-white/70 rounded p-2 shadow-md border border-gray-200">
          <span className="font-bold text-gray-700">Exp:</span>
          <span className="ml-1 text-gray-800">{pokemon.base_experience}</span>
        </div>
      </div>

      {/* Evolution Details */}
      <div className="text-center mt-3">
        {pokemon.min_level && (
          <p className="text-sm text-gray-700 font-semibold bg-white/50 rounded px-2 py-1 inline-block">
            Evolves at Level {pokemon.min_level}
          </p>
        )}
      </div>
    </div>
  );
}