import { ILocationCreate, ILocationUpdate } from '../../../models/location';
import { ILocationFromBody, ILocationPartialFromBody } from './types';

export default class DataAdapters {
    static allowedFieldsName = [ 'country', 'region', 'city', 'address', 'houseNumber' ];

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
        const locationData: ILocationUpdate = {};

        for ( const allowedFieldName of this.allowedFieldsName ) {
            if ( body[ allowedFieldName as keyof typeof body ] ) {
                locationData[ allowedFieldName as keyof typeof locationData ] = body[ allowedFieldName as keyof typeof body ];
            }
        }

        return locationData;
    }
}
