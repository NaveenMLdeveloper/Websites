import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function isQuotaError(status: number, body: string): boolean {
  if (status === 429 || status === 403) return true;
  const lower = body.toLowerCase();
  return (
    lower.includes('quota') ||
    lower.includes('exhausted') ||
    lower.includes('rate_limit') ||
    lower.includes('limit') ||
    lower.includes('project_number')
  );
}

function extractApiKeys(env: Record<string, string>): string[] {
  const keys: string[] = [];
  const addKey = (val?: string) => {
    if (!val) return;
    val.split(',').forEach((k) => {
      const trimmed = k.trim();
      if (trimmed && !keys.includes(trimmed)) keys.push(trimmed);
    });
  };
  addKey(env.GOOGLE_MAPS_API_KEY);
  addKey(env.GOOGLE_MAPS_API_KEYS);
  addKey(env.GOOGLE_MAPS_API_KEY_2);
  addKey(env.GOOGLE_MAPS_API_KEY_FALLBACK);
  addKey(env.GOOGLE_API_KEY);
  addKey(env.GOOGLE_API_KEY_2);
  addKey(env.VITE_GOOGLE_MAPS_API_KEY);
  addKey(env.VITE_GOOGLE_MAPS_API_KEY_2);
  return keys;
}

function googleMapsApiDevPlugin(apiKeys: string[]): Plugin {
  return {
    name: 'google-maps-api-dev-proxy',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';

        if (url.startsWith('/api/places-autocomplete') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json');
            if (apiKeys.length === 0) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'GOOGLE_MAPS_API_KEY is not configured in environment.' }));
              return;
            }

            try {
              const parsed = body ? JSON.parse(body) : {};
              const input = parsed.input?.trim();
              if (!input) {
                res.end(JSON.stringify({ suggestions: [] }));
                return;
              }

              let lastResponse: any = null;
              let lastStatus = 500;

              for (let i = 0; i < apiKeys.length; i++) {
                const key = apiKeys[i];
                const googleResponse = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': key,
                    'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio',
                    'Referer': 'https://tkvdroptaxi.com/'
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

                const data = await googleResponse.json();
                if (googleResponse.ok) {
                  res.statusCode = 200;
                  res.end(JSON.stringify(data));
                  return;
                }

                lastStatus = googleResponse.status;
                lastResponse = data;
                const errorStr = (data as any)?.error?.message || JSON.stringify(data);

                if (isQuotaError(lastStatus, errorStr) && i < apiKeys.length - 1) {
                  console.warn(`[DevProxy] Key #${i + 1} quota exceeded. Retrying with key #${i + 2}...`);
                  continue;
                }
                break;
              }

              res.statusCode = lastStatus;
              res.end(JSON.stringify(lastResponse || { error: 'Places API error' }));
            } catch (error: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: error?.message || 'Server error' }));
            }
          });
          return;
        }

        if (url.startsWith('/api/place-details') && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          if (apiKeys.length === 0) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: 'GOOGLE_MAPS_API_KEY is not configured in environment.' }));
            return;
          }

          try {
            const parsedUrl = new URL(url, 'http://localhost');
            const placeId = parsedUrl.searchParams.get('placeId');
            if (!placeId) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Missing placeId' }));
              return;
            }

            let lastResponse: any = null;
            let lastStatus = 500;

            for (let i = 0; i < apiKeys.length; i++) {
              const key = apiKeys[i];
              const googleResponse = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'X-Goog-Api-Key': key,
                  'X-Goog-FieldMask': 'id,displayName,location,formattedAddress',
                  'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio',
                  'Referer': 'https://tkvdroptaxi.com/'
                }
              });

              const data = (await googleResponse.json()) as any;
              if (googleResponse.ok) {
                res.statusCode = 200;
                res.end(JSON.stringify({
                  placeId: data.id,
                  displayName: data.displayName?.text,
                  formattedAddress: data.formattedAddress,
                  location: data.location
                }));
                return;
              }

              lastStatus = googleResponse.status;
              lastResponse = data;
              const errorStr = data?.error?.message || JSON.stringify(data);

              if (isQuotaError(lastStatus, errorStr) && i < apiKeys.length - 1) {
                console.warn(`[DevProxy] Key #${i + 1} quota exceeded. Retrying with key #${i + 2}...`);
                continue;
              }
              break;
            }

            res.statusCode = lastStatus;
            res.end(JSON.stringify(lastResponse || { error: 'Places details error' }));
          } catch (error: any) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: error?.message || 'Server error' }));
          }
          return;
        }

        if (url.startsWith('/api/route-distance') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            res.setHeader('Content-Type', 'application/json');
            if (apiKeys.length === 0) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'GOOGLE_MAPS_API_KEY is not configured in environment.' }));
              return;
            }

            try {
              const parsed = body ? JSON.parse(body) : {};
              if (!parsed.origin || !parsed.destination) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Both origin and destination are required' }));
                return;
              }

              let lastResponse: any = null;
              let lastStatus = 500;

              for (let i = 0; i < apiKeys.length; i++) {
                const key = apiKeys[i];
                const googleResponse = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': key,
                    'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
                    'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio',
                    'Referer': 'https://tkvdroptaxi.com/'
                  },
                  body: JSON.stringify({
                    origin: parsed.origin,
                    destination: parsed.destination,
                    travelMode: 'DRIVE',
                    routingPreference: 'TRAFFIC_UNAWARE',
                    computeAlternativeRoutes: false,
                    units: 'METRIC'
                  })
                });

                const data = (await googleResponse.json()) as any;
                if (googleResponse.ok) {
                  const route = data?.routes?.[0];
                  if (!route) {
                    res.statusCode = 404;
                    res.end(JSON.stringify({ error: 'No driving route found between these locations.' }));
                    return;
                  }
                  res.statusCode = 200;
                  res.end(JSON.stringify({
                    distanceMeters: route.distanceMeters ?? 0,
                    distanceKm: Math.round((route.distanceMeters ?? 0) / 1000),
                    duration: route.duration ?? ''
                  }));
                  return;
                }

                lastStatus = googleResponse.status;
                lastResponse = data;
                const errorStr = data?.error?.message || JSON.stringify(data);

                if (isQuotaError(lastStatus, errorStr) && i < apiKeys.length - 1) {
                  console.warn(`[DevProxy] Key #${i + 1} quota exceeded. Retrying with key #${i + 2}...`);
                  continue;
                }
                break;
              }

              res.statusCode = lastStatus;
              res.end(JSON.stringify(lastResponse || { error: 'Route distance error' }));
            } catch (error: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: error?.message || 'Server error' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiKeys = extractApiKeys(env);

  return {
    plugins: [react(), tailwindcss(), googleMapsApiDevPlugin(apiKeys)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
