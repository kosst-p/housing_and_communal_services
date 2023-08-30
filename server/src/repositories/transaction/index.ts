import Transaction, { ITransactionCreate } from '@models/transaction';

export default class Repository {
    async create( data: ITransactionCreate ) {
        return await Transaction.create( data );
    }
}
