import React from 'react';
import { Twitch, Mail, ExternalLink, Heart } from 'lucide-react';

const Panel = ({ children, className, bgImage, title }) => (
  <div className={`panel-card group ${className}`}>
    {bgImage && <img src={bgImage} className="panel-image" alt={title} />}
    <div className="relative z-10 p-8 h-full flex flex-col justify-between bg-gradient-to-t from-black/80 via-black/20 to-transparent">
      {children}
    </div>
  </div>
);

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto p-6">
      
      {/* 1. Header Principal - Usando su estética VTuber */}
      <Panel className="md:col-span-8 md:row-span-2 min-h-[400px]" bgImage="/sobre-mi.png">
        <div className="flex justify-between items-start">
            <span className="bg-bitta-pink/20 text-bitta-pink text-[10px] font-bold px-3 py-1 rounded-full border border-bitta-pink/30 uppercase tracking-widest italic">
                🐰 EZquizo Mode: ON
            </span>
            <Heart size={20} className="text-bitta-pink animate-pulse" />
        </div>
        <div>
            <h1 className="text-7xl font-black tracking-tighter italic drop-shadow-lg">BITTAMI</h1>
            <p className="text-lg text-slate-200 mt-2 max-w-md font-medium leading-tight drop-shadow-md">
                "Espacio chill, algo random y lleno de pura EZquizo."
            </p>
        </div>
      </Panel>

      {/* 2. Horario - Viernes, Sábado y Domingo */}
      <Panel className="md:col-span-4" title="Horario">
        <h3 className="text-bitta-purple font-black uppercase text-xs tracking-widest mb-4">Agenda Semanal</h3>
        <div className="space-y-3">
            {['Viernes', 'Sábado', 'Domingo'].map(dia => (
                <div key={dia} className="flex justify-between border-b border-white/10 pb-1">
                    <span className="font-bold italic text-lg">{dia}</span>
                    <span className="font-mono text-bitta-pink tracking-widest">~ 20:00H</span>
                </div>
            ))}
        </div>
      </Panel>

      {/* 3. Setup (Basado en su imagen) */}
      <Panel className="md:col-span-4" bgImage="/setup.png">
        <div className="mt-auto">
            <h4 className="text-xs font-bold text-white/50 uppercase mb-2 tracking-tighter">Current Gear</h4>
            <ul className="text-xs space-y-1 font-bold">
                <li><span className="text-bitta-pink">GPU:</span> RTX 4060</li>
                <li><span className="text-bitta-pink">CPU:</span> Ryzen 5 8400F</li>
                <li><span className="text-bitta-pink">RAM:</span> 16GB</li>
            </ul>
        </div>
      </Panel>

      {/* 4. Redes Sociales Rápidas */}
      <Panel className="md:col-span-2 flex flex-col items-center justify-center bg-purple-600/20 hover:bg-purple-600/40 cursor-pointer">
        <Twitch size={40} />
        <span className="text-[10px] font-black mt-4 tracking-[0.2em]">TWITCH</span>
      </Panel>

      <Panel className="md:col-span-2 flex flex-col items-center justify-center bg-pink-600/20 hover:bg-pink-600/40 cursor-pointer">
        <span className="text-3xl">📸</span>
        <span className="text-[10px] font-black mt-4 tracking-[0.2em]">INSTA</span>
      </Panel>

      {/* 5. Contacto / Business */}
      <Panel className="md:col-span-4 flex flex-row items-center justify-between group cursor-pointer" title="Contacto">
        <div className="flex items-center gap-4">
            <Mail className="text-bitta-purple" />
            <span className="text-sm font-bold tracking-tighter">bittami.mp@gmail.com</span>
        </div>
        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </Panel>

    </div>
  );
}