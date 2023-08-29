import { ITransactionCreate } from '@/models/transaction';

export default class Actions {
    async createTransaction( data: ITransactionCreate ) {
        console.log( data );
    }
}
