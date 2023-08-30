import Location, { ILocationCreate, ILocationUpdate, ILocationQueryParams, ILocationDocument } from '@models/location';
import LocationServiceProvider, { ILocationServiceProviderAttach, ILocationServiceProviderFilterQuery, ILocationServiceProviderUpdate } from '@/models/locationServiceProvider';
import { AlreadyExistError } from '@/errors';

export default class Repository {
    async getById( id: string ) {
        // TODO check id before
        return await Location.findById( id ); // mongo error check?
    }

    async paginate( params: ILocationQueryParams & { userId: string } ) {
        return await Location.paginate(
            {
                userId: params.userId,
                country: { $regex: params.search, $options: 'i' }
            },
            {
                sort: params.sort,
                limit: params.limit,
                offset: params.skip
            }
        );
    }

    async create( data: ILocationCreate & { userId: string } ) {
        return await Location.create( data ); // mongo error check?
    }

    async update( id: string, data: ILocationUpdate ): Promise<ILocationDocument> {
        return await Location.findByIdAndUpdate( id, data, { // mongo error check?
            new: true
        } ) as ILocationDocument;
    }

    async delete( id: string ) {
        return await Location.findByIdAndRemove( id ); // mongo error check?
    }

    async getAttachedServiceProviderById( attachedServiceProviderId: string ) {
        return await LocationServiceProvider.findById( attachedServiceProviderId ); // mongo error check?
    }

    async getAttachedServiceProvider<T extends ILocationServiceProviderFilterQuery>( filter: T ) {
        return await LocationServiceProvider.findOne( filter );
    }

    async attachServiceProvider( data: ILocationServiceProviderAttach ) {
        const candidate = await this.getAttachedServiceProvider( data );

        if ( candidate ) {
            throw new AlreadyExistError( 'Attached Service Provider is already exist.' );
        }

        return LocationServiceProvider.create( data ); // mongo error check?
    }

    async detachServiceProvider( attachedServiceProviderId: string ) {
        return await LocationServiceProvider.findByIdAndRemove( attachedServiceProviderId ); // mongo error check?
    }

    async updateAttachedServiceProvider( attachedServiceProviderId: string, data: ILocationServiceProviderUpdate ) {
        return await LocationServiceProvider.findByIdAndUpdate( attachedServiceProviderId, data, { // mongo error check?
            new: true
        } );
    }
}
