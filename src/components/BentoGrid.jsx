import React, { useState, useEffect } from 'react';
import { Twitch, Instagram, Mail, ShieldCheck, Calendar, Server, Code2, Cpu, MonitorSmartphone, Terminal as TerminalIcon } from 'lucide-react';
import { useGlitchText } from '../hooks/useGlitchText';
import TwitchVault from './TwitchVault';

/**
 * @project BITTAMI_HUB_CORE_V1
 * @uid 0x5a2f_99_AO_2026 
 * @license CC BY-NC-ND 4.0
 * @author Angel Olivares (Mekode SpA)
 */

// --- Sub-componente LiveStatus (Intacto) ---
const LiveStatus = ({ isEzquizo, isHacked }) => {
  const [isLive, setIsLive] = useState(false);
  useEffect(() => {
    const checkLive = async () => {
      try {
        const res = await fetch(`https://decapi.me/twitch/uptime/bittami`);
        const text = await res.text();
        setIsLive(!text.includes("Offline") && !text.includes("Channel not found"));
      } catch (e) {}
    };
    checkLive();
    const interval = setInterval(checkLive, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isHacked || isEzquizo) return <span className="text-[11px] font-black uppercase">{isEzquizo ? "V01D" : "ERR0R"}</span>;
  return (
    <div className="flex items-center gap-2">
      {isLive && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bitta-pink opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-bitta-pink"></span>
        </span>
      )}
      <span className="text-[11px] font-black uppercase">{isLive ? "EN VIVO" : "Offline"}</span>
    </div>
  );
};

// --- Sub-componente MinecraftWidget (Intacto) ---
const MinecraftWidget = ({ isHacked, isEzquizo }) => {
  const [server, setServer] = useState({ online: false, players: 0, max: 0, loading: true });
  const ip = "bitta-tarreo.playit.gg"; 
  useEffect(() => {
    const fetchMc = async () => {
      try {
        const res = await fetch(`https://api.mcsrvstat.us/3/${ip}`);
        const data = await res.json();
        setServer({ online: !!data.online, players: data.players?.online || 0, max: data.players?.max || 0, loading: false });
      } catch (e) {
        setServer({ online: false, players: 0, max: 0, loading: false });
      }
    };
    fetchMc();
    const interval = setInterval(fetchMc, 120000);
    return () => clearInterval(interval);
  }, [ip]);

  if (isHacked || isEzquizo) {
    return (
      <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded-xl border border-white/5">
        <span className="text-[9px] font-black uppercase italic opacity-50 text-red-500">PaperMC_Core</span>
        <span className="text-[9px] font-bold tracking-widest text-red-800">C0Rrupt</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded-xl border border-white/5">
      <div className="flex flex-col">
          <span className="text-[9px] font-black uppercase italic opacity-80 text-green-400">PaperMC Server</span>
          {server.online && <span className="text-[7px] text-white/40 font-mono tracking-widest">{ip}</span>}
      </div>
      <span className={`text-[9px] font-bold tracking-widest ${server.loading ? 'text-white/30' : (server.online ? 'text-white' : 'text-red-500')}`}>
        {server.loading ? 'PING...' : (server.online ? `${server.players}/${server.max} LOBBY` : 'OFFLINE')}
      </span>
    </div>
  );
};

// --- Componente de la Tarjeta Base (Intacto) ---
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
  const [mounted, setMounted] = useState(false); 

  useEffect(() => {
    setMounted(true); 
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
  
  const getCountryTime = (tz) => {
    if (!mounted) return "--:--"; 
    return time.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', timeZone: tz });
  };

  const getBioText = () => {
    if (isHacked) return "> CRITICAL_FAILURE: DATA_STREAM_INTERRUPTED. [ILLEGAL_ACCESS]";
    if (isEzquizo) return "✧ ¡B13nv3n1dXs 4 m1 EZqu1z0! ✧ | V01D | 0101010101 | S1ST3M_ERR0R";
    if (isYmirActive) return "✧ El susurro de Ymir envuelve el EZquizo. Silencio absoluto. ✧";
    return "✧ ¡BienvenidXs a mi EZquizo! ✧ | Mi nombre es Bitta 🐰💗 | Stream viernes, sábados y domingos | Espacio chill, con dislexia, algo random y lleno de pura EZquizo";
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-5 max-w-7xl mx-auto p-4 md:p-6 auto-rows-[200px] transition-all ${isEzquizo ? 'scale-110' : ''}`}>
      
      {/* 1. SECCIÓN SUPERIOR: Perfil y Operations Hub */}
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
                    BIT<span className={isHacked || isEzquizo ? "text-red-600" : (isYmirActive ? "text-cyan-300" : "text-bitta-pink")}>
                      {mounted ? bittaTitle.substring(3) : "TAMI"}
                    </span>
                </h1>
                <p className={`text-slate-400 text-xs md:text-sm italic border-l-2 pl-4 transition-all duration-500 ${isHacked || isEzquizo ? 'border-red-900 text-red-500/50' : 'border-bitta-pink/20'}`}>
                    {getBioText()}
                </p>
            </div>
            <div className="relative w-48 md:w-64 aspect-square">
                <img src="/images/bitta-avatar.png" className={`w-full h-full object-contain transition-all duration-75 ${isHacked ? 'avatar-hacked scale-110' : (isEzquizo ? 'ezquizo-avatar-effect' : '')}`} />
            </div>
        </div>
      </Card>

      <Card className="md:col-span-4 md:row-span-2" title="Operations Hub" isHacked={isHacked} isEzquizo={isEzquizo}>
        <div className="flex flex-col h-full overflow-hidden">
          <div className="text-center mb-6 flex-shrink-0">
             <div className={`text-5xl font-black tracking-tighter ${isHacked || isEzquizo ? 'text-red-600 blur-[1px]' : 'text-white'}`}>
                {!mounted ? "--:--" : (isEzquizo ? "88:88" : time.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' }))}
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
                      <span className={`text-[9px] font-bold tracking-widest ${isHacked || isEzquizo ? 'text-red-800' : 'text-bitta-pink'}`}>19:00H</span>
                  </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 mt-4">
              <h4 className="text-[8px] font-black uppercase opacity-20 flex items-center gap-2 mb-1"><Server size={10}/> Infraestructura</h4>
              <MinecraftWidget isHacked={isHacked} isEzquizo={isEzquizo} />
            </div>
          </div>
        </div>
      </Card>

      {/* 2. NUEVA SECCIÓN MEDIA: Redes Consolidadas + Proyectos */}
      
      {/* 2.1 Tarjeta Unificada de Contacto y Redes (Col-span-12 para ocupar todo el ancho) */}
      <Card className="md:col-span-12 h-auto py-4" isHacked={isHacked} isEzquizo={isEzquizo}>
        <div className="flex flex-wrap items-center justify-around gap-4 md:gap-8">
          <div onClick={() => window.open('https://twitch.tv/bittami')} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
            <Twitch size={20} className={isHacked || isEzquizo ? "text-red-900" : "text-bitta-purple"} />
            <LiveStatus isHacked={isHacked} isEzquizo={isEzquizo} />
          </div>
          
          <div className="w-px h-8 bg-white/10 hidden md:block"></div> {/* Separador visual */}

          <div onClick={() => window.open('https://instagram.com/bittami.vt')} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
            <Instagram size={20} className={isHacked || isEzquizo ? "text-red-900" : "text-bitta-pink"} />
            <span className="text-[10px] font-black uppercase">Instagram</span>
          </div>

          <div className="w-px h-8 bg-white/10 hidden md:block"></div>

          <div onClick={() => window.location.href='mailto:bittami.mp@gmail.com'} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
            <Mail size={20} className={isHacked || isEzquizo ? "text-red-900" : "text-bitta-pink"} />
            <span className="text-xs font-bold tracking-tight">{isHacked || isEzquizo ? "ERR0R" : "bittami.mp@gmail.com"}</span>
          </div>
        </div>
      </Card>

      {/* 3. SECCIÓN MÚSICA: Playlists de Spotify (Grandes, tal cual pediste) */}
      <Card className="md:col-span-6 md:row-span-2 !p-4" title="EZQUIZO PLAYLIST" isHacked={isHacked} isEzquizo={isEzquizo}>
        <iframe 
          data-testid="embed-iframe" 
          className="rounded-xl border border-white/5 w-full h-full min-h-[352px] bg-black/50" 
          src="https://open.spotify.com/embed/playlist/5o8wmKRDR01AD1rAE81LtG?utm_source=generator"
          frameBorder="0" 
          allowFullScreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
      </Card>
      
      <Card className="md:col-span-6 md:row-span-2 !p-4" title="CHILL VIBES" isHacked={isHacked} isEzquizo={isEzquizo}>
        <iframe 
          data-testid="embed-iframe" 
          className="rounded-xl border border-white/5 w-full h-full min-h-[352px] bg-black/50" 
          src="https://open.spotify.com/embed/playlist/1bcDIJ1qvk0OXvOVwOqXRy?utm_source=generator"
          frameBorder="0" 
          allowFullScreen="" 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        ></iframe>
      </Card>

      {/* 4. SECCIÓN INFERIOR: Twitch Vault */}
      <TwitchVault isHacked={isHacked} isEzquizo={isEzquizo} />

      {/* TRAMPA: Ventana de Error */}
      {isHacked && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5000] w-80 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-1 shadow-[4px_4px_0px_#404040] font-sans pointer-events-auto">
          {/* ... Tu código de trampa intacto ... */}
        </div>
      )}
    </div>
  );
}