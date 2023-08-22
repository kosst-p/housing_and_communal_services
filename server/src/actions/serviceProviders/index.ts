import { IServiceProviderCreate } from '../../models/serviceProvider';
import { serviceProviderRepository } from '../../repositories';

export default class Actions {
    async create( data: IServiceProviderCreate ) {
        return await serviceProviderRepository.create( data );
    }
}
