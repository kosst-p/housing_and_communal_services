import { Request, Response, NextFunction } from 'express';

import Location from '../../../models/location';

export async function getLocation( request: Request, response: Response, next: NextFunction ) {
    try {
        const { id } = request.params;

        if ( ! id ) {
            response.status( 400 ).json( { message: 'ID not set' } );
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
