/**
 * @project BITTAMI_HUB_CORE_V1
 * @author Angel Olivares - Mekode SpA
 * @description Script de inicialización para extensión de Twitch (Hosted Mode)
 */

window.addEventListener('load', () => {
    console.log("© 2026 MEKODE.CL | AUTHENTIC WORK");
    
    // Verificamos si el Helper de Twitch cargó correctamente
    if (window.Twitch && window.Twitch.ext) {
        window.Twitch.ext.onAuthorized((auth) => {
            console.log("✅ BittaHub: Autorizado exitosamente en los servidores de Twitch");
            // Aquí puedes guardar el token de auth si lo necesitas a futuro
        });

        window.Twitch.ext.onContext((context, diff) => {
            console.log("Twitch Context:", context);
        });

        window.Twitch.ext.onError((err) => {
            console.error("❌ Twitch Extension Error:", err);
        });
    } else {
        console.error("❌ Error: Helper de Twitch no detectado. Verifica la carga del SDK.");
    }
});