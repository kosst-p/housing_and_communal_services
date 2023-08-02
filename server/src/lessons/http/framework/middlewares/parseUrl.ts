import { Request } from '../entities/Request.ts';
import { Response } from '../entities/Response.ts';

export type ParseUrl = ( url: string ) => ( request: Request, response: Response ) => void;

export function parseUrl( baseUrl: string ) {
    return function ( request: Request, _response: Response ) {
        const parsedUrl = new URL( request.url || '', baseUrl );
        const params: Record<string, string> = {};

        parsedUrl.searchParams.forEach( ( value, key ) => params[ key ] = value ); // ?

        request.pathname = parsedUrl.pathname;
        request.params = params;
    };
}
