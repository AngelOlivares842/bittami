import React, { useEffect, useState } from 'react';

export default function TwitchAuth() {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    if (window.Twitch && window.Twitch.ext) {
      window.Twitch.ext.onAuthorized((auth) => {
        // Aquí obtienes el ID del espectador y el token
        setAuthData(auth);
        console.log("Extensión de Bittami autorizada para canal:", auth.channelId);
      });

      // Escuchar cambios de contexto (ej: si cambian el tamaño del panel)
      window.Twitch.ext.onContext((context) => {
        console.log("Contexto de Twitch:", context);
      });
    }
  }, []);

  return (
    <div className="absolute top-2 right-2">
      <div className={`w-2 h-2 rounded-full ${authData ? 'bg-[#ff79c6] animate-pulse' : 'bg-white/10'}`}></div>
    </div>
  );
}