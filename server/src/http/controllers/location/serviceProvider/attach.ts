import { Request, Response, NextFunction } from '@http/types/index';
import { IRequestPostServiceProvider } from '@/http/types/locations';
import { locationsActions, serviceProvidersActions } from '@actions/index';
import LocationsDataAdapters from '@http/adapters/locations';

export async function attachServiceProvider( request: IRequestPostServiceProvider, response: Response, next: NextFunction ) {
    try {
        const location = await locationsActions.getById( request.user, request.params.id );
        const adaptedServiceProviderFromBody = LocationsDataAdapters.getServiceProviderFromBody( request );
        const serviceProvider = await serviceProvidersActions.getById( adaptedServiceProviderFromBody );
        // location.id, serviceProvider.id
    }
    catch ( error ) {
        return next( error );
    }
}
