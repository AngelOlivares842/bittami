import React, { useState, useEffect } from 'react';
import { Twitch, Instagram, Mail, ExternalLink, ShieldCheck, Calendar, Globe } from 'lucide-react';
import { useGlitchText } from '../hooks/useGlitchText';


const Card = ({ children, className, title, onClick }) => (
  <div onClick={onClick} className={`glass-card p-6 md:p-8 group relative overflow-hidden transition-all duration-500 flex flex-col justify-between border-white/5 ${onClick ? 'cursor-pointer hover:border-bitta-pink/40 active:scale-[0.98]' : ''} ${className}`}>
    {title && <h3 className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black mb-4 flex items-center gap-2">
      <div className="w-1 h-1 bg-bitta-pink rounded-full animate-pulse" /> {title}
    </h3>}
    <div className="relative z-10 w-full h-full flex flex-col justify-center">{children}</div>
  </div>
);

export default function BentoGrid() {
  const [isEzquizo, setIsEzquizo] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const observer = new MutationObserver(() => setIsEzquizo(document.body.classList.contains('ezquizo-active')));
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => { observer.disconnect(); clearInterval(timer); };
  }, []);

  const bittaTitle = useGlitchText("BITTAMI", isEzquizo);
  const ezquizoLabel = useGlitchText("EZquizo", isEzquizo);

  const handleMouseMove = (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 35;
    const moveY = (e.clientY - window.innerHeight / 2) / 35;
    setMousePos({ x: moveX, y: moveY });
  };

  const getCountryTime = (tz) => time.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', timeZone: tz });

  const countries = [
    { n: 'España', z: 'Europe/Madrid', f: '🇪🇸' },
    { n: 'México', z: 'America/Mexico_City', f: '🇲🇽' },
    { n: 'Perú', z: 'America/Lima', f: '🇵🇪' },
    { n: 'Colombia', z: 'America/Bogota', f: '🇨🇴' },
    { n: 'Ecuador', z: 'America/Guayaquil', f: '🇪🇨' },
    { n: 'Bolivia', z: 'America/La_Paz', f: '🇧🇴' },
    { n: 'Argentina', z: 'America/Argentina/Buenos_Aires', f: '🇦🇷' },
  ];

  return (
    <div onMouseMove={handleMouseMove} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 max-w-7xl mx-auto p-4 md:p-6 auto-rows-[200px]">
      
      {/* --- BLOQUE IZQUIERDO: Bio Principal --- */}
      <Card className="md:col-span-8 md:row-span-2 bg-gradient-to-br from-bitta-pink/[0.03] to-transparent">
        <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8">
            <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <ShieldCheck size={12} className="text-bitta-purple" />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">Verified VTuber Entity</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none">
                    BIT<span className="text-bitta-pink">{bittaTitle.substring(3)}</span>
                </h1>
                <p className="text-slate-400 text-sm md:text-base max-w-xs leading-relaxed border-l-2 border-bitta-pink/20 pl-4 italic">
                    {">"} Iniciando conexión en el <span className="text-white font-bold">{ezquizoLabel}</span>. Bienvenido al núcleo de la red.
                </p>
            </div>
            
            <div 
              className="relative w-48 md:w-72 aspect-square parallax-avatar"
              style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
            >
                <div className="absolute inset-0 bg-bitta-pink/10 rounded-full blur-3xl animate-pulse" />
                <img src="/bitta-avatar.png" alt="Bitta" className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_20px_rgba(255,183,213,0.2)]" />
            </div>
        </div>
      </Card>

      {/* --- BLOQUE DERECHO: Operations Hub con Scroll Espacial --- */}
      <Card className="md:col-span-4 md:row-span-2" title="Operations Hub">
        <div className="flex flex-col h-full overflow-hidden">
          
          {/* Reloj Principal (Fijo arriba) */}
          <div className="text-center mb-6 flex-shrink-0">
            <div className="text-5xl font-black tracking-tighter text-white">
                {time.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </div>
            <p className="text-[8px] font-black uppercase opacity-20 tracking-[0.3em] mt-1 italic">Host Sync / GMT-3</p>
          </div>

          {/* Zona con Scroll Espacial */}
          <div className="flex-1 overflow-y-auto pr-2 ops-hub-scroll">
            {/* Lista de Países */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-6">
              {countries.map(c => (
                <div key={c.n} className="flex items-center justify-between group/time py-1 border-b border-white/[0.03]">
                  <div className="flex items-center gap-2">
                      <span className="text-xs grayscale group-hover/time:grayscale-0 transition-all duration-300">
                          {c.f}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500 group-hover/time:text-white uppercase">
                          {c.n.substring(0, 3)}
                      </span>
                  </div>
                  <span className="text-[10px] font-mono font-black text-bitta-pink">
                      {getCountryTime(c.z)}
                  </span>
                </div>
              ))}
            </div>

            {/* Weekend Plan */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <h4 className="text-[8px] font-black uppercase opacity-20 flex items-center gap-2 mb-1">
                  <Calendar size={10}/> Deployment Schedule
              </h4>
              {['Viernes', 'Sábado', 'Domingo'].map(d => (
                  <div key={d} className="flex justify-between items-center bg-white/[0.02] p-2 rounded-xl border border-white/5 hover:border-bitta-pink/30 transition-all">
                      <span className="text-[9px] font-black uppercase italic opacity-50">{d}</span>
                      <span className="text-[9px] font-bold text-bitta-pink tracking-widest">20:00H</span>
                  </div>
              ))}
            </div>
          </div>
          
        </div>
      </Card>

      {/* --- FILA INFERIOR: Redes y Business --- */}
      <Card className="md:col-span-3 flex flex-row items-center justify-center gap-4" onClick={() => window.open('https://twitch.tv/bittami')}>
        <Twitch size={24} className="text-bitta-purple" />
        <span className="text-[11px] font-black uppercase tracking-widest">Live</span>
      </Card>

      <Card className="md:col-span-3 flex flex-row items-center justify-center gap-4" onClick={() => window.open('https://instagram.com/bittami.vt')}>
        <Instagram size={24} className="text-bitta-pink" />
        <span className="text-[11px] font-black uppercase tracking-widest">Feed</span>
      </Card>

      <Card className="md:col-span-6 flex flex-row items-center justify-between group h-full" onClick={() => window.location.href='mailto:bittami.mp@gmail.com'}>
        <div className="flex items-center gap-4">
            <div className="p-2 bg-white/5 rounded-lg"><Mail size={16} className="text-bitta-pink" /></div>
            <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase opacity-20">Direct Channel</span>
                <span className="text-xs font-bold tracking-tight">bittami.mp@gmail.com</span>
            </div>
        </div>
        <div className="bg-bitta-pink/10 px-3 py-1 rounded-md flex items-center gap-2 group-hover:bg-bitta-pink/20 transition-all">
            <span className="text-[9px] font-black text-bitta-pink uppercase tracking-tighter">Contact</span>
            <ExternalLink size={10} className="text-bitta-pink" />
        </div>
      </Card>
    </div>
  );
}