import { Request, Response } from 'express';

export function updateUser( request: Request, response: Response ) {
    try {
        const data = request.body;

        if ( ! data.id ) {
            response.status( 400 ).json( { message: 'ID not set' } );
        }

        // find user in db
        response.json( data );
    }
    catch ( error ) {
        response.status( 500 ).json( error );
    }
}
