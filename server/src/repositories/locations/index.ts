import Location, { ILocationCreate, ILocationUpdate, ILocationPaginate } from '@models/location';

export default class LocationRepository {
    async getById( id: string ) {
        // TODO check id before
        return await Location.findById( id ); // mongo error check?
    }

    async paginate( data: ILocationPaginate ) {
        return await Location.paginate(
            {
                userId: data.userId,
                country: { $regex: data.search, $options: 'i' }
            },
            {
                sort: data.sort,
                limit: data.limit,
                offset: data.skip
            }
        );
    }

    async create( data: ILocationCreate ) {
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
}
