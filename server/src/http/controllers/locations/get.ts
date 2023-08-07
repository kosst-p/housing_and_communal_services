import { Request, Response, NextFunction } from 'express';

import Location from '../../../models/location';

export async function getLocations( _request: Request, response: Response, next: NextFunction ) {
    try {
        const locations = await Location.find();

        return response.json( locations );
    }
    catch ( error ) {
        return next( error );
    }
}
