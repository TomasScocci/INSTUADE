import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, ArrowRight, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '../services/supabaseClient';

export const LoginView = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'main' | 'email'>('main');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/profile');
      }
    };
    checkUser();
  }, [navigate]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      // OAuth will redirect the browser
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión con Google');
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate('/profile');
    } catch (err: any) {
      setError(err.message || 'Credenciales inválidas');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] font-display text-white relative flex items-center justify-center overflow-hidden">
      
      {/* Background Ambient Glow (Top Left) */}
      <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-[420px] px-4 flex flex-col items-center">
        
        {/* Main Card */}
        <div className="w-full bg-[#0f172a]/40 backdrop-blur-xl border border-blue-500/20 rounded-[40px] p-8 md:p-10 shadow-2xl shadow-blue-900/10 relative overflow-hidden transition-all duration-500">
           {/* Card subtle inner glow */}
           <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none"></div>
           
           <div className="relative z-10 flex flex-col items-center text-center">
             
             {/* Logo Icon */}
             <div className="w-14 h-14 bg-[#1e293b] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 border border-blue-500/20">
                <Sparkles className="text-blue-400" size={24} fill="currentColor" />
             </div>

             {/* Brand */}
             <h1 className="text-2xl font-bold tracking-[0.1em] text-blue-500 mb-1">INSTUADE</h1>
             <p className="text-[10px] text-slate-400 tracking-[0.2em] uppercase mb-10">comunidad uade</p>

             {error && (
               <div className="w-full bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 flex items-center gap-2 text-red-400 text-xs text-left">
                 <AlertCircle size={16} />
                 <span>{error}</span>
               </div>
             )}

             {view === 'main' ? (
               <>
                 {/* Google Button */}
                 <button 
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-full flex items-center justify-center gap-3 hover:bg-slate-100 transition-all active:scale-95 mb-8 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.05H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.95l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05l3.66 2.84c.87-2.6 3.3-4.51 6.16-4.51z" fill="#EA4335" />
                      </svg>
                    )}
                    {isLoading ? 'Conectando...' : 'Iniciar sesión con Google'}
                 </button>

                 {/* Divider */}
                 <div className="flex items-center w-full gap-4 mb-8">
                   <div className="h-px bg-slate-800 flex-1"></div>
                   <span className="text-xs text-slate-600 font-medium">o</span>
                   <div className="h-px bg-slate-800 flex-1"></div>
                 </div>

                 {/* Manual Entry Button */}
                 <button 
                   onClick={() => setView('email')}
                   className="w-full bg-[#1e293b]/50 border border-blue-500/30 text-blue-400 font-bold py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-blue-500/10 transition-all active:scale-95 group"
                 >
                    <Mail size={18} className="group-hover:text-blue-300" />
                    Entrada manual
                 </button>
               </>
             ) : (
               <form onSubmit={handleEmailLogin} className="w-full text-left space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                 
                 <div className="space-y-1">
                   <label className="text-xs text-slate-500 font-bold ml-1 uppercase">Email</label>
                   <input 
                     type="email" 
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full bg-[#1e293b]/50 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white outline-none transition-colors"
                     placeholder="nombre@uade.edu.ar"
                   />
                 </div>
                 
                 <div className="space-y-1">
                   <label className="text-xs text-slate-500 font-bold ml-1 uppercase">Contraseña</label>
                   <input 
                     type="password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="w-full bg-[#1e293b]/50 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-white outline-none transition-colors"
                     placeholder="••••••••"
                   />
                 </div>

                 <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/20 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                 >
                    {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Ingresar'}
                 </button>

                 <button 
                   type="button"
                   onClick={() => {
                     setView('main');
                     setError(null);
                   }}
                   className="w-full text-xs text-slate-500 hover:text-white font-bold py-2 mt-2 flex items-center justify-center gap-1 transition-colors"
                 >
                   <ArrowLeft size={14} /> Volver
                 </button>

               </form>
             )}

             {/* Footer Links in Card */}
             {view === 'main' && (
               <div className="mt-10 text-xs">
                  <span className="text-slate-500">¿No tienes una cuenta? </span>
                  <button className="text-blue-500 font-bold hover:underline">Crear cuenta</button>
               </div>
             )}
             
             {view === 'main' && (
               <div className="flex gap-4 mt-6 text-[10px] text-slate-600 font-bold tracking-widest uppercase">
                 <button className="hover:text-slate-400">Términos</button>
                 <span>•</span>
                 <button className="hover:text-slate-400">Privacidad</button>
                 <span>•</span>
                 <button className="hover:text-slate-400">Soporte</button>
               </div>
             )}

           </div>
        </div>

        {/* Outer Footer */}
        <div className="mt-8 text-center px-6">
           <p className="text-[10px] text-slate-600 leading-relaxed">
             © 2024 INSTUADE. Exclusivo para miembros de la comunidad académica verificada.
           </p>
        </div>

      </div>
    </div>
  );
};