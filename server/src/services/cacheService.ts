import * as redis from 'redis';

import { ICacheConfig } from '../config';

export default class CacheService {
    #client;

    constructor( config: ICacheConfig ) {
        this.#client = redis.createClient( {
            url: `redis://${ config.hostName }:${ config.port }`
        } );

        this.#client.on( 'connect', () => console.log( 'Connected to Redis' ) );
        this.#client.on( 'ready ', () => console.log( 'Redis ready to use' ) );
        this.#client.on( 'error', ( error ) => console.log( 'Redis Client Error', error ) );
    }

    async init() {
        await this.#client.connect();
    }

    get( key: string ) {
        this.#client.GET( key );
    }

    set( key: string, value: string ) {
        this.#client.SET( key, value );
    }
}
