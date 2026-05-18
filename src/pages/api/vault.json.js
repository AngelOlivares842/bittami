export async function GET() {
  const clientId = import.meta.env.TWITCH_CLIENT_ID;
  const clientSecret = import.meta.env.TWITCH_CLIENT_SECRET;
  const channelName = 'bittami';

  try {
    // 1. Obtener Token de Acceso
    const tokenRes = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, { method: 'POST' });
    const { access_token } = await tokenRes.json();
    
    const headers = { 'Client-ID': clientId, 'Authorization': `Bearer ${access_token}` };

    // 2. Obtener el ID de Bitta
    const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${channelName}`, { headers });
    const userData = await userRes.json();
    const userId = userData.data[0].id;

    // 3. Obtener los 3 mejores clips (de todos los tiempos o del mes)
    const clipsRes = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${userId}&first=10`, { headers });
    const clipsData = await clipsRes.json();

    // 4. Obtener los últimos 3 Streams (VODs)
    const videosRes = await fetch(`https://api.twitch.tv/helix/videos?user_id=${userId}&type=archive&first=10`, { headers });
    const videosData = await videosRes.json();

    return new Response(JSON.stringify({
      clips: clipsData.data,
      streams: videosData.data
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Twitch API Error" }), { status: 500 });
  }
}