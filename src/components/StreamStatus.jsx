import React, { useState, useEffect } from 'react';

/**
 * @project BITTAMI_HUB_CORE_V1
 * @uid 0x5a2f_99_AO_2026 // Firma única basada en tus iniciales y año
 * @license CC BY-NC-ND 4.0
 * @author Angel Olivares
 * @warning Any unauthorized distribution or modification is a breach of copyright.
 */

export default function StreamStatus() {
  const [isLive, setIsLive] = useState(true); // Cambiar a false para probar el estado offline

  return (
    <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
      <div className="relative flex items-center justify-center h-3 w-3">
        {isLive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-zinc-600'}`}></span>
      </div>
      <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60">
        Status: <span className={isLive ? "text-white" : "text-zinc-500"}>{isLive ? 'Vibeando en Vivo' : 'En el Mimir'}</span>
      </span>
    </div>
  );
}