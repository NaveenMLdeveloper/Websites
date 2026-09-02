interface Env {
  GOOGLE_MAPS_API_KEY?: string;
  GOOGLE_API_KEY?: string;
  VITE_GOOGLE_MAPS_API_KEY?: string;
}

export const onRequestGet = async (context: { request: Request; env: Env }) => {
  const apiKey = context.env.GOOGLE_MAPS_API_KEY || context.env.GOOGLE_API_KEY || context.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'GOOGLE_MAPS_API_KEY environment variable is not configured.' }), {
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
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,displayName,location,formattedAddress',
        'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio'
      }
    });

    const data = (await res.json()) as any;
    if (!res.ok) {
      return new Response(JSON.stringify({ error: data?.error?.message || 'Places API Details error' }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(
      JSON.stringify({
        placeId: data.id,
        displayName: data.displayName?.text,
        formattedAddress: data.formattedAddress,
        location: data.location
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
