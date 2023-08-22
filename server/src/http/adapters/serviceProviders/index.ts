import { IServiceProviderCreate, TServiceProvider } from '@models/serviceProvider';
import { IRequestGet, IRequestPost } from '../../types/serviceProviders';
import { IServiceProviderQueryParamsOptions } from './types';
import BaseAdapter from '../base';

export default class DataAdapters extends BaseAdapter {
    static getServiceProviderFromBody( request: IRequestPost ): IServiceProviderCreate {
        const { name } = request.body;

        return {
            name
        };
    }

    static getServiceProviderFull( data: TServiceProvider ) {
        return {
            id: data._id,
            name: data.name,
        };
    }

    static getQueryParamsOptions( request: IRequestGet ): IServiceProviderQueryParamsOptions {
        const pageParam = this.getPageQueryParam( request );
        const countParam = this.getCountQueryParam( request );

        return {
            search: this.getSearchQueryParam( request ),
            sort: this.getSortQueryParam( request ),
            count: countParam,
            skip: ( pageParam - 1 ) * countParam,
        };
    }
}
