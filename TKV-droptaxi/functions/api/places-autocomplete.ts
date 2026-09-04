import { fetchWithGoogleKeyFallback, getApiKeys, MultiKeyEnv } from './_googleMapsHelper';

export const onRequestPost = async (context: { request: Request; env: MultiKeyEnv }) => {
  const keys = getApiKeys(context.env);
  if (keys.length === 0) {
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

    const { ok, status, data } = await fetchWithGoogleKeyFallback(keys, (apiKey) => {
      return fetch('https://places.googleapis.com/v1/places:autocomplete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio',
          'Referer': context.request.headers.get('referer') || 'https://tkvdroptaxi.com/'
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
    });

    if (!ok) {
      return new Response(JSON.stringify({ error: (data as any)?.error?.message || 'Places API error' }), {
        status,
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
