import { Request, Response, NextFunction } from '@http/types/index';
import { transactionsActions } from '@/actions';

export async function importExcel( request: Request, response: Response, next: NextFunction ) {
    try {
        await transactionsActions.importExcel( request.user, request.file!.buffer );

        return response.send( { message: 'Success' } );
    }
    catch ( error ) {
        return next( error );
    }
}
