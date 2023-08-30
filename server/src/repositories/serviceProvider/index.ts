import { AlreadyExistError } from '@/errors';
import ServiceProvider, { IServiceProvider, IServiceProviderDocument, IServiceProviderPaginate } from '@models/serviceProvider';

export default class ServiceProviderRepository {
    async getByName( name: string ) {
        return await ServiceProvider.findOne( { name } ); // mongo error check?
    }

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

    async create( data: IServiceProvider ) {
        return await ServiceProvider.create( data ); // mongo error check?
    }

    async delete( id: string ) {
        return await ServiceProvider.findByIdAndRemove( id ); // mongo error check?
    }

    async update( id: string, data: IServiceProvider ): Promise<IServiceProviderDocument> {
        const candidate = await this.getByName( data.name );

        if ( candidate ) {
            throw new AlreadyExistError( 'This name is already taken.' );
        }

        return await ServiceProvider.findByIdAndUpdate( id, data, { // mongo error check?
            new: true
        } ) as IServiceProviderDocument;
    }
}
