import { Request, Response, NextFunction } from 'express';

import { User } from '../../../models/user';
import { ValidationError } from '../../../errors';

export async function getUser( request: Request, response: Response, next: NextFunction ) {
    try {
        const { id } = request.params;

        if ( ! id ) {
            throw new ValidationError( 'ID do not set' );
        }

        const user = await User.findById( id );

        return response.json( user );
    }
    catch ( error ) {
        return next( error );
    }
}

export async function getUsers( _request: Request, response: Response, next: NextFunction ) {
    try {
        const Users = await User.find();

        return response.json( Users );
    }
    catch ( error ) {
        return next( error );
    }
}
