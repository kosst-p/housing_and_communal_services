import DBService from '../services/dbService';

interface IUser {
    name: string,
    email: string,
    password: string,
}

export interface IUserCreate {
    name: string,
    email: string,
    password: string,
}

export interface IUserAuth {
    id: string,
    name: string,
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

export default DBService.getModel<IUser>( 'User', schema );
