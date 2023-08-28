import DBService from '../services/dbService';

import { Document, ObjectId } from '../services/types';

export interface ILocationServiceProvider {
    locationId: typeof ObjectId,
    serviceProviderId: typeof ObjectId
}

export interface ILocationServiceProviderDocument extends ILocationServiceProvider, Document {}

const schema = DBService.getSchema<ILocationServiceProvider>(
    {
        locationId: {
            type: ObjectId,
            ref: 'Location',
            required: true,
        },
        serviceProviderId: {
            type: ObjectId,
            ref: 'ServiceProvider',
            required: true,
        },
    },

);

export default DBService.getModel<ILocationServiceProvider>( 'LocationServiceProvider', schema );
