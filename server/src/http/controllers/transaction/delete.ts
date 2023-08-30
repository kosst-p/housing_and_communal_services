import { Request, Response, NextFunction } from '@http/types/index';
import { transactionsActions } from '@actions/index';
import TransactionsDataAdapters from '@http/adapters/transactions';

export async function deleteTransaction( request: Request, response: Response, next: NextFunction ) {
    try {
        const transaction = await transactionsActions.getById( request.params.id );
        const deletedTransaction = await transactionsActions.delete( transaction.id );
        const adaptedDeletedTransaction = TransactionsDataAdapters.getTransactionFull( deletedTransaction! );

        return response.send( adaptedDeletedTransaction );
    }
    catch ( error ) {
        return next( error );
    }
}
