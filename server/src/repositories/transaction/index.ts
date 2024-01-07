import Transaction, { ITransactionCreate, ITransactionFilterQuery, ITransactionUpdate } from '@models/transaction';

export default class Repository {
    async getById( id: string ) {
        return await Transaction.findById( id );
    }

    async get<T extends ITransactionFilterQuery>( filter: T ) {
        return await Transaction.findOne( filter );
    }

    async create( data: ITransactionCreate ) {
        return await Transaction.create( data );
    }

    async delete( id: string ) {
        return await Transaction.findByIdAndRemove( id );
    }

    async update( id: string, data: ITransactionUpdate ) {
        return await Transaction.findByIdAndUpdate( id, data, {
            new: true,
        } );
    }
}
