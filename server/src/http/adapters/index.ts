import { ILocation, ILocationDto } from '../types/locations';
import { IUser, IUserDto } from '../types/users';

export default class DataAdapters {
    static getUserDataFromBody( body: IUserDto ): IUser {
        const { name, email, password } = body;

        return {
            name,
            email,
            password
        };
    }

    static getLocationDataFromBody( body: ILocationDto ): ILocation {
        const { country, region, city, address, house_number } = body;

        return {
            // id ?
            country,
            region,
            city,
            address,
            house_number,
        };
    }
}
