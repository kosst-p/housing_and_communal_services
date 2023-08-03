import { Request, Response } from 'express';

export function getLocations( _request: Request, response: Response ) {
    try {
        console.log( [ {}, {}, {} ] );
        response.json( [ {}, {}, {} ] );
    }
    catch ( error ) {
        response.status( 500 ).json( error );
    }
}
