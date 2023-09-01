import { Response, NextFunction } from '@http/types/index';
import { IRequestPost } from '@http/types/locations';
import { locationsActions } from '@actions/index';
import LocationsDataAdapters from '@http/adapters/locations';
import { AlreadyExistError } from '@/errors';

export async function createLocation( request: IRequestPost, response: Response, next: NextFunction ) {
    try {
        const adaptedLocationFromBody = LocationsDataAdapters.getLocationFromBody( request );
        const candidate = await locationsActions.get( request.user, adaptedLocationFromBody );

        if ( candidate ) {
            throw new AlreadyExistError( 'The Location already exists.' );
        }

        const createdLocation = await locationsActions.create( request.user, adaptedLocationFromBody );
        const adaptedCreatedLocation = LocationsDataAdapters.getLocationFull( createdLocation );

        return response.send( adaptedCreatedLocation );
    }
    catch ( error ) {
        return next( error );
    }
}
