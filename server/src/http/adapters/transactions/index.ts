import { DateTime } from 'luxon';

import { ITransaction, ITransactionCreate, ITransactionDocument } from '@/models/transaction';
import { IRequestPost, IRequestPath } from '@/http/types/transactions';
import { ITransactionFull } from './types';
import BaseAdapter from '../base';

export default class DataAdapters extends BaseAdapter {
    static #allowedFieldNames = [ 'date', 'price' ];
    static #formatDateString = 'LLL-yy';

    static getTransactionFromBody( request: IRequestPost ): ITransactionCreate {
        const { locationServiceProviderId, date, price, } = request.body;

        return {
            locationServiceProviderId,
            date: new Date( date ),
            price,
        };
    }

    static getTransactionFull( data: ITransactionDocument ): ITransactionFull {
        return {
            id: data.id,
            locationServiceProviderId: data.locationServiceProviderId.toString(),
            date: new Date( data.date ).toISOString(),
            price: data.price,
        };
    }

    static getTransactionPartialFromBody( request: IRequestPath ): ITransaction {
        return super.getPartialFromBody<IRequestPath, ITransaction>( request, this.#allowedFieldNames );
    }

    static getTransactionDateFromFile( date: string ) {
        return DateTime.fromFormat( date, this.#formatDateString ).toJSDate();
    }

    static getTransactionPriceFromFile( price: string | number ): number {
        return Number( price ) ;
    }
}
