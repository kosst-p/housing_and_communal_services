import DBService from '../services/dbService';
import { Document } from '../services/types';

interface IServiceProvider {
    name: string
}

export interface IServiceProviderCreate {
    name: string
}

export type TServiceProvider = Document & IServiceProvider;

const schema = DBService.getSchema<IServiceProvider>( {
    name: {
        type: String,
        required: true,
        unique: true,
    }
} );

export default DBService.getModel<IServiceProvider>( 'ServiceProvider', schema );
