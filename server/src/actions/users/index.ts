import { IUserCreate } from '@/models/user';
import { userRepository } from '@repositories/index';
import { AlreadyExistError, NotFoundError } from '@/errors';

export default class Actions {
    async getById( id: string ) {
        const user = await userRepository.getById( id );

        if ( ! user ) {
            throw new NotFoundError( 'User not found.' );
        }

        return user;
    }

    async get( name: string ) {
        const user = await userRepository.get( { name } );

        if ( ! user ) {
            throw new NotFoundError( 'User not found.' );
        }

        return user;
    }

    async create( data: IUserCreate ) {
        const { name } = data;
        const candidate = await userRepository.get( { name } );

        if ( candidate ) {
            throw new AlreadyExistError( 'The user already exists.' );
        }

        return await userRepository.create( data );
    }

    async getAll() {
        return await userRepository.getAll();
    }
}
