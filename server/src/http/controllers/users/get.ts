import { Request, Response } from 'express';

export function getUser( request: Request, response: Response ) {
    try {
        const { id } = request.params;

        console.log( request.params );

        if ( ! id ) {
            response.status( 400 ).json( { message: 'ID not set' } );
        }

        // find user in db
        response.json( id );
    }
    catch ( error ) {
        response.status( 500 ).json( error );
    }
}
