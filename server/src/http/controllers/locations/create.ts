import { Request, Response } from 'express';

export function createLocation( request: Request, response: Response ) {
    try {
        console.log( request.body );
        response.json( request.body );
    }
    catch ( error ) {
        response.status( 500 ).json( error );
    }
}
