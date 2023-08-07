import { Request, Response, NextFunction } from 'express';

import Location from '../../../models/location';

export async function createLocation( request: Request, response: Response, next: NextFunction ) {
    try {
        const location = await Location.create( request.body );

        return response.json( location );
    }
    catch ( error ) {
        return next( error );
    }
}
