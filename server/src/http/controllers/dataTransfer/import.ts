import XLSX from 'xlsx';

import { Request, Response, NextFunction } from '@http/types/index';
import { locationsActions, serviceProvidersActions } from '@/actions';
import LocationsDataAdapters from '@http/adapters/locations';
import ServiceProvidersDataAdapters from '@http/adapters/serviceProviders';
import { ParsedSheetData } from '@/http/types/dataTransfer';
import { ILocationDocument } from '@/models/location'; // ?
import { IServiceProviderDocument } from '@/models/serviceProvider'; // ?
import { ILocationServiceProviderDocument } from '@/models/locationServiceProvider';

export async function importData( request: Request, response: Response, next: NextFunction ) {
    try {
        // check extension.

        // console.log( '--- request.file' );
        // console.log( request.file );
        // console.log( '--- request.file' );

        if ( request.file?.buffer ) {
            const workbook = XLSX.read( request.file?.buffer, { type: 'buffer' } );

            // console.log( '--- workbook' );
            // console.log( workbook );
            // console.log( '--- workbook' );

            const workSheetNames: string[] = workbook.SheetNames; // locations

            for ( const sheetName of workSheetNames ) {
                const location = await generateLocation( request, sheetName );
                const currentSheetData = workbook.Sheets[ sheetName ];
                const currentSheetDataRef = currentSheetData[ '!ref' ];

                if ( currentSheetDataRef ) {
                    const range = XLSX.utils.decode_range( currentSheetDataRef );
                    const parsedDataJsonFromSheet: ParsedSheetData[] = XLSX.utils.sheet_to_json( currentSheetData, { range } );

                    // console.log( '--- sheetName' );
                    // console.log( sheetName );
                    // console.log( '--- sheetName' );
                    // console.log( '--- parsedDataJsonFromSheet' );
                    // console.log( parsedDataJsonFromSheet );
                    // console.log( '--- parsedDataJsonFromSheet' );

                    for ( const data of parsedDataJsonFromSheet ) {
                        const serviceProvider = await generateServiceProvider( data );

                        if ( location && serviceProvider ) {

                            // console.log( '--- data' );
                            // console.log( data );
                            // console.log( '--- data' );


                            const attachedServiceProvider = await generateAttachedServiceProvider( location, serviceProvider );

                            generateTransactions( data );
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

async function generateLocation( request: Request, sheetName: string ) {
    let location;
    const adaptedLocationFromFile = LocationsDataAdapters.getLocationFromFile( sheetName );
    const locationCandidate = await locationsActions.get( request.user, adaptedLocationFromFile );

    if ( ! locationCandidate ) {
        location = await locationsActions.create( request.user, adaptedLocationFromFile );
    }
    else {
        location = locationCandidate;
    }

    return location;
}

async function generateServiceProvider( data: ParsedSheetData ) {
    let serviceProvider;
    const serviceProviderName = data[ '__EMPTY' ];

    if ( serviceProviderName && serviceProviderName !== 'Итого:' ) {
        const adaptedServiceProviderFromFile = ServiceProvidersDataAdapters.getServiceProviderFromFile( serviceProviderName );
        const serviceProviderCandidate = await serviceProvidersActions.get( adaptedServiceProviderFromFile );

        if ( ! serviceProviderCandidate ) {
            serviceProvider = await serviceProvidersActions.create( adaptedServiceProviderFromFile );
        }
        else {
            serviceProvider = serviceProviderCandidate;
        }
    }

    return serviceProvider;
}

async function generateAttachedServiceProvider( location: ILocationDocument, serviceProvider: IServiceProviderDocument ) {
    let attachedServiceProvider;

    const candidateAttachedServiceProvider = await locationsActions.getAttachedServiceProvider( {
        locationId: location.id,
        serviceProviderId: serviceProvider.id,
    } );

    if ( ! candidateAttachedServiceProvider ) {
        attachedServiceProvider = await locationsActions.attachServiceProvider( location, serviceProvider );
    }
    else {
        attachedServiceProvider = candidateAttachedServiceProvider;
    }

    return attachedServiceProvider;
}

function generateTransactions( data: ParsedSheetData ) {
    let transaction;


    console.log( '1', data );
    // candidate
    // if candidate
    // create
    // else
    // update

    // const createdTransaction = await transactionsActions.create( adaptedTransactionFromBody );
    // const updatedTransaction = await transactionsActions.update( transaction.id, adaptedTransactionFromBody );


    return transaction;
}
