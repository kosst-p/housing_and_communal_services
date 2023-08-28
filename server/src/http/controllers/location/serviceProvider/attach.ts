import { Response, NextFunction } from '@http/types/index';
import { IRequestPostServiceProvider } from '@/http/types/locations';
import { locationsActions, serviceProvidersActions } from '@actions/index';
import LocationsDataAdapters from '@http/adapters/locations';

export async function attachServiceProvider( request: IRequestPostServiceProvider, response: Response, next: NextFunction ) {
    try {
        const location = await locationsActions.getById( request.user, request.params.id );
        const serviceProvider = await serviceProvidersActions.getById( request.body.id );
        const attachedServiceProvider = await locationsActions.attachServiceProvider( location.id, serviceProvider.id );
        const adaptedAttachedServiceProvider = LocationsDataAdapters.getAttachedServiceProviderFull( attachedServiceProvider );

        return response.send( adaptedAttachedServiceProvider );
    }
    catch ( error ) {
        return next( error );
    }
}