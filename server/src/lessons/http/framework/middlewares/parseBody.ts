import { Request } from '../entities/Request.ts';
import { Response } from '../entities/Response.ts';

export type ParseBody = ( request: Request, response: Response ) => void;

export function parseBody( request: Request, _response: Response ) {
    let body = '';

    request.on( 'data', ( chunk ) => {
        body += chunk ;
    } );

    request.on( 'end', () => {
        if ( body ) {
            request.body = JSON.parse( body );
        }
    } );
}
