import express from 'express';

const app = express();

app.get( '/', ( request, response ) => {
    response.send( 'Hello World!! How are you?' );
} );

app.listen( 3000, () => {
    console.log( 'Server started!' );
} );