import { TRequestPost, Response, NextFunction } from '../../types/locations';
import LocationRepository from '../../repositories/locations';
import LocationsDataAdapters from '../../adapters/locations';

export async function createLocation( request: TRequestPost, response: Response, next: NextFunction ) {
    try {
        const locationRepository = new LocationRepository();
        const adaptedLocationFromBody = LocationsDataAdapters.getLocationFromBody( request.body );
        const createdLocation = await locationRepository.createLocation( adaptedLocationFromBody );
        const adaptedCreatedLocation = LocationsDataAdapters.getLocationFull( createdLocation );

        return response.status( 200 ).send( adaptedCreatedLocation );
    }
    catch ( error ) {
        return next( error );
    }
}
