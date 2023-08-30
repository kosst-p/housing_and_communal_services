import { Document, FilterQuery, ObjectId } from '@services/types';
import DBService from '@services/dbService';

export interface ITransaction {
    locationServiceProviderId: typeof ObjectId,
    date: Date,
    price: number
}

export interface ITransactionCreate {
    locationServiceProviderId: string,
    date: Date,
    price: number
}

export interface ITransactionUpdate {
    date?: Date,
    price?: number
}

export interface ITransactionDocument extends ITransaction, Document {}

export interface ITransactionFilterQuery extends FilterQuery<ITransaction> {}

const schema = DBService.getSchema<ITransaction>(
    {
        locationServiceProviderId: {
            type: ObjectId,
            ref: 'LocationServiceProvider',
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        }
    }
);

export default DBService.getModel<ITransaction>( 'Transaction', schema );
