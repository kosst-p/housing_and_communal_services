import mongoosePaginate from 'mongoose-paginate-v2';

import DBService from '../services/dbService';
import { Document, SortOrder, PaginateModel } from '../services/types';

interface IServiceProvider {
    name: string
}

export interface IServiceProviderCreate {
    name: string
}

export type TServiceProvider = Document & IServiceProvider;

export interface IServiceProviderQueryParamsOptions {
    search: string,
    sort: {
        [ key: string ]: SortOrder
    },
    limit: number,
    skip: number
}

export type IServiceProviderPaginate = IServiceProviderQueryParamsOptions;

const schema = DBService.getSchema<IServiceProvider>( {
    name: {
        type: String,
        required: true,
        unique: true,
    }
} );

export default DBService.getModel<IServiceProvider, PaginateModel<IServiceProvider>>( 'ServiceProvider', schema.plugin( mongoosePaginate ) );
