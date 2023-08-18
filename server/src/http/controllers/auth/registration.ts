import { IRegistrationRequest, Response, NextFunction } from '../../types/auth';
import { authRepository, userRepository } from '../../../repositories/index';
import UserDataAdapters from '../../adapters/users';

export async function registration( request: IRegistrationRequest, response: Response, next: NextFunction ) {
    try {
        const adaptUserData = UserDataAdapters.getUserDataFromBody( request );
        const user = await userRepository.createUser( adaptUserData );
        const token = authRepository.generateAccessToken( { id: user.id, name: user.name, email: user.email } );

        response.cookie( 'accessToken', token, { httpOnly: true } );

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
