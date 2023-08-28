import { Response, NextFunction } from '@http/types/index';
import { IRequestDeleteLocationServiceProvider } from '@/http/types/locations';
import { locationsActions } from '@/actions';
import LocationsDataAdapters from '@http/adapters/locations';

export async function detachServiceProvider( request: IRequestDeleteLocationServiceProvider, response: Response, next: NextFunction ) {
    try {
        const attachedServiceProvider = await locationsActions.getAttachedServiceProvider( request.params.attachedServiceProviderId );
        const deletedAttachedServiceProvider = await locationsActions.detachServiceProvider( attachedServiceProvider.id );
        const adaptedDeletedAttachedServiceProvider = LocationsDataAdapters.getAttachedServiceProviderFull( deletedAttachedServiceProvider! );

        return response.send( adaptedDeletedAttachedServiceProvider );
    }
    catch ( error ) {
        return next( error );
    }
}
