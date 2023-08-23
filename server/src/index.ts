import express from 'express';

import { config } from './config/index';
import router from './routes/index';
import middlewares from './http/middlewares/index';
import { cacheService, dbService } from './services';
import { logger } from './logger';

const app = express();

app.use( middlewares.withCors );
app.use( middlewares.jsonParse );
app.use( middlewares.routerLogger );
app.use( router );
app.use( middlewares.globalErrorHandle );

async function start() {
    try {
        await cacheService.init();
        await dbService.init();
        app.listen( config.serverPort, () => {
            logger.info( 'Server started!' );
        } );
    }
    catch ( error ) {
        logger.error( error );
    }
}

start();
