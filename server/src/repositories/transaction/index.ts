import Transaction, { ITransactionCreate } from '@models/transaction';

export default class Repository {
    async getById( id: string ) {
        return await Transaction.findById( id );
    }

    async create( data: ITransactionCreate ) {
        return await Transaction.create( data );
    }
}
