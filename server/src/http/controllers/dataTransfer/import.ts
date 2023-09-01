import { Request, Response, NextFunction } from '@http/types/index';
import { locationsActions, serviceProvidersActions } from '@/actions';
import LocationsDataAdapters from '@http/adapters/locations';
import ServiceProvidersDataAdapters from '@http/adapters/serviceProviders';

import XLSX from 'xlsx';
import { ParsedSheetData } from '@/http/types/dataTransfer';

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

            // console.log( '--- workSheets' );
            // console.log( workSheetNames );
            // console.log( '--- workSheets' );

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
                const locationCandidate = await locationsActions.get( request.user, adaptedLocationFromFile );

                if ( ! locationCandidate ) {
                    const createdLocation = await locationsActions.create( request.user, adaptedLocationFromFile );
                }

                const currentSheetData = workbook.Sheets[ sheetName ];
                const currentSheetDataRef = currentSheetData[ '!ref' ];

                if ( currentSheetDataRef ) {
                    const range = XLSX.utils.decode_range( currentSheetDataRef );
                    const parsedDataJsonFromSheet: ParsedSheetData[] = XLSX.utils.sheet_to_json( currentSheetData, { range } );

                    console.log( '***', parsedDataJsonFromSheet );

                    for ( const data of parsedDataJsonFromSheet ) {
                        const serviceProviderName = data[ '__EMPTY' ];

                        if ( serviceProviderName && serviceProviderName !== 'Итого:' ) {
                            const adaptedServiceProviderFromFile = ServiceProvidersDataAdapters.getServiceProviderFromFile( serviceProviderName );
                            const serviceProviderCandidate = await serviceProvidersActions.get( adaptedServiceProviderFromFile );

                            if ( ! serviceProviderCandidate ) {
                                const createdServiceProvider = await serviceProvidersActions.create( adaptedServiceProviderFromFile );
                            }
                        }
                    }


                }

            }
        }


        return response.send( { message: 'OK' } );
    }
    catch ( error ) {
        return next( error );
    }
}


