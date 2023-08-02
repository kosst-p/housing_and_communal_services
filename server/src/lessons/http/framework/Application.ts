import http from 'http';
import EventEmitter from 'events';

import { TRouter } from './entities/Router.js';
import { Request } from './entities/Request.ts';
import { Response } from './entities/Response.ts';
import { Middleware, Middlewares } from './entities/Middlewares.js';

export default class Application {
    private emitter: EventEmitter;
    private server: http.Server;
    private middlewares: Middlewares;

    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    addRouter( router: TRouter ) {
        Object.keys( router.endpoints ).forEach( ( path ) => {
            const endpoint = router.endpoints[ path ];

            Object.keys( endpoint ).forEach( ( method ) => {
                const handler = endpoint[ method ];

                this.emitter.on( this._getRouteMask( path, method ), ( request, response ) => {
                    handler( request, response );
                } );
            } );
        } );
    }

    _createServer() {
        return http.createServer( ( request: Request, response: Response ) => {
            this.middlewares.forEach( ( middleware ) => middleware( request, response ) );

            request.on( 'end', () => {
                const emitted = this.emitter.emit( this._getRouteMask( request.pathname ?? '', request.method ?? '' ), request, response );

                if ( ! emitted ) {
                    response.end();
                }
            } );

        } );
    }

    _getRouteMask( path: string, method: string ) {
        return `[${ path }]:[${ method }]`;
    }

    use( middleware: Middleware ) {
        this.middlewares.push( middleware );
    }

    listen( port: number | string, callback: () => void ) {
        this.server.listen( port, callback );
    }
}
