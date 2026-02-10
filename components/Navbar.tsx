import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Settings, BarChart2, User, LogOut } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isRanking = location.pathname === '/ranking';
  // Check if we are in profile or login to adjust UI potentially
  const isProfile = location.pathname === '/profile';

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => navigate('/vote')}
        >
          <div className="w-8 h-8 bg-celestial rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.5)]">
            <span className="material-icons text-white text-xl">auto_awesome</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-white">INSTUADE</span>
        </div>

        <div className="flex items-center gap-6">
           {/* Navigation Links for Desktop */}
           <div className="hidden md:flex items-center gap-6 mr-4">
              <button 
                onClick={() => navigate('/vote')}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${location.pathname === '/vote' ? 'text-white' : 'text-white/40 hover:text-white'}`}
              >
                Votar
              </button>
              <button 
                onClick={() => navigate('/ranking')}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${location.pathname === '/ranking' ? 'text-white' : 'text-white/40 hover:text-white'}`}
              >
                Ranking
              </button>
           </div>

          {isRanking ? (
             <button 
               onClick={() => navigate('/vote')}
               className="flex items-center gap-2 bg-celestial hover:bg-celestial-dark text-white px-6 py-2 rounded-full transition-all duration-300 font-bold uppercase tracking-wider text-xs shadow-lg shadow-celestial/20"
             >
               <span className="material-icons text-sm">arrow_back</span>
               <span>Volver a Votar</span>
             </button>
          ) : (
             <div className="flex items-center gap-4">
                {/* User Icon -> Goes to Login now */}
                <button 
                  onClick={() => navigate('/login')}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all border border-white/10"
                  title="Iniciar Sesión"
                >
                  <User size={20} className="text-celestial" />
                </button>
                <button 
                  onClick={() => navigate('/')}
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 flex items-center justify-center transition-all border border-white/10 group"
                  title="Salir"
                >
                  <LogOut size={20} className="text-white/50 group-hover:text-red-400" />
                </button>
             </div>
          )}
        </div>
      </div>
    </nav>
  );
};