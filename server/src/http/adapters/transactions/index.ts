import { ITransactionCreate } from '@/models/transaction';
import { IRequestPostTransaction } from '@/http/types/transactions';
import BaseAdapter from '../base';

export default class DataAdapters extends BaseAdapter {
    static getTransactionFromBody( request: IRequestPostTransaction ): ITransactionCreate {
        return {
            locationServiceProviderId: request.params.attachedServiceProviderId,
            date: request.body.date,
            price: request.body.price
        };
    }
}
