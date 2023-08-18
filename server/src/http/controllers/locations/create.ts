import { IRequestPost, Response, NextFunction } from '../../types/locations';
import { locationRepository } from '../../../repositories/index';
import LocationsDataAdapters from '../../adapters/locations';

export async function createLocation( request: IRequestPost, response: Response, next: NextFunction ) {
    try {
        const adaptedLocationFromBody = LocationsDataAdapters.getLocationFromBody( request );
        const createdLocation = await locationRepository.create( adaptedLocationFromBody );
        const adaptedCreatedLocation = LocationsDataAdapters.getLocationFull( createdLocation );

        return response.send( adaptedCreatedLocation );
    }
    catch ( error ) {
        return next( error );
    }
}
