import { Response, NextFunction } from '@http/types/index';
import { IRequestPostLocationServiceProvider } from '@/http/types/locations';
import { locationsActions, serviceProvidersActions } from '@actions/index';
import LocationsDataAdapters from '@http/adapters/locations';
import { AlreadyExistError } from '@/errors';

export async function attachServiceProvider( request: IRequestPostLocationServiceProvider, response: Response, next: NextFunction ) {
    try {
        const location = await locationsActions.getById( request.user, request.params.id );
        const serviceProvider = await serviceProvidersActions.getById( request.body.id );
        const candidate = await locationsActions.getAttachedServiceProvider( {
            locationId: location.id,
            serviceProviderId: serviceProvider.id,
        } );

        if ( candidate ) {
            throw new AlreadyExistError( 'Attached Service Provider is already exist.' );
        }

        const attachedServiceProvider = await locationsActions.attachServiceProvider( location, serviceProvider );
        const adaptedAttachedServiceProvider = LocationsDataAdapters.getAttachedServiceProviderFull( attachedServiceProvider );

        return response.send( adaptedAttachedServiceProvider );
    }
    catch ( error ) {
        return next( error );
    }
}
