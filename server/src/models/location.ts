import DBService from '../services/dbService';

interface ILocation {
    country: string,
    region: string,
    city: string,
    address: string,
    house_number: string
}

const schema = DBService.getSchema<ILocation>( {
    country: String,
    region: String,
    city: String,
    address: String,
    house_number: String
} );

export default DBService.getModel<ILocation>( 'Location', schema );
