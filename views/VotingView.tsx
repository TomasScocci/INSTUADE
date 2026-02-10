import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { fetchRandomPair, recordVote } from '../services/supabaseClient';
import { Profile } from '../types';
import { Check } from 'lucide-react';

export const VotingView = () => {
  const [selectedGender, setSelectedGender] = useState<'masculino' | 'femenino'>('femenino');
  const [pair, setPair] = useState<[Profile, Profile] | null>(null);
  const [loading, setLoading] = useState(true);
  const [voted, setVoted] = useState<'left' | 'right' | null>(null);

  const isFemale = selectedGender === 'femenino';
  
  // Dynamic theme colors
  const themeColor = isFemale ? 'text-pink-500' : 'text-celestial';
  const themeBorder = isFemale ? 'border-pink-500' : 'border-celestial';
  const themeBg = isFemale ? 'bg-pink-500' : 'bg-celestial';
  const themeGlow = isFemale ? 'shadow-[0_0_30px_rgba(236,72,153,0.4)]' : 'shadow-[0_0_30px_rgba(14,165,233,0.4)]';
  const themeAmbient = isFemale ? 'bg-pink-500/10' : 'bg-celestial/10';

  const loadNewPair = async () => {
    setLoading(true);
    setVoted(null);
    const newPair = await fetchRandomPair(selectedGender);
    setPair(newPair);
    setLoading(false);
  };

  useEffect(() => {
    loadNewPair();
  }, [selectedGender]);

  const handleVote = async (choice: 'left' | 'right') => {
    if (!pair || voted) return;

    setVoted(choice);
    const winner = choice === 'left' ? pair[0] : pair[1];
    const loser = choice === 'left' ? pair[1] : pair[0];

    // Persist to DB
    await recordVote(winner, loser);

    // Auto load next after delay
    setTimeout(() => {
      loadNewPair();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-deep-space flex flex-col font-display overflow-hidden relative transition-colors duration-700">
      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 transition-colors duration-700 ${themeAmbient}`}></div>
          <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 transition-colors duration-700 ${isFemale ? 'bg-purple-900/10' : 'bg-blue-900/10'}`}></div>
          <div className={`absolute inset-0 bg-[radial-gradient(${isFemale ? 'rgba(236,72,153,0.1)' : 'rgba(14,165,233,0.1)'}_1px,transparent_1px)] bg-[length:40px_40px] opacity-20 transition-all duration-700`}></div>
      </div>
      
      <Navbar />

      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-2 md:px-4 py-8 w-full max-w-7xl mx-auto">
        
        {/* Gender Toggle */}
        <div className="mb-8 p-1 bg-white/5 rounded-full backdrop-blur-md border border-white/10 flex relative">
          <button
            onClick={() => setSelectedGender('femenino')}
            className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${isFemale ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Chicas
          </button>
          <button
             onClick={() => setSelectedGender('masculino')}
             className={`relative z-10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${!isFemale ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Chicos
          </button>
          
          {/* Sliding Background */}
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 shadow-lg ${themeBg}`}
            style={{ left: isFemale ? '4px' : 'calc(50%)' }}
          ></div>
        </div>

        <div className="mb-6 md:mb-8 text-center space-y-4">
          <span className={`px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] ${themeColor}`}>
            INSTUADE Arena
          </span>
          <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tighter drop-shadow-lg">
            ¿Quién es más {isFemale ? 'linda' : 'lindo'}?
          </h2>
        </div>

        {/* Battle Arena */}
        {loading && !pair ? (
           <div className="h-[400px] flex items-center justify-center">
              <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${themeBorder}`}></div>
           </div>
        ) : !pair ? (
          <div className="text-center text-white/50">No hay perfiles disponibles.</div>
        ) : (
          <div className="relative flex flex-row items-stretch justify-center gap-3 md:gap-16 w-full max-w-5xl">
            
            {/* VS Badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center w-10 h-10 md:w-20 md:h-20 rounded-full bg-black border-2 border-white/20 text-white font-light text-xs md:text-xl shadow-[0_0_40px_rgba(255,255,255,0.1)] backdrop-blur-xl">
              VS
            </div>

            {/* Left Card */}
            <div className="flex-1 min-w-0 max-w-sm">
                <VoteCard 
                profile={pair[0]} 
                onClick={() => handleVote('left')} 
                state={voted === 'left' ? 'winner' : voted === 'right' ? 'loser' : 'idle'}
                themeColor={themeColor}
                themeBorder={themeBorder}
                themeGlow={themeGlow}
                themeBg={themeBg}
                />
            </div>

            {/* Right Card */}
            <div className="flex-1 min-w-0 max-w-sm">
                <VoteCard 
                profile={pair[1]} 
                onClick={() => handleVote('right')} 
                state={voted === 'right' ? 'winner' : voted === 'left' ? 'loser' : 'idle'}
                themeColor={themeColor}
                themeBorder={themeBorder}
                themeGlow={themeGlow}
                themeBg={themeBg}
                />
            </div>

          </div>
        )}

      </main>
    </div>
  );
};

interface VoteCardProps {
  profile: Profile;
  onClick: () => void;
  state: 'idle' | 'winner' | 'loser';
  themeColor: string;
  themeBorder: string;
  themeGlow: string;
  themeBg: string;
}

const VoteCard: React.FC<VoteCardProps> = ({ profile, onClick, state, themeColor, themeBorder, themeGlow, themeBg }) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative w-full aspect-[3/4] cursor-pointer transition-all duration-500 transform ${state === 'loser' ? 'opacity-40 scale-95 grayscale' : 'hover:-translate-y-2'}`}
    >
      <div className={`relative w-full h-full rounded-xl md:rounded-2xl overflow-hidden border transition-all duration-300 bg-black ${state === 'winner' ? `${themeBorder} ${themeGlow}` : 'border-white/10 group-hover:border-white/40'}`}>
        <img 
          src={profile.avatar_url} 
          alt={profile.username}
          className="w-full h-full object-cover transition-all duration-700 opacity-80 group-hover:opacity-100"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 w-full p-3 md:p-8 transition-all duration-500">
          <div className="flex items-end justify-between gap-2">
            <div className="min-w-0">
              <h3 className={`text-sm md:text-3xl font-bold mb-1 md:mb-2 truncate transition-colors ${state === 'winner' ? themeColor : 'text-white'}`}>
                {profile.full_name}
              </h3>
            </div>
            
            {/* Checkmark for winner */}
            {state === 'winner' && (
               <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 md:w-12 md:h-12 rounded-full text-white shadow-lg animate-pulse ${themeBg}`}>
                 <Check className="w-4 h-4 md:w-6 md:h-6" strokeWidth={3} />
               </span>
            )}
             {/* Hover indicator for idle - hidden on mobile to save space/cleanliness */}
             {state === 'idle' && (
               <span className="flex-shrink-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xl">
                 <Check size={24} />
               </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
