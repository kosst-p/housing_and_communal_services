import { IServiceProvider, IServiceProviderDocument, IServiceProviderQueryParams } from '@models/serviceProvider';
import { IRequestGet, IRequestPost, IRequestPath } from '@http/types/serviceProviders';
import { IServiceProviderFull, IServiceProviderPaginateResult } from './types';
import { PaginateResult } from '@/services/types';
import BaseAdapter from '../base';

export default class DataAdapters extends BaseAdapter {
    static #allowedFieldsName = [ 'name' ];

    static getServiceProviderFromBody( request: IRequestPost ): IServiceProvider {
        const { name } = request.body;

        return {
            name
        };
    }

    static getServiceProviderFull( data: IServiceProviderDocument ): IServiceProviderFull {
        return {
            id: data.id,
            name: data.name,
        };
    }

    static getQueryParams( request: IRequestGet ): IServiceProviderQueryParams {
        const pageParam = this.getPageQueryParam( request );
        const limitParam = this.getLimitQueryParam( request );

        return {
            search: this.getSearchQueryParam( request ),
            sort: this.getSortQueryParam( request ),
            limit: limitParam,
            skip: ( pageParam - 1 ) * limitParam,
        };
    }

    static getPaginateData( data: PaginateResult<IServiceProviderDocument> ): IServiceProviderPaginateResult {
        const adaptedDocs = data.docs.map( ( doc ) => this.getServiceProviderFull( doc ) );

        return {
            docs: adaptedDocs,
            totalDocs: data.totalDocs,
            limit: data.limit,
            page: data.page,
        };
    }

    static getLocationPartialFromBody( request: IRequestPath ): IServiceProvider {
        return super.getPartialFromBody<IRequestPath, IServiceProvider>( request, this.#allowedFieldsName );
    }
}
