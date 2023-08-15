import { Request, Response, NextFunction } from '../../types/locations';
import LocationRepository from '../../repositories/locations';

export async function getLocation( request: Request, response: Response, next: NextFunction ) {
    try {
        const locationRepository = new LocationRepository();
        const location = await locationRepository.getLocationById( request.params.id );

        return response.json( location );
    }
    catch ( error ) {
        return next( error );
    }
}

export async function getLocations( _request: Request, response: Response, next: NextFunction ) {
    try {
        const locationRepository = new LocationRepository();
        const locations = await locationRepository.getLocations();

        // adapter

        return response.json( locations );
    }
    catch ( error ) {
        return next( error );
    }
}
