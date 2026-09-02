interface Env {
  GOOGLE_MAPS_API_KEY?: string;
  GOOGLE_API_KEY?: string;
  VITE_GOOGLE_MAPS_API_KEY?: string;
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const apiKey = context.env.GOOGLE_MAPS_API_KEY || context.env.GOOGLE_API_KEY || context.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GOOGLE_MAPS_API_KEY environment variable is not configured.' }), {
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

    const res = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
        'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio'
      },
      body: JSON.stringify(payload)
    });

    const data = (await res.json()) as any;
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data?.error?.message || 'Routes API error' }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const routes = data?.routes;
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
