import React, { useState, useEffect } from 'react';
import { Twitch, Instagram, Mail, ExternalLink, ShieldCheck, Calendar } from 'lucide-react';
import { useGlitchText } from '../hooks/useGlitchText';

const Card = ({ children, className, title, onClick, isHacked, isEzquizo }) => {
  // Función para corromper el título al azar si es EZquizo
  const corruptTitle = (text) => {
    if (!isEzquizo) return text;
    const glitchWords = ["V0ID", "H3LP", "ERR0R", "NULL", "BYE", "EYES", "SISTEMA", "404"];
    return glitchWords[Math.floor(Math.random() * glitchWords.length)];
  };

  return (
    <div onClick={onClick} className={`glass-card p-6 md:p-8 group relative overflow-hidden transition-all duration-500 flex flex-col justify-between border-white/5 ${onClick ? 'cursor-pointer hover:border-bitta-pink/40 active:scale-[0.98]' : ''} ${className} ${isEzquizo ? 'violent-shake' : ''}`}>
      {title && <h3 className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black mb-4 flex items-center gap-2">
        <div className={`w-1 h-1 rounded-full animate-pulse ${isHacked || isEzquizo ? 'bg-red-600' : 'bg-bitta-pink'}`} /> 
        {corruptTitle(title)}
      </h3>}
      <div className={`relative z-10 w-full h-full flex flex-col justify-center ${isEzquizo ? 'blur-[1px]' : ''}`}>{children}</div>
    </div>
  );
};

export default function BentoGrid() {
  const [isEzquizo, setIsEzquizo] = useState(false);
  const [isYmirActive, setIsYmirActive] = useState(false);
  const [isHacked, setIsHacked] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsEzquizo(document.body.classList.contains('ezquizo-active'));
      setIsYmirActive(document.body.classList.contains('mimir-mode'));
      setIsHacked(document.body.classList.contains('hacked-mode'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    
    // Si es EZquizo, el reloj va a mil por hora
    const timer = setInterval(() => setTime(new Date()), isEzquizo ? 50 : 1000);
    return () => { observer.disconnect(); clearInterval(timer); };
  }, [isEzquizo]);

  const bittaTitle = useGlitchText("BITTAMI", isEzquizo);
  const getCountryTime = (tz) => time.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', timeZone: tz });

  // Función para corromper cualquier texto dentro del bento
  const corrupt = (text) => {
    if (!isEzquizo) return text;
    const words = ["NADA ES REAL", "010101", "ERROR_FATAL", "VOID", "HELP_ME", "MIRAME", "SISTEMA_CORRUPTO"];
    return words[Math.floor(Math.random() * words.length)];
  };

  return (
    <div onMouseMove={(e) => setMousePos({ x: (e.clientX - window.innerWidth / 2) / (isEzquizo ? 5 : 35), y: (e.clientY - window.innerHeight / 2) / (isEzquizo ? 5 : 35) })} 
         className={`grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5 max-w-7xl mx-auto p-4 md:p-6 auto-rows-[200px] transition-transform duration-75 ${isEzquizo ? 'scale-110' : ''}`}>
      
      {/* 1. BIO PRINCIPAL */}
      <Card className="md:col-span-8 md:row-span-2" isHacked={isHacked} isEzquizo={isEzquizo}>
        <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8">
            <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <ShieldCheck size={12} className={isEzquizo ? "animate-spin text-red-600" : (isHacked ? "text-red-600" : (isYmirActive ? "text-cyan-400" : "text-bitta-purple"))} />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                      {isEzquizo ? "SYSTEM_FAILURE_100%" : (isHacked ? "FATAL ERROR: OVERRIDE" : (isYmirActive ? "Ymir Protocol Active" : "Verified VTuber Entity"))}
                    </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none">
                    BIT<span className={isEzquizo ? "animate-pulse text-red-600" : (isHacked ? "text-red-700" : (isYmirActive ? "text-cyan-300" : "text-bitta-pink"))}>{bittaTitle.substring(3)}</span>
                </h1>
                <p className="text-slate-400 text-sm italic border-l-2 border-white/10 pl-4">
                    {corrupt(isHacked ? "> SYSTEM BREACH. ALL FILES COMPROMISED. DO NOT REBOOT." : (isYmirActive ? "> El código se vuelve susurro bajo el manto de Ymir." : `> Iniciando conexión en el núcleo.`))}
                </p>
            </div>
            <div className="relative w-48 md:w-72 aspect-square parallax-avatar" style={{ transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)` }}>
                <img src="/bitta-avatar.png" className={`w-full h-full object-contain relative z-10 transition-all ${isEzquizo ? 'invert sepia saturate-[20] hue-rotate-[270deg] animate-bounce' : (isHacked ? 'avatar-hacked scale-110' : '')}`} />
            </div>
        </div>
      </Card>

      {/* 2. OPERATIONS HUB */}
      <Card className="md:col-span-4 md:row-span-2" title="Operations Hub" isHacked={isHacked} isEzquizo={isEzquizo}>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="text-center mb-6 flex-shrink-0">
             <div className={`text-5xl font-black tracking-tighter ${isEzquizo ? 'text-red-600 blur-sm' : (isHacked ? 'text-red-600' : 'text-white')}`}>
                {isEzquizo ? "88:88" : time.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })}
             </div>
             <p className="text-[8px] font-black uppercase opacity-20 tracking-[0.3em] mt-1">{corrupt("Host Sync / GMT-3")}</p>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 ops-hub-scroll">
            <div className="grid grid-cols-1 gap-y-2 mb-6">
              {[
                { n: 'España', z: 'Europe/Madrid', f: '🇪🇸' },
                { n: 'México', z: 'America/Mexico_City', f: '🇲🇽' },
                { n: 'Perú', z: 'America/Lima', f: '🇵🇪' },
                { n: 'Argentina', z: 'America/Argentina/Buenos_Aires', f: '🇦🇷' }
              ].map(c => (
                <div key={c.n} className="flex items-center justify-between group/time py-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-2">
                      <span className={`text-xs transition-all ${isEzquizo ? 'grayscale-0 scale-150 animate-ping' : 'grayscale group-hover/time:grayscale-0'}`}>{c.f}</span>
                      <span className="text-[9px] font-bold text-slate-500 group-hover/time:text-white uppercase tracking-tighter">{isEzquizo ? corrupt() : (isHacked ? 'HACKED' : c.n)}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-black ${isEzquizo || isHacked ? 'text-red-700' : 'text-bitta-pink'}`}>{isEzquizo ? "XX:XX" : getCountryTime(c.z)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <h4 className="text-[8px] font-black uppercase opacity-20 flex items-center gap-2 mb-1"><Calendar size={10}/> {corrupt("Deployment")}</h4>
              {['Viernes', 'Sábado', 'Domingo'].map(d => (
                  <div key={d} className="flex justify-between items-center bg-white/[0.02] p-2 rounded-xl border border-white/5">
                      <span className="text-[9px] font-black uppercase italic opacity-50">{isEzquizo ? corrupt() : d}</span>
                      <span className={`text-[9px] font-bold tracking-widest ${isEzquizo || isHacked ? 'text-red-800' : 'text-bitta-pink'}`}>{isEzquizo ? "00:00" : "20:00H"}</span>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* 3. REDES Y BUSINESS */}
      <Card className="md:col-span-3 flex flex-row items-center justify-center gap-4" isHacked={isHacked} isEzquizo={isEzquizo} onClick={() => window.open('https://twitch.tv/bittami')}>
        <Twitch size={24} className={isEzquizo ? "animate-ping text-red-600" : (isHacked ? "text-red-900" : "text-bitta-purple")} />
        <span className="text-[11px] font-black uppercase tracking-widest">{isEzquizo ? "V01D" : (isHacked ? "DISCONNECT" : "Live")}</span>
      </Card>

      <Card className="md:col-span-3 flex flex-row items-center justify-center gap-4" isHacked={isHacked} isEzquizo={isEzquizo} onClick={() => window.open('https://instagram.com/bittami.vt')}>
        <Instagram size={24} className={isEzquizo ? "animate-ping text-red-600" : (isHacked ? "text-red-900" : "text-bitta-pink")} />
        <span className="text-[11px] font-black uppercase tracking-widest">{isEzquizo ? "G3T 0UT" : (isHacked ? "INTRUSION" : "Feed")}</span>
      </Card>

      <Card className="md:col-span-6 flex flex-row items-center justify-between group h-full" isHacked={isHacked} isEzquizo={isEzquizo} onClick={() => window.location.href='mailto:bittami.mp@gmail.com'}>
        <div className="flex items-center gap-4">
            <Mail size={16} className={isEzquizo ? "text-red-600" : (isHacked ? "text-red-900" : "text-bitta-pink")} />
            <span className="text-xs font-bold tracking-tight">{isEzquizo ? "ERROR_NULL_DATA" : (isHacked ? "bittami_hacked@local" : "bittami.mp@gmail.com")}</span>
        </div>
        <div className={`px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter ${isEzquizo || isHacked ? 'bg-red-950 text-red-600' : 'bg-bitta-pink/10 text-bitta-pink'}`}>
            {isEzquizo ? "HELP" : "Contact"}
        </div>
      </Card>
    </div>
  );
}