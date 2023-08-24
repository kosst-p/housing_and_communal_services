import { Response, NextFunction } from '@http/types/index';
import { IRequestPost } from '@http/types/locations';
import { locationsActions } from '@actions/index';
import LocationsDataAdapters from '@http/adapters/locations';

export async function createLocation( request: IRequestPost, response: Response, next: NextFunction ) {
    try {
        const adaptedLocationFromBody = LocationsDataAdapters.getLocationFromBody( request );
        const createdLocation = await locationsActions.create( adaptedLocationFromBody );
        const adaptedCreatedLocation = LocationsDataAdapters.getLocationFull( createdLocation );

        return response.send( adaptedCreatedLocation );
    }
    catch ( error ) {
        return next( error );
    }
}
