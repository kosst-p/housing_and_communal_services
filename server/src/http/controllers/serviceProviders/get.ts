import { IRequestGet, Response, NextFunction } from '../../types/serviceProviders';
import ServiceProvidersDataAdapters from '../../adapters/serviceProviders';
import { serviceProvidersActions } from '../../../actions';

export async function getServiceProviders( request: IRequestGet, response: Response, next: NextFunction ) {
    try {
        const queryParamsOptions = ServiceProvidersDataAdapters.getQueryParamsOptions( request );
        const serviceProviders = await serviceProvidersActions.get( queryParamsOptions );
        const adaptedServiceProviders = serviceProviders.map( ( serviceProvider ) => ServiceProvidersDataAdapters.getLocationFull( serviceProvider ) );

        return response.send( adaptedServiceProviders );
    }
    catch ( error ) {
        return next( error );
    }
}
