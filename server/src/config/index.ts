import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

dotenv.config( { path: './.env' } );

interface IConfig {
    serverPort: number,
    db: IDBConfig,
    jwt: IJwtconfig
}

export interface IDBConfig {
    port: number
    dbName: string,
    userName: string,
    password: string,
    hostName: string
}

interface IJwtconfig {
    accessKey: string,
    refreshKey: string,
}

const env = cleanEnv( process.env, {
    PORT: num( { default: 5000 } ),
    MONGO_DB_ROOT_USER_NAME: str( { default: '' } ),
    MONGO_DB_ROOT_PASSWORD: str( { default: '' } ),
    MONGO_DB_PORT: num( { default: 27017 } ),
    MONGO_DB_DATABASE_NAME: str( { default: 'test' } ),
    MONGO_DB_HOST_NAME: str( { default: 'localhost' } ),
    JWT_ACCESS_SECRET: str( { default: 'access' } ),
    JWT_REFRESH_SECRET: str( { default: 'refresh' } )
} );

export const config: IConfig = {
    serverPort: env.PORT,
    db: {
        port: env.MONGO_DB_PORT,
        dbName: env.MONGO_DB_DATABASE_NAME,
        userName: env.MONGO_DB_ROOT_USER_NAME,
        password: env.MONGO_DB_ROOT_PASSWORD,
        hostName: env.MONGO_DB_HOST_NAME
    },
    jwt: {
        accessKey: env.JWT_ACCESS_SECRET,
        refreshKey: env.JWT_REFRESH_SECRET
    }
};
