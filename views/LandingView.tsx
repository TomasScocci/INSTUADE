import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Clock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LandingView = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'email' | 'gender'>('email');

  const validateAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim().toLowerCase().endsWith('@uade.edu.ar')) {
      setError('Debes usar un correo institucional @uade.edu.ar');
      return;
    }
    setError('');
    setStep('gender');
  };

  const handleGenderSelect = (gender: 'male' | 'female') => {
    // In a real app, you would likely save this preference to the user profile or local storage
    console.log('Selected gender:', gender);
    navigate('/vote');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] font-display text-white selection:bg-[#257bf4] selection:text-white">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-[#257bf4]/10 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#0ea5e9]/10 rounded-full blur-[120px] opacity-30"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:32px_32px] opacity-20"></div>
      </div>

      {/* Navbar (Top) */}
      <nav className="absolute top-0 left-0 w-full px-6 md:px-8 py-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#257bf4] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,123,244,0.6)]">
            <Shield size={18} fill="white" className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">INSTUADE</span>
        </div>
        {/* Navigation buttons removed as requested */}
      </nav>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[480px] px-4">
        
        {step === 'email' ? (
          <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl ring-1 ring-white/5 animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                Ingresa con tu <br />
                <span className="text-[#257bf4] drop-shadow-[0_0_15px_rgba(37,123,244,0.4)]">mail de UADE</span>
              </h1>
              <p className="text-slate-400 text-sm leading-relaxed px-4">
                Acceso exclusivo para alumnos de UADE
              </p>
            </div>

            <form onSubmit={validateAndProceed} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Email UADE
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-slate-500 group-focus-within:text-[#257bf4] transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nombre@uade.edu.ar"
                    className="w-full bg-[#1f2937]/50 border border-white/5 focus:border-[#257bf4]/50 rounded-xl py-4 pl-11 pr-4 text-white placeholder:text-slate-600 outline-none transition-all focus:bg-[#1f2937] focus:ring-1 focus:ring-[#257bf4]/50 font-medium"
                    autoFocus
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-xs ml-1 font-bold flex items-center gap-1 animate-pulse">
                     <span className="material-icons text-[14px]">error_outline</span> {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#257bf4] hover:bg-[#1d4ed8] text-white font-bold py-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(37,123,244,0.3)] hover:shadow-[0_4px_25px_rgba(37,123,244,0.5)] active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                Ingresar
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
              <Shield size={12} className="text-[#257bf4]" />
              <span>Conexión segura</span>
            </div>
          </div>
        ) : (
           <div className="bg-[#111827]/80 backdrop-blur-xl border border-white/5 rounded-[32px] p-8 md:p-10 shadow-2xl ring-1 ring-white/5 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-8">
               <div className="w-16 h-16 bg-[#257bf4]/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-[#257bf4]/20 shadow-[0_0_20px_rgba(37,123,244,0.2)]">
                  <CheckCircle2 size={32} className="text-[#257bf4]" />
               </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">
                ¡Cuenta Verificada!
              </h1>
              <p className="text-slate-400 text-sm">
                Para personalizar tu experiencia, selecciona:
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleGenderSelect('male')}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-[#1f2937]/50 border border-white/5 hover:border-[#257bf4] hover:bg-[#257bf4]/10 transition-all group active:scale-95"
              >
                 <span className="material-icons text-3xl text-slate-400 group-hover:text-[#257bf4] transition-colors">male</span>
                 <span className="text-sm font-bold text-white">Soy Hombre</span>
              </button>
              <button
                onClick={() => handleGenderSelect('female')}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-[#1f2937]/50 border border-white/5 hover:border-pink-500 hover:bg-pink-500/10 transition-all group active:scale-95"
              >
                 <span className="material-icons text-3xl text-slate-400 group-hover:text-pink-500 transition-colors">female</span>
                 <span className="text-sm font-bold text-white">Soy Mujer</span>
              </button>
            </div>
            
            <button 
              onClick={() => {
                setStep('email');
                setError('');
              }} 
              className="mt-8 w-full text-[10px] text-slate-600 hover:text-white transition-colors uppercase tracking-widest font-bold flex items-center justify-center gap-1"
            >
              <span className="material-icons text-sm">arrow_back</span>
              Corregir Email
            </button>
           </div>
        )}

        {/* Info Pills */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <div className="bg-[#111827]/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex items-center gap-3 hover:bg-[#111827]/60 transition-colors cursor-default group">
            <div className="w-10 h-10 rounded-full bg-[#257bf4]/10 flex items-center justify-center group-hover:bg-[#257bf4]/20 transition-colors">
              <Lock size={18} className="text-[#257bf4]" />
            </div>
            <div>
              <p className="text-white font-bold text-xs mb-0.5">Voto Anónimo</p>
              <p className="text-slate-500 text-[10px]">Privacidad garantizada</p>
            </div>
          </div>
          <div className="bg-[#111827]/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 flex items-center gap-3 hover:bg-[#111827]/60 transition-colors cursor-default group">
            <div className="w-10 h-10 rounded-full bg-[#257bf4]/10 flex items-center justify-center group-hover:bg-[#257bf4]/20 transition-colors">
              <Clock size={18} className="text-[#257bf4]" />
            </div>
            <div>
              <p className="text-white font-bold text-xs mb-0.5">Resultados</p>
              <p className="text-slate-500 text-[10px]">En tiempo real</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 w-full text-center px-4">
        <p className="text-[10px] text-slate-600 font-bold tracking-widest uppercase mb-2">
          © 2024 INSTUADE. Desarrollado para el ecosistema universitario.
        </p>
        <div className="flex items-center justify-center gap-6 text-[10px] text-slate-600 font-medium">
          <button className="hover:text-[#257bf4] transition-colors">Términos</button>
          <span className="opacity-20">|</span>
          <button className="hover:text-[#257bf4] transition-colors">Privacidad</button>
          <span className="opacity-20">|</span>
          <button className="hover:text-[#257bf4] transition-colors">Reglamento Electoral</button>
        </div>
      </footer>

    </div>
  );
};