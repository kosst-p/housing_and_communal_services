import { Response, NextFunction } from '../../types/index';
import { IRegistrationRequest } from '../../types/auth';
import { authRepository, userRepository } from '@repositories/index';
import { cacheService } from '@services/index';
import UserDataAdapters from '../../adapters/users';

export async function registration( request: IRegistrationRequest, response: Response, next: NextFunction ) {
    try {
        const adaptUserData = UserDataAdapters.getUserDataFromBody( request );
        const user = await userRepository.createUser( adaptUserData );
        const token = authRepository.generateAccessToken( { id: user.id, name: user.name, email: user.email } );

        await cacheService.set( token, true );

        return response.status( 200 ).send( {
            status: 200,
            message: 'You are registered.',
            token
        } );
    }
    catch ( error ) {
        return next( error );
    }
}
