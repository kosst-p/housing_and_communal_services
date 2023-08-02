import { Request } from '../entities/Request.ts';
import { Response } from '../entities/Response.ts';

export type ParseJson = ( request: Request, response: Response ) => void;

export function parseJson( request: Request, response: Response ) {
    response.send = ( data ) => {
        response.writeHead( 200, {
            'Content-type': 'application/json'
        } );
        response.end( JSON.stringify( data ) );
    };
}

