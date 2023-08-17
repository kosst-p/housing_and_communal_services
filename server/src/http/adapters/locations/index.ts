import { ILocationCreate, ILocationUpdate, TLocation } from '../../../models/location';
import BaseAdapter from '../base';
import { ILocationFromBody, ILocationPartialFromBody, ILocationQueryParams, ILocationQueryParamsOptions } from './types';

export default class DataAdapters extends BaseAdapter {
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

    static getQueryParamsOptions( userId: string, queryParams: ILocationQueryParams ) {
        const options: ILocationQueryParamsOptions = {
            userId,
            count: 5
        };

        const searchQueryParam = this.getSearchQueryParam( queryParams.search );
        const sortQueryParam = this.getSortQueryParam( queryParams.sort );
        const countQueryParam = this.getCountQueryParam( queryParams.count );
        const pageQueryParam = this.getPageQueryParam( queryParams.page );

        if ( searchQueryParam ) {
            options.search = searchQueryParam;
        }

        if ( sortQueryParam ) {
            options.sort = sortQueryParam;
        }

        if ( countQueryParam ) {
            options.count = countQueryParam;
        }

        if ( pageQueryParam && countQueryParam ) {
            options.skip = ( pageQueryParam - 1 ) * countQueryParam;
        }

        return options;
    }
}
