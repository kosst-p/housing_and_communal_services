import { Request, Response, NextFunction } from '../types/index';

import { authRepository } from '@repositories/index';
import { cacheService } from '@services/index';
import { UnauthorizedError } from '@errors/index';

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
