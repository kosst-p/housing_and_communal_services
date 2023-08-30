import { Request, Response, NextFunction } from '@http/types/index';
import { transactionsActions } from '@actions/index';
import TransactionsDataAdapters from '@http/adapters/transactions';

export async function getTransaction( request: Request, response: Response, next: NextFunction ) {
    try {
        const transaction = await transactionsActions.getById( request.params.id );
        const adaptedTransaction = TransactionsDataAdapters.getTransactionFull( transaction );

        return response.send( adaptedTransaction );
    }
    catch ( error ) {
        return next( error );
    }
}
