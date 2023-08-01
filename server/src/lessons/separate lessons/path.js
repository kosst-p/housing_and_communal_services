import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

console.log( path.join( 'first', 'second', 'third' ) );
console.log( path.join( __dirname, 'first', 'second', 'third' ) );
console.log( path.join( __dirname, '..', '..' ) );

const fullPath = path.resolve( 'first', 'second', 'third' );
console.log( path.parse( fullPath ) );

const siteUrl = 'http://localhost:8080/users?id=5123';
const url = new URL( siteUrl );
console.log( url );


