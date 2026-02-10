import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { fetchTopProfiles } from '../services/supabaseClient';
import { Profile } from '../types';
import { TrendingUp, ChevronsDown } from 'lucide-react';

export const RankingView = () => {
  const [selectedGender, setSelectedGender] = useState<'masculino' | 'femenino'>('femenino');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  
  const isFemale = selectedGender === 'femenino';
  
  // Theme Variables
  const themeColor = isFemale ? 'text-pink-500' : 'text-celestial';
  const themeBorder = isFemale ? 'border-pink-500' : 'border-celestial';
  const themeBg = isFemale ? 'bg-pink-500' : 'bg-celestial';
  const themeGlow = isFemale ? 'shadow-[0_0_25px_rgba(236,72,153,0.4)]' : 'shadow-[0_0_25px_rgba(14,165,233,0.4)]';
  const themeAmbient = isFemale ? 'bg-pink-500/10' : 'bg-celestial/10';

  useEffect(() => {
    fetchTopProfiles(selectedGender).then(setProfiles);
  }, [selectedGender]);

  return (
    <div className="min-h-screen bg-deep-space flex flex-col font-display selection:bg-celestial selection:text-white overflow-hidden relative transition-colors duration-700">
       {/* Ambient Background */}
       <div className={`fixed top-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10 pointer-events-none transition-colors duration-700 ${themeAmbient}`}></div>
       <div className={`fixed bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] -z-10 pointer-events-none transition-colors duration-700 ${isFemale ? 'bg-purple-500/5' : 'bg-celestial/5'}`}></div>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16 relative z-10 flex flex-col items-center">
        
        {/* Gender Filter Toggle */}
        <div className="mb-12 p-1 bg-white/5 rounded-full backdrop-blur-md border border-white/10 flex relative w-fit">
          <button
            onClick={() => setSelectedGender('femenino')}
            className={`relative z-10 px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${isFemale ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Chicas
          </button>
          <button
             onClick={() => setSelectedGender('masculino')}
             className={`relative z-10 px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${!isFemale ? 'text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Chicos
          </button>
          
          {/* Sliding Background */}
          <div 
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-300 shadow-lg ${themeBg}`}
            style={{ left: isFemale ? '4px' : 'calc(50%)' }}
          ></div>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-white">RANKING</span> <span className={`${themeColor} transition-colors duration-500`}>{isFemale ? 'CHICAS' : 'CHICOS'}</span>
          </h1>
          <p className="text-white/40 uppercase tracking-[0.4em] text-xs font-bold">
            Rendimiento de Élite • Clasificación en Vivo
          </p>
        </div>

        <div className="max-w-5xl w-full mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            <div className="col-span-2 md:col-span-1 text-center">Puesto</div>
            <div className="col-span-7 md:col-span-8 pl-4">Perfil</div>
            <div className="col-span-3 text-right pr-4">Puntuación ELO</div>
          </div>

          <div className="flex flex-col gap-3">
            {profiles.length > 0 ? profiles.map((profile, index) => (
              <RankingRow 
                key={profile.id} 
                profile={profile} 
                index={index} 
                themeColor={themeColor}
                themeBorder={themeBorder}
                themeBg={themeBg}
                themeGlow={themeGlow}
              />
            )) : (
              <div className="text-center py-10 text-white/30">No hay perfiles activos.</div>
            )}
          </div>

          {profiles.length > 0 && (
            <div className="mt-10 flex justify-center">
              <button className={`text-xs font-black uppercase tracking-[0.3em] text-white/30 hover:${themeColor} transition-colors flex flex-col items-center gap-2 group`}>
                <span>VER MÁS</span>
                <ChevronsDown size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 opacity-30">
            <span className="text-lg font-bold tracking-tighter text-white">INSTUADE</span>
          </div>
          <p className="text-white/20 text-[10px] uppercase tracking-widest font-medium">© 2024 Sistema de Ranking Global</p>
        </div>
      </footer>
    </div>
  );
};

interface RankingRowProps {
  profile: Profile;
  index: number;
  themeColor: string;
  themeBorder: string;
  themeBg: string;
  themeGlow: string;
}

const RankingRow: React.FC<RankingRowProps> = ({ profile, index, themeColor, themeBorder, themeBg, themeGlow }) => {
  const isTop = index === 0;
  const isTop3 = index < 3;
  const rank = index + 1;

  if (isTop) {
    return (
      <div className="relative group">
        <div className={`absolute -inset-0.5 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500 ${themeBg} bg-opacity-30`}></div>
        <div className={`relative grid grid-cols-12 gap-4 items-center p-6 bg-deep-space/80 rounded-2xl border transition-all duration-300 transform hover:scale-[1.005] ${themeBorder} ${themeGlow} border-opacity-50`}>
          <div className="col-span-2 md:col-span-1 flex justify-center">
            <span className={`text-4xl font-black italic drop-shadow-lg ${themeColor}`}>01</span>
          </div>
          <div className="col-span-7 md:col-span-8 flex items-center gap-6 pl-4">
            <div className="relative">
              <div className={`absolute -inset-1 rounded-full animate-pulse blur-[8px] opacity-40 ${themeBg}`}></div>
              <img src={profile.avatar_url} alt={profile.username} className={`w-16 h-16 rounded-full object-cover border-2 relative z-10 ${themeBorder}`} />
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold text-white group-hover:${themeColor} transition-colors`}>{profile.full_name}</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 bg-white/5 ${themeColor} text-[10px] font-bold rounded uppercase tracking-tighter`}>Legendario</span>
                <span className="text-white/30 text-xs font-medium">@{profile.username}</span>
              </div>
            </div>
          </div>
          <div className="col-span-3 text-right pr-6">
            <span className="text-3xl font-black text-white">{profile.elo_rating}</span>
            <div className={`text-xs flex justify-end items-center gap-1 font-bold ${themeColor}`}>
               <TrendingUp size={14} /> +12
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rows 2 & 3
  if (isTop3) {
    return (
      <div className={`grid grid-cols-12 gap-4 items-center p-5 glass-panel rounded-xl hover:border-opacity-40 transition-all duration-300 ${themeBorder} border-transparent hover:${themeBorder}`}>
        <div className="col-span-2 md:col-span-1 flex justify-center">
          <span className="text-2xl font-bold text-white/20">0{rank}</span>
        </div>
        <div className="col-span-7 md:col-span-8 flex items-center gap-5 pl-4">
          <img src={profile.avatar_url} alt={profile.username} className="w-12 h-12 rounded-full object-cover border border-white/10" />
          <div className="flex flex-col">
            <span className="font-bold text-white text-lg">{profile.full_name}</span>
            <span className="text-xs text-white/30">@{profile.username}</span>
          </div>
        </div>
        <div className="col-span-3 text-right pr-6">
          <span className="text-2xl font-bold text-white/90 tracking-tight">{profile.elo_rating}</span>
        </div>
      </div>
    );
  }

  // Standard Rows
  return (
    <div className="grid grid-cols-12 gap-4 items-center px-8 py-3 bg-white/[0.02] border border-white/5 rounded-lg hover:bg-white/[0.05] transition-colors">
       <div className="col-span-2 md:col-span-1 flex justify-center text-white/20 font-bold">0{rank}</div>
       <div className="col-span-7 md:col-span-8 flex items-center gap-4">
         <img src={profile.avatar_url} alt={profile.username} className="w-10 h-10 rounded-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
         <span className="font-medium text-white/80">{profile.full_name}</span>
       </div>
       <div className="col-span-3 text-right pr-4 text-white/40 font-mono">{profile.elo_rating}</div>
    </div>
  );
};