import express from 'express';

import { config } from './config/index';
import router from './routes/index';
import middlewares from './http/middlewares/index';
import DBService from './services/dbService';

const app = express();

app.use( middlewares.cors() );
app.use( middlewares.jsonParse );
app.use( router );
app.use( middlewares.globalErrorHandle );

async function start() {
    try {
        const DBServiceInstance = new DBService( config.db );

        await DBServiceInstance.init();
        app.listen( config.serverPort, () => {
            console.log( 'Server started!' );
        } );
    }
    catch ( error ) {
        console.log( error );
    }
}

start();
