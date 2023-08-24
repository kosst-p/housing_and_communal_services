import { Response, NextFunction } from '@http/types/index';
import { IRequestGet } from '@http/types/serviceProviders';
import ServiceProvidersDataAdapters from '@http/adapters/serviceProviders';
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
