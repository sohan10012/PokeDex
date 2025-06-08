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
      fire: 'from-red-500 to-orange-600',
      water: 'from-blue-500 to-cyan-600',
      grass: 'from-green-500 to-emerald-600',
      electric: 'from-yellow-400 to-amber-500',
      psychic: 'from-pink-500 to-purple-600',
      ice: 'from-cyan-400 to-blue-500',
      dragon: 'from-purple-600 to-indigo-700',
      dark: 'from-gray-800 to-black',
      fairy: 'from-pink-300 to-rose-400',
      fighting: 'from-red-700 to-red-800',
      poison: 'from-purple-500 to-violet-600',
      ground: 'from-yellow-600 to-amber-700',
      flying: 'from-indigo-400 to-sky-500',
      bug: 'from-green-400 to-lime-500',
      rock: 'from-yellow-800 to-stone-600',
      ghost: 'from-purple-700 to-indigo-800',
      steel: 'from-gray-500 to-slate-600',
      normal: 'from-gray-400 to-stone-500'
    };
    return colors[type] || 'from-gray-400 to-stone-500';
  };

  const getTypeSymbol = (type: string) => {
    const symbols: { [key: string]: string } = {
      fire: '🔥', water: '💧', grass: '🌿', electric: '⚡',
      psychic: '🔮', ice: '❄️', dragon: '🐉', dark: '🌙',
      fairy: '✨', fighting: '👊', poison: '☠️', ground: '🌍',
      flying: '🌪️', bug: '🐛', rock: '🗿', ghost: '👻',
      steel: '⚔️', normal: '⭐'
    };
    return symbols[type] || '⭐';
  };

  const getRarityStars = (baseExp: number) => {
    if (baseExp < 100) return '★';
    if (baseExp < 200) return '★★';
    return '★★★';
  };

  const getRarityColor = (baseExp: number) => {
    if (baseExp < 100) return 'text-gray-500';
    if (baseExp < 200) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getStatValue = (statName: string) => {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  };

  const getStatBar = (value: number, maxValue: number = 150) => {
    const percentage = Math.min((value / maxValue) * 100, 100);
    return percentage;
  };

  const getStatColor = (statName: string) => {
    const colors: { [key: string]: string } = {
      hp: 'bg-red-500',
      attack: 'bg-orange-500',
      defense: 'bg-blue-500',
      'special-attack': 'bg-purple-500',
      'special-defense': 'bg-green-500',
      speed: 'bg-yellow-500'
    };
    return colors[statName] || 'bg-gray-500';
  };

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <div className="max-w-sm mx-auto">
      {/* Card Container with Pokemon Logo Colors */}
      <div 
        className="relative rounded-3xl shadow-2xl border-4 overflow-hidden transform hover:scale-105 transition-transform duration-300"
        style={{ 
          aspectRatio: '2.5/3.5',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 25%, #ff6b6b 50%, #ffd93d 75%, #ff6b6b 100%)',
          borderImage: 'linear-gradient(45deg, #ff6b6b, #ffd93d, #ff6b6b) 1',
          boxShadow: '0 25px 50px -12px rgba(255, 107, 107, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
        }}
      >
        {/* Enhanced Holographic overlay effect */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%), linear-gradient(-45deg, transparent 30%, rgba(255,217,61,0.4) 50%, transparent 70%)',
            animation: 'shimmer 3s ease-in-out infinite'
          }}
        />

        {/* Header Section with Pokemon Logo Style */}
        <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 p-4 relative border-b-4 border-yellow-400">
          {/* Pokemon ID */}
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border-2 border-white z-10">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>
          
          {/* Rarity Stars - Moved to top right with proper z-index */}
          <div className={`absolute top-2 right-2 text-2xl font-bold drop-shadow-lg ${getRarityColor(pokemon.base_experience)} z-10`}>
            {getRarityStars(pokemon.base_experience)}
          </div>

          {/* Pokemon Name */}
          <h2 className="text-center text-white text-2xl font-bold mt-8 drop-shadow-lg capitalize tracking-wide" 
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            {pokemon.name}
          </h2>

          {/* HP with Heart */}
          <div className="absolute top-12 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg border-2 border-white flex items-center gap-1 z-10">
            ❤️ {getStatValue('hp')}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4 flex-1 flex flex-col bg-gradient-to-b from-white via-yellow-50 to-red-50">
          {/* Type Badges */}
          <div className="flex justify-center gap-2 mb-4">
            {pokemon.types.map((type, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${getTypeColor(type.type.name)} px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border-2 border-white`}
              >
                <span className="text-sm">{getTypeSymbol(type.type.name)}</span>
                <span className="text-white font-bold text-sm uppercase tracking-wider">
                  {type.type.name}
                </span>
              </div>
            ))}
          </div>

          {/* Enhanced Pokemon Image Container */}
          <div className="relative mb-4">
            {/* Outer decorative border */}
            <div className="bg-gradient-to-br from-yellow-400 via-red-400 to-yellow-400 p-1 rounded-2xl shadow-xl">
              {/* Inner image container */}
              <div className="bg-gradient-to-br from-blue-100 via-white to-yellow-100 rounded-xl p-6 border-4 border-white shadow-inner relative">
                {/* Energy circuit pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-6 gap-2 h-full w-full p-3">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="relative">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" 
                             style={{animationDelay: `${i * 0.1}s`}} />
                        {i % 6 !== 5 && <div className="absolute top-1 left-2 w-4 h-0.5 bg-yellow-300" />}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Pokemon Image - Large */}
                <div className="relative z-10 flex justify-center">
                  <div className="bg-white rounded-full p-4 shadow-lg border-4 border-yellow-300">
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="w-40 h-40 object-contain drop-shadow-2xl filter brightness-110 contrast-125 saturate-110"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(255, 217, 61, 0.5)) brightness(1.1) contrast(1.25) saturate(1.1)'
                      }}
                    />
                  </div>
                </div>

                {/* Power level indicator */}
                <div className="absolute bottom-2 right-2 bg-gradient-to-r from-red-500 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                  PWR: {Math.floor(totalStats / 6)}
                </div>
              </div>
            </div>
          </div>

          {/* Pokemon Physical Info */}
          <div className="bg-gradient-to-r from-red-100 to-yellow-100 rounded-lg p-3 mb-3 border-2 border-red-200 shadow-sm">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="font-bold text-red-600">Height</div>
                <div className="text-gray-800 font-semibold">{pokemon.height / 10}m</div>
              </div>
              <div className="text-center border-l border-r border-red-300">
                <div className="font-bold text-red-600">Weight</div>
                <div className="text-gray-800 font-semibold">{pokemon.weight / 10}kg</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-red-600">Base EXP</div>
                <div className="text-gray-800 font-semibold">{pokemon.base_experience}</div>
              </div>
            </div>
          </div>

          {/* All Pokemon Stats */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 text-white mb-3 border-4 border-yellow-400">
            <h4 className="text-center font-bold text-sm mb-3 text-yellow-400 flex items-center justify-center gap-2">
              ⚔️ BATTLE STATISTICS ⚔️
            </h4>
            <div className="space-y-2">
              {pokemon.stats.map((statData) => {
                const statName = statData.stat.name;
                const value = statData.base_stat;
                const displayName = statName.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                
                return (
                  <div key={statName} className="flex items-center gap-2">
                    <span className="text-xs font-semibold w-16 text-yellow-300 uppercase">
                      {displayName.substring(0, 6)}
                    </span>
                    <div className="flex-1 bg-gray-700 rounded-full h-3 relative overflow-hidden border border-gray-600">
                      <div 
                        className={`h-full ${getStatColor(statName)} transition-all duration-700 rounded-full relative`}
                        style={{ width: `${getStatBar(value)}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                    <span className="text-xs font-bold w-8 text-right text-white bg-gray-700 px-1 rounded">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Additional Stats */}
            <div className="mt-4 pt-4 border-t-2 border-yellow-400">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="text-yellow-300 text-xs font-bold mb-1">Base Experience</div>
                  <div className="text-white text-sm font-semibold">{pokemon.base_experience}</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="text-yellow-300 text-xs font-bold mb-1">Total Stats</div>
                  <div className="text-white text-sm font-semibold">{totalStats}</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="text-yellow-300 text-xs font-bold mb-1">Height</div>
                  <div className="text-white text-sm font-semibold">{(pokemon.height / 10).toFixed(1)}m</div>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2">
                  <div className="text-yellow-300 text-xs font-bold mb-1">Weight</div>
                  <div className="text-white text-sm font-semibold">{(pokemon.weight / 10).toFixed(1)}kg</div>
                </div>
              </div>
            </div>

            {/* Type Effectiveness */}
            <div className="mt-4 pt-4 border-t-2 border-yellow-400">
              <div className="text-yellow-300 text-xs font-bold mb-2 text-center">TYPE EFFECTIVENESS</div>
              <div className="flex flex-wrap justify-center gap-2">
                {pokemon.types.map((type, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${getTypeColor(type.type.name)} px-3 py-1 rounded-full text-xs font-bold text-white shadow-md border border-white/20`}
                  >
                    {type.type.name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with Pokemon Branding */}
          <div className="mt-auto bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-lg p-3 text-center border-2 border-white">
            <div className="text-white text-sm font-bold flex items-center justify-center gap-2">
              ⚡ POKÉMON TRADING CARD ⚡
            </div>
            <div className="text-red-100 text-xs mt-1 font-semibold">
              Gotta Catch 'Em All! • #{pokemon.id}
            </div>
          </div>
        </div>

        {/* Enhanced Corner Decorations */}
        <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-yellow-400 rounded-tl-xl bg-red-500/20" />
        <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-yellow-400 rounded-tr-xl bg-red-500/20" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-yellow-400 rounded-bl-xl bg-red-500/20" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-yellow-400 rounded-bl-xl bg-red-500/20" />

        {/* Pokeball decoration - Moved to bottom right with proper z-index */}
        <div className="absolute bottom-4 right-4 w-8 h-8 opacity-30 z-10">
          <div className="w-full h-full bg-red-500 rounded-full relative border-2 border-white">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white transform -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 border border-gray-300" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0%, 100% { 
            opacity: 0.2; 
            transform: translateX(-100%) rotate(45deg);
          }
          50% { 
            opacity: 0.4; 
            transform: translateX(100%) rotate(45deg);
          }
        }
      `}</style>
    </div>
  );
}