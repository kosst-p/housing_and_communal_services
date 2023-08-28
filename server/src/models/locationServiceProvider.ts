import DBService from '../services/dbService';

import { Document, ObjectId } from '../services/types';

export interface ILocationServiceProvider {
    locationId: typeof ObjectId,
    locationFullName: string,
    serviceProviderId: typeof ObjectId
    serviceProviderName: string
}

export interface ILocationServiceProviderDocument extends ILocationServiceProvider, Document {}

export interface ILocationServiceProviderAttach {
    locationId: string,
    locationFullName: string,
    serviceProviderId: string,
    serviceProviderName: string

}

const schema = DBService.getSchema<ILocationServiceProvider>(
    {
        locationId: {
            type: ObjectId,
            ref: 'Location',
            required: true,
        },
        locationFullName: {
            type: String,
            required: true,
        },
        serviceProviderId: {
            type: ObjectId,
            ref: 'ServiceProvider',
            required: true,
        },
        serviceProviderName: {
            type: String,
            required: true,
        },
    },
);

export default DBService.getModel<ILocationServiceProvider>( 'LocationServiceProvider', schema );
