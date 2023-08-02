import { Request } from './entities/Request.ts';
import { Response } from './entities/Response.ts';

type Endpoint = {
    [method: string]: ( request: Request, response: Response ) => void
}
type Endpoints = {
    [path: string]: Endpoint
}

export default class Router {
    public endpoints: Endpoints;

    constructor() {
        this.endpoints = {};
    }

    request( path: string, handler: ( request: Request, response: Response ) => void, method: string = 'GET' ): void {
        if ( ! this.endpoints[ path ] ) {
            this.endpoints[ path ] = {};
        }

        const endpoint = this.endpoints[ path ];

        if ( endpoint[ method ] ) {
            throw Error( `[${ method }] по адресу ${ path } уже существует` );
        }

        endpoint[ method ] = handler;
    }

    get( path: string, handler: ( request: Request, response: Response ) => void ): void {
        this.request( path, handler, 'GET' );
    }

    post( path: string, handler: ( request: Request, response: Response ) => void ): void {
        this.request( path, handler, 'POST' );
    }

    put( path: string, handler: ( request: Request, response: Response ) => void ): void {
        this.request( path, handler, 'PUT' );
    }

    delete( path: string, handler: ( request: Request, response: Response ) => void ): void {
        this.request( path, handler, 'DELETE' );
    }
}
