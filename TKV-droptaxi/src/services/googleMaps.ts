export interface PlacePrediction {
  placeId: string;
  text: string;
  mainText: string;
  secondaryText?: string;
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
 * Request autocomplete suggestions for a given input query from Google Places API (New)
 */
export async function fetchPlaceAutocomplete(
  input: string
): Promise<{ predictions: PlacePrediction[]; error?: string }> {
  const query = (input || '').trim();
  if (!query) {
    return { predictions: [] };
  }

  try {
    const res = await fetch('/api/places-autocomplete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: query })
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      return {
        predictions: [],
        error: data.error || `Error ${res.status}: Failed to fetch places`
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

    return { predictions };
  } catch (err: any) {
    return {
      predictions: [],
      error: err.message || 'Network error fetching place suggestions'
    };
  }
}

/**
 * Fetch place details (coordinates, formatted address) for a place ID using Places API (New)
 */
export async function fetchPlaceDetails(placeId: string): Promise<SelectedPlace | null> {
  if (!placeId) return null;

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
 * Calculate driving distance between origin and destination using Google Routes API
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
    } else if (typeof origin === 'object' && origin.placeId) {
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
    } else if (typeof destination === 'object' && destination.placeId) {
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
      return {
        error: data.error || `Routes API error (Status ${res.status})`
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
    return {
      error: err.message || 'Network error calculating route distance'
    };
  }
}
