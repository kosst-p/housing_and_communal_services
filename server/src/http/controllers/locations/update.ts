import { IRequestPath, Response, NextFunction } from '../../types/locations';
import LocationRepository from '../../repositories/locations';
import LocationsDataAdapters from '../../adapters/locations';

export async function updateLocation( request: IRequestPath, response: Response, next: NextFunction ) {
    try {
        const userId = request?.user?.id;
        const locationId = request.params.id;
        const locationRepository = new LocationRepository();
        const location = await locationRepository.getLocationById( locationId );

        if ( ! location ) {
            return response.status( 404 ).send( {
                status: 404,
                message: 'Location is not exist',
            } );
        }

        if ( location.userId.toString() !== userId ) {
            return response.status( 403 ).send( {
                status: 403,
                message: 'You do not have permission to access this resource.',
            } );
        }

        const adaptedLocationFromBody = LocationsDataAdapters.getLocationPartialFromBody( request.body );
        const updatedLocation = await locationRepository.updateLocation( locationId, adaptedLocationFromBody );
        const adaptedUpdatedLocation = LocationsDataAdapters.getLocationFull( updatedLocation! );

        return response.status( 200 ).send( adaptedUpdatedLocation );

    }
    catch ( error ) {
        return next( error );
    }
}

