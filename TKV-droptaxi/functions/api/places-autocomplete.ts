interface Env {
  GOOGLE_MAPS_API_KEY?: string;
  GOOGLE_API_KEY?: string;
  VITE_GOOGLE_MAPS_API_KEY?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const apiKey = (context.env.GOOGLE_MAPS_API_KEY || context.env.GOOGLE_API_KEY || context.env.VITE_GOOGLE_MAPS_API_KEY)?.trim();
  if (!apiKey) {
    return new Response(JSON.stringify({
      error: 'GOOGLE_MAPS_API_KEY environment variable is not configured.',
      foundKeys: Object.keys(context.env || {})
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = (await context.request.json()) as { input?: string };
    const input = body?.input?.trim();
    if (!input) {
      return new Response(JSON.stringify({ suggestions: [] }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const res = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio'
      },
      body: JSON.stringify({
        input,
        includedRegionCodes: ['in'],
        locationBias: {
          circle: {
            center: { latitude: 12.7407, longitude: 77.8204 },
            radius: 50000.0
          }
        }
      })
    });

    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ error: (data as any)?.error?.message || 'Places API error' }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
