import { TRequestGet, TResponse, TNextFunction } from './types';
import LocationService from '../../services/locations';

export async function getLocation( request: TRequestGet, response: TResponse, next: TNextFunction ) {
    try {
        const locationService = new LocationService();
        const location = await locationService.getLocationById( request.params.id );

        return response.json( location );
    }
    catch ( error ) {
        return next( error );
    }
}

export async function getLocations( _request: TRequestGet, response: TResponse, next: TNextFunction ) {
    try {
        const locationService = new LocationService();
        const locations = await locationService.getLocations();

        return response.json( locations );
    }
    catch ( error ) {
        return next( error );
    }
}
