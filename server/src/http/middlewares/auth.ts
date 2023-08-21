import { Request, Response, NextFunction } from 'express';

import { authRepository } from '../../repositories/index';
import { cacheService } from '../../services';
import { UnauthorizedError } from '../../errors';

export async function validationJwt( request: Request, _response: Response, next: NextFunction ) {
    try {
        const accessToken = authRepository.parseAccessToken( request.headers.authorization );

        if ( ! accessToken ) {
            throw new UnauthorizedError();
        }

        const cacheAccessTokenApplicable = await cacheService.check( accessToken );

        if ( ! cacheAccessTokenApplicable ) {
            throw new UnauthorizedError();
        }

        const result = authRepository.validationAccessToken( accessToken );

        request.user = result;
        next();
    }
    catch ( error ) {
        return next( error );
    }
}
