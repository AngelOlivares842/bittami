import React, { useState, useEffect } from 'react';

export default function Terminal() {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [panic, setPanic] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hugHearts, setHugHearts] = useState([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (panic || showModal) return;
      if (e.key === 'Enter') {
        const cmd = input.toLowerCase().trim();
        if (cmd === 'ezquizo') {
          // Si no está activo, pedimos confirmación
          if (!document.body.classList.contains('ezquizo-active')) {
            setShowModal(true);
          } else {
            document.body.classList.remove('ezquizo-active');
            setFeedback("MODO EZQUIZO DESACTIVADO");
          }
        } else {
          processCommand(cmd);
        }
        setInput("");
      } else if (e.key.length === 1) setInput(prev => prev + e.key);
      else if (e.key === 'Backspace') setInput(prev => prev.slice(0, -1));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, panic, showModal]);

  const processCommand = (cmd) => {
    switch (cmd) {
      case 'hacked':
        document.body.classList.add('hacked-mode');
        const sequences = [
          "ESTABLISHING SSH CONNECTION...",
          "ENCRYPTING LOCAL FILES...",
          "UPLOADING /CHROME/USER_DATA...",
          "SENDING PACKETS TO 185.12.44.10...",
          "SYSTEM OVERRIDE IN PROGRESS..."
        ];
        sequences.forEach((msg, i) => setTimeout(() => setFeedback(msg), i * 1200));
        setTimeout(() => setPanic(true), sequences.length * 1200 + 1000);
        break;

      case 'ymir':
        document.body.classList.toggle('mimir-mode');
        setFeedback(document.body.classList.contains('mimir-mode') ? "MODO YMIR ACTIVADO" : "MODO DIURNO");
        break;

      case 'bunny':
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const b = document.createElement('div');
            b.innerText = '🐰'; b.className = 'bunny-rain';
            b.style.left = Math.random() * 100 + 'vw';
            document.body.appendChild(b);
            setTimeout(() => b.remove(), 4000);
          }, i * 150);
        }
        setFeedback("INVASIÓN DE CONEJOS 🐰");
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
        setFeedback("EXPLOSIÓN DE AMOR 💖");
        break;

      case 'help':
        setFeedback("EZQUIZO, YMIR, HACKED, BUNNY, HUG, CLEAR");
        break;

      case 'clear':
        document.body.className = "";
        setFeedback("SISTEMA REINICIADO");
        break;

      default:
        if (cmd !== "") setFeedback("ESCRIBE 'HELP' PARA COMANDOS");
    }
    setTimeout(() => setFeedback(""), 4000);
  };

  const activateEzquizo = () => {
    document.body.classList.add('ezquizo-active');
    setFeedback("MODO EZQUIZO ACTIVADO");
    setShowModal(false);
  };

  if (panic) {
    return (
      <div className="kernel-panic-screen">
        <p>[    0.000000] Kernel panic - not syncing: VFS: Unable to mount root fs</p>
        <p>[    0.000000] CPU: 0 PID: 1 Comm: swapper/0 Not tainted 5.15.0-generic</p>
        <p>[    0.000122] Call Trace:</p>
        <p>[    0.000125]  show_stack+0x52/0x58</p>
        <p>[    0.000132]  panic+0x149/0x321</p>
        <p>[    0.034512] ---[ end Kernel panic - not syncing: VFS: Unable to mount root fs ]---</p>
        <p className="mt-8 animate-pulse text-red-600">FATAL ERROR: Reboot required.</p>
      </div>
    );
  }

  return (
    <>
      {/* Modal de Advertencia para EZQUIZO */}
      {showModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="bg-[#1a1625] border-2 border-red-500 p-8 rounded-[3rem] max-w-md w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.2)] animate-fade-in">
            <h2 className="text-red-500 font-black text-3xl mb-4 italic uppercase tracking-tighter">⚠️ Advertencia</h2>
            <p className="text-slate-300 text-sm mb-8 leading-relaxed">
              El MODO EZQUIZO contiene parpadeos y movimientos bruscos. ¿Deseas proceder?
            </p>
            <div className="flex gap-4">
              <button onClick={activateEzquizo} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest active:scale-95"> Si, activar </button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest active:scale-95"> No, cancelar </button>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Visual */}
      <div className="fixed top-6 right-6 z-[999] font-mono text-right pointer-events-none">
        {input && <div className="bg-black/95 text-white/20 px-4 py-2 rounded-2xl border border-white/10 text-xs italic tracking-tighter">
          Console: {input}_
        </div>}
        {feedback && <div className="mt-2 bg-white text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">
          {feedback}
        </div>}
      </div>

      {/* Efectos de Corazones */}
      {hugHearts.map(h => (
        <span key={h.id} className="fixed text-6xl animate-heart-burst z-[1001] pointer-events-none" 
              style={{ left: `${h.left}%`, top: `${h.top}%`, animationDelay: `${h.delay}s` }}>
          💖
        </span>
      ))}
    </>
  );
}