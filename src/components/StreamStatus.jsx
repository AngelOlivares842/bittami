import React from 'react';

export default function StreamStatus() {
  const isLive = true; // Esto lo puedes cambiar por lógica real

  return (
    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full w-fit">
      <span className={`relative flex h-3 w-3`}>
        {isLive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-red-500' : 'bg-gray-500'}`}></span>
      </span>
      <span className="text-xs font-bold uppercase tracking-widest">
        {isLive ? 'En Vivo Ahora' : 'Offline'}
      </span>
    </div>
  );
}