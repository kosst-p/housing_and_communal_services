import { Response, NextFunction } from '../../types/index';
import { IRequestGet } from '../../types/serviceProviders';
import ServiceProvidersDataAdapters from '../../adapters/serviceProviders';
import { serviceProvidersActions } from '@actions/index';

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
