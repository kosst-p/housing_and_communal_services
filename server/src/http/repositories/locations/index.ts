import Location, { ILocationCreate } from '../../../models/location';

export default class LocationRepository {
    async getLocationById( id: string ) {
        return await Location.findById( id ); // mongo error check?
    }

    async getLocations() {
        return await Location.find(); // mongo error check?
    }

    async createLocation( data: ILocationCreate ) {
        const location = await new Location( { ...data } );

        await location.save(); // mongo error check?
    }
}
