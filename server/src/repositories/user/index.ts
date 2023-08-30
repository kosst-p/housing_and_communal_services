import bcrypt from 'bcrypt';

import User, { IUserCreate, IUserFilterQuery } from '@models/user';
import { AlreadyExistError } from '@errors/index';

export default class Repository {
    async getById( id: string ) {
        return await User.findById( id ); // mongo error check?
    }

    async get<T extends IUserFilterQuery>( filter: T ) {
        return await User.findOne( filter ); // mongo error check?
    }

    async create( data: IUserCreate ) {

        const { name, password } = data;
        const candidate = await this.get( { name } );

        if ( candidate ) {
            throw new AlreadyExistError( 'The user already exists.' );
        }

        const hashPassword = bcrypt.hashSync( password, 7 );

        return await User.create( { ...data, password: hashPassword } ); // mongo error check?
    }

    async getUsers() {
        return await User.find(); // mongo error check?
    }
}
