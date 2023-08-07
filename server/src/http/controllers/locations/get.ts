import { Request, Response, NextFunction } from 'express';

import Location from '../../../models/location';
import { ValidationError } from '../../../errors';

export async function getLocation( request: Request, response: Response, next: NextFunction ) {
    try {
        const { id } = request.params;

        if ( ! id ) {
            throw new ValidationError( 'ID do not set' );
        }

        const locations = await Location.findById( id );

        return response.json( locations );
    }
    catch ( error ) {
        return next( error );
    }
}

export async function getLocations( _request: Request, response: Response, next: NextFunction ) {
    try {
        const locations = await Location.find();

        return response.json( locations );
    }
    catch ( error ) {
        return next( error );
    }
}
