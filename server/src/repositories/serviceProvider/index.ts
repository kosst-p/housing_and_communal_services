import ServiceLocation, { IServiceProviderCreate, IServiceProviderQueryParamsOptions } from '@models/serviceProvider';

export default class ServiceProviderRepository {
    async getById( id: string ) {
        // TODO check id before
        return await ServiceLocation.findById( id ); // mongo error check?
    }

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

    async delete( id: string ) {
        return await ServiceLocation.findByIdAndRemove( id ); // mongo error check?
    }
}
