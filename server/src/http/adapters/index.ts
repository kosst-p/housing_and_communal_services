import { IUserCreate } from '../../models/user';
import { ILocationCreate, ILocationUpdate } from '../../models/location';
import { IUserFromBody, ILocationFromBody, ILocationPartialFromBody } from './types';

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

    static getLocationDataPartialFromBody( body: ILocationPartialFromBody ): ILocationUpdate {
        const partial: ILocationUpdate = {};

        for ( const property in body ) {
            if ( Object.prototype.hasOwnProperty.call( body, property ) ) {
                partial[ property as keyof typeof partial ] = body[ property as keyof typeof body ] ;
            }
        }

        return partial;
    }
}
