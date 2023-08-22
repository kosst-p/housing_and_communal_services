import DBService from '../services/dbService';
import { Document, SortOrder } from '../services/types';

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
    count: number,
    skip: number
}

const schema = DBService.getSchema<IServiceProvider>( {
    name: {
        type: String,
        required: true,
        unique: true,
    }
} );

export default DBService.getModel<IServiceProvider>( 'ServiceProvider', schema );
