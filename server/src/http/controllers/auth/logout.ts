import { Request, Response, NextFunction } from '../../types/auth';
import { ForbiddenError, UnauthorizedError } from '../../../errors';
import { cacheService } from '../../../services';
import { authRepository } from '../../../repositories';

export async function logout( request: Request, response: Response, next: NextFunction ) {
    try {
        const userId = request.user.id;

        if ( ! userId ) {
            throw new ForbiddenError();
        }

        const accessToken = authRepository.parseAccessToken( request.headers.authorization );

        if ( ! accessToken ) {
            throw new UnauthorizedError();
        }

        await cacheService.delete( accessToken );

        return response.status( 200 ).send( {
            status: 200,
            message: 'Logout',
        } );
    }
    catch ( error ) {
        return next( error );
    }
}
