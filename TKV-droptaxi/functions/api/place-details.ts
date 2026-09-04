import { fetchWithGoogleKeyFallback, getApiKeys, MultiKeyEnv } from './_googleMapsHelper';

export const onRequestGet = async (context: { request: Request; env: MultiKeyEnv }) => {
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

  const url = new URL(context.request.url);
  const placeId = url.searchParams.get('placeId');
  if (!placeId) {
    return new Response(JSON.stringify({ error: 'Missing placeId parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const { ok, status, data } = await fetchWithGoogleKeyFallback(keys, (apiKey) => {
      return fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'id,displayName,location,formattedAddress',
          'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio'
        }
      });
    });

    if (!ok) {
      return new Response(JSON.stringify({ error: (data as any)?.error?.message || 'Places API Details error' }), {
        status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(
      JSON.stringify({
        placeId: (data as any).id,
        displayName: (data as any).displayName?.text,
        formattedAddress: (data as any).formattedAddress,
        location: (data as any).location
      }),
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
