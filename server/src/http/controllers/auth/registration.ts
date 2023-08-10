import { Request, Response, NextFunction } from 'express';

import AuthService from '../../services/auth';
import UserService from '../../services/user';

export async function registration( request: Request, response: Response, next: NextFunction ) {
    try {
        const authService = new AuthService();
        const userService = new UserService();
        const user = await userService.createUser( request.body );
        const token = await authService.generateAccessToken( { id: user.id, name: user.name, email: user.email } );


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