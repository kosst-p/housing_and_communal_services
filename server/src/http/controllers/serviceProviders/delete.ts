import { Request, Response, NextFunction } from '../../types/index';
import ServiceProvidersDataAdapters from '../../adapters/serviceProviders';
import { serviceProvidersActions } from '@actions/index';

export async function deleteServiceProvider( request: Request, response: Response, next: NextFunction ) {
    try {
        const serviceProvider = await serviceProvidersActions.getById( request.params.id );
        const deletedServiceProvider = await serviceProvidersActions.delete( serviceProvider.id );
        const adaptedDeletedServiceProvider = ServiceProvidersDataAdapters.getServiceProviderFull( deletedServiceProvider! );

        return response.send( adaptedDeletedServiceProvider );
    }
    catch ( error ) {
        return next( error );
    }
}
