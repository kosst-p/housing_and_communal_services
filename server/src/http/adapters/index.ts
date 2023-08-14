import { IUserCreate } from '../../models/user';
import { ILocationCreate } from '../../models/location';
import { IUserFromBody, ILocationFromBody } from './types';

export default class DataAdapters {
    static getUserDataFromBody( body: IUserFromBody ): IUserCreate {
        const { name, email, password } = body;

        return {
            name,
            email,
            password
        };
    }

    static getLocationDataFromBody( body: ILocationFromBody ): ILocationCreate {
        const { userId, country, region, city, address, houseNumber } = body;

        return {
            userId,
            country,
            region,
            city,
            address,
            houseNumber,
        };
    }
}
