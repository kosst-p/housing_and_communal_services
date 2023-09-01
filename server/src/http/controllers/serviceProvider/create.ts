import { Response, NextFunction } from '@http/types/index';
import { IRequestPost } from '@http/types/serviceProviders';
import ServiceProvidersDataAdapters from '@http/adapters/serviceProviders';
import { serviceProvidersActions } from '@actions/index';
import { AlreadyExistError } from '@/errors';

export async function createServiceProvider( request: IRequestPost, response: Response, next: NextFunction ) {
    try {
        const adaptedServiceProviderFromBody = ServiceProvidersDataAdapters.getServiceProviderFromBody( request );
        const candidate = await serviceProvidersActions.get( adaptedServiceProviderFromBody );

        if ( candidate ) {
            throw new AlreadyExistError( 'The Service Provider already exists.' );
        }

        const createdServiceProvider = await serviceProvidersActions.create( adaptedServiceProviderFromBody );
        const adaptedCreatedServiceProvider = ServiceProvidersDataAdapters.getServiceProviderFull( createdServiceProvider );

        return response.send( adaptedCreatedServiceProvider );
    }
    catch ( error ) {
        return next( error );
    }
}
