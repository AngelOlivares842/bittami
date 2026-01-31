import React, { useState, useEffect } from 'react';

export default function Terminal() {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [panic, setPanic] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hugHearts, setHugHearts] = useState([]);

  // Captura de teclado global
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (panic || showModal || e.target.tagName === 'INPUT') return;

      if (e.key === 'Enter') {
        const cmd = input.toLowerCase().trim();
        if (cmd === 'ezquizo') {
          // Si no está activo, pedimos confirmación por seguridad visual
          if (!document.body.classList.contains('ezquizo-active')) {
            setShowModal(true);
          } else {
            document.body.classList.remove('ezquizo-active');
            showStatus("SISTEMA RESTAURADO");
          }
        } else {
          processCommand(cmd);
        }
        setInput("");
      } else if (e.key.length === 1) {
        setInput(prev => prev + e.key);
      } else if (e.key === 'Backspace') {
        setInput(prev => prev.slice(0, -1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, panic, showModal]);

  const processCommand = (cmd) => {
    switch (cmd) {
      case 'hacked':
        document.body.classList.add('hacked-mode');
        const sequences = [
          "CONNECTING TO REMOTE SERVER: 185.12.44.10...",
          "BYPASSING BITTAMI_BIO_ENCRYPTION...",
          "EXTRACTING: '¡BienvenidXs a mi EZquizo!'...",
          "UPLOADING LOCAL_USER_DATA (45%)...",
          "UPLOADING LOCAL_USER_DATA (89%)...",
          "DUMPING CACHE & COOKIES...",
          "CRITICAL SYSTEM OVERRIDE: KERNEL_HALT"
        ];
        sequences.forEach((msg, i) => {
          setTimeout(() => setFeedback(msg), i * 1500);
        });
        // Disparar Kernel Panic al terminar la secuencia
        setTimeout(() => setPanic(true), sequences.length * 1500 + 1000);
        break;

      case 'ymir':
        document.body.classList.toggle('mimir-mode');
        showStatus(document.body.classList.contains('mimir-mode') ? "MODO YMIR ACTIVADO" : "MODO DIURNO");
        break;

      case 'bunny':
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const b = document.createElement('div');
            b.innerText = '🐰';
            b.className = 'bunny-rain';
            b.style.left = Math.random() * 100 + 'vw';
            b.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(b);
            setTimeout(() => b.remove(), 4000);
          }, i * 150);
        }
        showStatus("INVASIÓN DE CONEJOS 🐰");
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
        showStatus("EXPLOSIÓN DE AMOR 💖");
        break;

      case 'clear':
        // Limpia todas las clases de estado del body
        document.body.classList.remove('ezquizo-active', 'mimir-mode', 'hacked-mode');
        showStatus("SISTEMA REINICIADO");
        break;

      case 'help':
        showStatus("YMIR, EZQUIZO, HACKED, BUNNY, HUG, CLEAR");
        break;

      default:
        if (cmd !== "") showStatus("ERROR: ESCRIBE 'HELP'");
    }
  };

  const showStatus = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 4000);
  };

  const activateEzquizo = () => {
    document.body.classList.add('ezquizo-active');
    setShowModal(false);
    showStatus("MODO EZQUIZO ACTIVADO");
  };

  // Pantalla de Kernel Panic (Solo se muestra cuando panic es true)
  if (panic) {
    return (
      <div className="kernel-panic-screen">
        <p>[    0.000000] Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)</p>
        <p>[    0.000000] CPU: 0 PID: 1 Comm: swapper/0 Not tainted 5.15.0-generic</p>
        <p>[    0.000122] Hardware name: BITTAMI-CHILL-ZONE / MS-7D25, BIOS 1.90 05/14/2025</p>
        <p>[    0.000125] Call Trace:</p>
        <p>[    0.000128]  show_stack+0x52/0x58</p>
        <p>[    0.000132]  dump_stack_lvl+0x4a/0x63</p>
        <p>[    0.000135]  panic+0x149/0x321</p>
        <p>[    0.000142]  prepare_namespace+0x13f/0x18d</p>
        <p>[    0.000145]  kernel_init_freeable+0x18c/0x1b1</p>
        <p>[    0.034512] ---[ end Kernel panic - not syncing: VFS: Unable to mount root fs ]---</p>
        <br />
        <p className="mt-8 animate-pulse text-red-600 font-bold tracking-widest">
          FATAL ERROR: Reboot required to prevent permanent data loss.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Modal de Advertencia (Seguridad Visual) */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
          <div className="bg-[#0f0d15] border-2 border-red-600 p-8 rounded-[3rem] max-w-md w-full text-center shadow-[0_0_60px_rgba(220,38,38,0.3)] animate-fade-in">
            <h2 className="text-red-600 font-black text-3xl mb-4 italic uppercase tracking-tighter">⚠️ Advertencia</h2>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              El MODO EZQUIZO contiene parpadeos intensos y movimientos de pantalla agresivos. ¿Deseas proceder bajo tu responsabilidad?
            </p>
            <div className="flex gap-4">
              <button onClick={activateEzquizo} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest active:scale-95"> Si, activar </button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-2xl transition-all uppercase text-[10px] tracking-widest active:scale-95"> No, cancelar </button>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Visual */}
      <div className="fixed top-6 right-6 z-[999] font-mono text-right pointer-events-none select-none">
        {input && (
          <div className="bg-black/90 text-white/30 px-4 py-2 rounded-2xl border border-white/5 text-[10px] backdrop-blur-md animate-fade-in">
            <span className="italic opacity-20 mr-2">SYS_CMD:</span>
            {input}
            <span className="animate-pulse ml-1 text-white/50">_</span>
          </div>
        )}
        {feedback && (
          <div className="mt-2 bg-white text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-2xl animate-fade-in">
            {feedback}
          </div>
        )}
      </div>

      {/* Lógica de Corazones (Hug) */}
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