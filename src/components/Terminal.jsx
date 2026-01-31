import React, { useState, useEffect } from 'react';

export default function Terminal() {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEzquizo, setIsEzquizo] = useState(false);
  const [hugHearts, setHugHearts] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showModal || e.target.tagName === 'INPUT') return;
      if (e.key === 'Enter') {
        const cmd = input.toLowerCase().trim();
        if (cmd === 'ezquizo') {
          if (!isEzquizo) setShowModal(true);
          else toggleEzquizo();
        } else { processCommand(cmd); }
        setInput("");
      } else if (e.key.length === 1) setInput(prev => prev + e.key);
      else if (e.key === 'Backspace') setInput(prev => prev.slice(0, -1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, isEzquizo, showModal]);

  const toggleEzquizo = () => {
    const newState = !isEzquizo;
    setIsEzquizo(newState);
    document.body.classList.toggle('ezquizo-active');
    setFeedback(newState ? "SISTEMA CORRUPTO" : "MODO CHILL");
  };

  const processCommand = (cmd) => {
    if (cmd === 'mimir') document.body.classList.toggle('mimir-mode');
    if (cmd === 'bunny') triggerBunnies(); // Lógica previa de conejos
    if (cmd === 'hug') {
      const hearts = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        left: 40 + Math.random() * 20,
        top: 40 + Math.random() * 20,
        delay: Math.random() * 0.5
      }));
      setHugHearts(hearts);
      setTimeout(() => setHugHearts([]), 2000);
      setFeedback("¡ABRAZO ENVIADO! 💖");
    }
    if (cmd === 'clear') {
      setIsEzquizo(false);
      document.body.classList.remove('ezquizo-active', 'mimir-mode');
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#1a1625] border-2 border-red-500 p-8 rounded-[3rem] max-w-md w-full text-center">
            <h2 className="text-red-500 font-black text-3xl mb-4 uppercase italic">⚠️ Advertencia</h2>
            <p className="text-slate-300 text-sm mb-8">El MODO EZQUIZO contiene parpadeos y movimientos bruscos. ¿Deseas activarlo?</p>
            <div className="flex gap-4">
              <button onClick={() => { toggleEzquizo(); setShowModal(false); }} className="flex-1 bg-red-600 text-white font-bold py-4 rounded-2xl text-[10px] uppercase">Si, activar</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-white/10 text-white font-bold py-4 rounded-2xl text-[10px] uppercase">No, cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-6 right-6 z-[999] font-mono text-right pointer-events-none">
        {input && <div className="bg-black/95 text-bitta-pink px-4 py-2 rounded-2xl border border-bitta-pink/30 text-xs">{'>'} {input}_</div>}
        {feedback && <div className="mt-2 bg-bitta-purple text-white px-4 py-1 rounded-full text-[9px] font-black uppercase inline-block">{feedback}</div>}
      </div>

      {hugHearts.map(h => (
        <span key={h.id} className="fixed text-6xl animate-heart-burst z-[1001]" style={{ left: `${h.left}%`, top: `${h.top}%`, animationDelay: `${h.delay}s` }}>💖</span>
      ))}
    </>
  );
}