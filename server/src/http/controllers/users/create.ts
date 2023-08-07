import { Request, Response, NextFunction } from 'express';

import User from '../../../models/user';

export function createUser( request: Request, response: Response, next: NextFunction ) {
    try {
        const user = User.create( request.body );

        return response.json( user );
    }
    catch ( error ) {
        return next( error );
    }
}
