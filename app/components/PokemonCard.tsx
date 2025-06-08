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

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const totalStats = pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return (
   
    <div className="max-w-sm mx-4 sm:mx-auto p-2 border-2 border-yellow-400 rounded-md shadow-2xl">
      {/* Card Container with Pokemon Logo Colors */}
      <div 
        className="relative rounded-md shadow-2xl transform hover:scale-105 transition-transform duration-300"
        style={{ 
          aspectRatio: '2.5/3.5',
          background: 'linear-gradient(135deg, #ff6b6b 0%, #ffd93d 25%, #ff6b6b 50%, #ffd93d 75%, #ff6b6b 100%)',
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
        <div className=" border-b-2 rounded-md bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 p-4 relative ">
          {/* Pokemon ID */}
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border-2 border-white z-10">
            #{pokemon.id.toString().padStart(3, '0')}
          </div>
          
          {/* Rarity Stars - Moved to top right with proper z-index */}
          <div className={`absolute top-2 right-2 text-2xl font-bold drop-shadow-lg ${getRarityColor(pokemon.base_experience)} z-10`}>
            {getRarityStars(pokemon.base_experience)}
          </div>

          {/* Pokemon Name */}
          <h2 className="text-center text-white text-2xl sm:text-3xl font-bold mt-8 drop-shadow-lg tracking-wide" 
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                fontFamily: 'Helvetica, Arial, sans-serif'
              }}>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>

          {/* HP with Heart */}
          <div className="absolute top-12 bg-red-600 right-1 sm:right-2 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg border-2 border-white flex items-center gap-1 z-10">
            🤍 {getStatValue('hp')}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-3 sm:p-4 flex-1 flex flex-col bg-gradient-to-b from-white via-yellow-50 to-red-50">
          {/* Type Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {pokemon.types.map((type, index) => (
              <div
                key={index}
                className={`bg-gradient-to-r ${getTypeColor(type.type.name)} px-3 py-1 rounded-full shadow-lg flex items-center gap-1 border-2 border-white`}
              >
                <span className="text-xs sm:text-sm">{getTypeSymbol(type.type.name)}</span>
                <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider">
                  {type.type.name}
                </span>
              </div>
            ))}
          </div>

          {/* Enhanced Pokemon Image Container */}
          <div className="relative mb-3">
            {/* Outer decorative border */}
            <div className="bg-gradient-to-br from-yellow-400 via-red-400 to-yellow-400 p-1 rounded-2xl shadow-xl">
              {/* Inner image container */}
              <div className="bg-gradient-to-br from-blue-100 via-white to-yellow-100 rounded-xl p-4 sm:p-6 border-4 border-white shadow-inner relative">
                {/* Energy circuit pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="grid grid-cols-6 gap-2 h-full w-full p-3">
                    {[...Array(24)].map((_, i) => (
                      <div key={i} className="relative">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-pulse" 
                             style={{animationDelay: `${i * 0.1}s`}} />
                        {i % 6 !== 5 && <div className="absolute top-0.5 sm:top-1 left-1.5 sm:left-2 w-3 sm:w-4 h-0.5 bg-yellow-300" />}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Pokemon Image */}
                <div className="relative z-10 flex justify-center">
                  <div className="bg-white rounded-full p-3 sm:p-4 shadow-lg border-4 border-yellow-300">
                    <img
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-2xl filter brightness-110 contrast-125 saturate-110"
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

          {/* Enhanced Corner Decorations */}
          <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-yellow-400 z-20 rounded-tl-md" />
          <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-yellow-400 z-20 rounded-tr-md" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-yellow-400 z-20 rounded-bl-md" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-yellow-400 z-20 rounded-br-md" />
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
    </div>
  );
}