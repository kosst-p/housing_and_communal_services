import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config/index.ts';
import router from './routes/index.ts';
import middlewares from './http/middlewares/index.ts';

const app = express();

app.use( cors() );
app.use( middlewares.jsonParse );
app.use( router );
app.use( middlewares.globalErrorHandle );

async function start() {
    try {
        await mongoose.connect( `mongodb://${ config.db.userName }:${ config.db.password }@localhost:${ config.db.port }/?authMechanism=DEFAULT` );
        app.listen( config.serverPort, () => {
            console.log( 'Server started!' );
        } );
    }
    catch ( error ) {
        console.log( error );
    }
}

start();
