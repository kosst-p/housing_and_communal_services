import ServiceLocation, { IServiceProviderCreate } from '../../models/serviceProvider';

export default class ServiceProviderRepository {
    async create( data: IServiceProviderCreate ) {
        return await ServiceLocation.create( data ); // mongo error check?
    }
}
