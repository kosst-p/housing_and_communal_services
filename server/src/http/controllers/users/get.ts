import { Request, Response, NextFunction } from 'express';

export function getUser( request: Request, response: Response, next: NextFunction ) {
    try {
        const { id } = request.params;

        console.log( request.params );

        if ( ! id ) {
            response.status( 400 ).json( { message: 'ID not set' } );
        }

        // find user in db
        return response.json( id );
    }
    catch ( error ) {
        return next( error );
    }
}
