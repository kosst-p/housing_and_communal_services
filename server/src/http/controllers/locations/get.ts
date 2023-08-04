import { Request, Response, NextFunction } from 'express';

import Locations from '../../../models/locations';

export async function getLocations( _request: Request, response: Response, next: NextFunction ) {
    try {
        const locations = await Locations.find();

        return response.json( locations );
    }
    catch ( error ) {
        return next( error );
    }
}
