import { ILocationCreate, ILocationUpdate, ILocationDocument, ILocationQueryParams } from '@models/location';
import { ILocationServiceProviderDocument } from '@/models/locationServiceProvider';
import { IRequestGet, IRequestPost, IRequestPath } from '@http/types/locations';
import { PaginateResult } from '@/services/types';
import { ILocationFull, ILocationPaginateResult, ILocationServiceProviderFull } from './types';
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
        return super.getPartialFromBody<IRequestPath, ILocationUpdate>( request, this.#allowedFieldsName );
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

    static getQueryParams( request: IRequestGet ): ILocationQueryParams {
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

    static getAttachedServiceProviderFull( data: ILocationServiceProviderDocument ): ILocationServiceProviderFull {
        return {
            id: data.id,
            locationId: data.locationId.toString(),
            serviceProviderId: data.serviceProviderId.toString()
        };
    }
}
