import bcrypt from 'bcrypt';

import User from '../../models/user';
import { IUserBasic, IUserWithPassword } from './types';
import { ValidationError } from '../../errors';

export default class UserService {
    async createUser( data: IUserWithPassword ) {

        const { name, password } = data;
        const candidate = await this.#getUserByName( name );

        if ( candidate ) {
            throw new ValidationError( 'A user with this name already exists' );
        }

        const hashPassword = bcrypt.hashSync( password, 7 );
        const user = await new User( { ...data, password: hashPassword } );

        await user.save(); // mongo error check?
    }

    async #getUserByName( name: string ): Promise<null> {
        return await User.findOne( { name } ); // mongo error check?
    }

    async getUserById( id: string ) {
        return await User.findById( id ); // mongo error check?
    }

    async getUsers() {
        return await User.find(); // mongo error check?
    }

    async updateUser( data: IUserBasic ) {
        const { name, email } = data;

        await User.updateOne( { name }, { $set: { name, email } } ); // mongo error check?
    }
}
