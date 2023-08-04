import { Request, Response, NextFunction } from 'express';

export function updateUser( request: Request, response: Response, next: NextFunction ) {
    try {
        const data = request.body;

        if ( ! data.id ) {
            response.status( 400 ).json( { message: 'ID not set' } );
        }

        // find user in db
        return response.json( data );
    }
    catch ( error ) {
        return next();
    }
}
