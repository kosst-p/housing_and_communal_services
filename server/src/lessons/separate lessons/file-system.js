import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config( { path: '../../.env' } );

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

// console.log( 'start' );

// fs.mkdir( path.resolve( __dirname, 'dir' ), ( error ) => {
//     if ( error ) {
//         console.log( error );
//         return;
//     }
//     console.log( 'Folders were completed' );
// } );

// console.log( 'end' );

// fs.rmdir( path.resolve( __dirname, 'dir' ), ( error ) => {
//     if ( error ) {
//         console.log( error );
//         return;
//     }
//     console.log( 'Folder was removed' );
// } );

// fs.writeFile( path.resolve( __dirname, 'test.txt' ), 'Hello World!', ( error ) => {
//     if ( error ) {
//         console.log( error );
//         return;
//     }
//     fs.appendFile( path.resolve( __dirname, 'test.txt' ), '\nReady', ( error ) => {
//         if ( error ) {
//             console.log( error );
//             return;
//         }
//         console.log( 'Done' );
//     } );
// } );

async function writeFileAsync( path, data ) {
    return new Promise( ( resolve, reject ) => {
        fs.writeFile( path, data, ( error ) => {
            if ( error ) {
                return reject( error );
            }
            resolve();
        } );
    } );
}

// async function appendFileAsync( path, data ) {
//     return new Promise( ( resolve, reject ) => {
//         fs.appendFile( path, data, ( error ) => {
//             if ( error ) {
//                 return reject( error );
//             }
//             resolve();
//         } );
//     } );
// }

// await writeFileAsync( path.resolve( __dirname, 'test1.txt' ), 'New World Order!' );
// await appendFileAsync( path.resolve( __dirname, 'test1.txt' ), '\nNWO' );

async function readFileAsync( path ) {
    return new Promise( ( resolve, reject ) => {
        fs.readFile( path, { encoding:'utf8' } , ( error, data ) => {
            if ( error ) {
                return reject( error );
            }
            resolve( data );
        } );
    } );
}

async function removeFileAsync( path ) {
    return new Promise( ( resolve, reject ) => {
        fs.rm( path, ( error ) => {
            if ( error ) {
                return reject( error );
            }
            resolve();
        } );
    } );
}

// writeFileAsync( path.resolve( __dirname, 'test1.txt' ), 'New World Order!' )
//     .then( () => appendFileAsync( path.resolve( __dirname, 'test1.txt' ), '\nNWO' ) )
//     .then( () => appendFileAsync( path.resolve( __dirname, 'test1.txt' ), '\nNWO2' ) )
//     .then( () => appendFileAsync( path.resolve( __dirname, 'test1.txt' ), '\nNWO3' ) )
//     .then( () => readFileAsync( path.resolve( __dirname, 'test1.txt' ) ) )
//     .then( ( data ) => console.log( data ) )
//     .catch( ( error ) => console.log( error ) );

// removeFileAsync( path.resolve( __dirname, 'test1.txt' ) )
//     .then( () => console.log( 'File was removed' ) );

const text = process.env.TEXT;
const pathToFile = path.resolve( __dirname, 'lesson.txt' );

writeFileAsync( pathToFile, text )
    .then( () => readFileAsync( pathToFile ) )
    .then( ( data ) => {
        console.log( 'number of words: ', data.split( ' ' ).length );
        return data.split( ' ' ).length.toString();
    } )
    .then( ( data ) => writeFileAsync( path.resolve( __dirname, 'lesson1.txt' ), data ) )
    .then( () => removeFileAsync( pathToFile ) )
    .then( () => console.log( 'File was removed' ) )
    .catch( ( error ) => console.log( error ) );