import { IServiceProviderCreate, IServiceProviderQueryParamsOptions } from '../../models/serviceProvider';
import { serviceProviderRepository } from '../../repositories';

export default class Actions {
    async get( options: IServiceProviderQueryParamsOptions ) {
        return await serviceProviderRepository.get( options );
    }

    async create( data: IServiceProviderCreate ) {
        return await serviceProviderRepository.create( data );
    }
}
