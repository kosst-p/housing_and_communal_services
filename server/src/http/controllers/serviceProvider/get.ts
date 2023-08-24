import { Response, NextFunction } from '../../types/index';
import { IRequestGet } from '../../types/serviceProviders';
import ServiceProvidersDataAdapters from '../../adapters/serviceProviders';
import { serviceProvidersActions } from '@actions/index';

export async function paginateServiceProviders( request: IRequestGet, response: Response, next: NextFunction ) {
    try {
        const queryParamsOptions = ServiceProvidersDataAdapters.getQueryParamsOptions( request );
        const paginateData = await serviceProvidersActions.paginate( queryParamsOptions );
        const adaptedPaginateData = ServiceProvidersDataAdapters.getPaginateData( paginateData );

        return response.send( adaptedPaginateData );
    }
    catch ( error ) {
        return next( error );
    }
}
