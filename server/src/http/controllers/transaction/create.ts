import { Response, NextFunction } from '@http/types/index';
import { IRequestPostTransaction } from '@/http/types/transactions';
// import { transactionsActions } from '@actions/index';
// import TransactionsDataAdapters from '@http/adapters/locations';

export async function createTransaction( request: IRequestPostTransaction, response: Response, next: NextFunction ) {
    try {
        // const adaptedTransactionFromBody = LocationsDataAdapters.getTransactionFromBody( request );
        // const createdTransaction = locationsActions.createTransaction( adaptedTransactionFromBody );
        // const adaptedCreatedTransaction

        // return response.send( adaptedCreatedTransaction );
    }
    catch ( error ) {
        return next( error );
    }
}
