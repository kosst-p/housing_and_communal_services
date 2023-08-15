import { TRequestPost, Response, NextFunction } from '../../types/locations';
import LocationRepository from '../../repositories/locations';
import LocationsDataAdapters from '../../adapters/locations';

export async function createLocation( request: TRequestPost, response: Response, next: NextFunction ) {
    try {
        const locationRepository = new LocationRepository();
        const adaptLocationData = LocationsDataAdapters.getLocationDataFromBody( request.body );
        const location = await locationRepository.createLocation( adaptLocationData ); // adapt?

        return response.status( 200 ).send( {
            status: 200,
            message: 'Location created.',
            result: location
        } );
    }
    catch ( error ) {
        return next( error );
    }
}
