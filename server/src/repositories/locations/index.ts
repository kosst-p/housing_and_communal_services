import Location, { ILocationCreate, ILocationUpdate } from '../../models/location';

export default class LocationRepository {
    async getById( id: string ) {
        // check id before
        return await Location.findById( id ); // mongo error check?
    }

    async get( id: string ) {
        return await Location.find( { userId: id } ); // mongo error check?
    }

    async create( data: ILocationCreate ) {
        return await Location.create( data ); // mongo error check?
    }

    async update( id: string, data: ILocationUpdate ) {
        return await Location.findByIdAndUpdate( id, data, { // mongo error check?
            new: true
        } );
    }
}
