import { Request, Response, NextFunction } from 'express';

export function createUser( request: Request, response: Response, next: NextFunction ) {
    try {
        return response.json( request.body );
    }
    catch ( error ) {
        return next( error );
    }
}
