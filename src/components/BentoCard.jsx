import React from 'react';

export const BotHeader = () => (
  <section class="md:col-span-2 bg-[#161725] border border-white/5 rounded-[32px] p-10 flex flex-col justify-center relative overflow-hidden">
    {/* El pequeño badge de Verified que tienes en tu home */}
    <div class="absolute top-8 right-10 flex items-center gap-2">
      <div class="w-1.5 h-1.5 rounded-full bg-[#ff79c6] animate-pulse"></div>
      <span class="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">VERIFIED SYSTEM</span>
    </div>
    
    <h1 class="text-6xl md:text-8xl font-[900] italic tracking-tighter text-white leading-none">
      BITTA<span class="text-[#ff79c6]">BOT</span> 🤖
    </h1>
    
    <p class="text-white/30 text-[10px] uppercase tracking-[0.2em] mt-8 max-w-sm leading-relaxed">
      Documentación oficial y parámetros de seguridad gestionados por Angel Olivares.
    </p>
  </section>
);

export const BentoCard = ({ title, icon, children, colorClass, span = "" }) => (
  <section class={`${span} bg-[#161725] border border-white/5 rounded-[32px] p-8 flex flex-col h-full`}>
    <header class="flex items-center gap-2 mb-6">
      <span class="text-xs">{icon}</span>
      <h2 class={`text-[10px] uppercase tracking-[0.3em] font-black ${colorClass}`}>
        {title}
      </h2>
    </header>
    <div class="text-[13px] text-white/50 space-y-4 leading-relaxed font-medium">
      {children}
    </div>
  </section>
);