import React from 'react';
import { Navbar } from '../components/Navbar';
import { User, Edit, Camera, Instagram, BookOpen } from 'lucide-react';

export const ProfileView = () => {
  return (
    <div className="min-h-screen bg-[#f5f7f8] dark:bg-[#101722] font-display text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12 bg-[radial-gradient(circle_at_10%_20%,rgba(37,123,244,0.05)_0%,transparent_40%)]">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Mi Cuenta</h1>
          <p className="text-slate-500 dark:text-slate-400">Gestiona tu perfil universitario y revisa tu posición global.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Photo */}
          <section className="lg:col-span-5 space-y-6">
            <div className="relative group aspect-[4/5] rounded-xl overflow-hidden border-2 border-[#257bf4]/20 bg-[#257bf4]/5 shadow-2xl shadow-[#257bf4]/5">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhvDd6goLK1jPfHFaln4uhxxcGp1q-XRAWDLJvlmap2EUyT8p5l5i02UyjiBGVjkafWteKRU8BL_GCcPpAIuUIYRCbWc5Tk2k2EppqGom-UlHsqkyeGyFpmTx5V-IHoCfBkXRvdWbHDdSvPv9jLi8FQ9Mx7ZUfsSmiSZ5deC488EIsmArxpHPCIP93rC6_UduFuFiUrtOtZ3Df5egvyYBVwlkNsnK5XFNT8SQeMac0dKzKVWmjYqqkymVtxJX8BR_cdR_CZ2uGIcQ" 
                alt="Profile" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101722]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                <button className="w-full bg-white text-[#101722] font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[#257bf4] hover:text-white transition-all">
                  <Camera size={18} />
                  Editar Foto
                </button>
              </div>
            </div>
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 italic">
               Esta es tu imagen principal para las votaciones de la temporada.
            </p>
          </section>

          {/* Right Column: Details */}
          <section className="lg:col-span-7 space-y-8">
            
            <div className="bg-white dark:bg-[#257bf4]/5 rounded-xl p-8 border border-slate-200 dark:border-[#257bf4]/10 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User className="text-[#257bf4]" />
                Detalles del Perfil
              </h2>
              
              <div className="space-y-6">
                <InfoRow label="Nombre Completo" value="Javier Alejandro Pérez" icon={<Edit size={16} />} />
                <InfoRow label="Instagram" value="@javier_uade" icon={<Instagram size={16} />} isLink />
                <InfoRow label="Carrera" value="Diseño Multimedia" icon={<BookOpen size={16} />} />
              </div>
            </div>

            {/* ELO Card */}
            <div className="relative overflow-hidden bg-[#257bf4] rounded-xl p-10 text-white shadow-2xl shadow-[#257bf4]/20">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="px-4 py-1 bg-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Estatus Celestial</span>
                <h3 className="text-slate-200 text-sm font-medium mb-2 uppercase tracking-tighter">Tu Rating ELO Actual</h3>
                <div className="flex items-baseline gap-2">
                   <span className="text-7xl md:text-8xl font-black tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">1450</span>
                   <span className="text-2xl font-bold opacity-80 uppercase tracking-widest">pts</span>
                </div>
                
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-[#257bf4] bg-slate-200 overflow-hidden">
                       <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk6Vw5R8p1AyREpPcm27LDVdoWgfNDpLYZVLNtS493Oihq9quP_iu9iJEO9K7BzyWxP7qxHhXnBdqWNmNVwWwnS7OhpwuAN7TcO9LxdQ2l2LP8Cn-1UH5dimtb6GYK5UQTu3bJcOIbTZb4N4MhJOrY--oL2Zi-lr4tYGFI-7VJ_yduDO384TqtdWgTN34TM6H7Ue5Io6J9QdwTp20hl3wJ-6imYaVvahETn0L4K5ynT6OlbneOGh214UYnLCi3CLLiCVogxkEp_hA" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-[#257bf4] bg-slate-300 overflow-hidden">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdVrnBsYi-eDtnqubGyTrNjonmLdrLqGHN17Mn05DoGIbkJoftkHeSZ7CwOLPlZ8sCuWgXKRfX25YYgJlh6VMjnhp3QVK2ULXJmi6_k-nEAtOjjM30XbpljAfI67PNR3q5hm4-5Qt77SiGUuTUXjTKooAxz3rrjIKy3lRNi7831Zt4tQaXABsoJgE_WYS5h3w62PdI8pA7or5833KYNJ_R8VTdGIr7s_5T2tO1uhrmN8ojidNps_gKxlQ9D970sduwcl9_vdVADnM" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-[#257bf4] bg-white text-[#257bf4] flex items-center justify-center text-[10px] font-bold">
                       +12
                    </div>
                  </div>
                  <p className="text-sm font-medium text-white/90">Estás en el top 5% de tu carrera</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <StatBox label="Votos Recibidos" value="2,840" />
              <StatBox label="Win Rate" value="64.2%" />
            </div>

          </section>
        </div>
      </main>
    </div>
  );
};

const InfoRow = ({ label, value, icon, isLink }: any) => (
  <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-[#257bf4]/5 border border-slate-100 dark:border-[#257bf4]/10">
    <div>
      <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold mb-1">{label}</p>
      <p className="text-lg font-medium flex items-center gap-1">
        {isLink && <span className="text-[#257bf4]">@</span>}
        {value.replace('@','')}
      </p>
    </div>
    <button className="flex items-center gap-2 text-[#257bf4] hover:bg-[#257bf4]/10 px-4 py-2 rounded-full transition-all text-sm font-bold">
      {icon} Editar
    </button>
  </div>
);

const StatBox = ({ label, value }: any) => (
  <div className="bg-white dark:bg-[#257bf4]/5 p-6 rounded-xl border border-slate-200 dark:border-[#257bf4]/10">
    <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase mb-1">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);