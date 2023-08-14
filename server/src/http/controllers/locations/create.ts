import { TRequestPost, Response, NextFunction } from '../../types/locations';
import LocationRepository from '../../repositories/locations';
import DataAdapters from '../../adapters';

export async function createLocation( request: TRequestPost, response: Response, next: NextFunction ) {
    try {
        const locationRepository = new LocationRepository();
        const adaptLocationData = DataAdapters.getLocationDataFromBody( request.body );

        await locationRepository.createLocation( adaptLocationData );

        return response.status( 200 ).send( {
            status: 200,
            message: 'Location created.'
        } );
    }
    catch ( error ) {
        return next( error );
    }
}
