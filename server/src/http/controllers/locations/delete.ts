import { Request, Response, NextFunction } from '../../types/index';
import LocationsDataAdapters from '../../adapters/locations';
import { locationsActions } from '../../../actions/index';

export async function deleteLocation( request: Request, response: Response, next: NextFunction ) {
    try {
        const location = await locationsActions.getById( request.user, request.params.id );
        const deletedLocation = await locationsActions.delete( location.id );
        const deletedUpdatedLocation = LocationsDataAdapters.getLocationFull( deletedLocation! );

        return response.send( deletedUpdatedLocation );
    }
    catch ( error ) {
        return next( error );
    }
}
