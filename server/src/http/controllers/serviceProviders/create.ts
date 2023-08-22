import { IRequestPost, Response, NextFunction } from '../../types/serviceProviders';
import ServiceProvidersDataAdapters from '../../adapters/serviceProviders';
import { serviceProvidersActions } from '../../../actions';

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
