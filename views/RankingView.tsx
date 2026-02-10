import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { fetchTopProfiles } from '../services/supabaseClient';
import { Profile } from '../types';
import { TrendingUp, ChevronsDown } from 'lucide-react';

export const RankingView = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  
  useEffect(() => {
    fetchTopProfiles().then(setProfiles);
  }, []);

  return (
    <div className="min-h-screen bg-deep-space flex flex-col font-display selection:bg-celestial selection:text-white overflow-hidden relative">
       {/* Ambient Background */}
       <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-celestial/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
       <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-celestial/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="text-white">RANKING</span> <span className="text-celestial">GLOBAL</span>
          </h1>
          <p className="text-white/40 uppercase tracking-[0.4em] text-xs font-bold">
            Rendimiento de Élite • Clasificación en Vivo
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
            <div className="col-span-2 md:col-span-1 text-center">Puesto</div>
            <div className="col-span-7 md:col-span-8 pl-4">Perfil</div>
            <div className="col-span-3 text-right pr-4">Puntuación ELO</div>
          </div>

          <div className="flex flex-col gap-3">
            {profiles.map((profile, index) => (
              <RankingRow key={profile.id} profile={profile} index={index} />
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <button className="text-xs font-black uppercase tracking-[0.3em] text-white/30 hover:text-celestial transition-colors flex flex-col items-center gap-2 group">
              <span>VER MÁS</span>
              <ChevronsDown size={20} className="group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
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

const RankingRow: React.FC<{ profile: Profile; index: number }> = ({ profile, index }) => {
  const isTop = index === 0;
  const isTop3 = index < 3;
  const rank = index + 1;

  if (isTop) {
    return (
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-celestial/30 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
        <div className="relative grid grid-cols-12 gap-4 items-center p-6 bg-deep-space/80 rounded-2xl border border-celestial/50 transition-all duration-300 transform hover:scale-[1.005] celestial-glow">
          <div className="col-span-2 md:col-span-1 flex justify-center">
            <span className="text-4xl font-black text-celestial italic drop-shadow-[0_0_15px_rgba(14,165,233,0.8)]">01</span>
          </div>
          <div className="col-span-7 md:col-span-8 flex items-center gap-6 pl-4">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-celestial animate-pulse blur-[8px] opacity-40"></div>
              <img src={profile.avatar_url} alt={profile.username} className="w-16 h-16 rounded-full object-cover border-2 border-celestial relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white group-hover:text-celestial transition-colors">{profile.full_name}</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-celestial/20 text-celestial text-[10px] font-bold rounded uppercase tracking-tighter">Legendario</span>
                <span className="text-white/30 text-xs font-medium">@{profile.username}</span>
              </div>
            </div>
          </div>
          <div className="col-span-3 text-right pr-6">
            <span className="text-3xl font-black text-white">{profile.elo_rating}</span>
            <div className="text-xs text-celestial flex justify-end items-center gap-1 font-bold">
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
      <div className="grid grid-cols-12 gap-4 items-center p-5 glass-panel rounded-xl hover:border-celestial/40 transition-all duration-300">
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