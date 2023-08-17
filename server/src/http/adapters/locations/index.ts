import { ILocationCreate, ILocationUpdate, TLocation } from '../../../models/location';
import { ILocationFromBody, ILocationPartialFromBody, ILocationQueryParams, ILocationQueryParamsOptions } from './types';

export default class DataAdapters {
    static allowedFieldsName = [ 'country', 'region', 'city', 'address', 'houseNumber' ];
    static allowedQueryParamsOptionName = [ 'userId', 'search', 'sort', 'count' ];

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

    static getSearchQueryParam( queryParams: ILocationQueryParams ) {
        if ( queryParams.search ) {
            return queryParams.search;
        }
    }

    static getSortQueryParam( queryParams: ILocationQueryParams ) {
        if ( queryParams.sort ) {
            return this.parseSortQueryParam( queryParams.sort );
        }
    }

    static parseSortQueryParam( sortQueryParam: string ) {
        return sortQueryParam?.split( ',' ).join( ' ' );
    }

    static getCountQueryParam( queryParams: ILocationQueryParams ) {
        if ( queryParams.count ) {
            const count = parseInt( queryParams.count );

            if ( count < 500 ) {
                return count;
            }
            else {
                return 500; //max
            }
        }
    }

    static getPageQueryParam( queryParams: ILocationQueryParams ) {
        if ( queryParams.page ) {
            return parseInt( queryParams.page );
        }
    }

    static getQueryParamsOptions( userId: string, queryParams: ILocationQueryParams ) {
        const options: ILocationQueryParamsOptions = {
            userId,
            count: 5
        };

        const searchQueryParam = this.getSearchQueryParam( queryParams );
        const sortQueryParam = this.getSortQueryParam( queryParams );
        const countQueryParam = this.getCountQueryParam( queryParams );
        const pageQueryParam = this.getPageQueryParam( queryParams );

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
