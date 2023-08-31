import { Request, Response, NextFunction } from '@http/types/index';

import { cacheService, authService } from '@services/index';
import { UnauthorizedError } from '@errors/index';

export async function validationJwt( request: Request, _response: Response, next: NextFunction ) {
    try {
        const accessToken = authService.parseAccessToken( request.headers.authorization );

        if ( ! accessToken ) {
            throw new UnauthorizedError();
        }

        const cacheAccessTokenApplicable = await cacheService.check( accessToken );

        if ( ! cacheAccessTokenApplicable ) {
            throw new UnauthorizedError();
        }

        const result = authService.validationAccessToken( accessToken );

        request.user = result;
        next();
    }
    catch ( error ) {
        return next( error );
    }
}
