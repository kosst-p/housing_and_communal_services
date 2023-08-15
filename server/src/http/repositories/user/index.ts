import bcrypt from 'bcrypt';

import User, { IUserCreate } from '../../../models/user';
import { ValidationError } from '../../../errors';

export default class UserRepository {
    async createUser( data: IUserCreate ) {

        const { name, password } = data;
        const candidate = await this.getUserByName( name );

        if ( candidate ) {
            throw new ValidationError( 'A user with this name already exists' );
        }

        const hashPassword = bcrypt.hashSync( password, 7 );

        return await User.create( { ...data, password: hashPassword } ); // mongo error check?
    }

    async getUserByName( name: string ) {
        return await User.findOne( { name } ); // mongo error check?
    }

    async getUserById( id: string ) {
        return await User.findById( id ); // mongo error check?
    }

    async getUsers() {
        return await User.find(); // mongo error check?
    }
}
