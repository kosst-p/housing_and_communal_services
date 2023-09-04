import { Response, NextFunction } from '@http/types/index';
import { IRequestPath } from '@/http/types/transactions';
import TransactionsDataAdapters from '@http/adapters/transactions';
import { transactionsActions } from '@actions/index';

export async function updateTransaction( request: IRequestPath, response: Response, next: NextFunction ) {
    try {
        const transaction = await transactionsActions.getById( request.params.id );
        const adaptedTransactionFromBody = TransactionsDataAdapters.getTransactionPartialFromBody( request );
        const updatedTransaction = await transactionsActions.update( transaction.id, adaptedTransactionFromBody );
        const adaptedUpdatedTransaction = TransactionsDataAdapters.getTransactionFull( updatedTransaction! );

        return response.send( adaptedUpdatedTransaction );
    }
    catch ( error ) {
        return next( error );
    }
}
