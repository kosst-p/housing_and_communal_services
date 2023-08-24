import { ILocationCreate, ILocationUpdate, ILocationDocument, ILocationQueryParams } from '@models/location';
import { IRequestGet, IRequestPost, IRequestPath } from '@http/types/locations';
import { PaginateResult } from '@/services/types';
import { ILocationFull, ILocationPaginateResult } from './types';
import BaseAdapter from '../base';

export default class DataAdapters extends BaseAdapter {
    static #allowedFieldsName = [ 'country', 'region', 'city', 'address', 'houseNumber' ];

    static getLocationFromBody( request: IRequestPost ): ILocationCreate {
        const { country, region, city, address, houseNumber } = request.body;

        return {
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

    static getLocationFull( data: ILocationDocument ): ILocationFull {
        return {
            id: data.id,
            country: data.country,
            region: data.region,
            city: data.city,
            address: data.address,
            houseNumber: data.houseNumber
        };
    }

    static getQueryParamsOptions( request: IRequestGet ): ILocationQueryParams {
        const pageParam = this.getPageQueryParam( request );
        const limitParam = this.getLimitQueryParam( request );

        return {
            search: this.getSearchQueryParam( request ),
            sort: this.getSortQueryParam( request ),
            limit: limitParam,
            skip: ( pageParam - 1 ) * limitParam,
        };
    }

    static getPaginateData( data: PaginateResult<ILocationDocument> ): ILocationPaginateResult {
        const adaptedDocs = data.docs.map( ( doc ) => this.getLocationFull( doc ) );

        return {
            docs: adaptedDocs,
            totalDocs: data.totalDocs,
            limit: data.limit,
            page: data.page,
        };
    }
}
