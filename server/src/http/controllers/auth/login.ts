import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import AuthService from '../../services/auth';
import UserService from '../../services/user';

export async function login( request: Request, response: Response, next: NextFunction ) {
    try {
        const authService = new AuthService();
        const userService = new UserService();

        const user = await userService.getUserByName( request.body.name ); // type

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
