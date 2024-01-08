import { ITransactionCreate, ITransactionFilterQuery, ITransactionUpdate } from '@/models/transaction';
import { IUserAuth } from '@/models/user';
import { ParsedSheetData } from '@/http/types/dataTransfer';
import { fileParserService } from '@/services';
import { transactionRepository } from '@/repositories';
import { NotFoundError } from '@/errors';
import { isEmptyObject } from '@/utils/object';
import { locationsActions, serviceProvidersActions } from '@/actions/index';
import TransactionsDataAdapters from '@http/adapters/transactions';

export default class Actions {
    async getById( id: string ) {
        const item = await transactionRepository.getById( id );

        if ( ! item ) {
            throw new NotFoundError( 'This Transaction doesn\'t exist.' );
        }

        return item;
    }

    async get<T extends ITransactionFilterQuery>( filter: T ) {
        return await transactionRepository.get( filter );
    }

    async create( data: ITransactionCreate ) {
        return await transactionRepository.create( data );
    }

    async delete( id: string ) {
        return await transactionRepository.delete( id );
    }

    async update( id: string, data: ITransactionUpdate ) {
        return await transactionRepository.update( id, data );
    }

    async importExcel( user: IUserAuth, buffer: Buffer ) {
        const workbook = fileParserService.getWorkBook( buffer, { type: 'buffer', } );
        const workSheetNames: string[] = workbook.SheetNames;

        for ( const sheetName of workSheetNames ) {
            const location = await locationsActions.generateExcelLocation( user, sheetName );
            const currentSheetData = workbook.Sheets[ sheetName ];
            const currentSheetDataRef = currentSheetData[ '!ref' ];

            if ( ! currentSheetDataRef ) {
                continue;
            }

            const range = fileParserService.getDecodeRange( currentSheetDataRef );
            const parsedSheetData = fileParserService.parseSheetToJson<ParsedSheetData[]>( currentSheetData, { range, } );
            const actualParsedSheetData = this.getActualParsedSheetData<ParsedSheetData[]>( parsedSheetData );

            for ( const rowSheetData of actualParsedSheetData ) {
                const serviceProvider = await serviceProvidersActions.generateExcelServiceProvider( rowSheetData );

                if ( ! location || ! serviceProvider ) {
                    continue;
                }

                const attachedServiceProvider = await locationsActions.generateExcelAttachedServiceProvider( location, serviceProvider );

                if ( attachedServiceProvider ) {
                    for ( const cellSheetKey in rowSheetData ) {
                        if ( ! Object.prototype.hasOwnProperty.call( rowSheetData, cellSheetKey ) ) {
                            continue;
                        }

                        const cellSheetValue = rowSheetData[ cellSheetKey ];

                        await this.generateExcelTransaction( attachedServiceProvider.id, cellSheetKey, cellSheetValue );
                    }
                }
            }
        }
    }

    private async generateExcelTransaction( attachedServiceProviderId: string, date: string, price: string | number ) {
        let transaction = null;
        const parsedDate = TransactionsDataAdapters.getTransactionDateFromFile( date );
        const parsedPrice = TransactionsDataAdapters.getTransactionPriceFromFile( price );

        if ( ! parsedDate || ! parsedPrice ) {
            return transaction;
        }

        const candidate = await this.get( {
            locationServiceProviderId: attachedServiceProviderId,
            date: parsedDate,
        } );

        if ( ! candidate ) {
            transaction = await this.create( {
                locationServiceProviderId: attachedServiceProviderId,
                date: parsedDate,
                price: parsedPrice,
            } );
        }
        else {
            transaction = await this.update( candidate.id, { price: parsedPrice, } );
        }

        return transaction;
    }

    /* Get all data before an empty(blank) line. */

    getActualParsedSheetData<T extends unknown[]>( sheetData: T ): T {
        const actualData = [] as unknown[] as T;

        for ( const data of sheetData ) {
            if ( isEmptyObject( data ) ) {
                break;
            }

            actualData.push( data );
        }

        return actualData;
    }
}
