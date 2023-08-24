import { IServiceProviderCreate, TServiceProvider } from '@models/serviceProvider';
import { IRequestGet, IRequestPost } from '@http/types/serviceProviders';
import { IServiceProviderFull, IServiceProviderPaginateResult, IServiceProviderQueryParamsOptions } from './types';
import { PaginateResult } from '@/services/types';
import BaseAdapter from '../base';

export default class DataAdapters extends BaseAdapter {
    static getServiceProviderFromBody( request: IRequestPost ): IServiceProviderCreate {
        const { name } = request.body;

        return {
            name
        };
    }

    static getServiceProviderFull( data: TServiceProvider ): IServiceProviderFull {
        return {
            id: data._id,
            name: data.name,
        };
    }

    static getQueryParamsOptions( request: IRequestGet ): IServiceProviderQueryParamsOptions {
        const pageParam = this.getPageQueryParam( request );
        const limitParam = this.getLimitQueryParam( request );

        return {
            search: this.getSearchQueryParam( request ),
            sort: this.getSortQueryParam( request ),
            limit: limitParam,
            skip: ( pageParam - 1 ) * limitParam,
        };
    }

    static getPaginateData( data: PaginateResult<TServiceProvider> ): IServiceProviderPaginateResult {
        const adaptedDocs = data.docs.map( ( doc ) => this.getServiceProviderFull( doc ) );

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
