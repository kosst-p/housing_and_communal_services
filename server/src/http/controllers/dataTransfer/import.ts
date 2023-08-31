import { Request, Response, NextFunction } from '@http/types/index';

import XLSX from 'xlsx';

export async function importDataToDB( request: Request, response: Response, next: NextFunction ) {
    try {
        console.log( '---' );
        console.log( request.file );
        console.log( '---' );

        if ( request.file?.buffer ) {

            const fileContent = XLSX.read( request.file?.buffer, { type: 'buffer' } );
            const sheetNames = fileContent.SheetNames;
            const sheetName = fileContent.SheetNames[ 1 ];



            if ( fileContent.Sheets[ sheetName ][ '!ref' ] ) {

                const range = XLSX.utils.decode_range( fileContent.Sheets[ sheetName ][ '!ref' ]! );
                const data = XLSX.utils.sheet_to_json( fileContent.Sheets[ sheetName ], { range } );

                console.log( '***', range );
                console.log( '***', data );
            }


            fileContent;
            console.log( '**', fileContent );
            console.log( '***', sheetNames );
        }


        return response.send( { message: 'OK' } );
    }
    catch ( error ) {
        return next( error );
    }
}
