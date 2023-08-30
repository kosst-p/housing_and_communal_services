import { ITransactionCreate } from '@/models/transaction';
import { transactionRepository } from '@/repositories';
import { NotFoundError } from '@/errors';

export default class Actions {
    async getById( id: string ) {
        const item = await transactionRepository.getById( id );

        if ( ! item ) {
            throw new NotFoundError( 'This Transaction doesn\'t exist.' );
        }

        return item;
    }

    async create( data: ITransactionCreate ) {
        return await transactionRepository.create( data );
    }
}
