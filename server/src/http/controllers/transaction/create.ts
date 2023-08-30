import { Response, NextFunction } from '@http/types/index';
import { IRequestPost } from '@/http/types/transactions';
import { transactionsActions } from '@actions/index';
import TransactionsDataAdapters from '@http/adapters/transactions';

export async function createTransaction( request: IRequestPost, response: Response, next: NextFunction ) {
    try {
        const adaptedTransactionFromBody = TransactionsDataAdapters.getTransactionFromBody( request );
        const createdTransaction = await transactionsActions.create( adaptedTransactionFromBody );
        const adaptedCreatedTransaction = TransactionsDataAdapters.getTransactionFull( createdTransaction );

        return response.send( adaptedCreatedTransaction );
    }
    catch ( error ) {
        return next( error );
    }
}
