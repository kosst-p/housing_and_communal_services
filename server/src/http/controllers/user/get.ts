import { usersActions } from '@/actions';
import { Request, Response, NextFunction } from '@http/types/index';

export async function getUser( request: Request, response: Response, next: NextFunction ) {
    try {
        const user = await usersActions.getById( request.params.id );

        return response.json( user );
    }
    catch ( error ) {
        return next( error );
    }
}

export async function getUsers( _request: Request, response: Response, next: NextFunction ) {
    try {
        const users = await usersActions.getAll();

        return response.json( users );
    }
    catch ( error ) {
        return next( error );
    }
}
