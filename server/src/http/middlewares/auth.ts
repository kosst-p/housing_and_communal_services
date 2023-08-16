import { Request, Response, NextFunction } from 'express';

import { authRepository } from '../../repositories/index';
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

        const result = authRepository.validationAccessToken( accessToken );

        request.user = result;
        next();
    }
    catch ( error ) {
        throw new UnauthorizedError();
    }
}
