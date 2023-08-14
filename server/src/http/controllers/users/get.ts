import { TRequestGet, Request, Response, NextFunction, } from '../../types/users';
import UserRepository from '../../repositories/user';

export async function getUser( request: TRequestGet, response: Response, next: NextFunction ) {
    try {
        const userRepository = new UserRepository();
        const user = await userRepository.getUserById( request.params.id );

        return response.json( user );
    }
    catch ( error ) {
        return next( error );
    }
}

export async function getUsers( _request: Request, response: Response, next: NextFunction ) {
    try {
        const userRepository = new UserRepository();
        const users = await userRepository.getUsers();

        return response.json( users );
    }
    catch ( error ) {
        return next( error );
    }
}
