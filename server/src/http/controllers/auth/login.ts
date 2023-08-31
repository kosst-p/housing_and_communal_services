import bcrypt from 'bcrypt';

import { Response, NextFunction } from '@http/types/index';
import { ILoginRequest } from '@http/types/auth';
import { cacheService, authService } from '@services/index';
import { usersActions } from '@/actions';
import { ValidationError } from '@/errors';

export async function login( request: ILoginRequest, response: Response, next: NextFunction ) {
    try {
        const user = await usersActions.get( request.body.name );
        const isValidPassword = bcrypt.compareSync( request.body.password, user.password );

        if ( ! isValidPassword ) {
            throw new ValidationError( 'Password is not valid.' );
        }

        const token = authService.generateAccessToken( { id: user.id, name: user.name } );

        await cacheService.set( token, token );

        return response.send( {
            message: 'Success',
            token
        } );
    }
    catch ( error ) {
        return next( error );
    }
}
