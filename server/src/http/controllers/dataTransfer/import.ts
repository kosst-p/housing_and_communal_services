import { Request, Response, NextFunction } from '@http/types/index';
import { locationsActions } from '@/actions';
import LocationsDataAdapters from '@http/adapters/locations';

import XLSX from 'xlsx';

export async function importDataToDB( request: Request, response: Response, next: NextFunction ) {
    try {
        //

        console.log( '--- request.file' );
        console.log( request.file );
        console.log( '--- request.file' );

        if ( request.file?.buffer ) {
            const workbook = XLSX.read( request.file?.buffer, { type: 'buffer' } );

            console.log( '--- workbook' );
            console.log( workbook );
            console.log( '--- workbook' );

            const workSheetNames: string[] = workbook.SheetNames; // locations

            console.log( '--- workSheets' );
            console.log( workSheetNames );
            console.log( '--- workSheets' );

            // const workSheets: { [key: string]: unknown[] } = {};

            // for ( const sheetName of workbook.SheetNames ) {
            //     workSheets[ sheetName as keyof typeof workSheets ] = XLSX.utils.sheet_to_json( workbook.Sheets[ sheetName ] );
            // }

            // console.log( '--- workSheets' );
            // console.log( workSheets );
            // console.log( '--- workSheets' );

            // if ( workbook.Sheets[ sheetName ][ '!ref' ] ) {

            //     const range = XLSX.utils.decode_range( workbook.Sheets[ sheetName ][ '!ref' ]! );
            //     const data = XLSX.utils.sheet_to_json( workbook.Sheets[ sheetName ], { range } );

            //     console.log( '***', range );
            //     console.log( '***', data );
            // }

            for ( const sheetName of workSheetNames ) {
                const adaptedLocationFromFile = LocationsDataAdapters.getLocationFromFile( sheetName );
                const candidate = await locationsActions.get( request.user, adaptedLocationFromFile );

                if ( ! candidate ) {
                    await locationsActions.create( request.user, adaptedLocationFromFile );
                }

            }
        }


        return response.send( { message: 'OK' } );
    }
    catch ( error ) {
        return next( error );
    }
}


