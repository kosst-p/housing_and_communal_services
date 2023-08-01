import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
// const pathToFile = path.resolve( __dirname, 'txtstream.txt' );

// fs.readFile( path.resolve( __dirname, 'txtstream.txt' ), ( error, data ) => {
//     if ( error ) {
//         throw error;
//     }
//     console.log( data );
// } );

// const stream = fs.createReadStream( pathToFile );
// stream.on( 'data', ( chunk ) => {
//     console.log( 'chunk: ', chunk );
// } );

const writableStream = fs.createWriteStream( path.resolve( __dirname, 'txtstream2.txt' ) );
for ( let index = 0; index < 20; index++ ) {
    writableStream.write( index + '\n***' );

}
writableStream.end();