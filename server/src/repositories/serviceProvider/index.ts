import ServiceLocation, { IServiceProviderCreate, IServiceProviderPaginate } from '@models/serviceProvider';

export default class ServiceProviderRepository {
    async getById( id: string ) {
        // TODO check id before
        return await ServiceLocation.findById( id ); // mongo error check?
    }

    async paginate( data: IServiceProviderPaginate ) {
        return await ServiceLocation.paginate(
            {
                name: { $regex: data.search, $options: 'i' }
            },
            {
                sort: data.sort,
                limit: data.limit,
                offset: data.skip
            }
        );
    }

    async create( data: IServiceProviderCreate ) {
        return await ServiceLocation.create( data ); // mongo error check?
    }

    async delete( id: string ) {
        return await ServiceLocation.findByIdAndRemove( id ); // mongo error check?
    }
}
