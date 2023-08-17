import { FilterQuery } from '../../services/types';
import Location, { ILocation, ILocationCreate, ILocationQueryParamsOptions, ILocationUpdate } from '../../models/location';

export default class LocationRepository {
    async getById( id: string ) {
        // TODO check id before
        return await Location.findById( id ); // mongo error check?
    }

    async get( data: ILocationQueryParamsOptions ) {
        const params: FilterQuery<ILocation> = { // add type from mongoose
            userId: data.userId,
        };

        if ( data.search ) {
            params.$or = [
                { country: { $regex: data.search, $options: 'i' } },
                { region: { $regex: data.search, $options: 'i' } }
            ];
        }

        const query = Location.find( params );

        if ( data.sort ) {
            query.sort( data.sort );
        }

        if ( data.skip ) {
            query.skip( data.count );
        }

        if ( data.count ) {
            query.limit( data.count );
        }

        return await query;

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
