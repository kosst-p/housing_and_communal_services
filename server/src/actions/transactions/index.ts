import { ITransactionCreate } from '@/models/transaction';
import { transactionRepository } from '@/repositories';

export default class Actions {
    async create( data: ITransactionCreate ) {
        return await transactionRepository.create( data );
    }
}
