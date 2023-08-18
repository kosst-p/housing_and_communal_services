import { IUserCreate } from '../../../models/user';
import { IRegistrationRequest } from '../../types/auth';

export default class DataAdapters {
    static getUserDataFromBody( request: IRegistrationRequest ): IUserCreate {
        const { name, email, password } = request.body;

        return {
            name,
            email,
            password
        };
    }
}
