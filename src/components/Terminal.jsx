import React, { useState, useEffect } from 'react';

/**
 * @project BITTAMI_HUB_CORE_V1
 * @uid 0x5a2f_99_AO_2026 // Firma única basada en tus iniciales y año
 * @license CC BY-NC-ND 4.0
 * @author Angel Olivares
 * @warning Any unauthorized distribution or modification is a breach of copyright.
 */

export default function Terminal() {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [panic, setPanic] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hugHearts, setHugHearts] = useState([]);

  useEffect(() => {
    const handlePanicEvent = () => setPanic(true);
    window.addEventListener('trigger-panic', handlePanicEvent);
    
    const handleKeyDown = (e) => {
      if (panic || showModal || e.target.tagName === 'INPUT') return;
      if (e.key === 'Enter') {
        const cmd = input.toLowerCase().trim();
        if (cmd === 'ezquizo') {
          if (!document.body.classList.contains('ezquizo-active')) setShowModal(true);
          else { document.body.classList.remove('ezquizo-active'); showStatus("SISTEMA RESTAURADO"); }
        } else processCommand(cmd);
        setInput("");
      } else if (e.key.length === 1) setInput(prev => prev + e.key);
      else if (e.key === 'Backspace') setInput(prev => prev.slice(0, -1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('trigger-panic', handlePanicEvent);
    };
  }, [input, panic, showModal]);

  const processCommand = (cmd) => {
    switch (cmd) {
      case 'hacked':
        document.body.classList.add('hacked-mode');
        const s = ["CONNECTING...", "BYPASSING BIO...", "EXTRACTING DATA...", "KERNEL_OVERRIDE"];
        s.forEach((m, i) => setTimeout(() => setFeedback(m), i * 1500));
        break;

      case 'ymir':
        const isMimir = document.body.classList.toggle('mimir-mode');
        
        if (isMimir) {
          const audio = new Audio('/sounds/ymir_purr.mp3');
          audio.volume = 0.1;
          audio.loop = true; 
          audio.id = 'ymir-audio';
          audio.play().catch(e => console.log("Interacción requerida para audio"));
          document.body.appendChild(audio);

          for (let i = 0; i < 15; i++) {
            setTimeout(() => {
              const cat = document.createElement('div');
              cat.innerText = '🐈‍⬛';
              cat.className = 'ymir-rain';
              cat.style.left = Math.random() * 100 + 'vw';
              cat.style.fontSize = (Math.random() * 20 + 20) + 'px';
              document.body.appendChild(cat);
              setTimeout(() => cat.remove(), 4000);
            }, i * 200);
          }
          showStatus("YMIR ESTÁ RELAJADO 🐈‍⬛✨");
        } else {
          const audio = document.getElementById('ymir-audio');
          if (audio) {
            audio.pause();
            audio.remove();
          }
          showStatus("MODO DIURNO");
        }
        break;

      case 'bunny':
        for (let i = 0; i < 20; i++) {
          setTimeout(() => {
            const b = document.createElement('div'); b.innerText = '🐰'; b.className = 'bunny-rain';
            b.style.left = Math.random() * 100 + 'vw'; document.body.appendChild(b);
            setTimeout(() => b.remove(), 4000);
          }, i * 150);
        }
        showStatus("INVASIÓN 🐰");
        break;

      case 'hug':
        setHugHearts(Array.from({length:15}).map((_,i)=>({id:Date.now()+i, left:40+Math.random()*20, top:40+Math.random()*20, delay:Math.random()*0.5})));
        setTimeout(() => setHugHearts([]), 2000);
        showStatus("AMOR 💖");
        break;

      case 'clear':
        // Limpieza de clases visuales
        document.body.classList.remove('ezquizo-active', 'mimir-mode', 'hacked-mode');
        
        // --- ADAPTACIÓN: Limpieza de Audio ---
        const activeAudio = document.getElementById('ymir-audio');
        if (activeAudio) {
          activeAudio.pause();
          activeAudio.currentTime = 0;
          activeAudio.remove();
        }
        
        showStatus("REINICIADO");
        break;

      case 'help': showStatus("YMIR, EZQUIZO, HACKED, BUNNY, HUG, CLEAR"); break;
      default: if (cmd !== "") showStatus("ERROR: HELP");
    }
  };

  const showStatus = (m) => { setFeedback(m); setTimeout(() => setFeedback(""), 4000); };

  if (panic) return (
    <div className="kernel-panic-screen">
      <p>[ 0.000000] Kernel panic - not syncing: VFS: Unable to mount root fs</p>
      <p>[ 0.000122] BITTAMI-CHILL-ZONE / BIOS 1.90 05/14/2025</p>
      <p className="mt-8 animate-pulse text-red-600 font-bold">FATAL ERROR: Reboot required.</p>
    </div>
  );

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
          <div className="bg-[#0f0d15] border-2 border-red-600 p-8 rounded-[3rem] text-center max-w-md">
            <h2 className="text-red-600 font-black text-2xl mb-4 italic">⚠️ ADVERTENCIA</h2>
            <p className="text-slate-400 text-sm mb-8">El modo EZQUIZO contiene parpadeos intensos.</p>
            <div className="flex gap-4">
              <button onClick={() => {document.body.classList.add('ezquizo-active'); setShowModal(false); showStatus("ACTIVO");}} className="flex-1 bg-red-600 text-white py-4 rounded-2xl">Activar</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-white/5 text-white py-4 rounded-2xl">Cancelar</button>
            </div>
          </div>
        </div>
      )}
      <div className="fixed top-6 right-6 z-[999] font-mono text-right pointer-events-none">
        {input && <div className="bg-black/90 text-white/30 px-4 py-2 rounded-2xl border border-white/5 text-[10px]">SYS_CMD: {input}_</div>}
        {feedback && <div className="mt-2 bg-white text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{feedback}</div>}
      </div>
      {hugHearts.map(h => <span key={h.id} className="fixed text-6xl animate-heart-burst z-[1001] pointer-events-none" style={{ left: `${h.left}%`, top: `${h.top}%`, animationDelay: `${h.delay}s` }}>💖</span>)}
    </>
  );
}