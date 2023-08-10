import { TRequestPost, TResponse, TNextFunction } from './types';
import LocationService from '../../services/locations';

export async function createLocation( request: TRequestPost, response: TResponse, next: TNextFunction ) {
    try {
        const locationService = new LocationService();

        await locationService.createLocation( request.body );

        return response.status( 200 ).send( {
            status: 200,
            message: 'Location created.'
        } );
    }
    catch ( error ) {
        return next( error );
    }
}
