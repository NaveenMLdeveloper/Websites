import { POPULAR_CITY_LOCATIONS, POPULAR_DISTANCES } from '../data/travelData';

export interface PlacePrediction {
  placeId: string;
  text: string;
  mainText: string;
  secondaryText?: string;
  isLocalFallback?: boolean;
}

export interface SelectedPlace {
  name: string;
  placeId?: string;
  lat?: number;
  lng?: number;
  formattedAddress?: string;
}

export interface RouteResult {
  distanceMeters: number;
  distanceKm: number;
  duration: string;
}

/**
 * Format raw duration from Google Routes API (e.g. "19574s" or seconds) into human-readable hours & minutes (e.g. "4 hr 58 min")
 */
export function formatDuration(duration: string | number | undefined | null): string {
  if (!duration) return '';

  if (typeof duration === 'number') {
    const totalMinutes = Math.round(duration / 60);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0 && mins > 0) return `${hours} hr ${mins} min`;
    if (hours > 0) return `${hours} hr`;
    return `${mins} min`;
  }

  const str = String(duration).trim();
  const secMatch = str.match(/^(\d+(?:\.\d+)?)s$/i);
  if (secMatch) {
    const seconds = parseFloat(secMatch[1]);
    const totalMinutes = Math.round(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours > 0 && mins > 0) return `${hours} hr ${mins} min`;
    if (hours > 0) return `${hours} hr`;
    return `${mins} min`;
  }

  return str;
}

/**
 * Finds matching cities from local South India / Tamil Nadu dataset when offline or quota reached
 */
export function getLocalCityPredictions(query: string): PlacePrediction[] {
  const q = (query || '').toLowerCase().trim();
  if (!q) return [];

  const matched = POPULAR_CITY_LOCATIONS.filter((c) => {
    if (c.name.toLowerCase().includes(q)) return true;
    if (c.state && c.state.toLowerCase().includes(q)) return true;
    if (c.description && c.description.toLowerCase().includes(q)) return true;
    if (c.aliases && c.aliases.some((a) => a.toLowerCase().includes(q))) return true;
    return false;
  });

  return matched.map((c) => ({
    placeId: `local-${c.name.toLowerCase().replace(/\s+/g, '-')}`,
    text: `${c.name}, ${c.state || 'India'}`,
    mainText: c.name,
    secondaryText: c.description || `${c.state || 'India'}`,
    isLocalFallback: true
  }));
}

/**
 * Request autocomplete suggestions with automatic failover to local city database
 */
export async function fetchPlaceAutocomplete(
  input: string
): Promise<{ predictions: PlacePrediction[]; error?: string; isFallback?: boolean }> {
  const query = (input || '').trim();
  if (!query) {
    return { predictions: [] };
  }

  // For 1 character queries, provide instant local suggestions without burning Google API quota
  if (query.length === 1) {
    return { predictions: getLocalCityPredictions(query), isFallback: true };
  }

  try {
    const res = await fetch('/api/places-autocomplete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: query })
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      console.warn('Places API returned error or quota limit. Using local city suggestions.', data.error);
      const fallbackList = getLocalCityPredictions(query);
      return {
        predictions: fallbackList,
        isFallback: true
      };
    }

    const suggestions = data.suggestions || [];
    const predictions: PlacePrediction[] = suggestions
      .filter((s: any) => s.placePrediction)
      .map((s: any) => {
        const p = s.placePrediction;
        const placeId = p.placeId || (p.place ? p.place.replace('places/', '') : '');
        const fullText = p.text?.text || '';
        const mainText = p.structuredFormat?.mainText?.text || fullText;
        const secondaryText = p.structuredFormat?.secondaryText?.text || '';
        return {
          placeId,
          text: fullText,
          mainText,
          secondaryText
        };
      });

    // If Google returned 0 suggestions, supplement with local matches
    if (predictions.length === 0) {
      const localMatches = getLocalCityPredictions(query);
      if (localMatches.length > 0) {
        return { predictions: localMatches, isFallback: true };
      }
    }

    return { predictions };
  } catch (err: any) {
    console.warn('Network error calling places autocomplete. Using local suggestions:', err);
    return {
      predictions: getLocalCityPredictions(query),
      isFallback: true
    };
  }
}

/**
 * Fetch place details (coordinates, formatted address) for a place ID using Places API (New) or local fallback
 */
export async function fetchPlaceDetails(placeId: string): Promise<SelectedPlace | null> {
  if (!placeId) return null;

  // Local city fallback
  if (placeId.startsWith('local-')) {
    const cityName = placeId.replace('local-', '').replace(/-/g, ' ');
    const matched = POPULAR_CITY_LOCATIONS.find((c) => c.name.toLowerCase() === cityName);
    if (matched) {
      return {
        name: matched.name,
        placeId,
        lat: matched.lat,
        lng: matched.lng,
        formattedAddress: `${matched.name}, ${matched.state || 'India'}`
      };
    }
  }

  try {
    const res = await fetch(`/api/place-details?placeId=${encodeURIComponent(placeId)}`);
    const data = await res.json();

    if (!res.ok || data.error) {
      console.warn('Place details error:', data.error);
      return null;
    }

    return {
      name: data.displayName || data.formattedAddress || placeId,
      placeId: data.placeId || placeId,
      lat: data.location?.latitude,
      lng: data.location?.longitude,
      formattedAddress: data.formattedAddress
    };
  } catch (err) {
    console.warn('Network error fetching place details:', err);
    return null;
  }
}

/**
 * Computes road distance between two locations from local database or coordinate math
 */
export function getOfflineDistance(
  origin: SelectedPlace | string,
  destination: SelectedPlace | string
): RouteResult | null {
  const origName = (typeof origin === 'string' ? origin : origin.name || origin.formattedAddress || '').toLowerCase().trim();
  const destName = (typeof destination === 'string' ? destination : destination.name || destination.formattedAddress || '').toLowerCase().trim();
  if (!origName || !destName) return null;

  // 1. Direct match in POPULAR_DISTANCES
  const key1 = `${origName}-${destName}`;
  const key2 = `${destName}-${origName}`;
  let km = POPULAR_DISTANCES[key1] || POPULAR_DISTANCES[key2];

  // 2. Partial match if city name is contained (e.g. "Hosur, Tamil Nadu" -> "hosur")
  if (!km) {
    for (const [routeKey, dist] of Object.entries(POPULAR_DISTANCES)) {
      const [c1, c2] = routeKey.split('-');
      if (origName.includes(c1) && destName.includes(c2)) {
        km = dist;
        break;
      }
      if (origName.includes(c2) && destName.includes(c1)) {
        km = dist;
        break;
      }
    }
  }

  // 3. Coordinate-based estimation (Haversine formula * 1.3 road curvature factor)
  const oLat = typeof origin === 'object' ? origin.lat : undefined;
  const oLng = typeof origin === 'object' ? origin.lng : undefined;
  const dLat = typeof destination === 'object' ? destination.lat : undefined;
  const dLng = typeof destination === 'object' ? destination.lng : undefined;

  if (!km && oLat != null && oLng != null && dLat != null && dLng != null) {
    const R = 6371; // Earth radius in km
    const dLatRad = ((dLat - oLat) * Math.PI) / 180;
    const dLonRad = ((dLng - oLng) * Math.PI) / 180;
    const a =
      Math.sin(dLatRad / 2) * Math.sin(dLatRad / 2) +
      Math.cos((oLat * Math.PI) / 180) *
        Math.cos((dLat * Math.PI) / 180) *
        Math.sin(dLonRad / 2) *
        Math.sin(dLonRad / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const crowKm = R * c;
    // Road factor is typically 1.25x - 1.35x crow-fly distance in South India
    km = Math.max(30, Math.round(crowKm * 1.3));
  }

  if (km) {
    const hours = Math.floor(km / 60);
    const mins = Math.round((km % 60) * 1.1);
    const durStr = hours > 0 ? `${hours} hr ${mins} min` : `${mins} min`;
    return {
      distanceKm: km,
      distanceMeters: km * 1000,
      duration: durStr
    };
  }

  return null;
}

/**
 * Calculate driving distance between origin and destination using Google Routes API
 * with automatic fallback to popular routes and coordinate math
 */
export async function calculateDrivingDistance(
  origin: SelectedPlace | string,
  destination: SelectedPlace | string
): Promise<{ result?: RouteResult; error?: string }> {
  try {
    let originPayload: any;
    if (typeof origin === 'object' && origin.lat != null && origin.lng != null) {
      originPayload = {
        location: {
          latLng: {
            latitude: origin.lat,
            longitude: origin.lng
          }
        }
      };
    } else if (typeof origin === 'object' && origin.placeId && !origin.placeId.startsWith('local-')) {
      originPayload = { placeId: origin.placeId };
    } else {
      const address = typeof origin === 'string' ? origin : origin.name;
      if (!address || !address.trim()) {
        return { error: 'Origin location is required.' };
      }
      originPayload = { address: address.trim() };
    }

    let destPayload: any;
    if (typeof destination === 'object' && destination.lat != null && destination.lng != null) {
      destPayload = {
        location: {
          latLng: {
            latitude: destination.lat,
            longitude: destination.lng
          }
        }
      };
    } else if (typeof destination === 'object' && destination.placeId && !destination.placeId.startsWith('local-')) {
      destPayload = { placeId: destination.placeId };
    } else {
      const address = typeof destination === 'string' ? destination : destination.name;
      if (!address || !address.trim()) {
        return { error: 'Destination location is required.' };
      }
      destPayload = { address: address.trim() };
    }

    const res = await fetch('/api/route-distance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        origin: originPayload,
        destination: destPayload
      })
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      console.warn('Routes API returned error or quota limit. Checking local distance fallback...', data.error);
      const offline = getOfflineDistance(origin, destination);
      if (offline) {
        return { result: offline };
      }
      return {
        error: 'Estimated fare will be confirmed on WhatsApp.'
      };
    }

    return {
      result: {
        distanceMeters: data.distanceMeters,
        distanceKm: data.distanceKm,
        duration: formatDuration(data.duration)
      }
    };
  } catch (err: any) {
    console.warn('Network error calculating route distance. Checking local distance fallback...', err);
    const offline = getOfflineDistance(origin, destination);
    if (offline) {
      return { result: offline };
    }
    return {
      error: 'Estimated fare will be confirmed on WhatsApp.'
    };
  }
}
