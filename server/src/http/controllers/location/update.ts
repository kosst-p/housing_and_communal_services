import { Response, NextFunction } from '@http/types/index';
import { IRequestPath } from '@http/types/locations';
import LocationsDataAdapters from '@http/adapters/locations';
import { locationsActions } from '@actions/index';

export async function updateLocation( request: IRequestPath, response: Response, next: NextFunction ) {
    try {
        const location = await locationsActions.getById( request.user, request.params.id );
        const adaptedLocationFromBody = LocationsDataAdapters.getLocationPartialFromBody( request );
        const updatedLocation = await locationsActions.update( location.id, adaptedLocationFromBody );
        const adaptedUpdatedLocation = LocationsDataAdapters.getLocationFull( updatedLocation! );

        return response.send( adaptedUpdatedLocation );
    }
    catch ( error ) {
        return next( error );
    }
}

