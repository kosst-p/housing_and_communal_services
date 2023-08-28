import dotenv from 'dotenv';
import { cleanEnv, str } from 'envalid';

dotenv.config( { path: './.env' } );

interface IConfig {
    apiUrl: string,
}

const env = cleanEnv( process.env, {
    API_URL: str( { default: 'http://localhost:3000' } ),
} );

export const config: IConfig = {
    apiUrl: env.API_URL,
};
