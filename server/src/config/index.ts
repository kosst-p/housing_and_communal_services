import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

dotenv.config( { path: './.env' } );

interface IConfig {
    serverPort: number,
    clientUrl: string,
    db: IDBConfig,
    jwt: IJwtconfig,
    cache: ICacheConfig
}

export interface IDBConfig {
    port: number
    dbName: string,
    userName: string,
    password: string,
    hostName: string
}

export interface ICacheConfig {
    port: number,
    hostName: string
}

interface IJwtconfig {
    accessKey: string,
    refreshKey: string,
    accessExpirationTimeInSeconds: number
}

const env = cleanEnv( process.env, {
    PORT: num( { default: 5000 } ),
    CLIENT_URL: str( { default: 'http://localhost:8080' } ),
    MONGO_DB_ROOT_USER_NAME: str( { default: '' } ),
    MONGO_DB_ROOT_PASSWORD: str( { default: '' } ),
    MONGO_DB_PORT: num( { default: 27017 } ),
    MONGO_DB_DATABASE_NAME: str( { default: 'test' } ),
    MONGO_DB_HOST_NAME: str( { default: 'localhost' } ),
    JWT_ACCESS_SECRET: str( { default: '' } ),
    JWT_REFRESH_SECRET: str( { default: '' } ),
    JWT_ACCESS_EXPIRATION_TIME_IN_SECONDS: num( { default: 900 } ),
    REDIS_PORT: num( { default: 6379 } ),
    REDIS_HOST_NAME: str( { default: 'localhost' } )
} );

export const config: IConfig = {
    serverPort: env.PORT,
    clientUrl: env.CLIENT_URL,
    db: {
        port: env.MONGO_DB_PORT,
        dbName: env.MONGO_DB_DATABASE_NAME,
        userName: env.MONGO_DB_ROOT_USER_NAME,
        password: env.MONGO_DB_ROOT_PASSWORD,
        hostName: env.MONGO_DB_HOST_NAME
    },
    jwt: {
        accessKey: env.JWT_ACCESS_SECRET,
        refreshKey: env.JWT_REFRESH_SECRET,
        accessExpirationTimeInSeconds: env.JWT_ACCESS_EXPIRATION_TIME_IN_SECONDS
    },
    cache: {
        port: env.REDIS_PORT,
        hostName: env.REDIS_HOST_NAME,
    }
};
