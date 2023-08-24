import { Request, Response, NextFunction } from '@http/types/index';
import { IRequestGet } from '@http/types/locations';
import LocationsDataAdapters from '@http/adapters/locations';
import { locationsActions } from '@actions/index';

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

export async function paginateLocations( request: IRequestGet, response: Response, next: NextFunction ) {
    try {
        const queryParamsOptions = LocationsDataAdapters.getQueryParamsOptions( request );
        const paginateData = await locationsActions.paginate( request.user, queryParamsOptions );
        const adaptedPaginateData = LocationsDataAdapters.getPaginateData( paginateData ) ;

        return response.send( adaptedPaginateData );
    }
    catch ( error ) {
        return next( error );
    }
}
