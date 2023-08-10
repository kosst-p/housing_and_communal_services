import { ILocation } from './types';
import Location from '../../../models/location';
import { ValidationError } from '../../../errors';

export default class LocationService {
    async getLocationById( id: string ) {
        return await Location.findById( id ); // mongo error check?
    }

    async getLocations() {
        return await Location.find(); // mongo error check?
    }

    async createLocation( data: ILocation ) {
        const location = await new Location( { data } );

        await location.save(); // mongo error check?
    }
}
