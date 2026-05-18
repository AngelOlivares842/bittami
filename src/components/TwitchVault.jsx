import React, { useState, useEffect, useRef } from 'react';
import { Film, PlaySquare, ExternalLink, ArrowRight, ArrowLeft, PlayCircle, X } from 'lucide-react';

export default function TwitchVault({ isHacked, isEzquizo }) {
  const [activeTab, setActiveTab] = useState('clips'); 
  const [data, setData] = useState({ clips: [], streams: [], loading: true });
  const [modalItem, setModalItem] = useState(null); // Nuevo: Controla la ventana emergente
  
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchVaultData = async () => {
      try {
        const res = await fetch('/api/vault.json');
        const json = await res.json();
        if (!json.error) {
          setData({ clips: json.clips, streams: json.streams, loading: false });
        }
      } catch (e) {
        console.error("Error cargando el Vault");
      }
    };
    fetchVaultData();
  }, []);

  // Cerrar el modal al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formatThumbnail = (url) => {
    if (!url || url === '') return '/images/bitta-avatar.png';
    return url.replace('%{width}', '640').replace('%{height}', '360').replace('-{width}x{height}', '-640x360');
  };

  // Lógica del iframe: Forzamos autoplay y quitamos el mute
  const getIframeSrc = (item) => {
    const parents = "&parent=bittami.mekode.cl&parent=localhost&parent=127.0.0.1";
    if (activeTab === 'clips') {
      return `https://clips.twitch.tv/embed?clip=${item.id}&autoplay=true&muted=false${parents}`;
    } else {
      return `https://player.twitch.tv/?video=${item.id}&autoplay=true&muted=false${parents}`;
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const currentItems = activeTab === 'clips' ? data.clips : data.streams;

  if (isHacked) return null;

  return (
    <>
      <div className={`glass-card p-6 md:p-8 relative transition-all duration-300 border-white/5 md:col-span-12 md:row-span-2 flex flex-col justify-between ${isEzquizo ? 'violent-shake blur-[1px]' : ''}`}>
        
        {/* Header y Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b border-white/10 pb-4">
          <h3 className="text-xl font-black italic uppercase tracking-widest text-white flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-bitta-pink animate-pulse" />
            EZQUIZO <span className="text-bitta-pink"> DESTACADO </span>
          </h3>
          
          <div className="flex bg-black/50 p-1 rounded-lg border border-white/5">
            <button 
              onClick={() => { setActiveTab('clips'); setModalItem(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all uppercase tracking-wider ${activeTab === 'clips' ? 'bg-bitta-purple text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              <Film size={14} /> Mejores Clips
            </button>
            <button 
              onClick={() => { setActiveTab('streams'); setModalItem(null); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold transition-all uppercase tracking-wider ${activeTab === 'streams' ? 'bg-bitta-pink text-white' : 'text-white/40 hover:text-white/80'}`}
            >
              <PlaySquare size={14} /> Últimos Streams
            </button>
          </div>
        </div>

        {/* Contenedor del Carrusel Estético */}
        <div className="relative w-full group/slider">
          
          {/* Sombra y Botón Izquierdo (Diseño Premium) */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0f0c29] to-transparent z-20 pointer-events-none flex items-center opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => scroll('left')}
              className="pointer-events-auto ml-2 bg-black/60 p-3 rounded-full border border-white/10 text-white/70 hover:text-bitta-pink hover:bg-black hover:scale-110 transition-all backdrop-blur-md"
            >
              <ArrowLeft size={20} />
            </button>
          </div>

          {/* Sombra y Botón Derecho (Diseño Premium) */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0f0c29] to-transparent z-20 pointer-events-none flex items-center justify-end opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => scroll('right')}
              className="pointer-events-auto mr-2 bg-black/60 p-3 rounded-full border border-white/10 text-white/70 hover:text-bitta-pink hover:bg-black hover:scale-110 transition-all backdrop-blur-md"
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Carrusel Sin Barra de Scroll Visible */}
          <div 
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto pb-2 snap-x snap-mandatory 
                       [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {data.loading ? (
              [1, 2, 3, 4].map(i => <div key={i} className="min-w-[280px] md:min-w-[320px] h-[158px] md:h-[180px] bg-white/5 animate-pulse rounded-xl flex-shrink-0" />)
            ) : (
              currentItems.map((item) => (
                <div 
                  key={item.id} 
                  className="min-w-[280px] md:min-w-[320px] h-[158px] md:h-[180px] snap-center flex-shrink-0 group relative rounded-xl overflow-hidden border border-white/10 hover:border-bitta-pink hover:shadow-[0_0_20px_rgba(255,105,180,0.3)] transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  onClick={() => setModalItem(item)} // Abrimos el modal al hacer clic
                >
                  <img 
                    src={formatThumbnail(item.thumbnail_url)} 
                    alt={item.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    onError={(e) => { e.target.src = '/images/bitta-avatar.png'; }}
                  />
                  
                  {/* Icono de Play interactivo */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                    <PlayCircle size={48} className="text-bitta-pink drop-shadow-[0_0_15px_rgba(255,105,180,0.8)] scale-90 group-hover:scale-100 transition-transform duration-300" />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-4">
                    <h4 className="text-white text-xs font-bold line-clamp-2 leading-tight group-hover:text-bitta-pink transition-colors drop-shadow-md">
                      {item.title}
                    </h4>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-[10px] font-mono font-bold text-white/70 bg-black/50 px-2 py-1 rounded border border-white/5">
                        {item.view_count || item.viewable || "0"} views
                      </span>
                      
                      {/* Botón directo a Twitch desde la miniatura */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Evita abrir el modal
                          window.open(item.url, '_blank');
                        }}
                        className="text-white/50 hover:text-bitta-pink transition-colors p-1 bg-black/30 rounded-md hover:bg-black/80"
                        title="Ver directo en Twitch"
                      >
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* --- VENTANA EMERGENTE (MODAL) --- */}
      {modalItem && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-200"
          onClick={() => setModalItem(null)} // Cierra al hacer clic fuera del video
        >
          {/* Contenedor del reproductor */}
          <div 
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(255,105,180,0.15)] ring-1 ring-bitta-pink/30"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre si haces clic en el video
          >
            {/* Barra superior de la ventana */}
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/80 to-transparent z-10 flex justify-between items-center px-4 pointer-events-none">
              <h2 className="text-white font-bold text-sm truncate pr-12 drop-shadow-md">{modalItem.title}</h2>
            </div>

            {/* Botón de cerrar X */}
            <button 
              onClick={() => setModalItem(null)}
              className="absolute top-3 right-3 z-20 bg-black/50 hover:bg-red-500 text-white p-2 rounded-full transition-all border border-white/10 hover:border-red-500"
            >
              <X size={16} />
            </button>

            {/* Reproductor de Twitch */}
            <iframe
              src={getIframeSrc(modalItem)}
              width="100%"
              height="100%"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-none"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}