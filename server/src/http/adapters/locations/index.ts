import { ILocationCreate, ILocationUpdate, TLocation } from '@models/location';
import { IRequestGet, IRequestPath, IRequestPost } from '../../types/locations';
import { PaginateResult } from '@/services/types';
import { ILocationQueryParamsOptions, ILocationFull, ILocationPaginateResult } from './types';
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

    static getLocationFull( data: TLocation ): ILocationFull {
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
        const limitParam = this.getLimitQueryParam( request );

        return {
            search: this.getSearchQueryParam( request ),
            sort: this.getSortQueryParam( request ),
            limit: limitParam,
            skip: ( pageParam - 1 ) * limitParam,
        };
    }

    static getPaginateData( data: PaginateResult<TLocation> ): ILocationPaginateResult {
        const adaptedDocs = data.docs.map( ( doc ) => this.getLocationFull( doc ) );

        return {
            docs: adaptedDocs,
            totalDocs: data.totalDocs,
            limit: data.limit,
            page: data.page,
            totalPages: data.totalPages,
            offset: data.offset
        };
    }
}
