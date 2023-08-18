import { IRequestPath, Response, NextFunction } from '../../types/locations';
import LocationsDataAdapters from '../../adapters/locations';
import { locationsActions } from '../../../actions/index';

export async function updateLocation( request: IRequestPath, response: Response, next: NextFunction ) {
    try {
        const locationId = request.params.id;
        const location = await locationsActions.getById( request.user, locationId );
        const adaptedLocationFromBody = LocationsDataAdapters.getLocationPartialFromBody( request );
        const updatedLocation = await locationsActions.update( location.id, adaptedLocationFromBody );
        const adaptedUpdatedLocation = LocationsDataAdapters.getLocationFull( updatedLocation! );

        return response.send( adaptedUpdatedLocation );
    }
    catch ( error ) {
        return next( error );
    }
}

