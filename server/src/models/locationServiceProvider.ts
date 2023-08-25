import DBService from '../services/dbService';

import { ObjectId } from '../services/types';

export interface ILocationServiceProvider {
    locationId: typeof ObjectId,
    serviceProviderId: typeof ObjectId
}

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
