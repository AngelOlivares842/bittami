import React, { useState, useEffect } from 'react';
import { Twitch, Instagram, Mail, ShieldCheck, Calendar } from 'lucide-react';
import { useGlitchText } from '../hooks/useGlitchText';

/**
 * @project BITTAMI_HUB_CORE_V1
 * @uid 0x5a2f_99_AO_2026 // Firma única basada en tus iniciales y año
 * @license CC BY-NC-ND 4.0
 * @author Angel Olivares
 * @warning Any unauthorized distribution or modification is a breach of copyright.
 */

const Card = ({ children, className, title, onClick, isHacked, isEzquizo }) => {
  const corrupt = (text) => {
    if (!isEzquizo) return text;
    const chars = "X01X/$%#@";
    return text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  return (
    <div onClick={onClick} className={`glass-card p-6 md:p-8 group relative overflow-hidden transition-all duration-300 flex flex-col justify-between border-white/5 ${isEzquizo ? 'violent-shake' : ''} ${className}`}>
      {title && <h3 className="text-[9px] uppercase tracking-[0.4em] text-white/20 font-black mb-4 flex items-center gap-2">
        <div className={`w-1 h-1 rounded-full ${isEzquizo ? 'bg-red-600 animate-ping' : 'bg-bitta-pink'}`} /> 
        {corrupt(title)}
      </h3>}
      <div className={`relative z-10 w-full h-full flex flex-col justify-center ${isEzquizo ? 'blur-[1px]' : ''}`}>{children}</div>
    </div>
  );
};

export default function BentoGrid() {
  const [isEzquizo, setIsEzquizo] = useState(false);
  const [isYmirActive, setIsYmirActive] = useState(false);
  const [isHacked, setIsHacked] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsEzquizo(document.body.classList.contains('ezquizo-active'));
      setIsYmirActive(document.body.classList.contains('mimir-mode'));
      setIsHacked(document.body.classList.contains('hacked-mode'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    const timer = setInterval(() => setTime(new Date()), isEzquizo ? 50 : 1000);
    return () => { observer.disconnect(); clearInterval(timer); };
  }, [isEzquizo]);

  const bittaTitle = useGlitchText("BITTAMI", isEzquizo);
  const getCountryTime = (tz) => time.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', timeZone: tz });

  const getBioText = () => {
    if (isHacked) return "> CRITICAL_FAILURE: DATA_STREAM_INTERRUPTED. [ILLEGAL_ACCESS]";
    if (isEzquizo) return "✧ ¡B13nv3n1dXs 4 m1 EZqu1z0! ✧ | V01D | 0101010101 | S1ST3M_ERR0R";
    if (isYmirActive) return "✧ El susurro de Ymir envuelve el EZquizo. Silencio absoluto. ✧";
    return "✧ ¡BienvenidXs a mi EZquizo! ✧ | Mi nombre es Bitta 🐰💗 | Stream viernes, sábados y domingos | Espacio chill, con dislexia, algo random y lleno de pura EZquizo";
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-5 max-w-7xl mx-auto p-6 auto-rows-[200px] transition-all ${isEzquizo ? 'scale-110' : ''}`}>
      <Card className="md:col-span-8 md:row-span-2" isHacked={isHacked} isEzquizo={isEzquizo}>
        <div className="flex flex-col md:flex-row items-center justify-between h-full gap-8 text-center md:text-left">
            <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <ShieldCheck size={12} className={isHacked || isEzquizo ? "text-red-600 animate-pulse" : (isYmirActive ? "text-cyan-400" : "text-bitta-purple")} />
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60">
                      {isHacked ? "FATAL ERROR" : (isEzquizo ? "EZQUIZO_LVL_MAX" : "Verified Entity")}
                    </span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter">
                    BIT<span className={isHacked || isEzquizo ? "text-red-600" : (isYmirActive ? "text-cyan-300" : "text-bitta-pink")}>{bittaTitle.substring(3)}</span>
                </h1>
                <p className={`text-slate-400 text-xs md:text-sm italic border-l-2 pl-4 transition-all duration-500 ${isHacked || isEzquizo ? 'border-red-900 text-red-500/50' : 'border-bitta-pink/20'}`}>
                    {getBioText()}
                </p>
            </div>
            <div className="relative w-48 md:w-64 aspect-square">
                <img src="/bitta-avatar.png" className={`w-full h-full object-contain transition-all duration-75 ${isHacked ? 'avatar-hacked scale-110' : (isEzquizo ? 'ezquizo-avatar-effect' : '')}`} />
            </div>
        </div>
      </Card>

      <Card className="md:col-span-4 md:row-span-2" title="Operations Hub" isHacked={isHacked} isEzquizo={isEzquizo}>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="text-center mb-6 flex-shrink-0">
             <div className={`text-5xl font-black tracking-tighter ${isHacked || isEzquizo ? 'text-red-600 blur-[1px]' : 'text-white'}`}>
                {isEzquizo ? "88:88" : time.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })}
             </div>
             <p className="text-[8px] font-black uppercase opacity-20 tracking-[0.3em] mt-1">Host Sync / GMT-3</p>
          </div>
          <div className="flex-1 overflow-y-auto pr-2 ops-hub-scroll">
            <div className="grid grid-cols-1 gap-y-2 mb-6">
              {[{ n: 'España', z: 'Europe/Madrid', f: '🇪🇸' }, { n: 'México', z: 'America/Mexico_City', f: '🇲🇽' }, { n: 'Perú', z: 'America/Lima', f: '🇵🇪' }, { n: 'Argentina', z: 'America/Argentina/Buenos_Aires', f: '🇦🇷' }].map(c => (
                <div key={c.n} className="flex items-center justify-between group/time py-2 border-b border-white/[0.03]">
                  <div className="flex items-center gap-2">
                      <span className="text-xs grayscale group-hover/time:grayscale-0 transition-all">{c.f}</span>
                      <span className="text-[9px] font-bold text-slate-500 group-hover/time:text-white uppercase tracking-tighter">{isHacked ? 'HACKED' : c.n}</span>
                  </div>
                  <span className={`text-[10px] font-mono font-black ${isHacked || isEzquizo ? 'text-red-700' : 'text-bitta-pink'}`}>{isEzquizo ? "XX:XX" : getCountryTime(c.z)}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-white/10 space-y-2">
              <h4 className="text-[8px] font-black uppercase opacity-20 flex items-center gap-2 mb-1"><Calendar size={10}/> Deployment</h4>
              {['Viernes', 'Sábado', 'Domingo'].map(d => (
                  <div key={d} className="flex justify-between items-center bg-white/[0.02] p-2 rounded-xl border border-white/5">
                      <span className="text-[9px] font-black uppercase italic opacity-50">{d}</span>
                      <span className={`text-[9px] font-bold tracking-widest ${isHacked || isEzquizo ? 'text-red-800' : 'text-bitta-pink'}`}>20:00H</span>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="md:col-span-3 flex items-center justify-center gap-4" isHacked={isHacked} isEzquizo={isEzquizo} onClick={() => window.open('https://twitch.tv/bittami')}>
        <Twitch size={24} className={isHacked || isEzquizo ? "text-red-900" : "text-bitta-purple"} />
        <span className="text-[11px] font-black uppercase">{isEzquizo ? "V01D" : "Live"}</span>
      </Card>

      <Card className="md:col-span-3 flex items-center justify-center gap-4" isHacked={isHacked} isEzquizo={isEzquizo} onClick={() => window.open('https://instagram.com/bittami.vt')}>
        <Instagram size={24} className={isHacked || isEzquizo ? "text-red-900" : "text-bitta-pink"} />
        <span className="text-[11px] font-black uppercase">Feed</span>
      </Card>

      <Card className="md:col-span-6 flex items-center justify-between group h-full" isHacked={isHacked} isEzquizo={isEzquizo} onClick={() => window.location.href='mailto:bittami.mp@gmail.com'}>
        <div className="flex items-center gap-4">
            <Mail size={16} className={isHacked || isEzquizo ? "text-red-900" : "text-bitta-pink"} />
            <span className="text-xs font-bold tracking-tight">{isHacked || isEzquizo ? "ERR0R_DATA_NULL" : "bittami.mp@gmail.com"}</span>
        </div>
      </Card>

      {/* TRAMPA: Ventana de Error */}
      {isHacked && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5000] w-80 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-1 shadow-[4px_4px_0px_#404040] font-sans pointer-events-auto">
          <div className="bg-[#000080] text-white px-2 py-1 flex justify-between items-center text-xs font-bold">
            <span>System Error</span>
            <button onClick={() => window.dispatchEvent(new Event('trigger-panic'))} className="bg-[#c0c0c0] text-black px-1 border border-black text-[10px]">X</button>
          </div>
          <div className="p-4 flex gap-4 items-center">
            <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-xl">X</div>
            <p className="text-black text-xs font-bold">Unrecoverable error. leak in progress...</p>
          </div>
          <div className="flex justify-center p-2">
            <button onClick={() => window.dispatchEvent(new Event('trigger-panic'))} className="bg-[#c0c0c0] text-black px-6 py-1 border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black active:border-none text-xs">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}