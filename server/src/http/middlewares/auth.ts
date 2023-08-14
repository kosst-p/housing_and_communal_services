import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import AuthRepository from '../repositories/auth';
import { UnauthorizedError } from '../../errors';

interface IJwtRequest extends Request {
    user?: JwtPayload | string;
}

export function validationJwt( request: IJwtRequest, response: Response, next: NextFunction ) {
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
        // TODO:
        const result = authRepository.validationAccessToken( accessToken );

        request.user = result;
        next();
    }
    catch ( error ) {
        throw new UnauthorizedError();
    }
}
