import Location, { ILocationCreate, ILocationUpdate, ILocationQueryParams } from '@models/location';
import LocationServiceProvider from '@/models/locationServiceProvider';
import { AlreadyExistError } from '@/errors';

export default class LocationRepository {
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

    async update( id: string, data: ILocationUpdate ) {
        return await Location.findByIdAndUpdate( id, data, { // mongo error check?
            new: true
        } );
    }

    async delete( id: string ) {
        return await Location.findByIdAndRemove( id ); // mongo error check?
    }

    async getAttachedServiceProviderById( attachedServiceProviderId: string ) {
        return await LocationServiceProvider.findById( attachedServiceProviderId ); // mongo error check?
    }

    async getAttachedServiceProvider( id: string, serviceProviderId: string ) {
        return await LocationServiceProvider.findOne( { locationId: id, serviceProviderId } ); // mongo error check?
    }

    async attachServiceProvider( id: string, serviceProviderId: string ) {
        const candidate = await this.getAttachedServiceProvider( id, serviceProviderId );

        if ( candidate ) {
            throw new AlreadyExistError( 'Attached Service Provider is already exist.' );
        }

        return LocationServiceProvider.create( { locationId: id, serviceProviderId } ); // mongo error check?
    }

    async detachServiceProvider( attachedServiceProviderId: string ) {
        return await LocationServiceProvider.findByIdAndRemove( attachedServiceProviderId ); // mongo error check?
    }
}
