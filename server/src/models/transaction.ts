import DBService from '@services/dbService';

import { ObjectId } from '@services/types';

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
