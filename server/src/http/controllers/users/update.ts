import { TRequestPut, TResponse, TNextFunction } from './types';
import UserService from '../../services/userService';

export async function updateUser( request: TRequestPut, response: TResponse, next: TNextFunction ) {
    try {
        const userService = new UserService();

        await userService.updateUser( request.body );

        return response.status( 200 ).send( {
            status: 200,
            message: 'User updated.'
        } );
    }
    catch ( error ) {
        return next();
    }
}
