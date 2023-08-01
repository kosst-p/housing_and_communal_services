import Emitter from 'events';
import dotenv from 'dotenv';

dotenv.config( { path: '../../.env' } );
const emitter = new Emitter();

emitter.on( 'message', ( data, second ) => {
    console.log( 'data: ',data );
    console.log( 'second: ',second );
} );

const MESSAGE = process.env.MESSAGE_EVENT_TEST || '';

if ( MESSAGE ) {
    emitter.emit( 'message', MESSAGE, 'hello' );
} else {
    emitter.emit( 'message', 'no message' );
}