import DBService from '../services/dbService';

export interface IUser {
    name: string,
    email: string,
    password: string,
}

const schema = DBService.getSchema<IUser>( {
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
} );

export const User = DBService.getModel<IUser>( 'User', schema );
