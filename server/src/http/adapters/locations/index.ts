import { ILocationCreate, ILocationUpdate, TLocation } from '@models/location';
import { IRequestGet, IRequestPath, IRequestPost } from '../../types/locations';
import { ILocationQueryParamsOptions } from './types';
import BaseAdapter from '../base';

export default class DataAdapters extends BaseAdapter {
    static #allowedFieldsName = [ 'country', 'region', 'city', 'address', 'houseNumber' ];

    static getLocationFromBody( request: IRequestPost ): ILocationCreate {
        const { userId, country, region, city, address, houseNumber } = request.body;

        return {
            userId,
            country,
            region,
            city,
            address,
            houseNumber,
        };
    }

    static getLocationPartialFromBody( request: IRequestPath ): ILocationUpdate {
        const { body } = request;
        const locationPartial: ILocationUpdate = {};

        for ( const allowedFieldName of this.#allowedFieldsName ) {
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

    static getQueryParamsOptions( request: IRequestGet ): ILocationQueryParamsOptions {
        const pageParam = this.getPageQueryParam( request );
        const countParam = this.getCountQueryParam( request );

        return {
            userId: request.user.id,
            search: this.getSearchQueryParam( request ),
            sort: this.getSortQueryParam( request ),
            count: countParam,
            skip: ( pageParam - 1 ) * countParam,
        };
    }
}
