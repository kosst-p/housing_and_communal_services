import { Request, Response, NextFunction } from 'express';

import AuthRepository from '../repositories/auth';
import { UnauthorizedError } from '../../errors';

export function validationJwt( request: Request, _response: Response, next: NextFunction ) {
    try {
        const authorizationHeader = request.headers.authorization;

        if ( ! authorizationHeader ) {
            throw new UnauthorizedError();
        }

        const accessToken = authorizationHeader.split( ' ' )[ 1 ] ;

        if ( ! accessToken ) {
            throw new UnauthorizedError();
        }

        const authRepository = new AuthRepository();
        const result = authRepository.validationAccessToken( accessToken );

        request.user = result;
        next();
    }
    catch ( error ) {
        console.log( error );

        throw new UnauthorizedError();
    }
}
