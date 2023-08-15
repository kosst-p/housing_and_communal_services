import Location, { ILocationCreate, ILocationUpdate } from '../../../models/location';

export default class LocationRepository {
    async getLocationById( id: string ) {
        return await Location.findById( id ); // mongo error check?
    }

    async getLocations() {
        return await Location.find(); // mongo error check?
    }

    async createLocation( data: ILocationCreate ) {
        const location = new Location( { ...data } );

        await location.save(); // mongo error check?
    }

    async updateLocation( id: string, data: ILocationUpdate ) {
        return Location.findByIdAndUpdate( id, {}, {
            new: true
        } );
        // await Location.updateOne( { _id: id }, { $set: data } );
    }
}
