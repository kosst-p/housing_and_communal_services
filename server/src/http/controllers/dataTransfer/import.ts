import XLSX from 'xlsx';

import { Request, Response, NextFunction } from '@http/types/index';
import { locationsActions, serviceProvidersActions, transactionsActions } from '@/actions';
import LocationsDataAdapters from '@http/adapters/locations';
import ServiceProvidersDataAdapters from '@http/adapters/serviceProviders';
import { ParsedSheetData } from '@/http/types/dataTransfer';
import TransactionsDataAdapters from '@http/adapters/transactions';
import { ILocationDocument } from '@/models/location'; // ?
import { IServiceProviderDocument } from '@/models/serviceProvider'; // ?
import { isEmptyObject } from '@/utils/object';

export async function importData( request: Request, response: Response, next: NextFunction ) {
    try {
        // check extension.

        if ( request.file?.buffer ) {
            const workbook = XLSX.read( request.file?.buffer, { type: 'buffer' } );
            const workSheetNames: string[] = workbook.SheetNames;

            for ( const sheetName of workSheetNames ) {
                const location = await generateLocation( request, sheetName );
                const currentSheetData = workbook.Sheets[ sheetName ];
                const currentSheetDataRef = currentSheetData[ '!ref' ];

                if ( currentSheetDataRef ) {
                    const range = XLSX.utils.decode_range( currentSheetDataRef );
                    const parsedDataJsonFromSheet: ParsedSheetData[] = XLSX.utils.sheet_to_json( currentSheetData, { range,
                        blankrows: true } );
                    const actualParsedDataJsonFromSheet = getActualParsedDataJsonFromSheet( parsedDataJsonFromSheet );

                    for ( const data of actualParsedDataJsonFromSheet ) {
                        const serviceProvider = await generateServiceProvider( data );

                        if ( location && serviceProvider ) {
                            const attachedServiceProvider = await generateAttachedServiceProvider( location, serviceProvider );

                            if ( attachedServiceProvider ) {
                                for ( const key in data ) {
                                    if ( Object.prototype.hasOwnProperty.call( data, key ) ) {
                                        const value = data[ key ];

                                        await generateTransaction( attachedServiceProvider.id, key, value );
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return response.send( { message: 'Success' } );
    }
    catch ( error ) {
        return next( error );
    }
}
/* Get all data before an empty(blank) line. */

function getActualParsedDataJsonFromSheet( sheetData: ParsedSheetData[] ) {
    const actualData: ParsedSheetData[] = [];

    for ( const data of sheetData ) {
        if ( isEmptyObject( data ) ) {
            break;
        }

        actualData.push( data );
    }

    return actualData;
}

async function generateLocation( request: Request, sheetName: string ) {
    let location = null;
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
    let serviceProvider = null;
    const serviceProviderName = data[ '__EMPTY' ];

    if ( serviceProviderName ) {
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
    let attachedServiceProvider = null;

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

async function generateTransaction( attachedServiceProviderId: string, date: string, price: string | number ) {
    let transaction = null;
    const parsedDate = TransactionsDataAdapters.getTransactionDateFromFile( date );
    const parsedPrice = TransactionsDataAdapters.getTransactionPriceFromFile( price );

    if ( ! parsedDate || ! parsedPrice ) {
        return transaction;
    }

    const candidate = await transactionsActions.get( {
        locationServiceProviderId: attachedServiceProviderId,
        date: parsedDate
    } );

    if ( ! candidate ) {
        transaction = await transactionsActions.create( {
            locationServiceProviderId: attachedServiceProviderId,
            date: parsedDate,
            price: parsedPrice
        } );
    }
    else {
        transaction = await transactionsActions.update( candidate.id, { price: parsedPrice } );
    }

    return transaction;
}
