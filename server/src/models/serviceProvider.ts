import mongoosePaginate from 'mongoose-paginate-v2';

import DBService from '../services/dbService';
import { Document, SortOrder, PaginateModel } from '../services/types';

export interface IServiceProvider {
    name: string
}

export interface IServiceProviderDocument extends IServiceProvider, Document {
    name: string
}

export interface IServiceProviderQueryParams {
    search: string,
    sort: {
        [ key: string ]: SortOrder
    },
    limit: number,
    skip: number
}

export type IServiceProviderPaginate = IServiceProviderQueryParams;

const schema = DBService.getSchema<IServiceProvider>( {
    name: {
        type: String,
        required: true,
        unique: true,
    }
} );

export default DBService.getModel<IServiceProvider, PaginateModel<IServiceProvider>>( 'ServiceProvider', schema.plugin( mongoosePaginate ) );
