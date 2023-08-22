import { Response, NextFunction } from '../../types/index';
import { IRequestPost } from '../../types/serviceProviders';
import ServiceProvidersDataAdapters from '../../adapters/serviceProviders';
import { serviceProvidersActions } from '@actions/index';

export async function createServiceProvider( request: IRequestPost, response: Response, next: NextFunction ) {
    try {
        const adaptedServiceProviderFromBody = ServiceProvidersDataAdapters.getServiceProviderFromBody( request );
        const createdServiceProvider = await serviceProvidersActions.create( adaptedServiceProviderFromBody );
        const adaptedCreatedServiceProvider = ServiceProvidersDataAdapters.getLocationFull( createdServiceProvider );

        return response.send( adaptedCreatedServiceProvider );
    }
    catch ( error ) {
        return next( error );
    }
}
