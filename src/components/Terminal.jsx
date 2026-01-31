import React, { useState, useEffect } from 'react';

export default function Terminal() {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEzquizo, setIsEzquizo] = useState(false);
  const [hugHearts, setHugHearts] = useState([]);

  // Escucha de teclado global
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'Enter') {
        const cmd = input.toLowerCase().trim();
        if (cmd === 'ezquizo') {
          if (!isEzquizo) setShowModal(true);
          else toggleEzquizo();
        } else {
          processCommand(cmd);
        }
        setInput("");
      } else if (e.key.length === 1) {
        setInput(prev => prev + e.key);
      } else if (e.key === 'Backspace') {
        setInput(prev => prev.slice(0, -1));
      } else if (e.key === 'Escape') {
        setInput("");
        setShowModal(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, isEzquizo, showModal]);

  const toggleEzquizo = () => {
    const newState = !isEzquizo;
    setIsEzquizo(newState);
    document.body.classList.toggle('ezquizo-active');
    showStatus(newState ? "SISTEMA CORRUPTO ACTIVADO" : "SISTEMA RESTAURADO");
  };

  const processCommand = (cmd) => {
    switch (cmd) {
      case 'mimir':
        document.body.classList.toggle('mimir-mode');
        const isMimir = document.body.classList.contains('mimir-mode');
        showStatus(isMimir ? "MODO NOCTURNO ACTIVADO" : "MODO DIURNO");
        break;

      case 'bunny':
        // Lógica de inyección de conejos para el efecto visual
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const bunny = document.createElement('div');
            bunny.innerText = '🐰';
            bunny.className = 'bunny-rain';
            bunny.style.left = Math.random() * 100 + 'vw';
            bunny.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(bunny);
            setTimeout(() => bunny.remove(), 4000);
          }, i * 150);
        }
        showStatus("¡INVASIÓN DE CONEJOS! 🐰✨");
        break;

      case 'hug':
        const hearts = Array.from({ length: 15 }).map((_, i) => ({
          id: Date.now() + i,
          left: 40 + Math.random() * 20,
          top: 40 + Math.random() * 20,
          delay: Math.random() * 0.5
        }));
        setHugHearts(hearts);
        setTimeout(() => setHugHearts([]), 2000);
        showStatus("¡EXPLOSIÓN DE AMOR! 💖");
        break;

      case 'clear':
        setIsEzquizo(false);
        document.body.classList.remove('ezquizo-active', 'mimir-mode');
        setHugHearts([]);
        showStatus("SISTEMA REINICIADO");
        break;

      default:
        if (cmd !== "") showStatus("ERROR: COMANDO DESCONOCIDO");
    }
  };

  const showStatus = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 3000);
  };

  return (
    <>
      {/* Modal de Advertencia EZquizo */}
      {showModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#1a1625] border-2 border-red-500 p-8 rounded-[3rem] max-w-md w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.2)] animate-fade-in">
            <h2 className="text-red-500 font-black text-3xl mb-4 italic uppercase tracking-tighter italic">⚠️ Advertencia</h2>
            <p className="text-slate-300 text-sm mb-8 leading-relaxed">
              El MODO EZQUIZO contiene parpadeos y movimientos bruscos. ¿Deseas proceder?
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => { toggleEzquizo(); setShowModal(false); }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest active:scale-95"
              > Si, activar </button>
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest active:scale-95"
              > No, cancelar </button>
            </div>
          </div>
        </div>
      )}

      {/* Interfaz del Terminal */}
      <div className="fixed top-6 right-6 z-[999] font-mono text-right pointer-events-none">
        {input && (
          <div className="bg-black/95 text-bitta-pink px-4 py-2 rounded-2xl border border-bitta-pink/30 text-xs shadow-2xl backdrop-blur-xl animate-fade-in">
            <span className="opacity-40 text-white font-bold tracking-tighter italic">Console:</span> {input}
            <span className="animate-pulse ml-1">_</span>
          </div>
        )}
        {feedback && (
          <div className="mt-2 bg-bitta-purple text-white px-4 py-1 rounded-full text-[9px] font-black uppercase shadow-xl inline-block tracking-widest animate-fade-in">
            {feedback}
          </div>
        )}
      </div>

      {/* Efecto Hug (Corazones) */}
      {hugHearts.map(h => (
        <span 
          key={h.id} 
          className="fixed text-6xl animate-heart-burst z-[1001] pointer-events-none" 
          style={{ left: `${h.left}%`, top: `${h.top}%`, animationDelay: `${h.delay}s` }}
        >
          💖
        </span>
      ))}
    </>
  );
}