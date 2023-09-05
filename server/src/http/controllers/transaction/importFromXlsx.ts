import { Request, Response, NextFunction } from '@http/types/index';
import { transactionsActions } from '@/actions';

export async function importFromXlsx( request: Request, response: Response, next: NextFunction ) {
    try {
        await transactionsActions.importFromXlsx( request.user, request.file!.buffer );

        return response.send( { message: 'Success' } );
    }
    catch ( error ) {
        return next( error );
    }
}
