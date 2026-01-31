import React from 'react';
import { Twitch, Instagram, Twitter, Zap, Cpu, Mail, ExternalLink } from 'lucide-react';

const Card = ({ children, className, title, onClick }) => (
  <div 
    onClick={onClick}
    className={`glass-card p-8 group relative overflow-hidden transition-all duration-500 ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''} ${className}`}
  >
    {title && <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-6">{title}</h3>}
    <div className="relative z-10">{children}</div>
  </div>
);

export default function BentoGrid() {
  // Lógica de navegación para los botones
  const navigateTo = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 max-w-7xl mx-auto p-6 relative">
      
      {/* Bio Principal */}
      <Card className="md:col-span-8 md:row-span-2 flex flex-col justify-end min-h-[450px]">
        <div className="absolute -top-10 -right-10 w-64 md:w-80 animate-float-bunny pointer-events-none z-20">
            <img src="/bitta-avatar.png" alt="Bitta VTuber" className="w-full drop-shadow-[0_0_30px_rgba(255,183,213,0.3)]" />
        </div>
        <h1 className="text-8xl md:text-9xl font-black tracking-tighter leading-none italic">
            BIT<span className="text-bitta-pink italic">TAMI</span>
        </h1>
        <p className="text-xl md:text-2xl mt-6 text-slate-400 font-light max-w-md leading-relaxed">
            "¡BienvenidXs a mi <span className="text-white font-bold underline decoration-bitta-pink italic">EZquizo</span>! Espacio chill y lleno de magia."
        </p>
      </Card>

      {/* Agenda Real */}
      <Card className="md:col-span-4" title="Stream Schedule">
        <div className="space-y-4">
            {[
              { dia: 'Viernes', hora: '20:00H' },
              { dia: 'Sábado', hora: '20:00H' },
              { dia: 'Domingo', hora: '20:00H' }
            ].map((item) => (
                <div key={item.dia} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="font-bold text-lg">{item.dia}</span>
                    <span className="text-bitta-pink font-mono text-sm tracking-widest">{item.hora}</span>
                </div>
            ))}
        </div>
      </Card>

      {/* Widget de Spotify Funcional */}
      <div className="md:col-span-4 overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">
        <iframe 
          style={{ borderRadius: '0px' }} 
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM3M" // Playlist lofi por defecto
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
      </div>

      {/* Redes Sociales con Enlaces Reales */}
      <Card 
        className="md:col-span-2 flex flex-col items-center justify-center hover:bg-purple-600/10"
        onClick={() => navigateTo('https://www.twitch.tv/bittami')}
      >
        <Twitch size={32} className="text-bitta-purple" />
        <span className="text-[10px] font-black mt-4 tracking-widest uppercase">Twitch</span>
      </Card>

      <Card 
        className="md:col-span-2 flex flex-col items-center justify-center hover:bg-pink-600/10"
        onClick={() => navigateTo('https://www.instagram.com/bittami.vt')}
      >
        <Instagram size={32} className="text-bitta-pink" />
        <span className="text-[10px] font-black mt-4 tracking-widest uppercase">Instagram</span>
      </Card>

      {/* Specs Técnicos */}
      <Card className="md:col-span-4" title="Rig Info">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
                <Cpu size={18} className="text-bitta-purple" />
                <p className="text-sm font-bold">Ryzen 5 8400F</p>
            </div>
            <div className="flex items-center gap-3">
                <Zap size={18} className="text-bitta-pink" />
                <p className="text-sm font-bold">RTX 4060</p>
            </div>
        </div>
      </Card>

      {/* Botón de Contacto */}
      <Card 
        className="md:col-span-8 flex items-center justify-between group" 
        onClick={() => window.location.href = 'mailto:bittami.mp@gmail.com'}
        title="Business"
      >
        <div className="flex items-center gap-4">
            <Mail className="text-zinc-500 group-hover:text-bitta-pink transition-colors" />
            <span className="text-lg font-bold tracking-tighter">bittami.mp@gmail.com</span>
        </div>
        <ExternalLink size={18} className="opacity-20 group-hover:opacity-100 transition-opacity" />
      </Card>
    </div>
  );
}