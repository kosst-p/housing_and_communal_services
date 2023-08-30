import { ITransactionCreate, ITransactionDocument } from '@/models/transaction';
import { IRequestPost } from '@/http/types/transactions';
import { ITransactionFull } from './types';
import BaseAdapter from '../base';

export default class DataAdapters extends BaseAdapter {
    static getTransactionFromBody( request: IRequestPost ): ITransactionCreate {
        const { locationServiceProviderId, date, price } = request.body;

        return {
            locationServiceProviderId,
            date,
            price
        };
    }

    static getTransactionFull( data: ITransactionDocument ): ITransactionFull {
        return {
            id: data.id,
            locationServiceProviderId: data.locationServiceProviderId.toString(),
            date: data.date,
            price: data.price
        };
    }
}
