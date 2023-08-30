import Transaction, { ITransactionCreate } from '@models/transaction';

export default class TransactionRepository {
    async create( data: ITransactionCreate ) {
        return await Transaction.create( data );
    }
}
