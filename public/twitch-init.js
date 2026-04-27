window.addEventListener('load', () => {
    console.log("© 2026 MEKODE.CL | AUTHENTIC WORK");
    if (window.Twitch && window.Twitch.ext) {
        window.Twitch.ext.onAuthorized((auth) => {
            console.log("✅ BittaHub: Autorizado en servidores de Twitch");
        });
    }
});