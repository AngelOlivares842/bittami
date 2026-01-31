import React, { useState, useEffect } from 'react';
import { Twitch, Instagram, Zap, Cpu, Mail, ExternalLink } from 'lucide-react';
import { useGlitchText } from '../hooks/useGlitchText';

const Card = ({ children, className, title, onClick }) => (
  <div onClick={onClick} className={`glass-card p-6 md:p-8 group relative overflow-hidden transition-all duration-500 flex flex-col justify-between ${onClick ? 'cursor-pointer hover:scale-[1.02]' : ''} ${className}`}>
    {title && <h3 className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mb-4">{title}</h3>}
    <div className="relative z-10 w-full h-full flex flex-col justify-center">{children}</div>
  </div>
);

export default function BentoGrid() {
  const [isEzquizo, setIsEzquizo] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());

  // FIX GLITCH: Observer para detectar cambios de clase en el body
  useEffect(() => {
    const observer = new MutationObserver(() => setIsEzquizo(document.body.classList.contains('ezquizo-active')));
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Función para obtener la hora de cada país
  const getCountryTime = (timeZone) => {
    return time.toLocaleTimeString('en-GB', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: timeZone 
    });
  };

  const countries = [
    { name: 'España', zone: 'Europe/Madrid', flag: '🇪🇸' },
    { name: 'México', zone: 'America/Mexico_City', flag: '🇲🇽' },
    { name: 'Perú', zone: 'America/Lima', flag: '🇵🇪' },
    { name: 'Colombia', zone: 'America/Bogota', flag: '🇨🇴' },
    { name: 'Ecuador', zone: 'America/Guayaquil', flag: '🇪🇨' },
    { name: 'Bolivia', zone: 'America/La_Paz', flag: '🇧🇴' },
    { name: 'Argentina', zone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
  ];

  const bittaTitle = useGlitchText("BITTAMI", isEzquizo);
  const ezquizoLabel = useGlitchText("EZquizo", isEzquizo);

  const handleMouseMove = (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) / 30;
    const moveY = (e.clientY - window.innerHeight / 2) / 30;
    setMousePos({ x: moveX, y: moveY });
  };

  return (
    <div onMouseMove={handleMouseMove} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 max-w-7xl mx-auto p-4 md:p-6 auto-rows-[minmax(160px,auto)]">
      
      {/* 1. Bio Principal con PARALLAX */}
      <Card className="md:col-span-8 md:row-span-2 min-h-[380px]">
        <div 
          className="absolute -top-6 -right-6 w-48 md:w-80 pointer-events-none z-20 parallax-avatar"
          style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}
        >
            <img src="/bitta-avatar.png" alt="Bitta" className="w-full drop-shadow-[0_0_30px_rgba(255,183,213,0.3)]" />
        </div>
        <div className="mt-auto">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none italic uppercase">
                BIT<span className="text-bitta-pink italic">{bittaTitle.substring(3)}</span>
            </h1>
            <p className="text-base md:text-xl mt-4 text-slate-400 font-light max-w-sm">
                ¡BienvenidXs a mi <span className="text-white font-bold underline decoration-bitta-pink italic">{ezquizoLabel}</span>!
            </p>
        </div>
      </Card>

      {/* Tarjeta World Clock - md:col-span-4 */}
      <Card className="md:col-span-4" title="Global Sync">
        <div className="flex flex-col h-full justify-between py-2">
          {/* Hora Principal (Tu hora local) */}
          <div className="text-center mb-6">
            <div className="text-4xl font-black clock-font text-white tracking-tighter">
              {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <p className="text-[9px] uppercase opacity-30 font-bold tracking-[0.2em] mt-1 italic">
              Host System Time
            </p>
          </div>

          {/* Lista de Países (Responsive Grid) */}
          <div className="grid grid-cols-2 gap-y-3 gap-x-4 border-t border-white/5 pt-4">
            {countries.map((country) => (
              <div key={country.name} className="flex items-center justify-between group/time">
                <div className="flex items-center gap-2">
                  <span className="text-xs grayscale group-hover/time:grayscale-0 transition-all">
                    {country.flag}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {country.name}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-black text-bitta-pink">
                  {getCountryTime(country.zone)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 bg-bitta-purple/10 rounded-full py-1 text-center border border-bitta-purple/20">
            <p className="text-[8px] font-black uppercase text-bitta-purple animate-pulse">
              {isEzquizo ? "TEMPORAL RIFT DETECTED" : "All Systems Synchronized"}
            </p>
          </div>
        </div>
      </Card>

      {/* 3. Rig Info (R5 8400F + RTX 4060) */}
      <Card className="md:col-span-4" title="Rig Info">
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3"><Cpu className="text-bitta-purple" size={16} /><span className="text-xs font-bold italic">Ryzen 5 8400F</span></div>
            <div className="flex items-center gap-3"><Zap className="text-bitta-pink" size={16} /><span className="text-xs font-bold italic">RTX 4060</span></div>
        </div>
      </Card>

      {/* 4. Redes y Business (Final) */}
      <Card className="md:col-span-3 flex flex-col items-center justify-center" onClick={() => window.open('https://twitch.tv/bittami')}>
        <Twitch size={32} className="text-bitta-purple mb-1" /><span className="text-[10px] font-black uppercase">Twitch</span>
      </Card>
      <Card className="md:col-span-3 flex flex-col items-center justify-center" onClick={() => window.open('https://instagram.com/bittami.vt')}>
        <Instagram size={32} className="text-bitta-pink mb-1" /><span className="text-[10px] font-black uppercase">Instagram</span>
      </Card>
      <Card className="md:col-span-6 flex items-center justify-between" title="Business" onClick={() => window.location.href='mailto:bittami.mp@gmail.com'}>
        <Mail size={18} className="text-zinc-500" /><span className="text-xs font-bold lowercase">bittami.mp@gmail.com</span>
        <ExternalLink size={14} className="opacity-20" />
      </Card>
    </div>
  );
}