import Location, { ILocationCreate, ILocationUpdate, ILocationQueryParams } from '@models/location';

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

    async attach( masterId: string, slaveId: string ) {
        return LocationServiceProvider;
    }
}
