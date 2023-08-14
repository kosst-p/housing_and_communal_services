import { TRegistrationRequest, Response, NextFunction } from '../../types/auth';
import AuthRepository from '../../repositories/auth';
import UserRepository from '../../repositories/user';
import DataAdapters from '../../adapters';

export async function registration( request: TRegistrationRequest, response: Response, next: NextFunction ) {
    try {
        const authRepository = new AuthRepository();
        const userRepository = new UserRepository();
        const adaptUserData = DataAdapters.getUserDataFromBody( request.body );
        const user = await userRepository.createUser( adaptUserData );
        const token = await authRepository.generateAccessToken( { id: user.id, name: user.name, email: user.email } );

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
