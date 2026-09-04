export interface MultiKeyEnv {
  GOOGLE_MAPS_API_KEY?: string;
  GOOGLE_MAPS_API_KEY_2?: string;
  GOOGLE_MAPS_API_KEY_FALLBACK?: string;
  GOOGLE_MAPS_API_KEY_SECONDARY?: string;
  GOOGLE_MAPS_API_KEYS?: string;
  GOOGLE_API_KEY?: string;
  GOOGLE_API_KEY_2?: string;
  VITE_GOOGLE_MAPS_API_KEY?: string;
  VITE_GOOGLE_MAPS_API_KEY_2?: string;
  [key: string]: any;
}

/**
 * Extracts an ordered list of all available Google Maps API keys from the environment.
 * Supports comma-separated keys as well as individual key variables.
 */
export function getApiKeys(env: MultiKeyEnv): string[] {
  if (!env) return [];
  const keys: string[] = [];

  const addKey = (val: unknown) => {
    if (typeof val !== 'string') return;
    const parts = val.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed && !keys.includes(trimmed)) {
        keys.push(trimmed);
      }
    }
  };

  // Primary key candidates
  addKey(env.GOOGLE_MAPS_API_KEY);
  addKey(env.GOOGLE_MAPS_API_KEYS);
  addKey(env.GOOGLE_API_KEY);
  addKey(env.VITE_GOOGLE_MAPS_API_KEY);

  // Secondary/fallback key candidates
  addKey(env.GOOGLE_MAPS_API_KEY_2);
  addKey(env.GOOGLE_MAPS_API_KEY_FALLBACK);
  addKey(env.GOOGLE_MAPS_API_KEY_SECONDARY);
  addKey(env.GOOGLE_API_KEY_2);
  addKey(env.VITE_GOOGLE_MAPS_API_KEY_2);

  return keys;
}

/**
 * Checks whether an error is quota/rate-limit related or credential exhaustion.
 */
export function isQuotaOrAuthError(status: number, bodyText: string): boolean {
  if (status === 429 || status === 403) return true;
  const lower = (bodyText || '').toLowerCase();
  return (
    lower.includes('quota') ||
    lower.includes('exhausted') ||
    lower.includes('resource_exhausted') ||
    lower.includes('rate_limit') ||
    lower.includes('limit') ||
    lower.includes('blocked') ||
    lower.includes('project_number')
  );
}

/**
 * Executes a Google API request across available keys with automatic fallback on quota/errors.
 */
export async function fetchWithGoogleKeyFallback<T = any>(
  keys: string[],
  requestFactory: (key: string) => Promise<Response>
): Promise<{ ok: boolean; status: number; data: T; keyIndexUsed: number }> {
  if (keys.length === 0) {
    return {
      ok: false,
      status: 500,
      data: { error: 'GOOGLE_MAPS_API_KEY environment variable is not configured.' } as any,
      keyIndexUsed: -1
    };
  }

  let lastStatus = 500;
  let lastData: any = null;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    try {
      const res = await requestFactory(key);
      const text = await res.text();
      let parsed: any;
      try {
        parsed = text ? JSON.parse(text) : {};
      } catch {
        parsed = { raw: text };
      }

      if (res.ok && !parsed.error) {
        return {
          ok: true,
          status: res.status,
          data: parsed,
          keyIndexUsed: i
        };
      }

      lastStatus = res.status;
      lastData = parsed;
      const errorMsg = parsed?.error?.message || text || '';

      const isQuota = isQuotaOrAuthError(res.status, errorMsg);
      if (isQuota && i < keys.length - 1) {
        console.warn(`[GoogleMaps API] Key #${i + 1} quota/limit reached. Failing over to key #${i + 2}...`);
        continue; // Try next key
      }

      // If it's a client error (e.g. 400 Bad Request), switching keys won't help
      if (res.status === 400 && !isQuota) {
        return {
          ok: false,
          status: res.status,
          data: parsed,
          keyIndexUsed: i
        };
      }
    } catch (err: any) {
      lastStatus = 500;
      lastData = { error: err?.message || 'Network error calling Google API' };
      if (i < keys.length - 1) {
        console.warn(`[GoogleMaps API] Key #${i + 1} network failure. Failing over to key #${i + 2}...`);
        continue;
      }
    }
  }

  return {
    ok: false,
    status: lastStatus,
    data: lastData,
    keyIndexUsed: keys.length - 1
  };
}
