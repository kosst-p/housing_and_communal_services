import { ILocationCreate, ILocationUpdate, TLocation } from '../../../models/location';
import { ILocationFromBody, ILocationPartialFromBody } from './types';

export default class DataAdapters {
    static allowedFieldsName = [ 'country', 'region', 'city', 'address', 'houseNumber' ];

    static getLocationFromBody( body: ILocationFromBody ): ILocationCreate {
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

    static getLocationPartialFromBody( body: ILocationPartialFromBody ): ILocationUpdate {
        const locationPartial: ILocationUpdate = {};

        for ( const allowedFieldName of this.allowedFieldsName ) {
            if ( body[ allowedFieldName as keyof typeof body ] ) {
                locationPartial[ allowedFieldName as keyof typeof locationPartial ] = body[ allowedFieldName as keyof typeof body ];
            }
        }

        return locationPartial;
    }

    static getLocationFull( data: TLocation ) {
        return {
            id: data._id,
            country: data.country,
            region: data.region,
            city: data.city,
            address: data.address,
            houseNumber: data.houseNumber
        };
    }
}
