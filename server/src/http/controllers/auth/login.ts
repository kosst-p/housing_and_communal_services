import bcrypt from 'bcrypt';

import { ILoginRequest, Response, NextFunction } from '../../types/auth';
import { authRepository, userRepository } from '../../../repositories/index';

export async function login( request: ILoginRequest, response: Response, next: NextFunction ) {
    try {
        const user = await userRepository.getUserByName( request.body.name );

        if ( ! user ) {
            return response.status( 400 ).send( {
                status: 400,
                message: 'User not found',

            } );
        }

        const validPassword = bcrypt.compareSync( request.body.password, user.password );

        if ( ! validPassword ) {
            return response.status( 400 ).send( {
                status: 400,
                message: 'Password is not valid',

            } );
        }

        const token = authRepository.generateAccessToken( { id: user.id, name: user.name } );

        response.cookie( 'accessToken', token, { httpOnly: true } );

        return response.status( 200 ).send( {
            status: 200,
            message: 'Login',
            token
        } );
    }
    catch ( error ) {
        return next( error );
    }
}
