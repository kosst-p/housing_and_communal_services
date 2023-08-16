import { Request, Response, NextFunction } from '../../types/locations';
import LocationsDataAdapters from '../../adapters/locations';
import { locationsActions } from '../../../actions/index';
import { PermissionError } from '../../../errors';

export async function getLocation( request: Request, response: Response, next: NextFunction ) {
    try {
        const location = await locationsActions.getById( request.user, request.params.id );
        const adaptedLocation = LocationsDataAdapters.getLocationFull( location );

        return response.send( adaptedLocation );
    }
    catch ( error ) {
        return next( error );
    }
}

export async function getLocations( request: Request, response: Response, next: NextFunction ) {
    try {
        const userId = request.user.id;

        if ( ! userId ) {
            throw new PermissionError();
        }

        // пагинация, сортировка, фильтр\поиск (пагинация по дефолту 10 штб ограничивать максимальное число 500)
        const locations = await locationsActions.get( userId );
        const adaptedLocations = locations.map( ( location ) => LocationsDataAdapters.getLocationFull( location ) );

        // mongoose.paginate, сортировка по имени.
        return response.send( adaptedLocations );
    }
    catch ( error ) {
        return next( error );
    }
}
