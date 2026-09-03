import path from 'path';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function googleMapsApiDevPlugin(apiKey?: string): Plugin {
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
            if (!apiKey) {
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

              const googleResponse = await fetch('https://places.googleapis.com/v1/places:autocomplete', {
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

              res.statusCode = googleResponse.status;
              res.end(JSON.stringify(await googleResponse.json()));
            } catch (error: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: error?.message || 'Server error' }));
            }
          });
          return;
        }

        if (url.startsWith('/api/place-details') && req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          if (!apiKey) {
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

            const googleResponse = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
              headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'id,displayName,location,formattedAddress',
                'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio'
              }
            });

            const data = (await googleResponse.json()) as any;
            if (!googleResponse.ok) {
              res.statusCode = googleResponse.status;
              res.end(JSON.stringify({ error: data?.error?.message || 'Places API error' }));
              return;
            }

            res.end(JSON.stringify({
              placeId: data.id,
              displayName: data.displayName?.text,
              formattedAddress: data.formattedAddress,
              location: data.location
            }));
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
            if (!apiKey) {
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

              const googleResponse = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Goog-Api-Key': apiKey,
                  'X-Goog-FieldMask': 'routes.distanceMeters,routes.duration',
                  'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio'
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
              if (!googleResponse.ok) {
                res.statusCode = googleResponse.status;
                res.end(JSON.stringify({ error: data?.error?.message || 'Routes API error' }));
                return;
              }

              const route = data?.routes?.[0];
              if (!route) {
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'No driving route found between these locations.' }));
                return;
              }

              res.end(JSON.stringify({
                distanceMeters: route.distanceMeters ?? 0,
                distanceKm: Math.round((route.distanceMeters ?? 0) / 1000),
                duration: route.duration ?? ''
              }));
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
  const apiKey = env.GOOGLE_MAPS_API_KEY || env.GOOGLE_API_KEY || env.VITE_GOOGLE_MAPS_API_KEY || '';

  return {
    plugins: [react(), tailwindcss(), googleMapsApiDevPlugin(apiKey)],
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
