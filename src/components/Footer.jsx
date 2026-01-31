import React, { useState, useEffect } from 'react';

export default function Footer() {
  const [isEzquizo, setIsEzquizo] = useState(false);
  const [isHacked, setIsHacked] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsEzquizo(document.body.classList.contains('ezquizo-active'));
      setIsHacked(document.body.classList.contains('hacked-mode'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <footer className={`w-full py-10 px-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${isHacked ? 'bg-red-950/20' : 'bg-transparent'}`}>
      
      {/* Lado Izquierdo: Creative Commons Info */}
      <div className="flex flex-col gap-2 items-center md:items-start opacity-40 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-1">
          <a href="https://bittami.kalwrd.me/" className="hover:text-bitta-pink transition-colors">BittamiHub</a>
          <span>© 2026</span>
        </div>
        
        <div className="flex items-center gap-2">
          <a 
            href="https://creativecommons.org/licenses/by-nc-nd/4.0/" 
            target="_blank" 
            rel="license noopener noreferrer"
            className="hover:underline"
          >
            {isEzquizo ? "C0RRUPT_L1CENS3" : "CC BY-NC-ND 4.0"}
          </a>
          <div className="flex gap-1 items-center bg-white/10 p-1 rounded">
            <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" className="w-3 h-3 invert" alt="CC" />
            <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" className="w-3 h-3 invert" alt="BY" />
            <img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" className="w-3 h-3 invert" alt="NC" />
            <img src="https://mirrors.creativecommons.org/presskit/icons/nd.svg" className="w-3 h-3 invert" alt="ND" />
          </div>
        </div>
      </div>

      {/* Lado Derecho: Créditos de Autor */}
      <div className="text-center md:text-right flex flex-col items-center md:items-end gap-1">
        <p className="opacity-40">Property of:</p>
        <a 
          href="https://github.com/AngelOlivares842" 
          target="_blank"
          className={`text-sm tracking-tighter italic ${isEzquizo ? 'animate-pulse text-red-600' : 'text-bitta-pink hover:text-white transition-colors'}`}
        >
          {isEzquizo ? "ERR_0L1V4R3S" : "BITTAMI"}
        </a>
        <div className="flex gap-2 items-center opacity-30">
            <div className={`w-1.5 h-1.5 rounded-full ${isHacked ? 'bg-red-600' : 'bg-green-500'} animate-pulse`} />
            <span className="text-[7px] font-mono lowercase">
                {isHacked ? "core_breached" : "auth_verified"}
            </span>
        </div>
      </div>
    </footer>
  );
}