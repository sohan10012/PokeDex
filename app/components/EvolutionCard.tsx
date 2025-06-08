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
    return 'text-white';
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

  const getStageColor = (stage: number) => {
    const colors = {
      1: 'from-green-500 to-emerald-600',
      2: 'from-blue-500 to-cyan-600',
      3: 'from-purple-500 to-violet-600'
    };
    return colors[stage as keyof typeof colors] || 'from-gray-500 to-slate-600';
  };

  const getStageName = (stage: number) => {
    const names = {
      1: 'Base Form',
      2: 'Stage 1',
      3: 'Stage 2'
    };
    return names[stage as keyof typeof names] || `Stage ${stage}`;
  };

  const getStageIcon = (stage: number) => {
    const icons = {
      1: '🥚',
      2: '🐛',
      3: '🦋'
    };
    return icons[stage as keyof typeof icons] || '⭐';
  };

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
    <div className="max-w-sm mx-auto">
      {/* Card Container with Pokemon Logo Colors */}
      <div 
        className="relative rounded-md shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
        style={{ 
          aspectRatio: '2.5/3.5',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 25%, #ff6b6b 50%, #ffd93d 75%, #ff6b6b 100%)',
          boxShadow: '0 25px 50px -12px rgba(255, 107, 107, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
        }}
      >
        {/* Enhanced Holographic overlay effect */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none rounded-md"
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%), linear-gradient(-45deg, transparent 30%, rgba(255,217,61,0.4) 50%, transparent 70%)',
            animation: 'shimmer 3s ease-in-out infinite'
          }}
        />

        {/* Header Section with Pokemon Logo Style */}
        <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 p-3 relative border-b-4 border-yellow-400 rounded-t-md">
          {/* Pokemon ID */}
          <div className="absolute top-1 left-1 bg-blue-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg border-2 border-white z-10">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>
          
          {/* Evolution Stage Badge */}
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 z-10">
            <div className={`bg-gradient-to-r ${getStageColor(pokemon.stage)} text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg border-2 border-white flex items-center gap-1`}>
              <span>{getStageIcon(pokemon.stage)}</span>
              {getStageName(pokemon.stage)}
            </div>
          </div>
          
          {/* Rarity Stars */}
          <div className={`absolute top-1 right-1 text-xl font-bold drop-shadow-lg ${getRarityColor(pokemon.base_experience)} z-10`}>
            {getRarityStars(pokemon.base_experience)}
          </div>

          {/* Pokemon Name */}
          <h2 className="text-center text-white text-lg font-bold mt-6 drop-shadow-lg tracking-wide" 
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontFamily: 'Helvetica, Arial, sans-serif'
              }}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>

          {/* HP with Heart */}
          <div className="absolute top-10 right-1 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-lg border-2 border-white flex items-center gap-1 z-10">
            ❤️ {getStatValue('hp')}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-3 flex-1 flex flex-col bg-gradient-to-b from-white via-yellow-50 to-red-50">
          {/* Type Badges */}
          <div className="flex justify-center gap-2 mb-3">
            {pokemon.types.map((type, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${getTypeColor(type.type.name)} px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border-2 border-white`}
              >
                <span className="text-xs">{getTypeSymbol(type.type.name)}</span>
                <span className="text-white font-bold text-xs uppercase tracking-wider">
                  {type.type.name}
                </span>
              </div>
            ))}
          </div>

          {/* Enhanced Pokemon Image Container */}
          <div className="relative mb-3">
            {/* Outer decorative border */}
            <div className="bg-gradient-to-br from-yellow-400 via-red-400 to-yellow-400 p-1 rounded-md shadow-xl">
              {/* Inner image container */}
              <div className="bg-gradient-to-br from-blue-100 via-white to-yellow-100 rounded-md p-4 border-4 border-white shadow-inner relative">
                {/* Energy circuit pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-6 gap-2 h-full w-full p-2">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="relative">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" 
                             style={{animationDelay: `${i * 0.1}s`}} />
                        {i % 6 !== 5 && <div className="absolute top-0.5 left-1.5 w-3 h-0.5 bg-yellow-300" />}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Pokemon Image */}
                <div className="relative z-10 flex justify-center pb-2">
                  <div className="bg-white rounded-full p-3 shadow-lg border-4 border-yellow-300">
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-2xl filter brightness-110 contrast-125 saturate-110"
                      style={{
                        filter: 'drop-shadow(0 0 20px rgba(255, 217, 61, 0.5)) brightness(1.1) contrast(1.25) saturate(1.1)'
                      }}
                    />
                  </div>
                </div>

                {/* Power level indicator */}
                <div className="absolute bottom-1 right-1 bg-gradient-to-r from-red-500 to-yellow-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                  PWR: {Math.floor(totalStats / 6)}
                </div>
              </div>
            </div>
          </div>

          {/* Pokemon Physical Info */}
          <div className="bg-gradient-to-r from-red-100 to-yellow-100 rounded-md p-2 pb-4 mb-2 border-2 border-red-200 shadow-sm">
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
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-md p-3 text-white mb-2 border-4 border-yellow-400">
            <h4 className="text-center font-bold text-xs mb-2 text-yellow-400 flex items-center justify-center gap-1">
              ⚔️ BATTLE STATISTICS ⚔️
            </h4>
            <div className="space-y-1.5">
              {pokemon.stats.map((statData) => {
                const statName = statData.stat.name;
                const value = statData.base_stat;
                const displayName = statName.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ');
                
                return (
                  <div key={statName} className="flex items-center gap-1">
                    <span className="text-xs font-semibold w-14 text-yellow-300 uppercase">
                      {displayName.substring(0, 6)}
                    </span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 relative overflow-hidden border border-gray-600">
                      <div 
                        className={`h-full ${getStatColor(statName)} transition-all duration-700 rounded-full relative`}
                        style={{ width: `${getStatBar(value)}%` }}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                      </div>
                    </div>
                    <span className="text-xs font-bold w-6 text-right text-white bg-gray-700 px-1 rounded">
                      {value}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Additional Stats */}
            <div className="mt-2 pt-2 border-t-2 border-yellow-400">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-700/50 rounded-md p-1.5">
                  <div className="text-yellow-300 text-xs font-bold mb-0.5">Base Experience</div>
                  <div className="text-white text-xs font-semibold">{pokemon.base_experience}</div>
                </div>
                <div className="bg-gray-700/50 rounded-md p-1.5">
                  <div className="text-yellow-300 text-xs font-bold mb-0.5">Total Stats</div>
                  <div className="text-white text-xs font-semibold">{totalStats}</div>
                </div>
                <div className="bg-gray-700/50 rounded-md p-1.5">
                  <div className="text-yellow-300 text-xs font-bold mb-0.5">Height</div>
                  <div className="text-white text-xs font-semibold">{(pokemon.height / 10).toFixed(1)}m</div>
                </div>
                <div className="bg-gray-700/50 rounded-md p-1.5">
                  <div className="text-yellow-300 text-xs font-bold mb-0.5">Weight</div>
                  <div className="text-white text-xs font-semibold">{(pokemon.weight / 10).toFixed(1)}kg</div>
                </div>
              </div>
            </div>

            {/* Type Effectiveness */}
            <div className="mt-2 pt-2 border-t-2 border-yellow-400">
              <div className="text-yellow-300 text-xs font-bold mb-1 text-center">TYPE EFFECTIVENESS</div>
              <div className="flex flex-wrap justify-center gap-1">
                {pokemon.types.map((type, index) => (
                  <div
                    key={index}
                    className={`bg-gradient-to-r ${getTypeColor(type.type.name)} px-2 py-0.5 rounded-full text-xs font-bold text-white shadow-md border border-white/20`}
                  >
                    {type.type.name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with Evolution Branding */}
          <div className="mt-auto bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-b-md p-2 text-center border-2 border-white">
            <div className="text-white text-xs font-bold flex items-center justify-center gap-1">
              🔄 EVOLUTION CARD 🔄
            </div>
            <div className="text-red-100 text-xs mt-0.5 font-semibold">
              Stage {pokemon.stage} Evolution • #{pokemon.id}
            </div>
          </div>
        </div>

        {/* Enhanced Corner Decorations */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-400 z-20 rounded-tl-md" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-yellow-400 z-20 rounded-tr-md" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-yellow-400 z-20 rounded-bl-md" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-yellow-400 z-20 rounded-br-md" />
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