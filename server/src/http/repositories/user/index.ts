import bcrypt from 'bcrypt';

import { IUser } from '../../types/users';
import User from '../../../models/user';
import { ValidationError } from '../../../errors';

export default class UserRepository {
    async createUser( data: IUser ) {

        const { name, password } = data;
        const candidate = await this.getUserByName( name );

        if ( candidate ) {
            throw new ValidationError( 'A user with this name already exists' );
        }

        const hashPassword = bcrypt.hashSync( password, 7 );
        const user = await new User( { ...data, password: hashPassword } );

        await user.save(); // mongo error check?

        return user;
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
