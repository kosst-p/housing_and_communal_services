import { TRequestPost, TResponse, TNextFunction } from './types';
import UserService from '../../services/user';

export async function createUser( request: TRequestPost, response: TResponse, next: TNextFunction ) {
    try {
        const userService = new UserService();

        const user = await userService.createUser( request.body );

        return response.status( 200 ).send( {
            status: 200,
            message: 'You are registered.'
        } );
    }
    catch ( error ) {
        return next( error );
    }
}
