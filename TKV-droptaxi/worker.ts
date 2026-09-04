import { onRequestGet as placeDetails } from './functions/api/place-details';
import { onRequestPost as placesAutocomplete } from './functions/api/places-autocomplete';
import { onRequestPost as routeDistance } from './functions/api/route-distance';
import { MultiKeyEnv } from './functions/api/_googleMapsHelper';

interface Env extends MultiKeyEnv {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const context = { request, env };

    if (url.pathname === '/api/places-autocomplete' && request.method === 'POST') {
      return placesAutocomplete(context);
    }

    if (url.pathname === '/api/place-details' && request.method === 'GET') {
      return placeDetails(context);
    }

    if (url.pathname === '/api/route-distance' && request.method === 'POST') {
      return routeDistance(context);
    }

    return env.ASSETS.fetch(request);
  }
};
