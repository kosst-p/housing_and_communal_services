import { Response, NextFunction } from '@http/types/index';
import { IRequestPath } from '@/http/types/serviceProviders';
import ServiceProvidersDataAdapters from '@http/adapters/serviceProviders';
import { serviceProvidersActions } from '@actions/index';

export async function updateServiceProvider( request: IRequestPath, response: Response, next: NextFunction ) {
    try {
        const serviceProvider = await serviceProvidersActions.getById( request.params.id );
        const adaptedServiceProviderFromBody = ServiceProvidersDataAdapters.getServiceProviderPartialFromBody( request );
        const updatedServiceProvider = await serviceProvidersActions.update( serviceProvider.id, adaptedServiceProviderFromBody );
        const adaptedUpdatedServiceProvider = ServiceProvidersDataAdapters.getServiceProviderFull( updatedServiceProvider! );

        return response.send( adaptedUpdatedServiceProvider );

    }
    catch ( error ) {
        return next( error );
    }
}
