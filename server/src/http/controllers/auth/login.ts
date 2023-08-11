import bcrypt from 'bcrypt';

import { ILoginRequest, TResponse, TNextFunction } from './types';
import AuthService from '../../services/auth';
import UserService from '../../services/user';

export async function login( request: ILoginRequest, response: TResponse, next: TNextFunction ) {
    try {
        const authService = new AuthService();
        const userService = new UserService();
        const user = await userService.getUserByName( request.body.name );

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
                message: 'Password iss not valid',

            } );
        }

        const token = await authService.generateAccessToken( { id: user.id, name: user.name } );

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
