import React, { useState, useEffect } from 'react';
import { Twitch, Instagram, Mail, ShieldCheck, Calendar, Server, Code2, Cpu, MonitorSmartphone, Terminal as TerminalIcon, HeartHandshake, Coffee, Music, X } from 'lucide-react';
import { useGlitchText } from '../hooks/useGlitchText';
import TwitchVault from './TwitchVault';

/**
 * @project BITTAMI_HUB_CORE_V1
 * @uid 0x5a2f_99_AO_2026 
 * @license CC BY-NC-ND 4.0
 * @author Angel Olivares (Mekode SpA)
 */

const LiveStatus = ({ isEzquizo, isHacked }) => {
  const [isLive, setIsLive] = useState(false);
  useEffect(() => {
    const checkLive = async () => {
      try {
        const res = await fetch(`https://decapi.me/twitch/uptime/bittami`);
        const text = await res.text();
        const safeText = text.toLowerCase();
        setIsLive(!safeText.includes("offline") && !safeText.includes("not found"));
      } catch (e) {
        setIsLive(false);
      }
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

// --- Sub-componente MinecraftWidget ---
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

// --- Componente de la Tarjeta Base ---
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

// --- NUEVO: Barra Flotante Inferior (Dock) ---
const FloatingDock = ({ setActiveModal, isHacked }) => {
  if (isHacked) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[50] flex items-center gap-2 p-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
      <button 
        onClick={() => setActiveModal('music')} 
        className="group flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110" 
        title="Escuchar Música"
      >
        <Music size={20} className="text-white/60 group-hover:text-[#1DB954] transition-colors" />
      </button>
      <div className="w-px h-6 bg-white/10"></div>
      <button 
        onClick={() => setActiveModal('donations')} 
        className="group flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110" 
        title="Apoyar Stream"
      >
        <HeartHandshake size={20} className="text-white/60 group-hover:text-bitta-pink transition-colors" />
      </button>
    </div>
  );
};

// --- NUEVO: Sistema de Ventanas Emergentes (Modals) ---
const SystemModal = ({ activeModal, setActiveModal }) => {
  const [spotifyTab, setSpotifyTab] = useState('ezquizo');

  if (!activeModal) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
      onClick={() => setActiveModal(null)}
    >
      <div 
        className="bg-[#0f111a] border border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        {/* Encabezado del Modal */}
        <div className="flex justify-between items-center p-4 border-b border-white/5 bg-white/[0.02]">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/80 flex items-center gap-2">
            {activeModal === 'music' ? <><Music size={14} className="text-[#1DB954]"/> Terminal de Audio</> : <><HeartHandshake size={14} className="text-bitta-pink"/> Centro de Apoyo</>}
          </h3>
          <button onClick={() => setActiveModal(null)} className="text-white/40 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-white/5">
            <X size={18} />
          </button>
        </div>

        {/* Contenido: MÚSICA (CORREGIDO) */}
        {activeModal === 'music' && (
          <div className="p-4 md:p-6 flex flex-col flex-grow">
            {/* Botones de selección de playlist */}
            <div className="flex justify-center gap-2 mb-4 bg-black/40 p-1 rounded-xl w-max mx-auto border border-white/5">
              <button onClick={() => setSpotifyTab('ezquizo')} className={`text-[10px] font-black uppercase tracking-widest px-4 md:px-6 py-2 rounded-lg transition-colors ${spotifyTab === 'ezquizo' ? 'bg-[#1DB954] text-black shadow-[0_0_15px_rgba(29,185,84,0.3)]' : 'text-white/50 hover:text-white'}`}>EZquizo Playlist</button>
              <button onClick={() => setSpotifyTab('chill')} className={`text-[10px] font-black uppercase tracking-widest px-4 md:px-6 py-2 rounded-lg transition-colors ${spotifyTab === 'chill' ? 'bg-[#1DB954] text-black shadow-[0_0_15px_rgba(29,185,84,0.3)]' : 'text-white/50 hover:text-white'}`}>Chill Vibes</button>
            </div>
            
            {/* Contenedor del Iframe con MÁS altura y enlaces nativos */}
            {/* Se cambió h-[380px] a h-[420px] y se usan las urls de spotify directas */}
            <div className="w-full h-[420px] bg-[#121212] rounded-xl overflow-hidden shadow-inner border border-white/5">
              {spotifyTab === 'ezquizo' ? (
                <iframe 
                  className="w-full h-full" 
                  src="https://open.spotify.com/embed/playlist/1bcDIJ1qvk0OXvOVwOqXRy?si=cde0371e1a004725" // REEMPLAZA EL 1 POR EL ID DE LA PLAYLIST EZQUIZO
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy">
                </iframe>
              ) : (
                <iframe 
                  className="w-full h-full" 
                  src="https://open.spotify.com/embed/playlist/5o8wmKRDR01AD1rAE81LtG?si=66e5b9090a054c4c" // REEMPLAZA EL 2 POR EL ID DE LA PLAYLIST CHILL
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  allowFullScreen="" 
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy">
                </iframe>
              )}
            </div>
          </div>
        )}

        {/* Contenido: DONACIONES */}
        {activeModal === 'donations' && (
          <div className="p-8 md:p-12 text-center">
            <div className="w-16 h-16 bg-bitta-pink/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-bitta-pink/20 shadow-[0_0_30px_rgba(188,24,136,0.2)]">
               <HeartHandshake size={32} className="text-bitta-pink" />
            </div>
            <h4 className="text-xl font-black uppercase tracking-widest text-white mb-3">Mantén viva la EZquizo</h4>
            <p className="text-xs text-slate-400 italic mb-10 max-w-md mx-auto leading-relaxed">
              Todas las donaciones van directo a mejorar el stream, pagar los servidores y, sobre todo, alimentar a Bitta con zanahorias de primera calidad.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button onClick={() => window.open('https://www.flow.cl/app/web/pagarBtnPago.php?token=xa03e10864a4cfff640d11febdc7a5b38cf9ed5d', '_blank')} className="group px-6 py-4 bg-[#151723] hover:bg-[#1a2333] border border-white/5 hover:border-[#1E90FF]/50 rounded-xl transition-all flex items-center gap-4 shadow-lg w-full md:w-auto justify-center">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1E90FF]/20 group-hover:bg-[#1E90FF]/40 transition-colors"><span className="text-[#1E90FF] text-[10px] font-black">CL</span></div>
                <span className="text-xs font-black uppercase tracking-[0.1em] text-slate-300 group-hover:text-white">Flow (Chile)</span>
              </button>
              <button onClick={() => window.open('https://streamelements.com/bittami/tip', '_blank')} className="group px-6 py-4 bg-[#151723] hover:bg-[#2a1a24] border border-white/5 hover:border-bitta-pink/50 rounded-xl transition-all flex items-center gap-4 shadow-lg w-full md:w-auto justify-center">
                <Coffee size={24} className="text-slate-500 group-hover:text-bitta-pink transition-colors" />
                <span className="text-xs font-black uppercase tracking-[0.1em] text-slate-300 group-hover:text-white">StreamElements</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default function BentoGrid() {
  const [isEzquizo, setIsEzquizo] = useState(false);
  const [isYmirActive, setIsYmirActive] = useState(false);
  const [isHacked, setIsHacked] = useState(false);
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false); 
  const [activeModal, setActiveModal] = useState(null); // Estado para controlar las ventanas flotantes

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
    <>
      {/* GRILLA PRINCIPAL LIMPIA */}
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-5 max-w-7xl mx-auto p-4 md:p-6 auto-rows-[200px] transition-all pb-32 ${isEzquizo ? 'scale-110' : ''}`}>
        
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

        {/* 2. SECCIÓN MEDIA: Redes Consolidadas */}
        <Card className="md:col-span-12 h-auto py-4" isHacked={isHacked} isEzquizo={isEzquizo}>
          <div className="flex flex-wrap items-center justify-around gap-4 md:gap-8">
            
            <div onClick={() => window.open('https://twitch.tv/bittami')} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
              <Twitch size={20} className={isHacked || isEzquizo ? "text-red-900" : "text-bitta-purple"} />
              <LiveStatus isHacked={isHacked} isEzquizo={isEzquizo} />
            </div>
            
            <div className="w-px h-8 bg-white/10 hidden md:block"></div>

            <div onClick={() => window.open('https://instagram.com/bittami.vt')} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
              <Instagram size={20} className={isHacked || isEzquizo ? "text-red-900" : "text-bitta-pink"} />
              <span className="text-[10px] font-black uppercase">Instagram</span>
            </div>

            <div className="w-px h-8 bg-white/10 hidden md:block"></div>

            <div 
              onClick={() => {
                navigator.clipboard.writeText('BITTAMI');
                alert('¡Código BITTAMI copiado! Listo para usar en juegos. Abriendo tienda web con el código activado...');
                window.open('https://store.epicgames.com/?epic_creator_id=BITTAMI', '_blank');
              }} 
              className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group"
              title="Copiar código y activar en Epic Games"
            >
              <div 
                className={`w-5 h-5 flex-shrink-0 bg-current transition-colors ${isHacked || isEzquizo ? "text-red-900" : "text-bitta-pink"}`}
                style={{
                  WebkitMaskImage: 'url("https://cdn.simpleicons.org/epicgames")',
                  WebkitMaskSize: 'contain',
                  WebkitMaskPosition: 'center',
                  WebkitMaskRepeat: 'no-repeat',
                  maskImage: 'url("https://cdn.simpleicons.org/epicgames")',
                  maskSize: 'contain',
                  maskPosition: 'center',
                  maskRepeat: 'no-repeat',
                }}
              />
              <div className="flex flex-col">
                <span className="text-[8px] font-black uppercase opacity-50">Epic Games</span>
                <span className="text-xs font-bold tracking-tight group-hover:text-bitta-pink transition-colors">
                  {isHacked || isEzquizo ? "ERR0R" : "Code: BITTAMI"}
                </span>
              </div>
            </div>

            <div className="w-px h-8 bg-white/10 hidden md:block"></div>

            <div onClick={() => window.location.href='mailto:bittami.mp@gmail.com'} className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
              <Mail size={20} className={isHacked || isEzquizo ? "text-red-900" : "text-bitta-pink"} />
              <span className="text-xs font-bold tracking-tight">{isHacked || isEzquizo ? "ERR0R" : "bittami.mp@gmail.com"}</span>
            </div>

          </div>
        </Card>

        {/* 3. SECCIÓN INFERIOR: Twitch Vault */}
        <TwitchVault isHacked={isHacked} isEzquizo={isEzquizo} />

        {/* TRAMPA: Ventana de Error */}
        {isHacked && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[5000] w-80 bg-[#c0c0c0] border-t-2 border-l-2 border-white border-b-2 border-r-2 border-black p-1 shadow-[4px_4px_0px_#404040] font-sans pointer-events-auto">
            {/* ... Código de trampa ... */}
          </div>
        )}
      </div>

      {/* COMPONENTES FLOTANTES */}
      <FloatingDock setActiveModal={setActiveModal} isHacked={isHacked} />
      <SystemModal activeModal={activeModal} setActiveModal={setActiveModal} />
    </>
  );
}