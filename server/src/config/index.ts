import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

dotenv.config( { path: './.env' } );

const env = cleanEnv( process.env, {
    PORT: num( { default: 5000 } ),
    MONGO_DB_ROOT_USER_NAME: str( { default: '' } ),
    MONGO_DB_ROOT_PASSWORD: str( { default: '' } ),
    MONGO_DB_PORT: num( { default: 27017 } ),
    MONGO_DB_DATABASE_NAME: str( { default: 'test' } )
} );

export default {
    serverPort: env.PORT,
    db: {
        port: env.MONGO_DB_PORT,
        dbName: env.MONGO_DB_DATABASE_NAME,
        userName: env.MONGO_DB_ROOT_USER_NAME,
        password: env.MONGO_DB_ROOT_PASSWORD
    }
};
