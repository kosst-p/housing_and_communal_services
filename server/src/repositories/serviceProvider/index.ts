import ServiceLocation, { IServiceProviderCreate, IServiceProviderQueryParamsOptions } from '../../models/serviceProvider';

export default class ServiceProviderRepository {
    async get( data: IServiceProviderQueryParamsOptions ) {
        return await ServiceLocation.find( {
            $or: [
                { name: { $regex: data.search, $options: 'i' } },
            ]
        } )
            .sort( data.sort )
            .skip( data.skip )
            .limit( data.count );
    }

    async create( data: IServiceProviderCreate ) {
        return await ServiceLocation.create( data ); // mongo error check?
    }
}
