import * as redis from 'redis';

import { ICacheConfig } from '@config/index';

export default class CacheService {
    #seconds;
    #client;

    constructor( config: ICacheConfig, expirationTime: number ) {
        this.#client = redis.createClient( {
            url: `redis://${ config.hostName }:${ config.port }`
        } );
        this.#seconds = expirationTime;

        this.#client.on( 'connect', () => console.log( 'Connected to Redis' ) );
        this.#client.on( 'ready ', () => console.log( 'Redis ready to use' ) );
        this.#client.on( 'error', ( error ) => console.log( 'Redis Client Error', error ) );
    }

    async init() {
        await this.#client.connect();
    }

    async get( key: string ): Promise<void> {
        await this.#client.GET( key ); // handle error?
    }

    async set<T>( key: string, value: T ): Promise<void> {
        await this.#client.SET( key, JSON.stringify( value ), {
            EX: this.#seconds
        } ); // handle error?
    }

    async delete( key: string ): Promise<void> {
        await this.#client.DEL( key ); // handle error?
    }

    async check( key: string ): Promise<number> {
        return await this.#client.EXISTS( key );
    }
}
