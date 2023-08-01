import http from 'http';
import EventEmitter from 'events';

export default class Application {
    constructor() {
        this.emitter = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    addRouter( router ) {
        Object.keys( router.endpoints ).forEach( ( path ) => {
            const endpoint = router.endpoints[path];

            Object.keys( endpoint ).forEach( ( method ) => {
                const handler = endpoint[method];

                this.emitter.on( this._getRouteMask( path, method ), ( request, response ) => {
                    handler( request, response );
                } );
            } );
        } );
    }

    _createServer() {
        return http.createServer( ( request, response ) => {
            this.middlewares.forEach( ( middleware ) => middleware( request, response ) );

            request.on( 'end', () => {
                const emitted = this.emitter.emit( this._getRouteMask( request.pathname, request.method ), request, response );

                if ( ! emitted ) {
                    response.end();
                }
            } );

        } );
    }

    _getRouteMask( path, method ) {
        return `[${path}]:[${method}]`;
    }

    use( middleware ) {
        this.middlewares.push( middleware );
    }

    listen( port, callback ) {
        this.server.listen( port, callback );
    }

}