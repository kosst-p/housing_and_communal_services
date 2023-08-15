import { IUserCreate } from '../../../models/user';
import { IUserFromBody } from './types';

export default class DataAdapters {
    static getUserDataFromBody( body: IUserFromBody ): IUserCreate {
        const { name, email, password } = body;

        return {
            name,
            email,
            password
        };
    }
}
