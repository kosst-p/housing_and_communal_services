import { Request, Response, NextFunction } from '../../types/index';
import { IRequestGet } from '../../types/locations';
import LocationsDataAdapters from '../../adapters/locations';
import { locationsActions } from '@actions/index';
import { ForbiddenError } from '@errors/index';

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

export async function getLocations( request: IRequestGet, response: Response, next: NextFunction ) {
    try {
        const userId = request.user.id;

        if ( ! userId ) {
            throw new ForbiddenError();
        }

        const queryParamsOptions = LocationsDataAdapters.getQueryParamsOptions( request );
        const locations = await locationsActions.get( queryParamsOptions );
        const adaptedLocations = locations.map( ( location ) => LocationsDataAdapters.getLocationFull( location ) );

        return response.send( adaptedLocations );
    }
    catch ( error ) {
        return next( error );
    }
}
