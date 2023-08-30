import ServiceProvider, { IServiceProviderCreate, IServiceProviderDocument, IServiceProviderPaginate, IServiceProviderUpdate } from '@models/serviceProvider';

export default class ServiceProviderRepository {
    async getById( id: string ) {
        // TODO check id before
        return await ServiceProvider.findById( id ); // mongo error check?
    }

    async paginate( data: IServiceProviderPaginate ) {
        return await ServiceProvider.paginate(
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
        return await ServiceProvider.create( data ); // mongo error check?
    }

    async delete( id: string ) {
        return await ServiceProvider.findByIdAndRemove( id ); // mongo error check?
    }

    async update( id: string, data: IServiceProviderUpdate ): Promise<IServiceProviderDocument> {
        return await ServiceProvider.findByIdAndUpdate( id, data, { // mongo error check?
            new: true
        } ) as IServiceProviderDocument;
    }
}
