import DBService from '../services/dbService';

interface IUser {
    name: string,
    email: string,
    password: string,
}

const schema = DBService.getSchema<IUser>( {
    name: String,
    email: String,
    password: String,
} );

export default DBService.getModel<IUser>( 'User', schema );
