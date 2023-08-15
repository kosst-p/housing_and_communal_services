import { IRequestPath, Response, NextFunction } from '../../types/locations';
import LocationRepository from '../../repositories/locations';

export async function updateLocation( request: IRequestPath, response: Response, next: NextFunction ) {
    try {
        const userId = request.user;
        const locationId = request.params.id;
        const locationRepository = new LocationRepository();
        const location = await locationRepository.getLocationById( locationId );

        if ( ! location ) {
            return response.status( 403 ).send( {
                status: 404,
                message: 'Location is not exist',
            } );
        }

        if ( location.userId !== userId ) {
            return response.status( 403 ).send( {
                status: 404,
                message: 'Location is not exist',
            } );
        }

        await locationRepository.updateLocation( locationId, request.body );

        return response.status( 200 ).send( {
            status: 200,
            message: 'Location updated.',
        } );

    }
    catch ( error ) {
        return next( error );
    }
}

