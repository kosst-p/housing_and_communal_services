import { Request, Response, NextFunction } from '@http/types/index';
import { cacheService, authService } from '@services/index';

import { ForbiddenError, UnauthorizedError } from '@errors/index';

export async function logout( request: Request, response: Response, next: NextFunction ) {
    try {
        const userId = request.user.id;

        if ( ! userId ) {
            throw new ForbiddenError();
        }

        const accessToken = authService.parseAccessToken( request.headers.authorization );

        if ( ! accessToken ) {
            throw new UnauthorizedError();
        }

        await cacheService.delete( accessToken );

        return response.send( {
            message: 'Success',
        } );
    }
    catch ( error ) {
        return next( error );
    }
}
