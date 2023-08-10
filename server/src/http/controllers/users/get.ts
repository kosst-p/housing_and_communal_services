import { TRequestGet, TResponse, TNextFunction } from './types';
import UserService from '../../services/user';

export async function getUser( request: TRequestGet, response: TResponse, next: TNextFunction ) {
    try {
        const userService = new UserService();
        const user = await userService.getUserById( request.params.id );

        return response.json( user );
    }
    catch ( error ) {
        return next( error );
    }
}

export async function getUsers( _request: TRequestGet, response: TResponse, next: TNextFunction ) {
    try {
        const userService = new UserService();
        const users = await userService.getUsers();

        return response.json( users );
    }
    catch ( error ) {
        return next( error );
    }
}
