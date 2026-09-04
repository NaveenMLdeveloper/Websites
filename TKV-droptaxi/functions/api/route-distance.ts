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
    const body = (await context.request.json()) as { origin?: any; destination?: any };
    if (!body?.origin || !body?.destination) {
      return new Response(JSON.stringify({ error: 'Both origin and destination are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const payload = {
      origin: body.origin,
      destination: body.destination,
      travelMode: 'DRIVE',
      routingPreference: 'TRAFFIC_UNAWARE',
      computeAlternativeRoutes: false,
      units: 'METRIC'
    };

    const { ok, status, data } = await fetchWithGoogleKeyFallback(keys, (apiKey) => {
      return fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
          'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio'
        },
        body: JSON.stringify(payload)
      });
    });

    if (!ok) {
      return new Response(JSON.stringify({ error: (data as any)?.error?.message || 'Routes API error' }), {
        status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const routes = (data as any)?.routes;
    if (!routes || routes.length === 0) {
      return new Response(JSON.stringify({ error: 'No driving route found between these locations.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const distanceMeters = routes[0].distanceMeters ?? 0;
    const duration = routes[0].duration ?? '';
    const distanceKm = Math.round(distanceMeters / 1000);

    return new Response(
      JSON.stringify({
        distanceMeters,
        distanceKm,
        duration
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
