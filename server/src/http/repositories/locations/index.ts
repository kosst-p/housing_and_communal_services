import Location, { ILocationCreate, ILocationUpdate } from '../../../models/location';

export default class LocationRepository {
    async getLocationById( id: string ) {
        return await Location.findById( id ); // mongo error check?
    }

    async getLocations() {
        return await Location.find(); // mongo error check?
    }

    async createLocation( data: ILocationCreate ) {
        return await Location.create( data ); // mongo error check?
    }

    async updateLocation( id: string, data: ILocationUpdate ) {
        return await Location.findByIdAndUpdate( id, data, {
            new: true
        } );
    }
}
